import express from "express";
import protectRoute from "../middleware/authMiddleware.js";
import { createProject, assignProject, getTeamMembers } from "../controllers/projectController.js";

const router = express.Router();

router.post("/create", protectRoute, createProject);          // Admin creates project
router.post("/assign", protectRoute, assignProject);          // Admin assigns project
router.get("/team-members", protectRoute, getTeamMembers);    // Admin fetches team members list

export default router;
