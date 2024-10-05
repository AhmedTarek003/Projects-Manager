const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");
const globalErrorHandler = require("./middlewares/globalError");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimiting = require("express-rate-limit");
const mongosanitize = require("express-mongo-sanitize");
const cors = require("cors");

connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: "1kb" }));
app.use(cookieParser());
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 200,
  })
);
app.use(mongosanitize());
app.use(helmet());
app.use(hpp());

require("./utils/scheduler");

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/teams", require("./routes/teamRoute"));
app.use("/api/projects", require("./routes/projectRoute"));
app.use("/api/tasks", require("./routes/taskRoute"));
app.use("/api/events", require("./routes/eventRoute"));
app.use("/api/notifications", require("./routes/notificatiionRoute"));
app.use("/api/chats", require("./routes/chatRoute"));

app.use("*", (req) => {
  throw new Error("Invalid Route" + req.originalUrl);
});
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`server is running at PORT ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection " + err.name + "|" + err.message);
  server.close(() => {
    console.log("shutting down....");
    process.exit(1);
  });
});
