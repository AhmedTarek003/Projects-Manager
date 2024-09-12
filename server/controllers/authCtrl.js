const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { uploadFileToCloudinary } = require("../utils/cloudinary");

exports.registerUserCtrl = async (req, res) => {
  const { userName, email, phoneNumber, password, role } = req.body;
  try {
    if (req.user.role === "user") {
      return res.status(403).json({ success: false, msg: "access denied" });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.status(400).json({
        success: false,
        msg: "user already registered,try with another email",
      });
    let resultUpload;
    if (req.file) {
      resultUpload = await uploadFileToCloudinary(req.file.path);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profilePic: {
        url: resultUpload
          ? resultUpload.secure_url
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        public_id: resultUpload ? resultUpload.public_id : null,
      },
    });
    await user.save();
    res
      .status(201)
      .json({ success: true, msg: "user successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "user failed registration" });
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid email or password" });
    }
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      msg: "user logged in successfully",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePic: user.profilePic,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "user failed login" });
  }
};

exports.logoutUserCtrl = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .json({ success: true, msg: "user logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "logout faild" });
  }
};
