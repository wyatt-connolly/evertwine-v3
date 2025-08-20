const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const User = require("../models/User");
const { cache } = require("../config/database");
const logger = require("../utils/logger");
const emailService = require("../services/emailService");

const router = express.Router();

// Validation middleware
const validateRegistration = [
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("firstName").trim().isLength({ min: 1, max: 50 }),
  body("lastName").trim().isLength({ min: 1, max: 50 }),
];

const validateLogin = [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
];

const validatePasswordReset = [body("email").isEmail().normalizeEmail()];

const validatePasswordUpdate = [
  body("password").isLength({ min: 6 }),
  body("token").notEmpty(),
];

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "24h",
  });
};

// Register new user
router.post("/register", validateRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      emailVerificationToken,
      emailVerificationExpires,
    });

    // Send verification email
    try {
      await emailService.sendVerificationEmail(
        user.email,
        emailVerificationToken
      );
    } catch (emailError) {
      logger.error("Failed to send verification email:", emailError);
    }

    // Generate token
    const token = generateToken(user.id);

    // Cache user data
    await cache.set(`user:${user.id}`, user.toJSON(), 3600);

    res.status(201).json({
      message:
        "User registered successfully. Please check your email for verification.",
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login user
router.post("/login", validateLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findByEmail(email);
    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user.id);

    // Cache user data
    await cache.set(`user:${user.id}`, user.toJSON(), 3600);

    res.json({
      message: "Login successful",
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Verify email
router.get("/verify-email/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: { [require("sequelize").Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification token" });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;
    await user.save();

    // Update cache
    await cache.set(`user:${user.id}`, user.toJSON(), 3600);

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    logger.error("Email verification error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Request password reset
router.post("/forgot-password", validatePasswordReset, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists or not
      return res.json({
        message: "If an account exists, a password reset email has been sent",
      });
    }

    // Generate reset token
    const passwordResetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    user.passwordResetToken = passwordResetToken;
    user.passwordResetExpires = passwordResetExpires;
    await user.save();

    // Send reset email
    try {
      await emailService.sendPasswordResetEmail(user.email, passwordResetToken);
    } catch (emailError) {
      logger.error("Failed to send password reset email:", emailError);
    }

    res.json({
      message: "If an account exists, a password reset email has been sent",
    });
  } catch (error) {
    logger.error("Password reset request error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reset password
router.post("/reset-password", validatePasswordUpdate, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { token, password } = req.body;

    const user = await User.findOne({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { [require("sequelize").Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();

    // Clear cache
    await cache.del(`user:${user.id}`);

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    logger.error("Password reset error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Refresh token
router.post("/refresh", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ error: "Token required" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    const user = await User.findByPk(decoded.userId);

    if (!user || !user.isActive) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const newToken = generateToken(user.id);

    res.json({
      token: newToken,
      user: user.toJSON(),
    });
  } catch (error) {
    logger.error("Token refresh error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  try {
    const { userId } = req.body;

    if (userId) {
      // Clear user cache
      await cache.del(`user:${userId}`);
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    logger.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
