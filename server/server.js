const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");
const globalErrorHandler = require("./middlewares/globalError");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/teams", require("./routes/teamRoute"));

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
