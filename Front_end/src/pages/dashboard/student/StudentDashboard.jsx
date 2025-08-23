import React from "react";
import Profile from "../../../components/common/Avater/Profile";
import { Link } from "react-router-dom";
import CourseProgress from "../../../components/common/progress/CourseProgess";
import Certificate from "../../../components/common/progress/Certificate";

const StudentDashboard = () => {
  return (
    <div>
      <div>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h2>
              <p className="opacity-90">
                Continue your learning journey. You're making great progress!
              </p>
            </div>
            <button className="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition duration-200">
              Explore Courses
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Enrolled Courses</p>
                <h3 className="text-2xl font-bold mt-1">5</h3>
              </div>
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <i className="fas fa-book text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Completed Courses</p>
                <h3 className="text-2xl font-bold mt-1">2</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <i className="fas fa-check-circle text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Certificates Earned</p>
                <h3 className="text-2xl font-bold mt-1">2</h3>
              </div>
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <i className="fas fa-certificate text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Learning Streak</p>
                <h3 className="text-2xl font-bold mt-1">7 days</h3>
              </div>
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <i className="fas fa-fire text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 mt-5">
          <div className="bg-white flex-1/2   rounded-2xl">
            <div className="bg-[#FAFAFA] h-[180px] border border-amber-100 rounded-2xl flex m-5 flex-col  justify-center items-center">
              <Profile className="w-30 h-30" />
              <Link className="text-sm text-blue-500 border-b-2 border-blue-500">
                Edit Avatar
              </Link>
            </div>
            <div>
              <p className="text-md font-bold ml-5 mb-5  ">CoolNinja8761</p>
            </div>
          </div>
          <div className="bg-white flex-1/2 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Certificates
              </h2>
              <a href="#" className="text-indigo-600 hover:text-indigo-800">
                View All
              </a>
            </div>
            <div className="space-y-4">
              <Certificate title="Python Programming" date="May 2, 2023" />
              <Certificate title="JavaScript Basics" date="April 15, 2023" />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div class="bg-white rounded-xl flex-2/3 shadow-sm p-6 mb-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-800">
                Your Course Progress
              </h2>
              <a href="#" class="text-indigo-600 hover:text-indigo-800">
                View All
              </a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {courses.map((course, index) => (
                <CourseProgress
                  key={index}
                  course={course.title}
                  progress={course.progress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const courses = [
  { title: "Course 1", progress: 50 },
  { title: "Course 2", progress: 75 },
  { title: "Course 3", progress: 30 },
];

export default StudentDashboard;
