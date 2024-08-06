const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get("/", async (req, res) => {
  // Populate the blog field in the result
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });

  res.json(users);
});

router.post("/signup", async (req, res) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  const user = new User({
    username: req.body.username,
    password: passwordHash,
    name: req.body.name,
  });
  await user.save();
  res.status(201).json(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).json({ message: "Invalid username!" });
  }

  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password!" });
  }

  const PAYLOAD = { userID: user._id };
  const token = jwt.sign(PAYLOAD, process.env.JWTSECRET, { expiresIn: "1h" });

  res.status(200).json({ token, username: user.username });
});

module.exports = router;
