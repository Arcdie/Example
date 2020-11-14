const crypto = require('crypto');
const mongoose = require('mongoose');

const {
  secrets: {
    salt,
  },
} = require('../config');

const UserAuth = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },

  login: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  usePushEach: true,
});

UserAuth.methods.createNewPassword = function (password) {
  return crypto
    .createHash('sha256')
    .update(`${salt}${password}${salt}`)
    .digest('base64');
};

UserAuth.pre('save', function (next) {
  if (!this.isNew) return next();

  this.password = this.createNewPassword(this.password);
  next();
});


module.exports = mongoose.model('UserAuth', UserAuth, 'users-auth');
