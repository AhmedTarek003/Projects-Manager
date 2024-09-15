const router = require("express").Router();
const { getAllEventsCtrl, getEventCtrl } = require("../controllers/eventCtrl");
const validateId = require("../middlewares/validateObjectId");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getAllEventsCtrl);
router.get("/:id", verifyToken, validateId, getEventCtrl);

module.exports = router;
