import Project from "../models/Project.js";
import User from "../models/User.js";

// Create a project (Admin only)
export const createProject = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create projects" });
    }

    const { name, description } = req.body;

    const project = new Project({
      name,
      description,
      createdBy: req.user._id,
    });

    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error creating project", error: err.message });
  }
};

// Assign project to multiple team members
export const assignProject = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can assign projects" });
    }

    const { projectId, assignments } = req.body;
    // assignments = [{ memberId: "xxx", task: "Do frontend", deadline: "2025-09-01" }]

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    assignments.forEach(a => {
      project.assignedTo.push({
        member: a.memberId,
        task: a.task,
        deadline: a.deadline,
      });
    });

    await project.save();
    res.json({ message: "Project assigned successfully", project });
  } catch (err) {
    res.status(500).json({ message: "Error assigning project", error: err.message });
  }
};

// 🔥 API to get all team members for selection (frontend dropdown/list)
export const getTeamMembers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can view team members" });
    }

    const teamMembers = await User.find({ role: "team" }).select("_id name email");
    res.json(teamMembers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching team members", error: err.message });
  }
};
