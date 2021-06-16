const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authentication');

const {
  getAllReviews,
  getReview,
  addUpdateReview,
  deleteReview,
} = require('../controllers/reviewsController');

// /reviews
router.route('/').get(getAllReviews);
router.route('/:reviewId?').post(auth, addUpdateReview);
router.route('/:id').get(getReview).delete(deleteReview);

module.exports = router;
