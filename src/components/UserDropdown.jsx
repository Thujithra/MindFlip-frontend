import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./UserDropdown.css";

const UserDropdown = ({ user, setUser }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    // Function to clear cookies
    const clearCookies = () => {
        const allCookies = Cookies.get();
        Object.keys(allCookies).forEach((cookieName) => {
            Cookies.remove(cookieName, { path: "/", domain: window.location.hostname });
        });
        console.log("Cookies cleared successfully.");
    };

    // Function to handle sign out
    const handleSignOut = () => {
        console.log("Sign out initiated...");
        localStorage.removeItem("authToken");
        navigate("/"); // Redirect to the welcome page
        setUser(null); // Reset user state
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="user-dropdown-container">
            <div className="user-button" onClick={toggleDropdown}>
                <i className="fas fa-user-circle"></i>
            </div>
            {isDropdownVisible && (
                <div className="dropdown-menu">
                    <p className="user-name">
                        {user ? `Welcome, ${user.username}` : "Player"}
                    </p>
                    <button onClick={handleSignOut} className="sign-out-button">
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
