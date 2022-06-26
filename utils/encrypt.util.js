const bcrypt = require("bcryptjs");

exports.hashAndSalt = async (val) => {
  return bcrypt.hash(val, await bcrypt.genSalt(10));
};

exports.compareEncrypted = async (val1, val2) => {
  return await bcrypt.compare(val1, val2);
};
