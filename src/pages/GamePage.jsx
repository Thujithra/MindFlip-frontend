import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GameBoard from "../components/GameBoard";
import CountdownTimer from "../components/Timer";
import QuizComponent from "../components/Quiz";
import Cookies from "js-cookie";
import "./GamePage.css";
import { updateScore } from "../api/Api";
const GamePage = () => {
  const location = useLocation();
  const { difficulty } = location.state || { difficulty: "easy" };
  const [pairCount, setPairCount] = useState(6);
  const [showQuiz, setShowQuiz] = useState(false);
  const [gameState, setGameState] = useState({ score: 0, matchedPairs: 0 });

  useEffect(() => {
    setPairCount(difficulty === "easy" ? 6 : difficulty === "medium" ? 8 : 10);
  }, [difficulty]);

  useEffect(() => {
    const savedScore = Cookies.get("score");
    if (savedScore) {
      setGameState({ ...gameState, score: parseInt(savedScore, 10) });
    }
  }, []);
  const level = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;

  const handleTimerEnd = () => {
    localStorage.setItem("score", gameState.matchedPairs);
    updateScore(level, gameState.matchedPairs);
    console.error(level, gameState.matchedPairs);
    saveGameState();
    setShowQuiz(true);
  };

  const saveGameState = () => {
    updateScore(level, gameState.matchedPairs);
    console.error(level, gameState.matchedPairs);
    Cookies.set("score", gameState.score, { expires: 1 });
  };

  const restoreGameState = () => setShowQuiz(false);

  const restartGame = () => {
    setGameState({ score: 0, matchedPairs: 0 });
    setShowQuiz(false);
  };

  return (
    <div className="game-page">
      <h1 className="game-title"> Memory Card Game </h1>{" "}
      <div className="game-content">
        {" "}
        {showQuiz ? (
          <div className="modal-overlay">
            <div className="modal-content">
              <QuizComponent
                onCorrectAnswer={() =>
                  setGameState({
                    score: gameState.score,
                    matchedPairs: gameState.matchedPairs,
                  })
                }
                onWrongAnswer={restartGame}
                onCloseQuiz={() => setShowQuiz(false)}
              />{" "}
            </div>{" "}
          </div>
        ) : (
          <>
            <CountdownTimer initialTime={30} onTimerEnd={handleTimerEnd} />{" "}
            <GameBoard
              pairCount={pairCount}
              gameState={gameState}
              updateGameState={(matchedPairs) =>
                setGameState({ ...gameState, matchedPairs })
              }
              showQuiz={showQuiz}
            />{" "}
          </>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default GamePage;
