import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { registerUser, loginUser } from "../api/Api";

const AuthForm = ({ type }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            if (type === "register") {
                await registerUser({ username, email, password });
                navigate("/login");

                alert("Registration successful!");
            } else {
                const data = await loginUser({ username, password });
                Cookies.set("username", username, { expires: 7 }); // Store cookie for 7 days
                // alert("Login successful!");
                alert("Login successful!");
                navigate("/game-levels");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        }
    };

    const handleClose = () => {
        navigate("/");
    };

    return (
        <div className="auth-container">
            <div className="close-button" onClick={handleClose}>
                <i className="fas fa-times"></i>
            </div>
            <h2>{type === "login" ? "🍌 Login to Mind Flip 🍌" : "🍌 Register to Mind Flip 🍌"}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                {type === "register" && (
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">
                    {type === "login" ? "Login" : "Register"}
                </button>
            </form>
            <div className="switch-link">
                {type === "login" ? (
                    <>
                        Don't have an account? <a href="/register">Register here</a>
                    </>
                ) : (
                    <>
                        Already have an account? <a href="/login">Login here</a>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
