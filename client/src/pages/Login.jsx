import { useState } from "react";
import { loginUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await loginUser({ email, password });
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-md rounded p-6 w-96"
            >
                <h2 className="text-xl font-bold mb-4">Login</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>

                <p className="mt-4 text-sm">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-500 cursor-pointer"
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}
