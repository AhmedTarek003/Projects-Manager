const router = require("express").Router();
const {
  createTeamCtrl,
  getAllTeamsCtrl,
  getOneTeamCtrl,
  updateTeamCtrl,
  deleteTeamCtrl,
  updateImageTeamCtrl,
  addMemberToTeamCtrl,
  removeMemberFromTeamCtrl,
  getMyTeamCtrl,
} = require("../controllers/teamCtrl");
const uploadFile = require("../middlewares/uploadFile");
const validateId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createTeamValidator,
  updateTeamValidator,
} = require("../utils/validators/teamValidator");

router
  .route("/")
  .post(verifyToken, createTeamValidator, createTeamCtrl)
  .get(verifyToken, getAllTeamsCtrl);

router.put("/add_member/:id", verifyToken, validateId, addMemberToTeamCtrl);
router.put(
  "/remove_member/:id",
  verifyToken,
  validateId,
  removeMemberFromTeamCtrl
);
router.get("/get_my_team", verifyToken, getMyTeamCtrl);
router.put(
  "/update_team_image/:id",
  uploadFile.single("image"),
  verifyToken,
  validateId,
  updateImageTeamCtrl
);
router
  .route("/:id")
  .get(verifyToken, validateId, getOneTeamCtrl)
  .put(verifyToken, validateId, updateTeamValidator, updateTeamCtrl)
  .delete(verifyToken, validateId, deleteTeamCtrl);

module.exports = router;
