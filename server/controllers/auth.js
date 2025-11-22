const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require("bcrypt");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { where } = require("sequelize");
const { sequelize } = require("../models");
const User = require("../models").User;
const Role = require("../models").Role;
// USER API LAYER

const SignUp = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    if (!validator.isEmail(email)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Email format is invalid"
      });
    }
    if (!validator.isStrongPassword(password)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Password is week. Make a strong password"
      })
    }
    const isUserExist = await User.findOne({
      where: { email },
    });

    if (isUserExist) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "User with this email already exist",
      });
    }
    const adminRole = await Role.findOne({
      where: {
        name: "admin"
      }
    })
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with backend-managed role & plan
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId: adminRole.id,
      plan: "free", // plan set by backend
    });

    await transaction.commit();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        plan: user.plan,
      },
    });
  } catch (err) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Error in Sign up API",
    });
  }
};

const Login = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    if (!validator.isEmail(email)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Email format is invalid"
      });
    }
    const isUserExist = await User.findOne({
      where: { email }
    })
    if (!isUserExist) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "User not found with this email"
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
    if (!isPasswordMatch) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials"
      })
    }
    const token = await jwt.sign({
      id: isUserExist.id,
      email: isUserExist.email
    }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    })
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60
    });
    console.log("token is:", token);
    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        name: isUserExist.name,
        email: isUserExist.email
      }
    })

  } catch (err) {
    await transaction.rollback();
    return res.status(500).json({
      success: false,
      message: "Error in Login API",
    });
  }
};
const Logout = async (req, res) => {
  try {
  } catch (err) { }
};

module.exports = {
  SignUp,
  Login,
  Logout,
};
