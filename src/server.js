require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { GithubRoutes } = require("./routes/githubRoutes");
const logger = require("./middleware/logger");

require("./config/db");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(logger);
app.use("/gpa", GithubRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running smoothly on port ${PORT}`));
