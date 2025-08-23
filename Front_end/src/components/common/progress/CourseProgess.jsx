import React from "react";
import CustomizedProgressBars from "./LinearProgress";

const CourseProgress = ({ course, progress }) => {
  return (
    <div className="course-card bg-white border border-gray-200 rounded-lg overflow-hidden transition duration-300">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="Course"
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
          Active
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">Data Science Fundamentals</h3>
        <p className="text-gray-600 text-sm mb-3">
          Master the basics of data analysis and visualization
        </p>
        <div className="pb-2">
          <CustomizedProgressBars />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <i className="fas fa-play-circle mr-1"></i>
            <span>12/18 lessons</span>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
