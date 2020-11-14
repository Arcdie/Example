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

  created: {
    type: Date,
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
