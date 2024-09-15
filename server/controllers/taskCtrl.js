const { default: mongoose } = require("mongoose");
const Task = require("../models/Task");
const Project = require("../models/Project");

exports.createTaskCtrl = async (req, res) => {
  const { title, desc, project } = req.body;
  try {
    const { role } = req.user;
    if (role !== "teamLeader")
      return res.status(403).json({ success: false, msg: "access denied" });
    if (!mongoose.Types.ObjectId.isValid(project)) {
      return res
        .status(400)
        .json({ success: false, msg: "invalid project id" });
    }
    const checkProject = await Project.findById(project);
    if (!checkProject)
      return res.status(404).json({ success: false, msg: "project not found" });
    const task = Task({
      title,
      desc,
      project,
    });
    await task.save();
    checkProject.tasks.push(task._id);
    await checkProject.save();
    return res
      .status(201)
      .json({ success: true, msg: "task created successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed to create task" });
  }
};

exports.GetAllTasksByProjectCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id).populate("tasks");
    if (!project)
      return res.status(404).json({ success: false, msg: "project not found" });
    res.status(200).json({ success: true, tasks: project.tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed get all tasks" });
  }
};

exports.getTaskCtrl = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ success: false, msg: "task not found" });
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed to get task" });
  }
};

exports.updateTaskCtrl = async (req, res) => {
  const { title, desc, completed } = req.body;
  const { role } = req.user;
  const { id } = req.params;
  try {
    if (role === "admin")
      return res.status(403).json({ success: true, msg: "access denied" });
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ success: false, msg: "task not found" });
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          desc,
          completed,
        },
      },
      { new: true }
    );
    // update project completed percentage
    const project = await Project.findOne({ tasks: id }).populate("tasks");
    const tasks = project.tasks;
    const completedTasks = tasks.filter((task) => task.completed);
    const newPercent = (completedTasks.length / tasks.length) * 100;
    await Project.findByIdAndUpdate(
      project._id,
      {
        $set: { completePercent: newPercent },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, msg: "task updated successfully", updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed to update task" });
  }
};

exports.deleteTaskCtrl = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  try {
    if (role === "admin")
      return res.status(403).json({ success: true, msg: "access denied" });
    const task = await Task.findById(id);
    if (!task)
      return res.status(404).json({ success: false, msg: "task not found" });
    const deletedTask = await Task.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, msg: "task deleted successfully", deletedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed to delete task" });
  }
};
