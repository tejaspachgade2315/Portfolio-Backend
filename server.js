// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Model
const TextSchema = new mongoose.Schema({
  text: String,
});
const Text = mongoose.model("Text", TextSchema);

// Routes
app.post("/submit", async (req, res) => {
  const newText = new Text({ text: req.body.text });
  try {
    const savedText = await newText.save();
    res.status(200).json(savedText);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const texts = await Text.find();
    res.status(200).json(texts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
