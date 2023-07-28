import { useState, useEffect } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Function to update the time every second
    const updateTimer = () => {
      setTime((prevTime) => prevTime + 1);
    };

    // Set up the interval to update the time every second
    const intervalId = setInterval(updateTimer, 1000);

    // Clean up the interval when the component unmounts or when the time reaches a specific value (if needed)
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  // Helper function to format time in HH:mm:ss format
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return { time, formatTime };
};

export {useTimer}