const customError = require('../helpers/customError');
const jwt = require('jsonwebtoken');
const env = require('../config/config');
const User = require('../models/User');
const ourSuperSecretKey = env.refresh_jwt_key;
const ourSuperSecretSecretKey = env.access_jwt_key;

const verifyAndCreateToken = (token, secret, req) => {
  console.log('I make it until here');
  const { _id } = jwt.verify(token, secret);
  const tokenPair = User.generateAuthToken(_id);
  console.log(tokenPair);
  req.headers.refreshToken = tokenPair.refreshToken;
  req.headers.accessToken = tokenPair.accessToken;
}

exports.auth = (req, res, next) => {
  try {
    if (!req.headers.accesstoken) {
    } else {
      if (jwt.decode(req.headers.accesstoken).exp > Date.now() / 1000) {
        verifyAndCreateToken(req.headers.accesstoken, ourSuperSecretSecretKey, req);
      } else {
      if (!req.headers.refreshtoken) {
        delete req.headers.refreshtoken;
        delete req.headers.accesstoken;
        next(customError('you have no token', 401))
      }
      if (jwt.decode(req.headers.refreshtoken).exp > Date.now() / 1000) {
      verifyAndCreateToken(req.headers.refreshtoken, ourSuperSecretKey, req);
      } else {
        next(customError('token is expired', 401))
      }
    }
    }
    next();
  } catch (err) {
    delete req.headers.refreshtoken;
    delete req.headers.accesstoken;
    next(err);
  }
};
