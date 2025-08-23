import { Link } from "react-router-dom";
import Profile from "../common/Avater/Profile";
import { useState } from "react";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-white   shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
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
          {/* <button className="hidden md:block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition">
            Sign In
          </button>
       */}
          <div
            onClick={handleToggleSidebar}
            className="w-15 relative  h-14 cursor-pointer rounded-full border-3 border-gray-200 hover:border-gray-300"
          >
            <Profile className=" p-1" />
            <i
              className={`fas absolute -right-7 z-20 -bottom-1 h-auto w-10 text-gray-500 fa-caret-${
                isSidebarOpen ? "up" : "down"
              }`}
            ></i>
          </div>
        </div>
        {isSidebarOpen && <StudentProfileModal />}
      </div>
    </header>
  );
};

//  create me an array of student sidbar dashboard links
const studentSidebarLinks = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: <i className="fas pr-4 text-xl fa-tachometer-alt"></i>,
  },
  {
    name: "Courses",
    path: "/student/courses",
    icon: <i className="fas pr-4 text-xl fa-book"></i>,
  },
  {
    name: "Assignments",
    path: "/student/assignments",
    icon: <i className="fas pr-4 text-xl  fa-tasks"></i>,
  },
  {
    name: "BookMarks",
    path: "/student/bookmarks",
    icon: <i className="fas pr-4 text-xl fa-bookmark"></i>,
  },
  {
    name: "Profile",
    path: "/student/profile",
    icon: <i className="fas pr-4 text-xl fa-user"></i>,
  },
];

const StudentProfileModal = () => {
  return (
    <div className="fixed z-19 flex top-15  border border-t-0 border-gray-200  bg-white  text-[#333] w-[334px] right-0 h-screen">
      <ul className="flex flex-col gap-2 ">
        {studentSidebarLinks.map((link) => (
          <li className="font-semibold text-[#333] " key={link.path}>
            <Link
              to={link.path}
              className="block px-4 py-2 text-[14px]  hover:bg-gray-100"
            >
              {link.icon}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
