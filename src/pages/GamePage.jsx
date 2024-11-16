import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import CountdownTimer from "../components/Timer";
import QuizComponent from "../components/Quiz";
import "./GamePage.css";

const GamePage = () => {
  const location = useLocation();
  const { difficulty } = location.state || { difficulty: "easy" };

  const [pairCount, setPairCount] = useState(6);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    if (difficulty === "easy") {
      setPairCount(6);
    } else if (difficulty === "medium") {
      setPairCount(8);
    } else if (difficulty === "hard") {
      setPairCount(10);
    }
  }, [difficulty]);

  const handleTimerEnd = () => {
    setShowQuiz(true);
  };

  const closeModal = () => {
    setShowQuiz(false);
  };

  return (
    <div className="game-page">
      <h1 className="game-title">Memory Card Game</h1>
      <div className="game-content">
        {showQuiz ? (
          <div className="modal-overlay">
            <div className="modal-content">
              <QuizComponent closeQuiz={closeModal} />
            </div>
          </div>
        ) : (
          <>
            <div className="timer-container">
              <CountdownTimer initialTime={60} onTimerEnd={handleTimerEnd} />
            </div>
            <GameBoard pairCount={pairCount} />
          </>
        )}
      </div>
    </div>
  );
};

export default GamePage;