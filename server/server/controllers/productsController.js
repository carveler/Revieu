const mongoose = require('mongoose');
const Product = require('../models/Product');
const customError = require('../helpers/customError');
const cloudinary = require('cloudinary').v2;

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    res.json(allProducts);
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    let product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  const { img, barcode, ...productData } = req.body;
  let productNew;
  try {
    const productExist = await Product.findOne({ barcode });
    if (!productExist) {
      if (img.file) {
        try {
          const uploadResult = await cloudinary.uploader.upload(img.file);
          clUrl = uploadResult.secure_url;
          productNew = await Product.create({
            ...productData,
            img: clUrl,
            barcode,
          });
        } catch (err) {
          return next(err);
        }
      } else {
        try {
          productNew = await Product.create({ ...productData, barcode, img });
        } catch (err) {
          return next(err);
        }
      }
      res.json(productNew);
    } else {
      res.json(productExist);
    }
  } catch (err) {
    return next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  console.log('updateproduct running!');
  const { id } = req.params;
  let { img, ...productData } = req.body;

  let productUpdate;
  console.log('img.file', img.file);
  if (img.file) {
    try {
      const uploadResult = await cloudinary.uploader.upload(img.file);
      clUrl = uploadResult.secure_url;
      console.log('finally cloudinary send back image urlclUrl', clUrl);
      productUpdate = await Product.findByIdAndUpdate(
        id,
        {
          ...productData,
          img: clUrl,
        },
        {
          new: true,
        }
      );
    } catch (err) {
      return next(err);
    }
  } else {
    try {
      console.log('not img.file running');
      productUpdate = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    } catch (err) {
      return next(err);
    }
  }
  console.log(productUpdate);
  res.json(productUpdate);
};

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    let deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) next(customError(`UserID: ${id} does not exist`, 400));
    res.json(deleteProduct);
  } catch (err) {
    next(err);
  }
};
