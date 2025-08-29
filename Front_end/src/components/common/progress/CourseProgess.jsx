import React from "react";
import CustomizedProgressBars from "./LinearProgress";
import { Link } from "react-router-dom";

const CourseProgress = ({
  title,
  progress,
  description,
  thumbnail,
  totalLessons,
  completedLessons,
  slug,
  isReading = false,
}) => {
  return (
    <div className="course-card bg-white border border-gray-200 rounded-lg overflow-hidden transition duration-300">
      {!isReading && (
        <div className="relative">
          <img
            src={"http://localhost:5000/uploads/" + thumbnail.split("\\")[1]}
            alt="Course"
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
            Active
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="pb-2">
          <CustomizedProgressBars value={progress} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <i className="fas fa-play-circle mr-1"></i>
            <span>
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          {!isReading && (
            <Link
              to={`/course/${slug}/learn`}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Continue
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
