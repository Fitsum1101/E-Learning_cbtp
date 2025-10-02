import { useState, useEffect, useCallback } from "react";

// Format seconds → mm:ss
function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

// 🕒 Hook for tracking remaining learning time from backend timestamp
export function useLearningTimer(expiryTimeString) {
  // Convert backend string → timestamp
  const expiryTime = new Date(expiryTimeString).getTime();

  console.log({ expiryTime });

  const calcRemaining = () => {
    const now = Date.now();
    const diff =
      Math.max(0, Math.floor((expiryTime - now) / 1000)) + 1 * 1000000; // seconds left
    return diff;
  };

  const [remainingTime, setRemainingTime] = useState(calcRemaining());
  const [isActive, setIsActive] = useState(true);

  // ⏳ Countdown effect
  useEffect(() => {
    let timer;

    if (isActive && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(calcRemaining());
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, expiryTime]);

  console.log({ remainingTime });
  // 📤 API call to submit current remaining time

  return {
    remainingTime,
    formattedTime: formatTime(remainingTime),
    setIsActive,
  };
}
