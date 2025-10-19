const GoogleAuth = require("../services/googleAuth");
const { User } = require("../DataBase/schema");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const authorization = require("../services/authorization");
const gmailService = require("../services/gmailService");
require("dotenv").config();

const googleService = new GoogleAuth({
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  redirect_uri: process.env.GOOGLE_REDIRECT_URL,
});

exports.googleAuth = async (req, res) => {
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
    res.status(200).json({ message: "user login done", token });
  } catch (err) {
    res.status(500).json({ message: "error while login" });
  }
};

exports.getInfo = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({
      message: "user name got",
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: "error to get username in server" });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const { email, newUsername } = req.body;
    const updatedUser = await User.updateOne(
      {
        email: email,
      },
      {
        $set: { username: newUsername },
      }
    );
    if (updatedUser.matchedCount === 0) {
      return res.status(404).json({ message: "user for update not found" });
    }
    res.status(200).json({ message: "username updated" });
  } catch (err) {
    res.status(500).json({ message: "error to update username" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const email = req.user.email
    const password = req.body.newPassword;
    const user = await User.findOne({email:email}).select("password");
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(400).json({
        message: "رمز جدید نباید مشابه رمز فعلی باشد",
      });
    }
    const hashedPassword = await userService.hashPassword(password);
    const updatedUser = await User.updateOne(
      {
        email: email,
      },
      {
        $set: { password: hashedPassword },
      }
    );
    if (updatedUser.matchedCount === 0) {
      return res.status(404).json({ message: "user for update not found" });
    }
    res.status(200).json({ message: "user password updated", updated: true });
  } catch (err) {
    res.status(500).json({ message: "error while reset password" });
  }
};

exports.sendResetGmail = async (req, res) => {
  try {
    const email = req.body.email;
    const token = authorization.createResetToken(email);
    gmailService.sendResetPasswordGmail(email, token);
    res.status(200).json({ message: "email for reset password sended" });
  } catch (err) {
    console.log("error while sendResetGmail in userController");
    res.status(500).json({ error: "error in server while send email" });
  }
};
