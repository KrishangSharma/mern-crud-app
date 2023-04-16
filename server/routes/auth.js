const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import user model
const User = require("../models/User");

// APP ROUTES
//! @route /api/user/register
//! @desc Registers user
//! @access PUBLIC
router.post("/register", async (req, res) => {
  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: hashedPassword,
  });

  try {
    // Save the user to DB
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//! @route /api/user/login
//! @desc User login
//! @access PUBLIC
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Find User by Email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid password!" });
  }

  // Generate and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
