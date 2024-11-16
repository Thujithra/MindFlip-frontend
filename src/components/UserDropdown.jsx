import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDropdown.css';

const UserDropdown = ({ user, onSignOut }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        if (user) {
            onSignOut();
            navigate("/"); // Redirect to welcome page after sign-out
        }
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
                        {user ? `Welcome, ${user.username}` : 'Guest'}
                    </p>
                    <button
                        onClick={handleSignOut}
                        className="sign-out-button"
                        disabled={!user}
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;