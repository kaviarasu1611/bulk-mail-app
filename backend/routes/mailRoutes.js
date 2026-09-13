const express = require("express");
const nodemailer = require("nodemailer");
const Mail = require("../models/Mail");

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/send", async (req, res) => {
  const { subject, body, recipients } = req.body;

  if (!subject?.trim() || !body?.trim() || !Array.isArray(recipients) || !recipients.length) {
    return res.status(400).json({ message: "Subject, body and at least one recipient are required." });
  }

  const cleanRecipients = [...new Set(recipients.map(e => String(e).trim().toLowerCase()).filter(Boolean))];
  const invalidEmails = cleanRecipients.filter(e => !emailRegex.test(e));

  if (invalidEmails.length) {
    return res.status(400).json({
      message: `Invalid email address: ${invalidEmails.join(", ")}`
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: cleanRecipients,
      subject: subject.trim(),
      text: body.trim()
    });

    const record = await Mail.create({
      subject: subject.trim(),
      body: body.trim(),
      recipients: cleanRecipients,
      status: "Sent"
    });

    res.status(200).json({ message: "Email sent successfully.", record });
  } catch (error) {
    console.error("Mail error:", error.message);

    await Mail.create({
      subject: subject.trim(),
      body: body.trim(),
      recipients: cleanRecipients,
      status: "Failed",
      error: error.message
    });

    res.status(500).json({ message: "Failed to send email. Check SMTP settings." });
  }
});

router.get("/history", async (req, res) => {
  try {
    const mails = await Mail.find().sort({ createdAt: -1 }).limit(50);
    res.json(mails);
  } catch (error) {
    console.error("History error:", error.message);
    res.status(500).json({ message: "Failed to fetch email history." });
  }
});

module.exports = router;