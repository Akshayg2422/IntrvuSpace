import React, { useState, useEffect } from "react";

const useTimer = (initialValue: number) => {
  const [seconds, setSeconds] = useState<number>(initialValue);

  useEffect(() => {
    const timer =
      seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
    return () => clearInterval(timer as never);
  }, [seconds]);

  function handleSetSeconds(timer: number) {
    setSeconds(timer);
  }

  return {
    seconds,
    setSeconds: handleSetSeconds,
  };
};

export { useTimer };
