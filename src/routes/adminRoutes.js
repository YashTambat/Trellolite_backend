// import express from "express";
// import { createProject, getProjectWithTeam } from "../controllers/adminController.js";

// const router = express.Router();

// // Admin creates project and assigns members
// router.post("/projects", createProject);

// // Get project with team members by projectId
// router.get("/projects/:projectId", getProjectWithTeam);

// export default router;




import express from "express";
import protectRoute from '../middleware/auth.middleware.js';
import { createProject, getProjects,getProjectById,getAllTeams,updateProject ,deleteProject} from "../controllers/adminController.js";

const router = express.Router();
// Protect admin routes
router.post("/projects", protectRoute, createProject);
// Get all projects
router.get("/projects", protectRoute,getProjects);
// Get single project by ID
router.get("/projects/:id",protectRoute, getProjectById)
// Get all team
router.get("/teams", protectRoute, getAllTeams);  // ✅ Get all registered team members
// update project
router.put("/projects/:id", protectRoute, updateProject);
// Delete project
router.delete("/projects/:id", protectRoute, deleteProject);

export default router;



