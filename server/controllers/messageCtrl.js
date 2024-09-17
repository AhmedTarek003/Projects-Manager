const Chat = require("../models/Chat");
const Message = require("../models/Message");
const Team = require("../models/Team");

exports.sendMsgCtrl = async (req, res) => {
  try {
    const { id: teamId } = req.params;
    const { _id: userId, role } = req.user;

    if (role === "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    const chat = await Chat.findOne({ teamId });
    if (!chat)
      return res
        .status(404)
        .json({ success: false, msg: "there is no team for this chat" });
    const newMessage = await Message.create({
      senderId: userId,
      reciverTeam: teamId,
      message: req.body.message,
    });
    chat.messages.push(newMessage._id);
    await chat.save();
    res.status(201).json({ success: true, newMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed to send message" });
  }
};

exports.getMsgsCtrl = async (req, res) => {
  try {
    const { id: teamId } = req.params;
    const chat = await Chat.findOne({ teamId }).populate("messages");
    if (!chat) return res.status(200).json({ success: true, chat: [] });
    const messages = chat.messages;
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed to get messages" });
  }
};
