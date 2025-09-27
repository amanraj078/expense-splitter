const express = require("express");
const router = express.Router();

const {
    addExpense,
    getExpenses,
    getSummary,
} = require("../controller/expense.controller.js");
const protect = require("../middleware/authMiddleware.js");

router.post("/expenses", protect, addExpense);
router.get("/expenses", protect, getExpenses);
router.get("/summary", protect, getSummary);

module.exports = router;
