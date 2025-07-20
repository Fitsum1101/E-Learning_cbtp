const { validationResult } = require("express-validator");

const validate = (req) => {
  const errors = validationResult(req);
  const extractedErrors = {};
  if (!errors.isEmpty()) {
    errors.array().forEach((err) => {
      if (!extractedErrors[err.path]) {
        extractedErrors[err.path] = err.msg;
      }
    });
  }
  return extractedErrors;
};

module.exports = validate;
