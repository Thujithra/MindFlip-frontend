import React, { useState, useEffect } from "react";
import { fetchQuestionAnswerPair } from "../api/Api";
import Message from "../components/Message";
import "./Quiz.css";

function QuizComponent({ onCorrectAnswer, onWrongAnswer, onCloseQuiz }) {
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    const data = await fetchQuestionAnswerPair();
    if (data) {
      setQuestionData(data);
      setUserAnswer("");
      setFeedback("");
    }
  };

  const handleAnswerSubmit = () => {
    if (parseInt(userAnswer, 10) === questionData.solution) {
      setFeedback("Correct!");
      setMessage("Correct answer!");
      setShowMessage(true);
      onCorrectAnswer(); // Call callback for correct answer
    } else {
      setFeedback("Incorrect. Try again!");
      setMessage("Answer is incorrect! Restarting game...");
      setShowMessage(true);
      onWrongAnswer(); // Call callback for wrong answer
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    // Close the quiz and go back to the game page
    onCloseQuiz(); // Ensure the quiz closes and game page shows again
  };

  return (
    <div className="quiz-container">
      <div className="close-button" onClick={onCloseQuiz}>
        <i className="fas fa-times"></i>
      </div>
      <h2>Quiz Question</h2>
      {questionData && (
        <img src={questionData.question} alt="Quiz" className="quiz-image" />
      )}
      <div>
        <input
          type="number"
          placeholder="Your answer"
          value={userAnswer}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || (/^[0-9]$/.test(value))) {
              setUserAnswer(value);
            }
          }}
        />
        <button onClick={handleAnswerSubmit}>Submit Answer</button>
      </div>
      <Message message={message} onClose={handleCloseMessage} show={showMessage} />
    </div>
  );
}

export default QuizComponent;
