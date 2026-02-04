const mongoose = require("mongoose");
const Task = require("../../models/Task");
const Project = require("../../models/Project");

async function getTaskById(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            return res.status(404).json({ message: "Task not found." });
        }
        /**
         * Fetch a single product by ID that belongs to the logged-in user
         */

        const task = await Task.findById(req.params.taskId);

        /**
         *  Reponse if there is not Task
         */
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        /**
         * Find the parent project to verify ownership
         */
        const project = await Project.findById(task.project);

        if (!project) {
            return res
                .status(404)
                .json({ message: "Parent project not found." });
        }

        /**
         *  Ownership check
         */
        if (project.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to view this task.",
            });
        }

        /**
         * Response fetch specified task for project
         */
        res.json(task);
    } catch (error) {
        /**
         * Server error
         */
        res.status(500).json({
            message: "Could not fetch task.",
            error: error.message,
        });
    }
}

module.exports = getTaskById;
