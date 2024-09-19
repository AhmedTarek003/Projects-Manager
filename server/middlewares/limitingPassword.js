const ratingLimiter = require("express-rate-limit");

const passLimit = ratingLimiter({
  windowMs: 30 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again after 30 seconds.",
  skipSuccessfulRequests: true,
});

module.exports = passLimit;
