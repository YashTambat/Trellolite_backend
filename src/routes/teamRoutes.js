// // routes/teamRoutes.js
// import express from "express";
// import Project from "../models/Project.js";
// import protectRoute from '../middleware/auth.middleware.js';
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// // Get projects assigned to the logged-in team member
// router.get(
//   "/my-projects",
//   protectRoute,
//   authorizeRoles("team"),
//   async (req, res) => {
//     try {
//       const projects = await Project.find({ assignedTo: req.user._id })
//         .populate("assignedTo", "name email")
//         .populate("tasks.member", "name email");
//       res.json(projects);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// // Add task update (description, problem, deadline)
// router.post(
//   "/update-task/:projectId",
//   protectRoute,
//   authorizeRoles("team"),
//   async (req, res) => {
//     try {
//       const { description, problemFaced, estimatedDeadline } = req.body;
//       const project = await Project.findById(req.params.projectId);
//       if (!project) return res.status(404).json({ message: "Project not found" });

//       // push update
//       project.tasks.push({
//         member: req.user._id,
//         description,
//         problemFaced,
//         estimatedDeadline
//       });

//       await project.save();
//       res.json({ message: "Task update added", project });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// // Change status
// router.put(
//   "/change-status/:projectId/:taskId",
//   protectRoute,
//   authorizeRoles("team"),
//   async (req, res) => {
//     try {
//       const project = await Project.findById(req.params.projectId);
//       if (!project) return res.status(404).json({ message: "Project not found" });

//       const task = project.tasks.id(req.params.taskId);
//       if (!task) return res.status(404).json({ message: "Task not found" });

//       if (String(task.member) !== String(req.user._id))
//         return res.status(403).json({ message: "Not your task" });

//       task.status = task.status === "incomplete" ? "complete" : "incomplete";
//       await project.save();
//       res.json({ message: "Status updated", project });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// export default router;










import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  getMyProjects,
  addTaskUpdate,
  changeTaskStatus,
  editTask,
} from "../controllers/teamcontroller.js";

const router = express.Router();

// Get logged-in user's projects
router.get("/my-projects", protectRoute, authorizeRoles("team"), getMyProjects);

// Add a task update
router.post("/update-task/:projectId", protectRoute, authorizeRoles("team"), addTaskUpdate);

// Change task status
router.put("/change-status/:projectId/:taskId", protectRoute, authorizeRoles("team"), changeTaskStatus);

// Edit task details
router.put("/edit-task/:projectId/:taskId", protectRoute, authorizeRoles("team"), editTask);

export default router;

