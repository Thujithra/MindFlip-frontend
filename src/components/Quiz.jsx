import React, { useState, useEffect } from "react";
import { fetchQuestionAnswerPair } from "../api/Api";
import Message from "../components/Message";
import "./Quiz.css";

function QuizComponent({ closeQuiz }) {
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
      closeQuiz(); // Close the quiz modal when the answer is correct
    } else {
      setFeedback("Incorrect. Try again!");
      setMessage("Answer is incorrect! Please try again.");
      setShowMessage(true);
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    loadQuestion();
  };

  if (!questionData) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="quiz-container">
      <h2>Quiz Question</h2>
      <img src={questionData.question} alt="Quiz" className="quiz-image" />
      <div>
        <input
          type="number"
          placeholder="Your answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button onClick={handleAnswerSubmit}>Submit Answer</button>
      </div>
      <Message message={message} onClose={handleCloseMessage} show={showMessage} />
    </div>
  );
}

export default QuizComponent;
