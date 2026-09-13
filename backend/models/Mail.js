const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    recipients: { type: [String], required: true },
    status: { type: String, enum: ["Sent", "Failed"], required: true },
    error: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mail", mailSchema);