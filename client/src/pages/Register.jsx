import { useState } from "react";
import { registerUser } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await registerUser({ name, email, password });
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                onSubmit={handleRegister}
                className="bg-white shadow-md rounded p-6 w-96"
            >
                <h2 className="text-xl font-bold mb-4">Register</h2>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                    required
                />

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
                    Register
                </button>

                <p className="mt-4 text-sm">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-500 cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}
