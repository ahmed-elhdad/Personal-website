const mongoose = require("mongoose");
const config = require("./index");

let isConnected = false; // cache flag

async function connectDB() {
  if (isConnected) return; // reuse existing connection

  await mongoose.connect(config.mongoUri);
  isConnected = true;
  console.log("🍃 MongoDB connected");

  // Seed default skills if empty
  const SkillCategory = require("../models/SkillCategory");
  const count = await SkillCategory.countDocuments();
  if (count === 0) {
    const DEFAULT_SKILLS = [
      /* your seed data */
    ];
    await SkillCategory.insertMany(DEFAULT_SKILLS);
  }
}

function initDirs() {
  /* only matters locally */
}

module.exports = { connectDB, initDirs };
