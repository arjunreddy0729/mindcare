const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Mood = require("../models/Mood");
const Stress = require("../models/Stress");
const Journal = require("../models/Journal");
const Goal = require("../models/Goal");

router.get("/", auth, async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const moods = await Mood.find({ userId: req.user.id, date: { $gte: oneWeekAgo } });
    const stresses = await Stress.find({ userId: req.user.id, date: { $gte: oneWeekAgo } });
    const journals = await Journal.find({ userId: req.user.id, createdAt: { $gte: oneWeekAgo } });
    const goals = await Goal.find({ userId: req.user.id, date: { $gte: oneWeekAgo } });

    const avgMood = moods.length ? (moods.reduce((a, m) => a + m.rating, 0) / moods.length).toFixed(1) : 0;
    const avgStress = stresses.length ? (stresses.reduce((a, s) => a + s.level, 0) / stresses.length).toFixed(1) : 0;
    const goalsCompleted = goals.filter(g => g.completed).length;

    res.json({
      totalMoods: moods.length,
      avgMood,
      totalStress: stresses.length,
      avgStress,
      totalJournals: journals.length,
      totalGoals: goals.length,
      goalsCompleted,
      moods,
      stresses
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
