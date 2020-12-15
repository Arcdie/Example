const {
  User,
} = require('../../models');

exports.get = async () => {
  return await User.findOne({}).exec();
};
