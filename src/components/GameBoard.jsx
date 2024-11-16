import React, { useEffect, useState } from "react";
import Card from "./Card";
import "./GameBoard.css";

const generateCards = (pairCount) => {
  const images = Array.from(
    { length: 17 },
    (_, index) => `/cardbanana/${index + 1}.jpg`
  );
  const selectedImages = [];

  while (selectedImages.length < pairCount) {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    if (!selectedImages.includes(randomImage)) {
      selectedImages.push(randomImage);
    }
  }

  const cards = [];
  selectedImages.forEach((image, index) => {
    const pair = { id: `pair-${index}`, solution: index, image: image };
    cards.push({ ...pair, id: `question-${index}`, type: "question" });
    cards.push({ ...pair, id: `answer-${index}`, type: "answer" });
  });

  return cards.sort(() => Math.random() - 0.5);
};

const GameBoard = ({ pairCount }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // Calculate the number of columns dynamically
  const calculateColumns = (pairs) => {
    if (pairs <= 6) return 4; // Easy
    if (pairs <= 8) return 4; // Medium
    return 5; // Hard
  };

  const columns = calculateColumns(pairCount);

  useEffect(() => {
    setCards(generateCards(pairCount));
    setMatchedPairs(0);
  }, [pairCount]);

  const handleClick = (clickedCard) => {
    if (
      isChecking ||
      flippedCards.some((card) => card.id === clickedCard.id) ||
      clickedCard.matched
    )
      return;

    const newFlippedCards = [...flippedCards, clickedCard];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      if (
        newFlippedCards[0].solution === newFlippedCards[1].solution &&
        newFlippedCards[0].type !== newFlippedCards[1].type
      ) {
        setMatchedPairs((prev) => prev + 1);
        setCards((prevCards) =>
          prevCards.map((card) =>
            newFlippedCards.some((flippedCard) => flippedCard.id === card.id)
              ? { ...card, matched: true }
              : card
          )
        );
      }
      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  return (
    <div className="game-board">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {" "}
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleClick}
            isFlipped={
              flippedCards.some((flippedCard) => flippedCard.id === card.id) ||
              card.matched
            }
          />
        ))}{" "}
      </div>{" "}
      {matchedPairs === pairCount && (
        <div className="game-status">
          <p> 🎉You Win!🎉 </p>{" "}
        </div>
      )}{" "}
      <div className="game-controls">
        <p className="score"> 🍌Score: {matchedPairs} </p>{" "}
        {matchedPairs === pairCount && (
          <button
            className="playbutton"
            onClick={() => setCards(generateCards(pairCount))}>
            <i class="fa-regular fa-circle-play"></i>Play Again{" "}
          </button>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default GameBoard;
