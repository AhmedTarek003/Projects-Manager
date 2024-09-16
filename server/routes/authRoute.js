const router = require("express").Router();
const {
  registerUserCtrl,
  loginUserCtrl,
  logoutUserCtrl,
} = require("../controllers/authCtrl");
const uploadFile = require("../middlewares/uploadFile");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  registerValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

router.post(
  "/register",
  uploadFile.single("image"),
  registerValidator,
  verifyToken,
  registerUserCtrl
);
router.post("/login", loginValidator, loginUserCtrl);
router.post("/logout", verifyToken, logoutUserCtrl);

module.exports = router;
