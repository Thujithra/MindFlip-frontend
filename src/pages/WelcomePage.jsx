import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = ({ user, onLogin, onSignOut }) => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to fetch the quote
  async function fetchQuote() {
    try {
      const response = await fetch("http://localhost:5000/quote-of-the-day");
      if (!response.ok) {
        throw new Error("Failed to fetch quote from the server");
      }
      const data = await response.json();
      setQuote(data.q); // The quote text from ZenQuotes API
      setAuthor(data.a); // The author name from ZenQuotes API
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the quote:", error);
      setError(true);
      setLoading(false);
    }
  }

  // Fetch quote on component mount
  useEffect(() => {
    fetchQuote();
  }, []);

  const handleGuestLogin = () => {
    onLogin({ name: "Guest" });
    localStorage.setItem("authToken", "Guest");
    navigate("/game-levels");
  };

  return (
    <div className="welcome-content">
      <h1 className="game-title">Banana MindFlip</h1>
      <div className="game-description">
        <p>Test your memory skills in this exciting game of matching pairs.</p>
        <p>Match cards, score points, and challenge yourself to beat your best score!</p>
      </div>

      {/* Quote of the Day Section */}
      <div className="quote-section">
        {loading ? (
          <p>Loading Quote of the Day...</p>
        ) : error ? (
          <p>Failed to load the quote. Please try again later.</p>
        ) : (
          <blockquote className="quote">
            "{quote}"
            <footer>- {author}</footer>
          </blockquote>
        )}
      </div>

      <div className="buttons">
        <button className="login" onClick={() => navigate("/login")}>
          <i className="fas fa-sign-in-alt"></i> Login
        </button>
        <button className="register" onClick={() => navigate("/register")}>
          <i className="fas fa-user-plus"></i> Register
        </button>
        <button className="guest" onClick={handleGuestLogin}>
          <i className="fas fa-user-secret"></i> Play as Guest
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
