import React, { useState, useEffect } from "react";
import "./index.css";

const CountdownTimer = ({ initialSeconds, endCall }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        endCall();
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [seconds]);

  return (
    <>
      <div className="">
        <div className="d-flex justify-content-center text-secondary">
          Your interview will be ended in
        </div>
        <div className="d-flex justify-content-center">
          <div className="seconds-style">{`${seconds}`}</div>
        </div>
      </div>
    </>
  );
};

export { CountdownTimer };
