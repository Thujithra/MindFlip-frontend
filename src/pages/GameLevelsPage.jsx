import React from "react";
import { useNavigate } from "react-router-dom";
import "./GameLevelsPage.css";

const GameLevelsPage = ({ user }) => {
  const navigate = useNavigate();

  const handleLeaderboardClick = () => {
    if (user) {
      navigate("/leaderboard");
    } else {
      alert("Only logged-in users can view the leaderboard.");
    }
  };

  const startGame = (difficulty) => {
    navigate(`/game`, { state: { difficulty } });
  };

  return (
    <div className="game-levels-page">
      <h1>
        Welcome {user ? `, ${username}` : " Guest "}
         to Banana MindFlip Game{" "}
      </h1>{" "}
      <p> Select your difficulty level: </p>{" "}
      <div className="levels">
        <button className="easy" onClick={() => startGame("easy")}>
          <i className="fas fa-leaf"> </i> Easy{" "}
        </button>{" "}
        <button className="medium" onClick={() => startGame("medium")}>
          <i className="fas fa-lightbulb"> </i> Medium{" "}
        </button>{" "}
        <button className="hard" onClick={() => startGame("hard")}>
          <i className="fas fa-fire"> </i> Hard{" "}
        </button>{" "}
      </div>{" "}
      <button className="leaderboard" onClick={handleLeaderboardClick}>
        <i className="fas fa-trophy"> </i> Leaderboard{" "}
        <i className="fas fa-trophy"> </i>{" "}
      </button>{" "}
    </div>
  );
};

export default GameLevelsPage;
