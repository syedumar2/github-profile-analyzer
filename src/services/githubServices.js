const axios = require("axios");
const { GithubProfileDao } = require("../dao");

const listProfiles = async (page, limit) => {
  try {
    const result = await GithubProfileDao.getPaginatedProfiles(page, limit);

    return result;
  } catch (error) {
    console.error("Error retrieving profiles:", error.message);
    throw new Error("Failed to fetch analyzed profiles");
  }
};

const analyzeProfile = async (username) => {
  try {
    const [{ data: initData }, { data: publicRepoData }] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos`),
    ]);

    const languageCount = {};
    for (const repo of publicRepoData) {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] ?? 0) + 1;
      }
    }

    const total_stars = publicRepoData.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    );

    const githubAnalysis = {
      name: initData.name ?? "NA",
      username: initData.login,
      followers: initData.followers,
      following: initData.following,
      publicRepos: initData.public_repos,
      total_stars,
      total_forks: publicRepoData.filter((repo) => repo.fork).length,
      most_used_language: Object.entries(languageCount).sort(
        (a, b) => b[1] - a[1],
      )[0]?.[0],
      account_age_years:
        (Date.now() - new Date(initData.created_at).getTime()) /
        (1000 * 60 * 60 * 24 * 365.25),
      score: initData.followers * 2 + initData.public_repos + total_stars * 3,
    };

    const result = await GithubProfileDao.addGithubAnalysis(githubAnalysis);
    result.analyzed_at = result.analyzed_at.toLocaleString();
    return result;
  } catch (error) {
    console.error("Error analyzing profile:", error.message);
    throw new Error("Failed to analyze GitHub profile");
  }
};

module.exports = {
  analyzeProfile,
  listProfiles,
};
