import React from "react";
import Profile from "./Profile";

const AvatarProgress = ({
  progress,
  size = 64,
  children,
  handleOnclick,
  className,
}) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      onClick={handleOnclick}
      className={className}
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute top-0 left-0 transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6" // Tailwind blue-500
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all bg-red-500 duration-300 ease-out"
        />
      </svg>

      {children}
    </div>
  );
};

export default AvatarProgress;
