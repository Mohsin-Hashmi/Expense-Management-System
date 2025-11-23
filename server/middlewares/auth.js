const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const User = require("../models").User;
const authMiddleware = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const { token } = cookies
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please Login"
            })
        }
        const isTokenValid = await jwt.verify(token, process.env.JWT_SECRET);
        if (!isTokenValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Access denied"
            })
        }
        const { id } = isTokenValid;
        const isUserExist = await User.findOne({
            where: { id }
        });
        if (!isUserExist) {
            return res.status(400).json({
                success: false,
                message: "User not found. Access denied"
            })
        }
        req.user = isUserExist;
        next();
    } catch (err) {
        console.log("ERROR IN AUTH MIDDLEWARE" + err.message)
    }
}

module.exports = authMiddleware;