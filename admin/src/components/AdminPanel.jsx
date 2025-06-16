import { useState } from "react";
import AdminDashboard from "./AdminDashboard";

export default function AdminPanel() {
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // Note: Password is hardcoded for simplicity. Do NOT use this in production.
        const correctPassword = "Ashim@2062";

        if (password === correctPassword) {
            setLoggedIn(true);
            setError("");
        } else {
            setError("Incorrect password. Please try again.");
        }
    };

    if (!loggedIn) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
                <h2 className="text-3xl font-bold mb-6">Admin Panel Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-xs">
                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
                    >
                        Login
                    </button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </form>
            </div>
        );
    }

    return <AdminDashboard />;
}
