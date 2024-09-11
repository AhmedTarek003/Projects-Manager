const { check } = require("express-validator");
const validate = require("../../middlewares/validatorMiddleware");

exports.registerValidator = [
  check("userName").notEmpty().withMessage("username is required"),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("phone number is required")
    .isMobilePhone()
    .withMessage("invalid phone number"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  validate,
];
