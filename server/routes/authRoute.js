const router = require("express").Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  logoutUserCtrl,
} = require("../controllers/authCtrl");
const uploadFile = require("../middlewares/uploadFile");
const verifyToken = require("../middlewares/verifyToken");
const { registerValidator } = require("../utils/validators/authValidator");

router.post(
  "/register",
  uploadFile.single("image"),
  registerValidator,
  verifyToken,
  registerUserCtrl
);
router.post("/login", loginUserCtrl);
router.post("/logout", verifyToken, logoutUserCtrl);

module.exports = router;
