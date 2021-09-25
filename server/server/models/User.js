const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/config');
const ourSuperSecretKey = env.access_jwt_key;
const ourSuperSecretRefreshKey = env.refresh_jwt_key;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false, default: '/statics/01.png' },
  },
  {
    id: false,
    versionKey: false,
    timestamps: true,
    toJSON: {
      // keep password field out of all API responses (=> on all res.send() calls)
      virtuals: true,
      transform: (doc, returnDoc) => {
          delete returnDoc.password
      }
    }
  }
);

UserSchema.pre('save', function () {
  const user = this;
  // convert plain password to password hash (but ONLY if password was modified)
  if (user.isModified('password')) {
    user.password = bcryptjs.hashSync(user.password, 8); // 8 = salting rounds
  }
});

UserSchema.statics.generateAuthToken = function (user_id) {
  console.log(this); // user
  const user = this;
  // additionally making sure, the JWT ticket itself will expire at some point (in this case in 3 hours)
  const accessToken = jwt.sign({ _id: user_id }, ourSuperSecretKey, {
    expiresIn: '90s',
  });
  const refreshToken = jwt.sign({ _id: user_id }, ourSuperSecretRefreshKey, {
    expiresIn: '24h',
  });

  return { accessToken: accessToken, refreshToken: refreshToken };
};

const User = model('User', UserSchema);
module.exports = User;
