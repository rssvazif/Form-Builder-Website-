const authorization = require("../services/authorization");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(400).json({ message: "token not exist!" });
  }
  const tokenDecoded = authorization.checkToken(token);
  if (!tokenDecoded) {
    return res.status(403).json({ message: "invalid token" });
  }
  req.user = tokenDecoded;
  next();
};
