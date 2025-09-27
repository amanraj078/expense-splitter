const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
            min: [1, "Amount must be greater than 0"],
        },
        paidBy: {
            type: String,
            required: true,
            trim: true,
        },
        participants: {
            type: [String],
            required: true,
            validate: [
                (arr) => arr.length > 0,
                "At least one participant is required",
            ],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ExpenseModel = mongoose.model("Expense", expenseSchema);

module.exports = ExpenseModel;
