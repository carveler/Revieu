const { body, validationResult } = require('express-validator');
const customError = require('../helpers/customError');

exports.userValidationRules = () => {
  return [
    body('email')
      .trim()
      .isEmail()
      .withMessage('your email is not valid')
      .normalizeEmail(),
    body('password').isStrongPassword(), ///minlength 8, 1 uppercase, 1 lower number,special charactor
    body('firstName').trim(),
    body('lastName').trim(),
    body('username').trim(),
  ];
};

exports.userValidationErrorHandling = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const arrErrors = errors.array();
  const strValidationSummary = mergeErrors(arrErrors);

  next(customError(strValidationSummary, 422));
};
const mergeErrors = (arrErrors) => {
  return arrErrors.map((error) => `${error.param}: ${error.msg}`).join('. ');
};
