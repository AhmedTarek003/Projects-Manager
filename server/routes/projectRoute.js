const router = require("express").Router();
const {
  createProjectCtrl,
  getAllProjectsCtrl,
  getProjectCtrl,
  updateProjectCtrl,
  deleteProjectCtrl,
} = require("../controllers/projectCtrl");
const uploadFile = require("../middlewares/uploadFile");
const validateId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createProjectValidator,
  updateProjectValidator,
} = require("../utils/validators/projectsValidator");

router
  .route("/")
  .post(verifyToken, createProjectValidator, createProjectCtrl)
  .get(verifyToken, getAllProjectsCtrl);

router
  .route("/:id")
  .get(verifyToken, validateId, getProjectCtrl)
  .put(verifyToken, validateId, updateProjectValidator, updateProjectCtrl)
  .delete(verifyToken, validateId, deleteProjectCtrl);

module.exports = router;
