import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = ({ user, onLogin, onSignOut }) => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    onLogin({ name: 'Guest' });
    navigate("/game-levels");
  };

  return (
    <div className="welcome-content">
      <h1 className="game-title">Banana MindFlip</h1>
      <div className="game-description">
        <p>Test your memory skills in this exciting game of matching pairs.</p>
        <p>Match cards, score points, and challenge yourself to beat your best score!</p>
      </div>
      <div className="buttons">
        <button className="login" onClick={() => navigate("/login")}>
          <i className="fas fa-sign-in-alt"></i> Login
        </button>
        <button className="register" onClick={() => navigate("/register")}>
          <i className="fas fa-user-plus"></i> Register
        </button>
        <button className="guest" onClick={() => navigate("/game-levels")}>
          <i className="fas fa-user-secret"></i> Play as Guest
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;