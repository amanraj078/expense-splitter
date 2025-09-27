import React, { useEffect, useState } from "react";
import { getSummary } from "../api/expenseApi";

const Summary = ({ refreshKey }) => {
    const [balances, setBalances] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchSummary = async () => {
        try {
            setLoading(true);
            const data = await getSummary();
            setBalances(data.balances);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch summary:", err);
            setError("Failed to load summary.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, [refreshKey]);

    if (loading)
        return <p className="text-gray-700 font-medium">Loading summary...</p>;
    if (error) return <p className="text-red-500 font-medium">{error}</p>;

    const entries = Object.entries(balances);

    return (
        <div className="w-1/2 mx-auto bg-white rounded-lg shadow border p-6 mt-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>

            {entries.length === 0 ? (
                <p className="text-gray-600">No expenses yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Person
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    Balance
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {entries.map(([person, balance]) => (
                                <tr key={person} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 text-gray-800">
                                        {person}
                                    </td>
                                    <td
                                        className={`px-4 py-2 font-medium ${
                                            balance >= 0
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {balance >= 0
                                            ? `Owed $${balance.toFixed(2)}`
                                            : `Owes $${(-balance).toFixed(2)}`}
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

export default Summary;
