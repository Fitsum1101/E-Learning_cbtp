import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar bg-indigo-800 text-white w-64 flex-shrink-0 flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-indigo-700">
        <div className="flex items-center">
          <i className="fas fa-graduation-cap text-2xl mr-3"></i>
          <span className="logo-text text-xl font-bold">EduLearn Admin</span>
        </div>
        <button
          id="toggleSidebar"
          className="text-white focus:outline-none lg:hidden"
        >
          <p>toggle</p>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="mb-2 px-2 text-xs uppercase text-indigo-400 font-semibold tracking-wider">
            Dashboard
          </div>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-white bg-indigo-900 rounded-lg mb-1"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            <NavLink to={"/"}>Overview</NavLink>
          </a>
        </div>

        <div className="p-2">
          <div className="mb-2 px-2 text-xs uppercase text-indigo-400 font-semibold tracking-wider">
            Content
          </div>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-1"
          >
            <i className="fas fa-book mr-3"></i>
            <NavLink to={"/courses"}>Courses</NavLink>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-1"
          >
            <i className="fas fa-video mr-3"></i>
            <NavLink to={"/lessons"} className="nav-text">
              lessons
            </NavLink>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-1"
          >
            <i className="fas fa-file-alt mr-3"></i>
            <span className="nav-text">Resources</span>
          </a>
        </div>

        <div className="p-2">
          <div className="mb-2 px-2 text-xs uppercase text-indigo-400 font-semibold tracking-wider">
            Users
          </div>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-1"
          >
            <i className="fas fa-users mr-3"></i>
            <span className="nav-text">Students</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-1"
          >
            <i className="fas fa-chalkboard-teacher mr-3"></i>
            <span className="nav-text">Instructors</span>
          </a>
        </div>

        <div className="p-2">
          <div className="mb-2 px-2 text-xs uppercase text-indigo-400 font-semibold tracking-wider">
            System
          </div>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-1"
          >
            <i className="fas fa-cog mr-3"></i>
            <span className="nav-text">Settings</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-1"
          >
            <i className="fas fa-chart-bar mr-3"></i>
            <span className="nav-text">Analytics</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
