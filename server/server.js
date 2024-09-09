const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes

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
