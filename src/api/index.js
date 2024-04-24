const express = require("express");
const router = express.Router();

const auth = require("./auth");
const sessions = require("./sessions");
const exerciseUser = require("./exercise-user.js");
const exerciseType = require("./exercise-type");
const emojis = require("./emojis");

const isAuthenticated = require("../is-authenticated");

router.get("/", (req, res, next) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);

router.use("/auth", auth);

router.use("/sessions", isAuthenticated, sessions);

router.use("/exercise-user", isAuthenticated, exerciseUser);

router.use("/exercise-type", isAuthenticated, exerciseType);

module.exports = router;
