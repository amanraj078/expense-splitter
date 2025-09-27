const ExpenseModel = require("../model/expense.model.js");

const addExpense = async (req, res) => {
    try {
        const { title, amount, paidBy, participants } = req.body;
        if (
            !title ||
            !amount ||
            !paidBy ||
            !participants ||
            participants.length === 0
        ) {
            return res.status(400).json({
                error: "All fields are required and at least one participant must be selected",
            });
        }
        if (amount <= 0) {
            return res
                .status(400)
                .json({ error: "Amount must be greater than 0" });
        }
        const expense = new ExpenseModel({
            title,
            amount,
            paidBy,
            participants,
            user: req.user._id,
        });
        await expense.save();
        return res
            .status(201)
            .json({ message: "Expense added successfully", expense });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseModel.find({ user: req.user._id });
        return res.status(200).json({ expenses });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};

const getSummary = async (req, res) => {
    try {
        const expenses = await ExpenseModel.find();
        const balances = {};

        expenses.forEach((expense) => {
            const share = expense.amount / expense.participants.length;

            // const expenses = ExpenseModel.find({ user: req.user._id });
            balances[expense.paidBy] += expense.amount - share;

            expense.participants.forEach((person) => {
                if (!balances[person]) balances[person] = 0;
                if (person === expense.paidBy) {
                    balances[person] += expense.amount - share;
                } else {
                    balances[person] -= share;
                }
            });
        });

        return res.status(200).json({ balances });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    getSummary,
};
