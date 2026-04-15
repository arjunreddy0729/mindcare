const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/mood", require("./routes/mood"));
app.use("/api/journal", require("./routes/journal"));
app.use("/api/stress", require("./routes/stress"));
app.use("/api/goals", require("./routes/goals"));
app.use("/api/report", require("./routes/report"));
app.use("/api/admin", require("./routes/admin"));
const PORT = 5001;
app.listen(PORT, () => console.log("Server running on port " + PORT));
