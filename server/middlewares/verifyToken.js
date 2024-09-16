const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "Unauthorised user!,please login" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, msg: "Unauthorised user!,please login" });
  }
};

const verifyTeam = (req, res, next) => {
  const token = req.cookies.team;
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorised user!,please login with user or teamleader account",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.team = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Unauthorised user!,please login with user or teamleader account",
    });
  }
};

module.exports = { verifyToken, verifyTeam };
