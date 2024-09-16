const cron = require("node-cron");
const Project = require("../models/Project");
const Notification = require("../models/Notification");

cron.schedule("0 0 * * *", async () => {
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

  const projects = await Project.find({ dueDate: threeDaysFromNow });

  projects.forEach(async (project) => {
    const notification = new Notification({
      title: `deadline of ${project.projectName}`,
      message: `deadline of ${project.projectName} after 3 days`,
      projectId: project._id,
      team: project.team,
    });

    await notification.save();
  });
});
