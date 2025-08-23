import React from "react";

const Tutorials = () => {
  return (
    <div className="flex flex-col gap-3 h-[200px] bg-white p-10 mb-5 rounded-lg shadow">
      <h2 className="font-bold capitalize text-2xl">Tutorials</h2>
      <div className="text-gray-500 flex flex-col gap-3">
        <p>
          All our tutorials are free and easy to follow, with simple
          explanations, examples, and exercises to help you learn a coding
          language at your own pace.
        </p>
        <p>
          Track your progress at w3schools.com, and unlock achievements as you
          go!
        </p>
      </div>
    </div>
  );
};

export default Tutorials;
