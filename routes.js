// db models
const Paste = require("./models/Paste");
// const Url = require("../models/Url");

// express setup
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/:id", async (req, res) => {
  // const pastes = await Paste.find()
  res.send("hi")
})

module.exports = router;
