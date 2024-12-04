import React, { memo } from "react";
import "./Card.css";
import { useWithSound } from "../hook/useWithSound";
import flipSound from "../sounds/flip.mp3"; // Replace with your flip sound file

const Card = memo(({ card, onClick, isFlipped, isMatched }) => {
  const { playSound } = useWithSound(flipSound);

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      playSound();
      onClick(card);
    }
  };

  return (
    <div
      className={`grid-block ${isFlipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      }`}
      onClick={handleClick}
      aria-label={isFlipped ? "Flipped card" : "Hidden card"}
    >
      <div className="inner-card">
        <div className="front">
          <img src="/front1.png" alt="Card front" />
        </div>
        <div className="back">
          <img src={card.image || "/placeholder.png"} alt="Card back" />
        </div>
      </div>
    </div>
  );
});

export default Card;
