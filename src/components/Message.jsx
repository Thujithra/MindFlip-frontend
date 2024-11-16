import React from "react";
import "./Message.css"; // Make sure you have the styles for the popup

const Message = ({ message, onClose, show }) => {
  if (!show) return null; // Don't render the popup if show is false

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="popup-message">
          <p>{message}</p>
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Message;
