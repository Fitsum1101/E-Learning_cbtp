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
  const [remainTime, setRemining] = useState(undefined);

  useEffect(() => {
    if (remainTime === undefined) return setRemining(expiryTime);

    const iterval = setInterval(() => {
      setRemining(remainTime - 1);
    }, 1000);

    return () => clearInterval(iterval);
  });
  return { remainTime, formattedTime: formatTime(remainTime) };
}
