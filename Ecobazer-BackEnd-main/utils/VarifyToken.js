const jwt = require("jsonwebtoken");

const tokenVerify = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return false;
  }
};

module.exports = { tokenVerify };
