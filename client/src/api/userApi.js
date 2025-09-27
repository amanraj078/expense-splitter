import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, userData);

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (err) {
        console.error("Error registering user:", err);
        throw err.response?.data || err;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, userData);
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (err) {
        console.error("Error logging in:", err);
        throw err.response?.data || err;
    }
};

export const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/get`);
        return response.data;
    } catch (err) {
        console.error("Error fetching users:", err);
        throw err;
    }
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};
