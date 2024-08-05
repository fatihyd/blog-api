const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/", async (req, res) => {
  // Populate the blog field in the result
  const users = await User.find({}).populate("blog", {
    title: 1,
    url: 1,
    likes: 1,
  });

  res.json(users);
});

router.post("/", async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  const user = new User({
    username: req.body.username,
    password: passwordHash,
    name: req.body.name,
  });
  await user.save();
  res.status(201).json(savedUser);
});

module.exports = router;
