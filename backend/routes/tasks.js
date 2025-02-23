const express = require("express");
const router = express.Router();
const pool = require("../db");
const {authenticateToken} = require("./auth"); 

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.userId; 

    const newTask = await pool.query(
      "INSERT INTO tasks (title, description, is_complete, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, false, userId]
    );

    res.json(newTask.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all tasks
router.get("/", authenticateToken, async (req, res) => {
  try {
    
    const userId = req.user.userId;
    const allTasks = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC",
      [userId]
    );
    res.json(allTasks.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a specific task
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const task = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [id, userId]);

    if (task.rows.length === 0) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json(task.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update task
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, is_complete } = req.body;
    const userId = req.user.userId;
    
    const updatedTask = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
      [title, description, is_complete, id, userId]
    );

    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json(updatedTask.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete task
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    console.log(req.user)
    const deletedTask = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
