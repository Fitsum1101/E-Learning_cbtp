import React from "react";

const Sidebar = () => {
  return (
    <div class="sidebar bg-indigo-800 text-white w-64 h-screen space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0">
      <div class="flex items-center space-x-2 px-4">
        <i class="fas fa-graduation-cap text-2xl"></i>
        <span class="text-2xl font-extrabold">EduTrack</span>
        <button id="closeSidebar" class="md:hidden ml-auto">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <nav>
        <a
          href="#"
          class="block py-2.5 px-4 rounded transition duration-200 bg-indigo-700 text-white"
        >
          <i class="fas fa-home mr-3"></i>Dashboard
        </a>
        <a
          href="#"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <i class="fas fa-book mr-3"></i>My Courses
        </a>
        <a
          href="#"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <i class="fas fa-calendar-alt mr-3"></i>Schedule
        </a>
        <a
          href="#"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <i class="fas fa-tasks mr-3"></i>Assignments
        </a>
        <a
          href="#"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <i class="fas fa-chart-bar mr-3"></i>Progress
        </a>
        <a
          href="#"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <i class="fas fa-comments mr-3"></i>Discussions
        </a>
        <a
          href="#"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white"
        >
          <i class="fas fa-cog mr-3"></i>Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
