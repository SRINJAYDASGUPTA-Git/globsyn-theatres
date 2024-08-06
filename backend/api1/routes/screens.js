const express = require("express");
const router = express.Router();
const Screen = require("../models/screen");

router.get("/", async (req, res) => {
  try {
    const screens = await Screen.find();
    res.status(200).json(screens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const screen = await Screen.findById(id);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.status(200).json(screen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, capacity } = req.body;
  try {
    const newScreen = new Screen({
      name,
      capacity,
    });
    const result = await newScreen.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, capacity } = req.body;
  try {
    const screen = await Screen.findById(id);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    screen.name = name || screen.name;
    screen.capacity = capacity || screen.capacity;
    const result = await screen.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const screen = await Screen.findByIdAndDelete(id);
    if (!screen) {
      return res.status(404).json({ message: "Screen not found" });
    }
    res.status(200).json({ message: "Screen deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
