const async = require('async');

const {
  disinfect,
} = require('../../libs/support');

const {
  UserNotification,
} = require('../../models');

const log = require('../../middleware/loggers/winston')(module);

/* service/notifications/create */

exports.createNewNotification = (userId, {
  headline,
  description,
  typeNotification,
}, callback) => {
  const isGlobal = !!userId;

  const newNotification = {
    typeNotification,

    headline: disinfect(headline),
    description: disinfect(description),

    isViewed: false,
  };

  async.series([
    (callback) => {
      if (isGlobal) {
        UserNotification
          .findOneAndUpdate({
            userId,
          }, {
            $push: { notifications: newNotification },
          })
          .exec(callback);
      } else {
        UserNotification
          .find({}, { userId: 1 })
          .cursor()
          .on('data', (doc) => {
            UserNotification
              .findOneAndUpdate({
                userId: doc.userId,
              }, {
                $push: { notifications: newNotification },
              })
              .exec((err) => {
                if (err) {
                  log.warn(err);
                }
              });
          })
          .on('end', callback);
      }
    },
  ], (err) => {
    if (err) return callback(err);
    callback();
  });
};
