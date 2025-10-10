import { NavLink } from "react-router-dom";

const role = "admin";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white hidden lg:block  text-[#000] h-full p-5">
      <div className="mb-3">
        <div className="flex items-center mb-2 text-md">
          <i className="mr-3 text-lg text-gray-500 fa-solid fa-tachometer-alt"></i>
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
              <i className="mr-3 text-gray-400 fas fa-graduation-cap"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/student/courses"
              >
                Courses
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="mr-3 text-lg text-gray-400 fa-solid fa-bookmark"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/student/bookmarks"
              >
                Bookmarks
              </NavLink>
            </div>

            <div className="flex items-center text-md ">
              <i className="mr-3 text-gray-400 fas fa-certificate"></i>
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
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center text-md ">
              <i className="mr-3 fas fa-graduation-cap"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/admin/courses"
              >
                Courses
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="mr-3 text-lg text-gray-500 fa-regular fa-clipboard"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/admin/lessons"
              >
                Lessons
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="mr-3 text-lg text-gray-400 fa-solid fa-file-alt"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/admin/resources"
              >
                Resources
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="mr-3 text-lg text-gray-400 fa-solid fa-question-circle"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/admin/questions"
              >
                Questions
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="mr-3 text-lg text-gray-400 fa-solid fa-question-circle"></i>
              <NavLink
                style={({ isActive }) => (isActive ? { color: "#3b82f6" } : {})}
                className=""
                to="/dashboard/admin/exam"
              >
                Exam
              </NavLink>
            </div>
            <div className="flex items-center text-md ">
              <i className="mr-3 text-lg text-gray-400 fa-solid fa-user-graduate"></i>
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
        <div className="flex items-center mb-2 text-md">
          <i className="mr-3 text-lg text-gray-400 fas fa-user"></i>
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
