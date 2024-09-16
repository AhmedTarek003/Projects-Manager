const router = require("express").Router();
const {
  getUserCtrl,
  getAllUserCtrl,
  updateUserCtrl,
  deleteUserCtrl,
} = require("../controllers/userCtrl");
const validateId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");
const { updatedUserValidator } = require("../utils/validators/authValidator");

router.get("/get_user", verifyToken, getUserCtrl);
router.get("/", verifyToken, getAllUserCtrl);
router
  .route("/:id")
  .put(verifyToken, validateId, updatedUserValidator, updateUserCtrl)
  .delete(verifyToken, validateId, deleteUserCtrl);

module.exports = router;
