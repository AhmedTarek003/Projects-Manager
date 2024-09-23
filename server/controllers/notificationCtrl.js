const Notification = require("../models/Notification");
const Team = require("../models/Team");

exports.getAllNotificationsCtrl = async (req, res) => {
  const { role } = req.query;
  const { role: r } = req.user;
  let team;
  if (req.team) {
    team = req.team.team;
  }
  try {
    let notifications;
    if (role === "admin") {
      if (r !== "admin")
        return res.status(200).json({ success: true, notifications: [] });
      notifications = await Notification.find().populate("team", "teamName");
    } else if (role === "team") {
      if (r !== "teamLeader")
        return res.status(200).json({ success: true, notifications: [] });
      const checkTeam = await Team.findById(team);
      if (!checkTeam)
        return res.status(404).json({ success: false, msg: "team not found" });
      notifications = await Notification.find({ team }).populate(
        "team",
        "teamName"
      );
    }
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, msg: "failed to get all notifications" });
  }
};

exports.getNotificationCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification)
      return res
        .status(404)
        .json({ success: false, msg: "notification not found" });
    await Notification.findByIdAndUpdate(
      id,
      { $set: { isRead: true } },
      { new: true }
    );
    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed to get notification" });
  }
};
