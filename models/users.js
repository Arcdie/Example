const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  updated: {
    type: Date,
    required: true,
    default: Date.now,
  },

  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
}, {
  versionKey: false,
  usePushEach: true,
});

User.virtual('fullname').get(function () {
  return `${this.name} ${this.surname}`;
});

module.exports = mongoose.model('User', User, 'users');
