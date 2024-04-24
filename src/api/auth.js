const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const isAuthenticated = require("../is-authenticated");
const salt = 10;
const SECRET_TOKEN = process.env.SECRET_TOKEN;

//* Sign Up

router.post("/signup", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check empty fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check Email already exists
    const userEmailAlreadyExists = await User.findOne({ email: email });

    if (userEmailAlreadyExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create the user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ newUser, message: "User created" });
  } catch (error) {
    next(error);
  }
});

//* Log In

router.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email }).select("password email");

    console.log("============", existingUser);

    if (!existingUser) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Check if password is correct
    const matchingPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!matchingPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Create the token
    const token = jwt.sign({ _id: existingUser._id }, SECRET_TOKEN, {
      algorithm: "HS256",
      expiresIn: "365d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});

//* Verify Token

router.get("/verify", isAuthenticated, (req, res, next) => {
  return res.status(200).json(req.user);
});

//* Update user

router.patch("/settings", isAuthenticated, async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const updateUser = {
      firstName,
      lastName,
      email,
    };

    const existingUser = await User.findOne({ email });
    if (
      existingUser &&
      existingUser._id.toString() !== req.user._id.toString()
    ) {
      // If the email already exists for another user, return an error
      return res.status(400).json({ message: "Email already in use" });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateUser, {
      new: true,
    });

    res.status(200).json({ message: "User updated", results: { updatedUser } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
