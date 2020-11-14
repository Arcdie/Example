const mongoose = require('mongoose');

const UserNotification = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique: true,
    required: true,
  },

  notifications: [{
    notificationId: {
      type: mongoose.Schema.ObjectId,
      ref: 'ServiceNotification',
    },

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

    isViewed: {
      type: Boolean,
      default: false,
    },

    updated: {
      type: Date,
      default: Date.now,
    },

    created: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  versionKey: false,
  usePushEach: true,
});

/*
typeNotification:
  1 - Специальные предложения
  2 - Новости
  3 - Сообщения
  4 - Операции
  5 - Опросы
*/

module.exports = mongoose.model('UserNotification', UserNotification, 'users-notifications');
