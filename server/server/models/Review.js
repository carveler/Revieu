const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ReviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rate: { type: Number, default: 0, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    goodCount: { type: Number, default: 0, required: false },
    badCount: { type: Number, default: 0, required: false },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  {
    id: false,
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

ReviewSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});
ReviewSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true,
});

const Review = model('Review', ReviewSchema);
module.exports = Review;
