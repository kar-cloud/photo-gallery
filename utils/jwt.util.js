const jwt = require("jsonwebtoken");
const config = require("config");

const JWT_EXPIRES = 3600;

exports.signedJWT = (payload) => {
  return jwt.sign(payload, config.get("jwtToken"), { expiresIn: JWT_EXPIRES });
};
