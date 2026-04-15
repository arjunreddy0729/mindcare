const mongoose = require("mongoose");

const stressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  level: { type: Number, min: 1, max: 10, required: true },
  source: { type: String },
  note: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stress", stressSchema);
