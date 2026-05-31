CREATE DATABASE IF NOT EXISTS github_profile_analyzer;
USE github_profile_analyzer;

CREATE TABLE IF NOT EXISTS github_profiles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
  
    followers INT,
      following INT,
    public_repos INT,
    total_stars INT,
    total_forks INT,
    most_used_language VARCHAR(50) DEFAULT NULL,
    account_age_years DECIMAL(5,2) DEFAULT NULL,
    analyzed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    score DECIMAL(10,4) DEFAULT NULL

);