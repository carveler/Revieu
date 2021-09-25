const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productsController');
const { getProductReviews } = require('../controllers/reviewsController');
const { auth } = require('../middleware/authentication');

// /products
router.route('/').get(getAllProducts).post(addProduct);
router.route('/:productId/reviews').get(getProductReviews);
router
  .route('/:id')
  .get(getProduct)
  .delete(deleteProduct)
  .patch(auth, updateProduct);

module.exports = router;
