const express = require("express");
const { body, validationResult } = require("express-validator");
const logger = require("../utils/logger");
const emailService = require("../services/emailService");

const router = express.Router();

// Send contact message
router.post(
  "/",
  [
    body("name").trim().isLength({ min: 1, max: 100 }),
    body("email").isEmail().normalizeEmail(),
    body("subject").trim().isLength({ min: 1, max: 200 }),
    body("message").trim().isLength({ min: 10, max: 2000 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, subject, message } = req.body;

      // Send email to admin
      try {
        await emailService.sendContactEmail({
          from: email,
          name,
          subject,
          message,
        });

        res.json({ message: "Message sent successfully" });
      } catch (emailError) {
        logger.error("Failed to send contact email:", emailError);
        res
          .status(500)
          .json({ error: "Failed to send message. Please try again later." });
      }
    } catch (error) {
      logger.error("Contact form error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
