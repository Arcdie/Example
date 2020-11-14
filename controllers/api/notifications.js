const validator = require('validator');

const {
  disinfect,
} = require('../../libs/support');

const {
  getNotificationsForUser,
} = require('../../services/notifications/get');

const {
  createNewNotification,
} = require('../../services/notifications/create');

/* controllers/api/notifications */

exports.get = (req, res, next) => {
  const {
    userId,
  } = req.params;

  let errValidate;

  if (!userId || !validator.isMongoId(userId)) {
    errValidate = 'Передан невалидный userId';
  }

  if (errValidate) {
    return res.json({
      success: false,
      text: errValidate,
    });
  }

  getNotificationsForUser(userId, (err, data) => {
    if (err) return next(err);
    console.log(data);
    res.json({ success: true, data });
  });
};

exports.addNew = (req, res, next) => {
  const {
    headline,
    description,

    userId,
  } = req.body;

  let {
    typeNotification,
  } = req.body;

  let errValidate;

  if (!typeNotification || !isFinite(typeNotification)) {
    errValidate = 'Не передан typeNotification';
  } else {
    const validArr = [1, 2, 3, 4, 5];
    typeNotification = parseInt(typeNotification, 10);

    if (!validArr.includes(typeNotification)) {
      errValidate = 'Передан невалидный typeNotification';
    }
  }

  if (!headline) {
    errValidate = 'Передан невалидный заголовок';
  }

  if (!description) {
    errValidate = 'Передан невалидное описание';
  }

  if (userId && !validator.isMongoId(userId)) {
    errValidate = 'Передан невалидный пользователь';
  }

  if (errValidate) {
    return res.json({
      success: false,
      text: errValidate,
    });
  }

  createNewNotification(userId, {
    typeNotification,
    headline: disinfect(headline),
    description: disinfect(description),
  }, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
};
