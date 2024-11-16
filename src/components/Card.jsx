import React from "react";
import "./Card.css";

const Card = ({ card, onClick, isFlipped }) => {
  return (
    <div
      className={`grid-block ${isFlipped ? "flipped" : ""}`}
      onClick={() => onClick(card)}
    >
      <div className="inner-card">
        {/* Front of the card */}
        <div className="front">
          <img src="/front1.png" alt="card front" />
        </div>
        {/* Back of the card */}
        <div className="back">
          <img src={card.image} alt="card back" />
        </div>
      </div>
    </div>
  );
};

export default Card;