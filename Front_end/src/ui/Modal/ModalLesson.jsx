import React from "react";

const ModalLesson = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-[#E9E9E9]/50  flex items-center justify-center z-50">
      <div
        className={`bg-white modal-content-fade-in shadow-lg shadow-gray-300 rounded-2xl modal-content-fade-in  p-6 w-full max-w-md`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLesson;
