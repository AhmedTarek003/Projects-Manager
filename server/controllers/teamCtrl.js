const Team = require("../models/Team");
const User = require("../models/User");
const mongoose = require("mongoose");
const {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} = require("../utils/cloudinary");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const Chat = require("../models/Chat");
const Message = require("../models/Message");

exports.createTeamCtrl = async (req, res) => {
  const { teamName, teamLeader } = req.body;
  try {
    const { role } = req.user;
    if (role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    const checkTeam = await Team.findOne({ teamName });
    if (checkTeam)
      return res.status(400).json({
        success: false,
        msg: "team already exists, try with another team name",
      });
    if (!mongoose.Types.ObjectId.isValid(teamLeader))
      return res.status(400).json({ success: false, msg: "invalid user id" });
    const checkLeaderExists = await User.findById(teamLeader, {
      password: 0,
    });
    if (!checkLeaderExists)
      return res.status(404).json({
        success: false,
        msg: "userId is not exists",
      });
    if (checkLeaderExists.role === "admin" || checkLeaderExists.role === "user")
      return res
        .status(403)
        .json({ success: false, msg: "user not a team leader" });
    const checkLeader = await Team.findOne({ teamLeader });
    if (checkLeader)
      return res.status(400).json({
        success: false,
        msg: "this user is already a leader of another team",
      });

    const team = Team({
      teamName,
      teamLeader,
    });
    await team.save();
    await Chat.create({
      teamId: team._id,
      participants: [team.teamLeader, ...team.members],
    });
    res
      .status(201)
      .json({ success: true, msg: "team created successfully", team });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error creating team" });
  }
};

exports.addMemberToTeamCtrl = async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  try {
    const { role } = req.user;
    if (role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    const team = await Team.findById(id);
    if (!team)
      return res.status(404).json({ success: false, msg: "team not found" });
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ success: false, msg: "invalid user id" });
    const checkUser = await User.findById(userId);
    if (!checkUser)
      return res.status(404).json({ success: false, msg: "user not found" });
    if (checkUser.role === "admin" || checkUser.role === "teamLeader")
      return res.status(403).json({
        success: false,
        msg: "you canot add this user this admin or team leader",
      });
    const checkUserInTeam = await Team.findOne({ members: userId });
    if (checkUserInTeam)
      return res
        .status(400)
        .json({ success: false, msg: "this user is already in team" });
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        $push: { members: userId },
      },
      { new: true }
    ).select("-password");
    const chat = await Chat.findOne({ teamId: id });
    await Chat.findByIdAndUpdate(
      chat._id,
      {
        $push: {
          participants: userId,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: "added user to team successfully",
      updatedTeam,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error add member to team" });
  }
};

exports.removeMemberFromTeamCtrl = async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  try {
    const { role } = req.user;
    if (role === "user")
      return res.status(403).json({ success: false, msg: "access denied" });
    const team = await Team.findById(id);
    if (!team)
      return res.status(404).json({ success: false, msg: "team not found" });
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ success: false, msg: "invalid user id" });
    const checkUser = await User.findById(userId);
    if (!checkUser)
      return res.status(404).json({ success: false, msg: "user not found" });
    if (checkUser.role === "admin" || checkUser.role === "teamLeader")
      return res.status(403).json({
        success: false,
        msg: "you canot add this user this admin or team leader",
      });
    const checkUserInTeam = await Team.findOne({ members: userId });
    if (!checkUserInTeam)
      return res
        .status(400)
        .json({ success: false, msg: "this user is out of this team" });
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        $pull: { members: userId },
      },
      { new: true }
    ).select("-password");
    const chat = await Chat.findOne({ teamId: id });
    await Chat.findByIdAndUpdate(
      chat._id,
      {
        $pull: {
          participants: userId,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: "removed user from team successfully",
      updatedTeam,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: "error remove member to team" });
  }
};

exports.getMyTeamCtrl = async (req, res) => {
  try {
    const { role } = req.user;
    if (role === "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    const team = await Team.findOne({
      $or: [{ teamLeader: req.user._id }, { members: req.user._id }],
    }).populate([
      {
        path: "teamLeader",
        select: "-password -phoneNumber -createdAt -updatedAt",
      },
      {
        path: "members",
        select: "-password -phoneNumber -createdAt -updatedAt",
      },
      {
        path: "projects",
        select: "-createdAt -updatedAt",
      },
    ]);
    if (!team)
      return res
        .status(404)
        .json({ success: false, msg: "you are not in the team!" });
    const token = jwt.sign(
      { team: team._id, teamLeader: team.teamLeader },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res
      .cookie("team", token, { httpOnly: true, secure: false })
      .json({ success: true, team });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error get my team" });
  }
};

exports.getAllTeamsCtrl = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    const teams = await Team.find().populate([
      {
        path: "teamLeader",
        select: "-password -phoneNumber -createdAt -updatedAt",
      },
      {
        path: "members",
        select: "-password -phoneNumber -createdAt -updatedAt",
      },
    ]);
    res.status(200).json({ success: true, teams });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error get all team" });
  }
};

exports.getOneTeamCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate([
      {
        path: "teamLeader",
        select: "-password -phoneNumber -createdAt -updatedAt",
      },
      {
        path: "members",
        select: "-password -phoneNumber -createdAt -updatedAt",
      },
    ]);
    if (!team)
      return res.status(404).json({ success: false, msg: "Team not found" });
    res.status(200).json({ success: true, team });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error get team" });
  }
};

exports.updateTeamCtrl = async (req, res) => {
  const { teamName, teamLeader } = req.body;
  try {
    const { id } = req.params;
    const { role, _id } = req.user;
    const team = await Team.findById(id);
    if (!team)
      return res.status(404).json({ success: false, msg: "team not found" });
    if (role === "user" || _id !== team.teamLeader.toString())
      return res.status(403).json({ success: false, msg: "access denied" });
    if (teamLeader) {
      if (!mongoose.Types.ObjectId.isValid(teamLeader))
        return res.status(400).json({ success: false, msg: "invalid user id" });
      const checkLeaderExists = await User.findById(teamLeader, {
        password: 0,
      });
      if (checkLeaderExists.role !== "teamLeader")
        return res
          .status(403)
          .json({ success: false, msg: "user not a team leader" });
      if (!checkLeaderExists)
        return res.status(404).json({
          success: false,
          msg: "userId is not exists",
        });
      const checkLeader = await Team.findOne({ teamLeader });
      if (
        checkLeader &&
        checkLeader.teamLeader.toString() !== team.teamLeader.toString()
      )
        return res.status(400).json({
          success: false,
          msg: "this user is already a leader of another team",
        });
    }
    if (teamName) {
      const checkTeam = await Team.findOne({ teamName });
      if (checkTeam && checkTeam.teamName !== team.teamName)
        return res.status(400).json({
          success: false,
          msg: "team already exists, try with another team name",
        });
    }
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        $set: {
          teamName,
          teamLeader,
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, msg: "updated team successfully", updatedTeam });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error update team" });
  }
};

exports.updateImageTeamCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, _id } = req.user;
    const team = await Team.findById(id);
    if (!team)
      return res.status(404).json({ success: false, msg: "team not found" });
    if (role !== "teamLeader" && _id !== team.teamLeader.toString())
      return res.status(403).json({ success: false, msg: "access denied" });
    if (!req.file)
      return res.status(400).json({ success: false, msg: "file not found" });
    if (team.teamPic.public_id) {
      await deleteFileFromCloudinary(team.teamPic.public_id);
    }
    const result = await uploadFileToCloudinary(req.file.path);
    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        $set: {
          teamPic: {
            url: result.secure_url,
            public_id: result.public_id,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: "team picture updated successfully",
      updatedTeam,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error update image team" });
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteTeamCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.user;
    const team = await Team.findById(id);
    if (!team)
      return res.status(404).json({ success: false, msg: "team not found" });
    if (role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    if (team.teamPic.public_id) {
      await deleteFileFromCloudinary(team.teamPic.public_id);
    }
    const chat = await Chat.findOne({ teamId: id });
    await Message.deleteMany({ reciverTeam: id });
    await Chat.findByIdAndDelete(chat._id);
    const deletedTeam = await Team.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, msg: "team deleted successfully", deletedTeam });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "error delete team" });
  }
};
