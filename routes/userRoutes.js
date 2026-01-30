const express = require("express");
const router = express.Router();

const userRegister = require("../controllers/user/userRegister");
const userLogin = require("../controllers/user/userLogin");

router.post("/register", userRegister);
router.post("/login", userLogin);


module.exports = router