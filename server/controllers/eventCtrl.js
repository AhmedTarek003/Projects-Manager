const Event = require("../models/Event");

exports.getAllEventsCtrl = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    const events = await Event.find();
    res.status(200).json({ success: true, events });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed to get events" });
  }
};

exports.getEventCtrl = async (req, res) => {
  try {
    const { role } = req.user;
    const { id } = req.params;
    if (role !== "admin")
      return res.status(403).json({ success: false, msg: "access denied" });
    const event = await Event.findById(id);
    if (!event)
      return res.status(404).json({ success: false, msg: "event not found" });
    res.status(200).json({ success: true, event });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "failed to get event" });
  }
};
