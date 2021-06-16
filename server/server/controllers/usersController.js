const User = require('../models/User');
const customError = require('../helpers/customError');
const bcryptjs = require('bcryptjs');

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (!user) next(customError(`User not found: ${_id}`, 404));
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  const newUser = req.body;
  const { email, username } = newUser;
  try {
    const user = await User.find({ email, username });
    if (user) {
      console.log(user.username);
      if (user.email === newUser.email) next(customError(`User already exists!`, 200));
      if (user.username === newUser.username) next(customError(`Username already exists!`, 200));
    }
    const createdUser = await User.create(newUser);

    res.json({ createdUser });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const updateUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updateUser) next(customError(`User not found: ${_id}`, 404));
    res.json(updateUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const deleteUser = await User.findByIdAndDelete(_id);
    if (!deleteUser) next(customError(`User not found: ${_id}`, 404));
    res.json(deleteUser);
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email }); //{ email :email}
    if (!userFound) {
      return next(customError(`Cannot find email`, 401));
    }
    const pwCompareResult = bcryptjs.compareSync(password, userFound.password);
    if (!pwCompareResult) {
      return next(customError('wrong password', 401));
    }
    const token = User.generateAuthToken(userFound._id);
    res.header('refreshToken', token.refreshToken);
    res.header('accessToken', token.accessToken);
    res.json({ user: userFound });
  } catch (err) {
    next(err);
  }
};

exports.logoutUser = async (req, res, next) => {
  // res.clearCookie('token');
  res.json({ message: 'Logged you out successfully' }); //todo refactor logout
};

exports.authUser = (req, res) => {
  console.log(req.user);
  res.json(req.user);
};
