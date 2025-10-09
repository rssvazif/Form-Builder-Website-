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

  checkToken(token) {
    const selfToken = token.split(" ")[1];
    const tokenDecoded = jwt.verify(selfToken, process.env.JWT_SECRET);
    if (!tokenDecoded) {
      return null;
    } else {
      return tokenDecoded;
    }
  }
}

module.exports = new Authorization();
