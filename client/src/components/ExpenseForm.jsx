import React, { useState, useEffect } from "react";
import { getUsers } from "../api/userApi";
import { addExpense } from "../api/expenseApi";

const ExpenseForm = ({ onExpenseAdded }) => {
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [paidBy, setPaidBy] = useState("");
    const [participants, setParticipants] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!title || !amount || !paidBy || participants.length === 0) {
            setError(
                "All fields are required and at least one participant must be selected"
            );
            return;
        }

        if (amount <= 0) {
            setError("Amount must be greater than 0");
            return;
        }

        try {
            await addExpense({
                title,
                amount: parseFloat(amount),
                paidBy,
                participants,
            });

            setTitle("");
            setAmount("");
            setPaidBy("");
            setParticipants([]);

            if (onExpenseAdded) onExpenseAdded();
        } catch (err) {
            setError("Failed to add expense. Try again.", err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-4">
            <div className="w-full border border-neutral-400 bg-white rounded-lg shadow sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 sm:p-8">
                    <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
                        Add Expense
                    </h2>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Dinner at Joe's"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Amount
                            </label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="60"
                                step="0.01"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Paid By
                            </label>
                            <select
                                value={paidBy}
                                onChange={(e) => setPaidBy(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            >
                                <option value="">--Select--</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user.name}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Participants
                            </label>
                            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto border border-gray-300 p-2 rounded-lg bg-gray-50">
                                {users.map((user) => (
                                    <label
                                        key={user._id}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            value={user.name}
                                            checked={participants.includes(
                                                user.name
                                            )}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (
                                                    participants.includes(value)
                                                ) {
                                                    setParticipants(
                                                        participants.filter(
                                                            (p) => p !== value
                                                        )
                                                    );
                                                } else {
                                                    setParticipants([
                                                        ...participants,
                                                        value,
                                                    ]);
                                                }
                                            }}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-gray-900">
                                            {user.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Add Expense
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ExpenseForm;
