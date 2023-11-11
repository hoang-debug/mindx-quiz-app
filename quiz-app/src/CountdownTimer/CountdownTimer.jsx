import React, { useEffect, useState } from "react";

function CountdownTimer({ duration }) {
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setRemainingTime(remainingTime - 1);

      if (remainingTime <= 0) {
        clearInterval(countdownTimer);
      }
    }, 1000);

    return () => {
      clearInterval(countdownTimer);
    };
  }, [remainingTime]);

  useEffect(()=> {
    setRemainingTime(duration)
  }, [duration])

  return (
    <div>
      <h1>Countdown Timer</h1>
      <h1>{remainingTime}</h1>
    </div>
  );
}

export default CountdownTimer;
