const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

/**
 * GET /api/tasks
 * Filter, pagination, sorting
 */
router.get("/", async (req, res, next) => {
  try {
    const { completed, page = 1, limit = 10 } = req.query;

    const query = {};
    if (completed !== undefined) {
      query.completed = completed === "true";
    }

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/tasks/:id
 */
router.get("/:id", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/tasks
 */
router.post("/", async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/tasks/:id
 */
router.put("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/tasks/:id
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
