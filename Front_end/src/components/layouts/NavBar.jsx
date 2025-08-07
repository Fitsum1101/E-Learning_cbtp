import React from "react";

const NavBar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-graduation-cap text-indigo-600 text-3xl"></i>
          <h1 className="text-2xl font-bold text-gray-800">EduLearn</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-indigo-600">
            Home
          </a>
          <a href="#" className="text-indigo-600 font-medium">
            Courses
          </a>
          <a href="#" className="text-gray-600 hover:text-indigo-600">
            Instructors
          </a>
          <a href="#" className="text-gray-600 hover:text-indigo-600">
            My Learning
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
            Sign In
          </button>
          <button className="md:hidden text-gray-600">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
