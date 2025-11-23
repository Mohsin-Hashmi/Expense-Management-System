

const { where } = require("sequelize");
const { sequelize } = require("../models");
const e = require("express");
const User = require("../models").User;
const Expense = require("../models").Expense;
const Category = require("../models").Category;
const createExpenses = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { amount, description, date, categoryId } = req.body;
        if (!amount || !categoryId) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: "Amount and Catgory are required"
            });
        }
        if (isNaN(amount) || amount <= 0) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: "Amount must be a positive number"
            })
        }
        const isCategoryValid = await Category.findOne({
            where: {
                id: categoryId
            }
        });
        if (!isCategoryValid) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: "Category not found"
            });
        }
        const userExist = await User.findOne({
            where: { id: userId }
        });
        if (!userExist) {
            await transaction.rollback();
            return res.status(401).json({
                success: false,
                message: "User not found. Access denied"
            });
        }
        const expense = await Expense.create({
            amount,
            description: description || "",
            date: date || new Date(),
            userId,
            categoryId
        }, { transaction });
        await transaction.commit();
        return res.status(201).json({
            success: true,
            message: "Expense Created successfully",
            expense: {
                id: expense.id,
                amount: expense.amount,
                description: expense.description,
                date: expense.date,
                categoryId: expense.categoryId,
                userId: expense.userId
            }
        })
    } catch (err) {
        await transaction.rollback();
        return res.status(500).json({
            success: false,
            message: "ERROR: " + err.message
        });
    }
}

const getAllExpenses = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {

    } catch (err) {
        await transaction.rollback();
        return res.status(500).json({
            success: false,
            message: "ERROR: " + err.message
        });
    }
}
module.exports = { createExpenses, getAllExpenses };