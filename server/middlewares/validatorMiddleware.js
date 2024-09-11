const { validationResult } = require("express-validator");
const fs = require("fs");

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(400).json({ msg: err.array()[0].msg });
  }
  next();
};

module.exports = validate;
