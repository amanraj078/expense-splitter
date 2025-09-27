import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const getExpenses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/expenses`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
};

export const addExpense = async (expenseData) => {
    try {
        const response = await axios.post(`${BASE_URL}/expenses`, expenseData, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (err) {
        console.error("Error adding expense:", err);
        throw err;
    }
};

export const getSummary = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/summary`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (err) {
        console.error("Error fetching summary:", err);
        throw err;
    }
};
