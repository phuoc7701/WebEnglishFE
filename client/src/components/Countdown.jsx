import React, { useState, useEffect } from "react";

const Countdown = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration); // in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="text-lg font-bold text-red-600 mb-2">
      Thời gian còn lại: {formatTime(timeLeft)}
    </div>
  );
};

export default Countdown;
