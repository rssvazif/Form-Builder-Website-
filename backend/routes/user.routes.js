const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userControllers = require("../controllers/userController");

router.get("/googleAuth", userControllers.googleAuth);
router.get("/auth", userControllers.redirectAuth);
router.get("/google/callback", userControllers.redirectAuth);
router.get("/getUserName", authMiddleware, userControllers.getUserName);
router.post("/User", userControllers.addNewUser);
router.post("/login", userControllers.login);
router.post("/info", authMiddleware, userControllers.getInfo);
router.post("/newUsername",userControllers.updateUsername)

module.exports = router;
