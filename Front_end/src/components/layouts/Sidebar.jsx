import { Link, NavLink } from "react-router-dom";

const role = "admin";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white hidden lg:block  text-[#000] h-full p-5">
      <div className="mb-3">
        <div className="flex items-center text-md mb-2">
          <i className="fa-solid fa-tachometer-alt text-lg mr-3 text-gray-500"></i>

          <NavLink
            style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
            className=""
            to="/dashboard/student"
          >
            Dashboard
          </NavLink>
        </div>
      </div>
      <div className="mb-3">
        {role === "student" && (
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center text-md ">
              <i className="fas fa-graduation-cap text-gray-400 mr-3"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/student/courses"
              >
                Courses
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="fa-solid fa-bookmark text-gray-400 text-lg mr-3"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/student/bookmarks"
              >
                Bookmarks
              </NavLink>
            </div>

            <div className="flex items-center text-md ">
              <i className="fas fa-certificate text-gray-400 mr-3"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/student/certificates"
              >
                Certifications
              </NavLink>
            </div>
          </div>
        )}
        {(role === "admin" || role === "Super_admin") && (
          <div className="flex flex-col gap-3 items-center">
            <div className="flex items-center text-md ">
              <i className="fas fa-graduation-cap mr-3"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/admin/courses"
              >
                Courses
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="fa-regular text-lg text-gray-500 mr-3 fa-clipboard"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/admin/lessons"
              >
                Lessons
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="fa-solid fa-file-alt text-lg mr-3 text-gray-400"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/admin/resources"
              >
                Resources
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="fa-solid fa-user-graduate text-lg mr-3 text-gray-400"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/admin/students"
              >
                Students
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <div className="mb-5">
        <div className="flex items-center text-md mb-2">
          <i className="fas text-lg text-gray-400 fa-user mr-3"></i>
          <NavLink
            style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
            className=""
            to="/dashboard/profile"
          >
            Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
