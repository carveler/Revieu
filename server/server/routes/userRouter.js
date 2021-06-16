const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  addUser,
  loginUser,
  logoutUser,
} = require('../controllers/usersController');
const { auth } = require('../middleware/authentication');
const {
  userValidationRules,
  userValidationErrorHandling,
} = require('../middleware/validation');

// /users
router
  .route('/')
  .get(getAllUsers)
  .post(userValidationRules(), userValidationErrorHandling, addUser);
// .post(addUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

module.exports = router;
