const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Mood = require("../models/Mood");
const Stress = require("../models/Stress");
const User = require("../models/User");

router.get("/insights", auth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const allMoods = await Mood.find();
    const allStress = await Stress.find();

    const avgMood = allMoods.length ? (allMoods.reduce((a, m) => a + m.rating, 0) / allMoods.length).toFixed(1) : 0;
    const avgStress = allStress.length ? (allStress.reduce((a, s) => a + s.level, 0) / allStress.length).toFixed(1) : 0;

    const moodCounts = {};
    allMoods.forEach(m => { moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1; });

    const stressSources = {};
    allStress.forEach(s => { if (s.source) stressSources[s.source] = (stressSources[s.source] || 0) + 1; });

    res.json({
      totalUsers,
      totalMoodEntries: allMoods.length,
      totalStressEntries: allStress.length,
      avgMood,
      avgStress,
      moodCounts,
      stressSources
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
