import React from "react";

const Analaysis = ({ children }) => {
  return (
    <div className="transition-all duration-300 transform bg-white border border-blue-200 hover:shadow-lg hover:shadow-gray-200 hover:scale-105 rounded-xl">
      {children}
    </div>
  );
};

export default Analaysis;
