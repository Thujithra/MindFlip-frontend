import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GameLevelsPage from "./pages/GameLevelsPage";
import BananaBackground from "./components/BananaBackground";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage"; // Import LeaderboardPage
import UserDropdown from "./components/UserDropdown"; // Import UserDropdown

const App = () => {
  const [user, setUser] = useState(null); // Track user login status

  // Function to handle user login
  const handleLogin = (userData) => {
    setUser(userData); // Update the user state when logged in
  };

  // Function to handle user logout
  const handleSignOut = () => {
    setUser(null); // Sign out the user by clearing the user state
  };

  return (
    <Router>
      <div className="app-container">
        
        <Routes>
          <Route
            path="/"
            element={
              <BananaBackground user={user} onSignOut={handleSignOut}>
                <WelcomePage user={user} onLogin={handleLogin} onSignOut={handleSignOut} />
              </BananaBackground>
            }
          />
          <Route
            path="/login"
            element={
              <BananaBackground user={user} onSignOut={handleSignOut}>
                <LoginPage onLogin={handleLogin} />
              </BananaBackground>
            }
          />
          <Route
            path="/register"
            element={
              <BananaBackground user={user} onSignOut={handleSignOut}>
                <RegisterPage />
              </BananaBackground>
            }
          />
          <Route
            path="/game-levels"
            element={
              <BananaBackground user={user} onSignOut={handleSignOut}>
                <GameLevelsPage user={user} />
              </BananaBackground>
            }
          />
          <Route
            path="/game"
            element={
              <BananaBackground user={user} onSignOut={handleSignOut}>
                <GamePage />
              </BananaBackground>
            }
          />
          {/* New Route for Leaderboard */}
          <Route
            path="/leaderboard"
            element={
              <BananaBackground user={user} onSignOut={handleSignOut}>
                <LeaderboardPage user={user} />
              </BananaBackground>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
