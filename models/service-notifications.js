const mongoose = require('mongoose');

const ServiceNotification = new mongoose.Schema({
  typeNotification: {
    type: Number,
    required: true,
  },

  headline: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  created: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
  usePushEach: true,
});

module.exports = mongoose.model('ServiceNotification', ServiceNotification, 'service-notifications');
