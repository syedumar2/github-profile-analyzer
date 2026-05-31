const express = require("express");
const { GithubProfileController } = require("../controllers");

const router = express.Router();

// GET request to /gpa/analyze/:username
router.get("/analyze/:username", GithubProfileController.addGithubProfile);
router.get("/analysis",GithubProfileController.fetchAllAnalyzedProfilesList);

// Clean export strategy
module.exports = { GithubRoutes: router };
