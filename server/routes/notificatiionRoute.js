const router = require("express").Router();
const {
  getAllNotificationsCtrl,
  getNotificationCtrl,
} = require("../controllers/notificationCtrl");
const validateId = require("../middlewares/validateObjectId");
const { verifyTeam, verifyToken } = require("../middlewares/verifyToken");

router.get("/", verifyToken, verifyTeam, getAllNotificationsCtrl);
router.get("/:id", verifyToken, validateId, getNotificationCtrl);

module.exports = router;
