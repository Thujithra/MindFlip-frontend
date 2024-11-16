import React from "react";
import "./BananaBackground.css";
import UserDropdown from './UserDropdown';

const BananaBackground = ({ children, user, onSignOut }) => {
  const generateBananaStyles = (numBananas) => {
    return [...Array(numBananas)].map((_, index) => {
      const topPosition = Math.random() * 100;
      const delay = (index * 0.25) + "s";
      const size = 30 + Math.random() * 20; // Random size between 30px and 50px

      return { topPosition, delay, size };
    });
  };

  const bananaStyles = generateBananaStyles(40);

  return (
    <div className="page">
      <div className="stars"></div>
      <div className="banana-background">
        {bananaStyles.map((style, index) => (
          <div
            key={index}
            className="banana"
            style={{
              top: `${style.topPosition}%`,
              animationDelay: style.delay,
              width: `${style.size}px`,
              height: `${style.size}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="user-dropdown-container">
        <UserDropdown user={user} onSignOut={onSignOut} />
      </div>
      <div className="page-content">{children}</div>
    </div>
  );
};

export default BananaBackground;