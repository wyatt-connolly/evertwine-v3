const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { cache } = require("../config/database");
const logger = require("../utils/logger");

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access token required" });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Check cache first
    let user = await cache.get(`user:${decoded.userId}`);

    if (!user) {
      // If not in cache, fetch from database
      user = await User.findByPk(decoded.userId);
      if (user) {
        // Cache user data
        await cache.set(`user:${user.id}`, user.toJSON(), 3600);
      }
    }

    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.error("Token verification error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Role-based authorization middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
};

// Admin only middleware
const requireAdmin = requireRole(["admin"]);

// Admin or moderator middleware
const requireAdminOrModerator = requireRole(["admin", "moderator"]);

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    let user = await cache.get(`user:${decoded.userId}`);

    if (!user) {
      user = await User.findByPk(decoded.userId);
      if (user) {
        await cache.set(`user:${user.id}`, user.toJSON(), 3600);
      }
    }

    if (user && user.isActive) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Don't fail for optional auth, just continue without user
    next();
  }
};

// Rate limiting for specific endpoints
const createRateLimiter = (windowMs, max, message) => {
  const rateLimit = require("express-rate-limit");

  return rateLimit({
    windowMs,
    max,
    message: { error: message },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      // Use IP address or user ID if available
      return req.user ? req.user.id : req.ip;
    },
  });
};

// Specific rate limiters
const authRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  "Too many authentication attempts, please try again later"
);

const apiRateLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests
  "Too many requests, please try again later"
);

module.exports = {
  verifyToken,
  requireRole,
  requireAdmin,
  requireAdminOrModerator,
  optionalAuth,
  authRateLimiter,
  apiRateLimiter,
};
