import React from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLoginSubmit = (userData) => {
    console.log("Login data:", userData);
    onLogin(userData); // Call onLogin to set the user state
    navigate("/game-levels"); // Redirect to the levels page after login
  };

  return (
    <div className="auth-page">
      <AuthForm type="login" onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default LoginPage;
