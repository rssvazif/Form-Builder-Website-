const GoogleAuth = require("../services/googleAuth");
const { User } = require("../DataBase/schema");
const { v4: uuidv4 } = require("uuid");
const authorization = require("../services/authorization");
require("dotenv").config();

const googleService = new GoogleAuth({
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uri: process.env.GOOGLE_REDIRECT_URL,
});

exports.googleAuth = (req, res) => {
  const url = googleService.getAuthUrl();
  res.redirect(url);
};

exports.redirectAuth = async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({
      error: "error while getting code from google",
    });
  }
  try {
    const tokenData = await googleService.getToken(code);

    const userInfo = await googleService.getUserInfo(
      tokenData.id_token,
      tokenData.access_token
    );
    const user = await User.findOne({ email: userInfo.email });
    if (user) {
      const token = authorization.createJWT(user._id);
      return res.redirect(`http://localhost/myWorkspace?token=${token}`);
    } else {
      const randomPassword = uuidv4();
      const hashedPassword = await userService.hashPassword(randomPassword)
      const newUser = new User({
        username: userInfo.name,
        email: userInfo.email,
        password: hashedPassword,
      });
      await newUser.save();
      const token = authorization.createJWT(newUser._id);
      return res.redirect(`http://localhost/myWorkspace?token=${token}`);
    }
  } catch (err) {
    res.status(500).json({ error: "error in redirect controller" });
  }
};
