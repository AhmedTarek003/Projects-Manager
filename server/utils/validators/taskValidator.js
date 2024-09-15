const { check } = require("express-validator");
const validate = require("../../middlewares/validatorMiddleware");

exports.createTaskValidator = [
  check("title").notEmpty().withMessage("title is required"),
  check("desc").notEmpty().withMessage("description is required"),
  check("project").notEmpty().withMessage("you must choose a project"),
  validate,
];

exports.updateTaskValidator = [
  check("title").notEmpty().withMessage("title is required").optional(),
  check("desc").notEmpty().withMessage("description is required").optional(),
  check("completed")
    .notEmpty()
    .withMessage("you must choose complete status")
    .isBoolean()
    .withMessage("complete status must be true or false")
    .optional(),
  validate,
];
