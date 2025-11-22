
const express = require('express');
const authRoute= express.Router();
const {
    SignUp,
    Login,
    Logout
}= require("../controllers/auth");


authRoute.post("/signup", SignUp);
authRoute.post("/login",Login);

module.exports= authRoute

