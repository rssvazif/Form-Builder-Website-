const GoogleAuth = require("../services/googleAuth");
const { User } = require("../DataBase/schema");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const userService = require("../services/user.service")
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
      const hashedPassword = await userService.hashPassword(randomPassword);
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

exports.getUserName = async (req, res) => {
  const userId = req.user.id;
  try {
    const userName = await User.findOne({ _id: userId }).select("username");
    if (!userName) {
      return res
        .status(404)
        .json({ message: "user not found to get username" });
    }
    res
      .status(200)
      .json({ message: "user name got", User_Name: userName.username });
  } catch (err) {
    res.status(500).json({ message: "error to get username in server" });
  }
};

exports.addNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await userService.hashPassword(password);
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(404).json({ message: "user signed up in the past" });
    }
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = authorization.createJWT(newUser._id);
    res.status(201).json({ message: "user created", token });
  } catch (err) {
    res.status(500).json({ message: "error while sign up new user" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email_username, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: email_username }, { username: email_username }],
    });
    if (!user) {
      return res.status(404).json({ message: "user not found to login" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password is incorrect" });
    }
    const token = authorization.createJWT(user._id);
    res.status(200).json({ message: "user login done" ,token});
  } catch (err) {
    res.status(500).json({ message: "error while login" });
  }
};
