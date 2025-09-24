import React from "react";

const Question = ({
  question,
  isActive,
  index,
  isAnswered,
  handleSelectedQuestion,
}) => {
  return (
    <div
      onClick={handleSelectedQuestion}
      className={`w-full text-left  p-3 rounded-lg border transition-colors ${
        isActive
          ? "border-blue-600 bg-blue-600  text-white"
          : isAnswered
          ? "border-blue-400 cursor-pointer bg-blue-100 text-blue-800"
          : "border-blue-200 cursor-pointer hover:border-blue-400 hover:bg-blue-100 text-blue-700"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-medium ${
            isActive
              ? "border-white bg-white text-blue-600"
              : isAnswered
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-blue-400 text-blue-600"
          }`}
        >
          {isAnswered ? "✓" : index + 1}
        </div>
        <p className="text-sm text-pretty line-clamp-2">{question}</p>
      </div>
    </div>
  );
};

export default Question;
