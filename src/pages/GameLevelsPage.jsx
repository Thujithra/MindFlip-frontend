import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Ensure Cookies is imported
import "./GameLevelsPage.css";


const GameLevelsPage = ({ user }) => {
  const navigate = useNavigate();

  const handleLeaderboardClick = () => {
    const token = Cookies.get("username");  // Ensure token retrieval from cookies
    console.log("Token from Cookies:", token); // Log the token to verify it's being retrieved
  
    if (token) {
      navigate("/leaderboard"); // Navigate to leaderboard if logged in
    } else {
      alert("Only logged-in users can view the leaderboard.");
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  const startGame = (difficulty) => {
    navigate(`/game`, { state: { difficulty } });
  };

  return (
    <div className="game-levels-page">
      <h1>Welcome to Banana MindFlip Game</h1>
      <p>Select your difficulty level:</p>
      <div className="levels">
        <button className="easy" onClick={() => startGame("easy")}>
          <i className="fas fa-leaf"></i> Level 1
        </button>
        <button className="medium" onClick={() => startGame("medium")}>
          <i className="fas fa-lightbulb"></i> Level 2
        </button>
        <button className="hard" onClick={() => startGame("hard")}>
          <i className="fas fa-fire"></i> Level 3
        </button>
      </div>
      <button className="leaderboard" onClick={handleLeaderboardClick}>
        <i className="fas fa-trophy"></i> Leaderboard <i className="fas fa-trophy"></i>
      </button>
    </div>
  );
};

export default GameLevelsPage;
