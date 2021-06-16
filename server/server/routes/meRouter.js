const express = require('express');
const router = express.Router();

const { getUserReviews } = require('../controllers/reviewsController');
const {
  getUser,
  updateUser,
  deleteUser,
  authUser,
} = require('../controllers/usersController');
const { auth } = require('../middleware/authentication');

// /me
router.route('/auth').post(auth, authUser);
router.route('/reviews').get(auth, getUserReviews);
router
  .route('/user')
  .get(auth, getUser)
  .patch(auth, updateUser)
  .delete(auth, deleteUser);
module.exports = router;
