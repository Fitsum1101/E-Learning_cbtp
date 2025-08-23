import React from "react";

const Certificate = ({ title, date }) => {
  return (
    <div className="flex items-center p-3 border border-gray-200 rounded-lg">
      <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg mr-4">
        <i className="fas fa-certificate text-2xl"></i>
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500">Completed on {date}</p>
      </div>
      <button className="ml-auto text-indigo-600 hover:text-indigo-800">
        <i className="fas fa-download"></i>
      </button>
    </div>
  );
};

export default Certificate;
