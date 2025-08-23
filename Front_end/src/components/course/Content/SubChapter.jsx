import React from "react";

const SubChapter = ({ title, totalMinute, isMainColor = true }) => {
  return (
    <div className="px-6 py-4 flex items-center border-gray-200 bg-inherit border-b ">
      <div className="flex items-center flex-1">
        <i
          className={`far fa-play-circle ${
            isMainColor ? "text-inherit" : "text-blue-500"
          } mr-4`}
        ></i>
        <span className="text-inherit capitalize">{title}</span>
      </div>
      {isMainColor && (
        <div className="">
          <i
            className={`far fa-edit ${
              isMainColor ? "text-inherit" : "text-blue-500"
            } mr-4`}
          ></i>
          <i
            className={`far fa-trash-alt ${
              isMainColor ? "text-inherit" : "text-red-500"
            }`}
          ></i>
        </div>
      )}
      <div className="flex-1 flex items-center justify-end">
        <i
          className={`far fa-clock ${
            isMainColor ? "text-inherit" : "text-blue-500"
          } mr-2`}
        ></i>
        <span className="text-sm text-inherit"> {totalMinute} min</span>
      </div>
    </div>
  );
};

export default SubChapter;
