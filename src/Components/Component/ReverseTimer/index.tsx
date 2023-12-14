
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const ReverseTimer = () => {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => Math.max(0, prevSeconds - 1));
    }, 1000);

    // Clear the interval when the component unmounts or when the timer reaches 0
    return () => clearInterval(intervalId);
  }, []);

  // Display the timer value in the component
  return (
    <div style={{ width: 200, height: 200 }}>
      <CircularProgressbar
        value={seconds * (100 / 5)} // Calculate the percentage based on the original 5 seconds
        text={`${seconds}s`}
        styles={buildStyles({
          textSize: '20px',
          pathColor: '#4cc916',
          textColor: '#014d0d',
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default ReverseTimer