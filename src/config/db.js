const mysql = require("mysql2/promise"); 
const fs = require("fs");
const path = require("path");
require("dotenv").config(); 

const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  multipleStatements: true, 
});

const initDatabase = async () => {
  try {
    const sqlFilePath = path.join(__dirname, "init.sql");
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8");

    await pool.query(sqlContent);
    console.log("Db initialized");
  } catch (error) {
    console.error("Error executing init.sql:", error.message);
    process.exit(1);
  }
};

initDatabase();

module.exports = { pool };
