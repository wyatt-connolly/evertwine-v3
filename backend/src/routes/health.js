const express = require("express");
const { sequelize, redisClient } = require("../config/database");
const logger = require("../utils/logger");

const router = express.Router();

// Health check endpoint
router.get("/", async (req, res) => {
  try {
    const health = {
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "1.0.0",
      services: {
        database: "unknown",
        redis: "unknown",
      },
    };

    // Check database connection
    try {
      await sequelize.authenticate();
      health.services.database = "OK";
    } catch (dbError) {
      health.services.database = "ERROR";
      health.status = "DEGRADED";
      logger.error("Database health check failed:", dbError);
    }

    // Check Redis connection
    try {
      await redisClient.ping();
      health.services.redis = "OK";
    } catch (redisError) {
      health.services.redis = "ERROR";
      health.status = "DEGRADED";
      logger.error("Redis health check failed:", redisError);
    }

    const statusCode = health.status === "OK" ? 200 : 503;
    res.status(statusCode).json(health);
  } catch (error) {
    logger.error("Health check error:", error);
    res.status(503).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      error: "Health check failed",
    });
  }
});

// Detailed health check
router.get("/detailed", async (req, res) => {
  try {
    const detailedHealth = {
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "1.0.0",
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal,
        external: process.memoryUsage().external,
      },
      services: {
        database: {
          status: "unknown",
          responseTime: null,
        },
        redis: {
          status: "unknown",
          responseTime: null,
        },
      },
    };

    // Check database with response time
    try {
      const dbStart = Date.now();
      await sequelize.authenticate();
      const dbResponseTime = Date.now() - dbStart;

      detailedHealth.services.database = {
        status: "OK",
        responseTime: dbResponseTime,
      };
    } catch (dbError) {
      detailedHealth.services.database = {
        status: "ERROR",
        error: dbError.message,
      };
      detailedHealth.status = "DEGRADED";
    }

    // Check Redis with response time
    try {
      const redisStart = Date.now();
      await redisClient.ping();
      const redisResponseTime = Date.now() - redisStart;

      detailedHealth.services.redis = {
        status: "OK",
        responseTime: redisResponseTime,
      };
    } catch (redisError) {
      detailedHealth.services.redis = {
        status: "ERROR",
        error: redisError.message,
      };
      detailedHealth.status = "DEGRADED";
    }

    const statusCode = detailedHealth.status === "OK" ? 200 : 503;
    res.status(statusCode).json(detailedHealth);
  } catch (error) {
    logger.error("Detailed health check error:", error);
    res.status(503).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      error: "Detailed health check failed",
    });
  }
});

module.exports = router;
