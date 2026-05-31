# GitHub Profile Analyzer

A JavaScript-based tool for analyzing and visualizing GitHub user profiles, including statistics, repositories, and activity metrics.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## ✨ Features

- Analyze GitHub user profiles
- Retrieve repository statistics
- View user activity metrics
- Generate profile insights
- Display language composition across repositories

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0 or higher)
- **npm** (v6.0 or higher) - included with Node.js
- A **GitHub account**

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/syedumar2/github-profile-analyzer.git
cd github-profile-analyzer
```

### Step 2: Install Dependencies

```bash
npm install
```

## 💻 Usage

### Run the Analyzer

```bash
npm start
```

### Development Mode

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

### Example Usage

```javascript
const analyzer = require('./index');

// Analyze a GitHub user profile
analyzer.analyzeUser('github-username')
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Error analyzing profile:', error);
  });
```

## 📁 Project Structure

```
github-profile-analyzer/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── init.sql
│   ├── controllers/
│   │   ├── githubController.js
│   │   └── index.js
│   ├── dao/
│   │   ├── githubProfileDao.js
│   │   └── index.js
│   ├── middleware/
│   │   └── logger.js
│   ├── routes/
│   │   └── githubRoutes.js
│   ├── services/
│   │   ├── githubServices.js
│   │   └── index.js
│   └── server.js
├── .env
├── package-lock.json
└── package.json
```

### Directory Overview

* **`config/`**: Contains database connections (`db.js`) and database initialization scripts (`init.sql`).
* **`controllers/`**: Handles incoming HTTP requests, extracts parameters, and calls the appropriate services.
* **`dao/`** (Data Access Object): Houses direct database queries and interactions, separating data persistence logic from the business logic.
* **`middleware/`**: Functions that execute during the request-response lifecycle, such as the request logger (`logger.js`).
* **`routes/`**: Defines the API endpoints (`githubRoutes.js`) and maps them to their respective controllers.
* **`services/`**: Contains the core business logic, such as orchestrating data flow or communicating with external APIs (like GitHub).
* **`server.js`**: The main entry point of the application where the server is initialized and started.
* **Root Files**: Root-level configuration files including environment variables (`.env`) and Node.js dependency manifests (`package.json`, `package-lock.json`).
```

## 🔧 Troubleshooting

### Issue: Module Not Found

**Solution:** Ensure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Cannot Read Profile Data

**Solution:**
- Ensure the GitHub username is spelled correctly
- Check that the user profile is public
- Verify your internet connection

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Last Updated:** May 2026
