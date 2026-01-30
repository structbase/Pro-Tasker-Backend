const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../utils/auth");

/**
 * Import task controllers
 */
const createTask = require("../controllers/task/createTask");
const getTask = require("../controllers/task/getTask");
const getTaskById = require("../controllers/task/getTaskById"); 
const updateTask = require("../controllers/task/updateTask");
const deleteTask = require("../controllers/task/deleteTask");

/**
 * Authenticated Routes
 */
router.use(authMiddleware);

/**
 * Route for CRUD Project
 */
router.post("/:projectId/tasks", createTask);
router.get("/:projectId/tasks", getTask);
router.get("/tasks/:taskId", getTaskById);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

module.exports = router;
