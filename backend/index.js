const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const taskRoutes = require("./routes/tasks");
const { router: authRoutes, authenticateToken } = require("./routes/auth");
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("server started on 5000");
});
