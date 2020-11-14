/* controllers/auth */

exports.viewLogin = (req, res, next) => {
  res.render('auth/login');
};

exports.viewRegistration = (req, res, next) => {
  res.render('auth/registration');
};
