import React, { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Summary from "../components/Summary";

const Dashboard = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleExpenseAdded = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="p-6 font-sans">
            <h1 className="text-3xl font-bold mb-6">Expense Splitter</h1>

            <div className="flex flex-wrap gap-6 items-start">
                <div className="flex-1 min-w-[300px]">
                    <ExpenseForm onExpenseAdded={handleExpenseAdded} />
                </div>

                <div className="flex-2 min-w-[300px]">
                    <ExpenseList refreshKey={refreshKey} />
                </div>
            </div>

            <div className="mt-8">
                <Summary refreshKey={refreshKey} />
            </div>
        </div>
    );
};

export default Dashboard;
