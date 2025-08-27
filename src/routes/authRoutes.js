import express from "express";
import { 
  registerTeam, 
  loginTeam, 
  registerAdmin, 
  loginAdmin 
} from "../controllers/authController.js";

const router = express.Router();
// Team
router.post("/team/register", registerTeam);
router.post("/team/login", loginTeam);

// Admin
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
export default router;
