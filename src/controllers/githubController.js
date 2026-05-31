const { GithubService } = require("../services");
const addGithubProfile = async (req, res, next) => {
  try {
    const username = req.params.username;

    const data = await GithubService.analyzeProfile(username);

    res.json({
      success: true,
      message: "Profile Analyzed Successfully!",
      data: [data],
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};

const fetchAllAnalyzedProfilesList = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const data = await GithubService.listProfiles(page, limit);
    res.json({
      success: true,
      message: "Retrieved Analysis!",
      data: [data],
    });
  } catch (error) {
    console.log("error", error);
    res.json({
      success: false,
      message: error?.message,
    });
  }
};
module.exports = { addGithubProfile, fetchAllAnalyzedProfilesList };
