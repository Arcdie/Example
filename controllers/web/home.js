const {
  User,
} = require('../../models');

exports.viewHome = async (req, res) => {
  res.render('web/home');
};
