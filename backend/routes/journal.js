const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Journal = require("../models/Journal");
router.post("/", auth, async (req, res) => { try { const entry = new Journal({ userId: req.user.id, ...req.body }); await entry.save(); res.json(entry); } catch (err) { res.status(500).json({ msg: "Server error" }); } });
router.get("/", auth, async (req, res) => { try { const entries = await Journal.find({ userId: req.user.id }).sort({ createdAt: -1 }); res.json(entries); } catch (err) { res.status(500).json({ msg: "Server error" }); } });
router.put("/:id", auth, async (req, res) => { try { const entry = await Journal.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { ...req.body, updatedAt: Date.now() }, { new: true }); res.json(entry); } catch (err) { res.status(500).json({ msg: "Server error" }); } });
router.delete("/:id", auth, async (req, res) => { try { await Journal.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); res.json({ msg: "Deleted" }); } catch (err) { res.status(500).json({ msg: "Server error" }); } });
module.exports = router;
