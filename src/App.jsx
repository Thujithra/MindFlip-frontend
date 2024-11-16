import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GameLevelsPage from "./pages/GameLevelsPage";
import BananaBackground from "./components/BananaBackground";
import GamePage from "./pages/GamePage";

const App = () => {
  const [user, setUser] = useState(null); // Track user login status

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null); // Sign out the user
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <BananaBackground user={user} onSignOut={handleSignOut}>
              <WelcomePage
                user={user}
                onLogin={handleLogin}
                onSignOut={handleSignOut}
              />{" "}
            </BananaBackground>
          }
        />{" "}
        <Route
          path="/login"
          element={
            <BananaBackground user={user} onSignOut={handleSignOut}>
              <LoginPage onLogin={handleLogin} />{" "}
            </BananaBackground>
          }
        />{" "}
        <Route
          path="/register"
          element={
            <BananaBackground user={user} onSignOut={handleSignOut}>
              <RegisterPage />
            </BananaBackground>
          }
        />{" "}
        <Route
          path="/game-levels"
          element={
            <BananaBackground user={user} onSignOut={handleSignOut}>
              <GameLevelsPage user={user} />{" "}
            </BananaBackground>
          }
        />{" "}
        <Route
          path="/game"
          element={
            <BananaBackground user={user} onSignOut={handleSignOut}>
              <GamePage />
            </BananaBackground>
          }
        />{" "}
      </Routes>{" "}
    </Router>
  );
};

export default App;
