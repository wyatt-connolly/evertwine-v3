const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { verifyToken, requireRole } = require("../middleware/auth");
const logger = require("../utils/logger");

const router = express.Router();

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.toJSON());
  } catch (error) {
    logger.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile
router.put(
  "/profile",
  verifyToken,
  [
    body("firstName").optional().trim().isLength({ min: 1, max: 50 }),
    body("lastName").optional().trim().isLength({ min: 1, max: 50 }),
    body("profileImage").optional().isURL(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { firstName, lastName, profileImage, preferences } = req.body;

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (profileImage) user.profileImage = profileImage;
      if (preferences)
        user.preferences = { ...user.preferences, ...preferences };

      await user.save();
      res.json(user.toJSON());
    } catch (error) {
      logger.error("Update profile error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Change password
router.put(
  "/password",
  verifyToken,
  [
    body("currentPassword").notEmpty(),
    body("newPassword").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordValid = await user.comparePassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      user.password = newPassword;
      await user.save();

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      logger.error("Change password error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete account
router.delete(
  "/account",
  verifyToken,
  [body("password").notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { password } = req.body;
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Password is incorrect" });
      }

      user.isActive = false;
      await user.save();

      res.json({ message: "Account deleted successfully" });
    } catch (error) {
      logger.error("Delete account error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get all users (admin only)
router.get("/", verifyToken, requireRole(["admin"]), async (req, res) => {
  try {
    const { page = 1, limit = 10, role, isActive } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive === "true";

    const users = await User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      users: users.rows.map((user) => user.toJSON()),
      total: users.count,
      page: parseInt(page),
      totalPages: Math.ceil(users.count / limit),
    });
  } catch (error) {
    logger.error("Get users error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user by ID (admin only)
router.get("/:id", verifyToken, requireRole(["admin"]), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.toJSON());
  } catch (error) {
    logger.error("Get user by ID error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user (admin only)
router.put(
  "/:id",
  verifyToken,
  requireRole(["admin"]),
  [
    body("firstName").optional().trim().isLength({ min: 1, max: 50 }),
    body("lastName").optional().trim().isLength({ min: 1, max: 50 }),
    body("role").optional().isIn(["user", "admin", "moderator"]),
    body("isActive").optional().isBoolean(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { firstName, lastName, role, isActive } = req.body;

      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (role) user.role = role;
      if (isActive !== undefined) user.isActive = isActive;

      await user.save();
      res.json(user.toJSON());
    } catch (error) {
      logger.error("Update user error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
