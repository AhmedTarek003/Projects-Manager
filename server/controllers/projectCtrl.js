const Project = require("../models/Project");
const mongoose = require("mongoose");
const Team = require("../models/Team");

exports.createProjectCtrl = async (req, res) => {
  const { projectName, team, startDate, dueDate } = req.body;
  try {
    const { role, _id } = req.user;
    if (role === "user")
      return res.status(403).json({ success: false, msg: "access denied" });
    if (!mongoose.Types.ObjectId.isValid(team))
      return res.status(400).json({ success: false, msg: "invalid team id" });
    const checkTeam = await Team.findById(team);
    if (!checkTeam)
      return res.status(404).json({ success: false, msg: "team not found" });
    if (role === "teamLeader") {
      if (_id !== checkTeam.teamLeader.toString())
        return res.status(403).json({ success: false, msg: "access denied" });
    }
    if (dueDate <= new Date().toISOString())
      return res.status(400).json({
        success: false,
        msg: "you can't make the due date before the new date",
      });

    const project = Project({
      projectName,
      team,
      startDate,
      dueDate,
    });
    await project.save();
    checkTeam.projects.push(project._id);
    await checkTeam.save();
    res
      .status(201)
      .json({ success: true, msg: "project created successfully", project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error creating project" });
  }
};

exports.getAllProjectsCtrl = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    const projects = await Project.find();
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error get all projects" });
  }
};

exports.getProjectCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project)
      return res.status(404).json({ success: false, msg: "project not found" });
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error get project" });
  }
};

exports.updateProjectCtrl = async (req, res) => {
  const { projectName, startDate, dueDate, status } = req.body;
  try {
    const { id } = req.params;
    const { role, _id } = req.user;
    const project = await Project.findById(id);
    if (!project)
      return res.status(404).json({ success: false, msg: "project not found" });
    const team = await Team.findById(project.team);
    if (team.teamLeader.toString() !== _id || role !== "teamLeader")
      return res.status(403).json({ success: false, msg: "access denied" });
    if (dueDate) {
      if (dueDate <= new Date().toISOString())
        return res.status(400).json({
          success: false,
          msg: "you can't make the due date before the new date",
        });
    }
    if (status) {
      const statusRes = ["onHold", "inProgress", "completed", "canceled"];
      if (!statusRes.includes(status))
        return res
          .status(400)
          .json({ success: false, msg: "invalid status, choose a statu" });
    }

    const updateProject = await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          projectName,
          startDate,
          dueDate,
          status,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: "project updated successfully",
      updateProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error update project" });
  }
};

exports.deleteProjectCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, _id } = req.user;
    const project = await Project.findById(id);
    if (!project)
      return res.status(404).json({ success: false, msg: "project not found" });
    const team = await Team.findById(project.team);
    if (team.teamLeader.toString() !== _id || role !== "teamLeader")
      return res.status(403).json({ success: false, msg: "access denied" });
    const deletedProject = await Project.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      msg: "project deleted successfully",
      deletedProject,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error delete project" });
  }
};
