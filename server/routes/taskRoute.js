const router = require("express").Router();
const {
  createTaskCtrl,
  GetAllTasksByProjectCtrl,
  getTaskCtrl,
  updateTaskCtrl,
  deleteTaskCtrl,
} = require("../controllers/taskCtrl");
const validateId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createTaskValidator,
  updateTaskValidator,
} = require("../utils/validators/taskValidator");

router.post("/", verifyToken, createTaskValidator, createTaskCtrl);

router.get("/get_tasks_by_project/:id", verifyToken, GetAllTasksByProjectCtrl);
router
  .route("/:id")
  .get(verifyToken, validateId, getTaskCtrl)
  .put(verifyToken, validateId, updateTaskValidator, updateTaskCtrl)
  .delete(verifyToken, validateId, deleteTaskCtrl);

module.exports = router;
