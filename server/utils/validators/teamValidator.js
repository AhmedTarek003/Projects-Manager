const { check } = require("express-validator");
const validate = require("../../middlewares/validatorMiddleware");

exports.createTeamValidator = [
  check("teamName").notEmpty().withMessage("team name is required"),
  check("teamLeader").notEmpty().withMessage("team leader is required"),
  validate,
];

exports.updateTeamValidator = [
  check("teamName").notEmpty().withMessage("team name is required").optional(),
  validate,
];
