const jwt = require("jsonwebtoken");
require("dotenv").config();

class Authorization {
  createJWT(data) {
    const token = jwt.sign({ id: data }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  }
  parseJWT() {}
}

module.exports = new Authorization();
