const express = require('express');
const router = express.Router();

const homeController = require("../controllers/homeController");
const loginController = require("../controllers/loginController")



router.post("/register", loginController.UserCreate);
router.post("/login", loginController.LoginCreate);

module.exports = router;