
const express = require('express');
const authRoute = express.Router();
const {
    SignUp,
    Login,
    Logout
} = require("../controllers/auth");


authRoute.post("/signup", SignUp);
authRoute.post("/login", Login);
authRoute.post("/logout", Logout);

module.exports = authRoute

