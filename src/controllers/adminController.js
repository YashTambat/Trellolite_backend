import Project from "../models/Project.js";
import User from "../models/User.js";

// Create project and assign members
export const createProject = async (req, res) => {
  try {
    const { name, description, assignedTo } = req.body;

    // Create project
    const project = new Project({
      name,
      description,
      assignedTo, // must match schema
      createdBy: req.user._id, // admin creating project
    });

    await project.save();

    res.status(201).json({ message: "Project created and team assigned", project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project", error: error.message });
  }
};

// ✅ Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("assignedTo.member", "name email"); // shows member details instead of just ID

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

// ✅ Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id)
      .populate("assignedTo.member", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching project",
      error: error.message,
    });
  }
};

// ✅ Get all team members
export const getAllTeams = async (req, res) => {
  try {
    const teams = await User.find({ role: "team" }).select("-password"); // hide password

    res.status(200).json({
      success: true,
      count: teams.length,
      teams,
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching team members",
      error: error.message,
    });
  }
};

// ✅ Update Project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, assignedTo } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, assignedTo },
      { new: true, runValidators: true }
    ).populate("assignedTo.member", "name email");

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
};
// ✅ Delete Project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    });
  }
};
