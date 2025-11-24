

const { where } = require("sequelize");
const { sequelize } = require("../models");
const e = require("express");
const expense = require("../models/expense");
const User = require("../models").User;
const Expense = require("../models").Expense;
const Category = require("../models").Category;
// Expense Module API Lawyer
const createExpenses = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { amount, description, date, categoryId } = req.body;
        const userId = req.user.id;
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

// const getAllExpenses = async (req, res) => {

//     const transaction = await sequelize.transaction();
//     try {
//         const userId = req.user  && req.user.id;
//         if (!userId) {
//             await transaction.rollback();
//             return res.status(400).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         const allExpenses = await Expense.find({ where: { userId } });
//         if (!allExpenses) {
//             await transaction.rollback();
//             return res.status(400).json({
//                 success: false,
//                 message: "No expenses found"
//             });
//         }
//         await transaction.commit();
//         return res.status(201).json({
//             success: true,
//             message: "Expenses found successfully",
//             expense: allExpenses
//         })
//     } catch (err) {
//         await transaction.rollback();
//         return res.status(500).json({
//             success: false,
//             message: "ERROR: " + err.message
//         });
//     }
// }

// ...existing code...


const getAllExpenses = async (req, res) => {
  try {
    const userId = req.user.id;

    // Pagination & filtering
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 20, 1), 100);
    const offset = (page - 1) * limit;

    const where = { userId };

    // Optional query filters example: categoryId, fromDate, toDate
    if (req.query.categoryId) where.categoryId = parseInt(req.query.categoryId, 10);
    if (req.query.fromDate || req.query.toDate) {
      where.date = {};
      if (req.query.fromDate) where.date[Op.gte] = new Date(req.query.fromDate);
      if (req.query.toDate) where.date[Op.lte] = new Date(req.query.toDate);
    }

    const { count, rows } = await Expense.findAndCountAll({
      where,
      include: [{ model: Category, attributes: ['id', 'name'] }],
      order: [['date', 'DESC']],
      limit,
      offset
    });

    return res.status(200).json({
      success: true,
      message: 'Expenses retrieved successfully',
      meta: {
        total: count,
        page,
        perPage: limit,
        totalPages: Math.ceil(count / limit)
      },
      expenses: rows
    });
  } catch (err) {
    console.error('getAllExpenses Error:', err);
    return res.status(500).json({
      success: false,
      message: 'ERROR: ' + err.message
    });
  }
};

module.exports = { createExpenses, getAllExpenses };