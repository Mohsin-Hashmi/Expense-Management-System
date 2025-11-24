
const express = require('express');
const expenseRoute = express.Router();
const { createExpenses, getAllExpenses } = require('../controllers/expenses');
const authMiddleware = require("../middlewares/auth");
expenseRoute.post("/create", authMiddleware, createExpenses)
expenseRoute.get("/all-expenses", authMiddleware, getAllExpenses)


module.exports = expenseRoute;