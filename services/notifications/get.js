const {
  UserNotification,
} = require('../../models');

/* service/notifications/create */

exports.getNotificationsForUser = (userId, callback) => {
  UserNotification
    .findOne({
      userId,
    })
    .populate({
      path: 'notificationId',
      select: ['typeNotification', 'headline', 'description'],
    })
    .exec((err, result) => {
      if (err) return callback(err);
      if (!result) return callback(null, []);

      const returnData = [];

      result.notifications.forEach((notification) => {
        returnData.push(notification._doc);
      });

      callback(null, result.notifications || []);
    });
};
