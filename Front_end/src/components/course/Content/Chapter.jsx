import React, { useState } from "react";

const Chapter = ({ sectionNumber, title, config }) => {
  return (
    <div class="bg-gray-50 flex items-center justify-between text-md capitalize px-6 py-4 border-b border-gray-200">
      <h3 class="font-semibold text-blue-800">
        Section {sectionNumber} : {title}
      </h3>
      {config && (
        <div className="flex items-center justify-center gap-3">
          <i className="far fa-edit text-blue-500"></i>
          <div
            onClick={config.openSubChapterModal}
            className="w-6 h-6 flex cursor-pointer rounded-full bg-blue-500 justify-center items-center"
          >
            <i className="far fa-plus text-white"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chapter;
