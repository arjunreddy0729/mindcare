const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Mood = require("../models/Mood");
router.post("/", auth, async (req, res) => { try { const mood = new Mood({ userId: req.user.id, ...req.body }); await mood.save(); res.json(mood); } catch (err) { res.status(500).json({ msg: "Server error" }); } });
router.get("/", auth, async (req, res) => { try { const moods = await Mood.find({ userId: req.user.id }).sort({ date: -1 }); res.json(moods); } catch (err) { res.status(500).json({ msg: "Server error" }); } });
module.exports = router;
