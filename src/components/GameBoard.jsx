import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./GameBoard.css";

const generateCards = (pairCount) => {
  const images = Array.from(
    { length: 17 },
    (_, index) => `/cardbanana/${index + 1}.jpg`
  );
  const selectedImages = new Set();

  while (selectedImages.size < pairCount) {
    selectedImages.add(images[Math.floor(Math.random() * images.length)]);
  }

  const cards = Array.from(selectedImages).flatMap((image, index) => [
    { id: `question-${index}`, solution: index, image, type: "question" },
    { id: `answer-${index}`, solution: index, image, type: "answer" },
  ]);

  return cards.sort(() => Math.random() - 0.5);
};

const GameBoard = ({ pairCount, gameState, updateGameState, showQuiz }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    setCards(generateCards(pairCount));
    setMatchedPairs(gameState.matchedPairs || 0);
  }, [pairCount]);

  const handleClick = (clickedCard) => {
    if (
      isChecking ||
      flippedCards.some((card) => card.id === clickedCard.id) ||
      clickedCard.matched ||
      showQuiz ||
      gameWon
    )
      return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = newFlippedCards;

      if (
        firstCard.solution === secondCard.solution &&
        firstCard.type !== secondCard.type
      ) {
        setMatchedPairs((prev) => prev + 1);
        setCards((prevCards) =>
          prevCards.map((card) =>
            newFlippedCards.some((flippedCard) => flippedCard.id === card.id)
              ? { ...card, matched: true }
              : card
          )
        );
        updateGameState(matchedPairs + 1);
      }

      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (matchedPairs === pairCount) {
      setGameWon(true);
    }
  }, [matchedPairs, pairCount]);

  const handlePlayAgain = () => {
    setCards(generateCards(pairCount));
    setGameWon(false);
  };

  return (
    <div className="game-board">
      {gameWon ? (
        <div className="game-over">
          <p>🎉 You Win! 🎉</p>
          <p className="score">🍌 Score: {matchedPairs}</p>
          <button onClick={handlePlayAgain} className="play-again-btn">
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(cards.length))}, 1fr)`,
            }}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onClick={handleClick}
                isFlipped={flippedCards.includes(card) || card.matched}
                isMatched={card.matched}
              />
            ))}
          </div>
          <div className="game-controls">
            <p className="score">🍌 Score: {matchedPairs}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default GameBoard;
