const db = require("../config/db");

const getPaginatedProfiles = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const [profiles] = await db.pool.query(
    `SELECT * FROM github_profiles 
     ORDER BY analyzed_at DESC 
     LIMIT ? OFFSET ?`,
    [Number(limit), Number(offset)],
  );

  const [countResult] = await db.pool.query(
    `SELECT COUNT(*) as total FROM github_profiles`,
  );
  const totalItems = countResult[0].total;
  const totalPages = Math.ceil(totalItems / limit);
  return {
    data: profiles,
    pagination: {
      currentPage: Number(page),
      itemsPerPage: Number(limit),
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

const addGithubAnalysis = async (githubData) => {
  const [existingRows] = await db.pool.query(
    `SELECT id FROM github_profiles WHERE username = ?`,
    [githubData.username],
  );

  if (existingRows.length > 0) {
    await db.pool.query(
      `UPDATE github_profiles 
       SET name = ?, 
           followers = ?, 
           following = ?, 
           public_repos = ?, 
           total_stars = ?, 
           total_forks = ?, 
           most_used_language = ?, 
           account_age_years = ?, 
           analyzed_at = NOW(), 
           score = ?
       WHERE username = ?`,
      [
        githubData.name,
        githubData.followers,
        githubData.following,
        githubData.publicRepos,
        githubData.total_stars,
        githubData.total_forks,
        githubData.most_used_language,
        githubData.account_age_years,
        githubData.score,
        githubData.username,
      ],
    );
  } else {
    await db.pool.query(
      `INSERT INTO github_profiles (username,name,followers,following,public_repos,total_stars,total_forks,most_used_language,account_age_years,analyzed_at,score)
          VALUES (?,?,?,?,?,?,?,?,?,NOW(),?)`,
      [
        githubData.username,
        githubData.name,
        githubData.followers,
        githubData.following,
        githubData.publicRepos,
        githubData.total_stars,
        githubData.total_forks,
        githubData.most_used_language,
        githubData.account_age_years,
        githubData.score,
      ],
    );
  }

  const [rows] = await db.pool.query(
    `SELECT * FROM github_profiles WHERE username = ?`,
    [githubData.username],
  );

  return rows[0];
};

module.exports = { addGithubAnalysis, getPaginatedProfiles };
