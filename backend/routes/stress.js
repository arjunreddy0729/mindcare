const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Stress = require("../models/Stress");

router.post("/", auth, async (req, res) => {
  try {
    const entry = new Stress({ userId: req.user.id, ...req.body });
    await entry.save();
    res.json(entry);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const entries = await Stress.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
