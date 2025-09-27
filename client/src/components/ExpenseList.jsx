import React, { useEffect, useState } from "react";
import { getExpenses } from "../api/expenseApi";

const ExpenseList = ({ refreshKey }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const data = await getExpenses();
            setExpenses(data.expenses);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch expenses:", err);
            setError("Failed to load expenses.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, [refreshKey]);

    if (loading)
        return <p className="text-gray-700 font-medium">Loading expenses...</p>;
    if (error) return <p className="text-red-500 font-medium">{error}</p>;

    return (
        <div className="w-full bg-white rounded-lg shadow border border-neutral-400 p-6 mt-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
                Expense List
            </h2>

            {expenses.length === 0 ? (
                <p className="text-gray-600">No expenses yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Title
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Amount
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Paid By
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Participants
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {expenses.map((expense) => (
                                <tr
                                    key={expense._id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2 text-gray-800">
                                        {expense.title}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        ${expense.amount.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {expense.paidBy}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {expense.participants.join(", ")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;
