const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { deleteFileFromCloudinary } = require("../utils/cloudinary");

exports.getUserCtrl = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    res.status(200).json({
      success: true,
      user: {
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePic: user.profilePic,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "get user failed" });
  }
};

exports.getAllUserCtrl = async (req, res) => {
  const { is_role } = req.query;
  try {
    const { role } = req.user;
    if (role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    let users;
    if (is_role.trim() === "all") {
      users = await User.find({}, { password: 0 });
    } else if (is_role) {
      users = await User.find({ role: is_role.trim() }, { password: 0 });
    }
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "get all user failed" });
  }
};

exports.updateUserCtrl = async (req, res) => {
  const { userName, email, phoneNumber, password, role } = req.body;
  try {
    const { id } = req.params;
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    const user = await User.findById(id, { password: 0 });
    if (!user)
      return res.status(404).json({ success: false, msg: "user not found" });
    let hashPassword;
    if (password) {
      hashPassword = await bcrypt.hash(password, 10);
    }
    const roleValues = ["admin", "user", "teamLeader"];
    if (role && !roleValues.includes(role))
      return res
        .status(403)
        .json({ success: false, msg: "invalid role value" });
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          userName,
          email,
          phoneNumber,
          password: hashPassword,
          role,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      msg: "user updated successfully",
      user: {
        userName: updatedUser.userName,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profilePic: updatedUser.profilePic,
        role: updatedUser.role,
        password: updatedUser.password,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "update user faild" });
  }
};

exports.deleteUserCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    if (id === _id)
      return res
        .status(403)
        .json({ success: false, msg: "you can't delete yourself" });
    const user = await User.findById(id, { password: 0 });
    if (!user)
      return res.status(404).json({ success: false, msg: "user not found" });
    if (user.profilePic.public_id) {
      await deleteFileFromCloudinary(user.profilePic.public_id);
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "delete user faild" });
  }
};
