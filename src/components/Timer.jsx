// CountdownTimer.jsx
import React, { useState, useEffect } from 'react';

function CountdownTimer({ initialTime, onTimerEnd }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimerEnd();  // Trigger callback when timer ends
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimerEnd]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Time Left: {formatTime(timeLeft)}</h1>
    </div>
  );
}

export default CountdownTimer;
