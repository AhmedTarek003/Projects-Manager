const router = require("express").Router();
const { sendMsgCtrl, getMsgsCtrl } = require("../controllers/messageCtrl");
const validateId = require("../middlewares/validateObjectId");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/send_message/:id", verifyToken, validateId, sendMsgCtrl);
router.get("/get_message/:id", verifyToken, validateId, getMsgsCtrl);

module.exports = router;
