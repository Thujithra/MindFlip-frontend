import React from "react";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import "../components/AuthForm.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSubmit = (userData) => {
    console.log("Register data:", userData);
    navigate("/game"); // Redirect to the game page or dashboard after registration
  };

  return (
    <div className="auth-page">
      <AuthForm type="register" onSubmit={handleRegisterSubmit} />
    </div>
  );
};

export default RegisterPage;
