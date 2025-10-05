import { useState, useEffect } from "react";

export function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function useLearningTimer(expiryTime) {
  const [remainTime, setRemaining] = useState(expiryTime);

  console.log({ remainTime });

  useEffect(() => {
    if (expiryTime == undefined) return;

    setRemaining(expiryTime); // initialize on mount or expiryTime change

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1 || prev === undefined) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  return {
    remainTime,
    formattedTime: formatTime(remainTime),
  };
}
