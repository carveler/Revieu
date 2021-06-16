const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    barcode: { type: String, required: true },
    img: { type: String, required: false },
    productName: { type: String, required: true },
    productName_jp: { type: String, required: false },
    brand: { type: String, required: false },
    country: [{ type: String, required: false }],
    price: [{ type: Number, required: false }],
    store: [{ type: String, required: false }],
    category: [{ type: String, required: false }],
    tags: [{ type: String, required: false, lowercase: true }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

ProductSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});
const Product = model('Product', ProductSchema);
module.exports = Product;
