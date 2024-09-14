const { check } = require("express-validator");
const validate = require("../../middlewares/validatorMiddleware");

exports.createProjectValidator = [
  check("projectName").notEmpty().withMessage("project name is required"),
  check("team").notEmpty().withMessage("choose a team first"),
  check("startDate")
    .notEmpty()
    .withMessage("write start date")
    .isISO8601()
    .withMessage("invalid start Date"),
  check("dueDate")
    .notEmpty()
    .withMessage("make due date")
    .isISO8601()
    .withMessage("invalid due Date"),
  validate,
];

exports.updateProjectValidator = [
  check("projectName")
    .notEmpty()
    .withMessage("project name is required")
    .optional(),
  check("startDate")
    .notEmpty()
    .withMessage("write start date")
    .isISO8601()
    .withMessage("invalid start Date")
    .optional(),
  check("dueDate")
    .notEmpty()
    .withMessage("make due date")
    .isISO8601()
    .withMessage("invalid due Date")
    .optional(),
  validate,
];
