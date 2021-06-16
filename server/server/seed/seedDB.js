require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const faker = require('faker');
const Review = require('../models/Review');
const env = require('../config/config');

(async function () {
  const strConn = env.db;

  mongoose
    .connect(strConn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log('Connection to database established!'))
    .catch((err) => console.log('[ERROR] DB Connection failed', err));

  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
  } catch (err) {
    console.log(err);
  }

  const userPromise = Array(5)
    .fill(null)
    .map(() => {
      const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'Aaaa123$',
      };
      console.log(`User ${userData.email} has been created`);

      const user = new User(userData);
      return user.save();
    });
  let users;
  try {
    users = await Promise.all(userPromise);
  } catch (err) {
    console.log(err);
  }

  const singleUser = users.map((user) => {
    return (user = user._id);
  });

  const productPromise = Array(5)
    .fill(null)
    .map(() => {
      const productData = {
        barcode: faker.image.image(),
        img: faker.image.image(),
        productName: faker.commerce.productName(),
        productName_jp: faker.commerce.productName(),
        brand: faker.internet.userName(),
        country: faker.address.country(),
        price: faker.commerce.price(),
        store: faker.internet.userName(),
        category: faker.internet.userName(),
        tags: faker.internet.userName(),
      };
      const product = new Product(productData);
      return product.save();
    });
  let products;
  try {
    products = await Promise.all(productPromise);
  } catch (err) {
    console.log(err);
  }
  const singleProduct = products.map((product) => product._id);

  const reviewPromise = Array(5)
    .fill(null)
    .map(() => {
      const reviewData = {
        comment: faker.commerce.productDescription(),
        rate: faker.commerce.price(1, 5),
        userId: faker.random.arrayElement(singleUser),
        goodCount: faker.commerce.price(1, 10),
        badCount: faker.commerce.price(1, 10),
        productId: faker.random.arrayElement(singleProduct),
      };
      const review = new Review(reviewData);
      return review.save();
    });
  let reviews;
  try {
    reviews = await Promise.all(reviewPromise);
  } catch (err) {
    console.log(err);
  }

  mongoose.connection.close();
})();
