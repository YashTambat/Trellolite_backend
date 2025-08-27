import Project from "../models/Project.js";

// @desc Get projects assigned to logged-in team member
// @desc Get projects assigned to logged-in team member
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ "assignedTo.member": req.user._id })
      .populate("assignedTo.member", "username email");

    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a new task update/doubt
export const addTaskUpdate = async (req, res) => {
  try {
    const { description, problemFaced, estimatedDeadline } = req.body;
    const project = await Project.findById(req.params.projectId);

    if (!project) return res.status(404).json({ message: "Project not found" });

    project.tasks.push({
      member: req.user._id,
      description,
      problemFaced,
      estimatedDeadline,
      status: "incomplete",
    });

    await project.save();
    res.json({ message: "Task update added", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Change status (incomplete <-> complete)
export const changeTaskStatus = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const task = project.assignedTo.id(req.params.taskId); // 👈 assignedTo not tasks
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (String(task.member) !== String(req.user._id))
      return res.status(403).json({ message: "Not your task" });

    task.status = task.status === "incomplete" ? "complete" : "incomplete";
    await project.save();

    res.json({ message: "Status updated", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Edit a task (update description/doubt/deadline)
export const editTask = async (req, res) => {
  try {
    const { task, deadline, issues } = req.body;
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const taskObj = project.assignedTo.id(req.params.taskId);
    if (!taskObj) return res.status(404).json({ message: "Task not found" });

    if (String(taskObj.member) !== String(req.user._id))
      return res.status(403).json({ message: "Not your task" });

    if (task) taskObj.task = task;
    if (deadline) taskObj.deadline = deadline;
    if (issues) taskObj.issues.push(issues);

    await project.save();
    res.json({ message: "Task updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

