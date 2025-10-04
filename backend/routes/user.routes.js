const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");

router.get("/googleAuth", userControllers.googleAuth);
router.get("/auth",userControllers.redirectAuth);
router.get("/google/callback",userControllers.redirectAuth);

module.exports = router;
