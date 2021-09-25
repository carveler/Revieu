const mongoose = require('mongoose');
const Review = require('../models/Review');
const customError = require('../helpers/customError');

exports.getAllReviews = async (req, res, next) => {
  try {
    let allReviews = await Review.find().populate('user').populate('product');
    res.json(allReviews);
  } catch (err) {
    next(err);
  }
};
exports.getUserReviews = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const userReviews = await Review.find({ userId: _id })
      .populate('user')
      .populate('product');
    if (!userReviews) next(customError(`UserID: ${id} does not exist`, 404));
    res.json(userReviews);
  } catch (err) {
    next(err);
  }
};

exports.getProductReviews = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const productReviews = await Review.find({ productId }).populate('user');
    if (!productReviews)
      next(customError(`productID: ${productId} does not found`, 404));
    res.json(productReviews);
  } catch (err) {
    next(err);
  }
};
exports.getReview = async (req, res, next) => {
  console.log(req.params);
  const { id } = req.params;

  try {
    const review = await Review.findById(id)
      .populate('user')
      .populate('product');
    if (!review) next(customError(`ReviewId: ${id} not found`, 404));
    res.json(review);
  } catch (err) {
    next(err);
  }
};

exports.addUpdateReview = async (req, res, next) => {
  const reviewId = req.params.reviewId || mongoose.Types.ObjectId();

  try {
    const reviewNewOrUpdated = await Review.findByIdAndUpdate(
      reviewId,
      req.body,
      {
        upsert: true,
        new: true,
      }
    )
      .populate('user')
      .populate('product');
    if (!reviewNewOrUpdated)
      next(customError(`ReviewId  : ${reviewId} not found`, 404));
    res.json(reviewNewOrUpdated);
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  const { id } = req.params;
  try {
    let deleteReview = await Review.findByIdAndDelete(id);
    if (!deleteReview) next(customError(`UserID: ${id} does not exist`, 404));
    res.json(deleteReview);
  } catch (err) {
    next(err);
  }
};
