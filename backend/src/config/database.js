const { Sequelize } = require("sequelize");
const Redis = require("redis");
const logger = require("../utils/logger");

// PostgreSQL Configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || "evertwine_db",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl:
        process.env.NODE_ENV === "production"
          ? {
              require: true,
              rejectUnauthorized: false,
            }
          : false,
    },
  }
);

// Redis Configuration (with fallback for development)
let redisClient = null;

try {
  redisClient = Redis.createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
    retry_strategy: (options) => {
      if (options.error && options.error.code === "ECONNREFUSED") {
        logger.warn(
          "Redis server refused connection - using in-memory fallback"
        );
        return undefined; // Don't retry, use fallback
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        logger.error("Redis retry time exhausted");
        return new Error("Redis retry time exhausted");
      }
      if (options.attempt > 10) {
        logger.error("Redis max retry attempts reached");
        return undefined;
      }
      return Math.min(options.attempt * 100, 3000);
    },
  });
} catch (error) {
  logger.warn("Redis client creation failed - using in-memory fallback");
  redisClient = null;
}

// Redis event handlers
if (redisClient) {
  redisClient.on("connect", () => {
    logger.info("Redis client connected");
  });

  redisClient.on("error", (err) => {
    logger.error("Redis client error:", err);
  });

  redisClient.on("ready", () => {
    logger.info("Redis client ready");
  });

  redisClient.on("end", () => {
    logger.info("Redis client disconnected");
  });
}

// Database connection test
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established successfully.");

    if (redisClient) {
      try {
        await redisClient.connect();
        logger.info("Redis connection established successfully.");
      } catch (redisError) {
        logger.warn("Redis connection failed - using in-memory fallback");
      }
    } else {
      logger.warn("Redis not available - using in-memory fallback");
    }
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    throw error;
  }
};

// Graceful shutdown
const closeConnections = async () => {
  try {
    await sequelize.close();
    if (redisClient) {
      await redisClient.quit();
    }
    logger.info("Database connections closed gracefully.");
  } catch (error) {
    logger.error("Error closing database connections:", error);
  }
};

// In-memory cache fallback
const memoryCache = new Map();

// Cache utility functions
const cache = {
  async get(key) {
    try {
      if (redisClient) {
        const value = await redisClient.get(key);
        return value ? JSON.parse(value) : null;
      } else {
        // In-memory fallback
        const item = memoryCache.get(key);
        if (item && item.expiry > Date.now()) {
          return item.value;
        }
        memoryCache.delete(key);
        return null;
      }
    } catch (error) {
      logger.error("Cache get error:", error);
      return null;
    }
  },

  async set(key, value, ttl = 3600) {
    try {
      if (redisClient) {
        await redisClient.setEx(key, ttl, JSON.stringify(value));
      } else {
        // In-memory fallback
        memoryCache.set(key, {
          value,
          expiry: Date.now() + ttl * 1000,
        });
      }
    } catch (error) {
      logger.error("Cache set error:", error);
    }
  },

  async del(key) {
    try {
      if (redisClient) {
        await redisClient.del(key);
      } else {
        memoryCache.delete(key);
      }
    } catch (error) {
      logger.error("Cache del error:", error);
    }
  },

  async flush() {
    try {
      if (redisClient) {
        await redisClient.flushAll();
      } else {
        memoryCache.clear();
      }
    } catch (error) {
      logger.error("Cache flush error:", error);
    }
  },
};

module.exports = {
  sequelize,
  redisClient,
  cache,
  testConnection,
  closeConnections,
};
