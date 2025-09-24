import { useState } from "react";
import { Link } from "react-router-dom";

import Profile from "../common/Avater/Profile";
import { useCourseContext } from "../../store/course/course-context";
import AvatarProgress from "../common/Avater/AvaterProgress";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { course } = useCourseContext();

  const progress = course?.progress ? course?.progress : 0;

  const courseProgressByPixle = Math.ceil((progress * 15) / 100);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between px-4 py-2 mx-auto">
        <div className="flex items-center space-x-2">
          <i className="text-3xl text-indigo-600 fas fa-graduation-cap"></i>
          <h1 className="text-2xl font-bold text-gray-800">EduLearn</h1>
        </div>
        <nav className="hidden space-x-8 md:flex">
          <a href="#" className="text-gray-600 hover:text-indigo-600">
            Home
          </a>
          <a href="#" className="font-medium text-indigo-600">
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
          {/* <button className="hidden px-4 py-2 text-white transition bg-indigo-600 rounded-md md:block hover:bg-indigo-700">
            Sign In
          </button>
       */}

          {/* {
            <div
              onClick={handleToggleSidebar}
              className={`relative border-gray-200 rounded-full  cursor-pointer   h-15 w-15 border-3 hover:border-gray-300`}
            >
              <Profile className="p-1" />
              <i
                className={`fas absolute -right-7 z-20 -bottom-1 h-auto w-10 text-gray-500 fa-caret-${
                  isSidebarOpen ? "up" : "down"
                }`}
              ></i>
            </div>
          } */}

          <AvatarProgress
            handleOnclick={handleToggleSidebar}
            progress={progress}
            size={64}
            className="relative flex items-center justify-center cursor-pointer"
          >
            <Profile size={50} className="p-1" />
            <i
              className={`fas absolute -right-7 z-20 -bottom-0 h-auto w-10 text-gray-500 fa-caret-${
                isSidebarOpen ? "up" : "down"
              }`}
            ></i>
            <StudentProfileModal
              className={`${
                isSidebarOpen ? "sidebar-open " : "sidebar-close hidden"
              }`}
            />
          </AvatarProgress>
        </div>
      </div>
    </header>
  );
};

//  create me an array of student sidbar dashboard links
const studentSidebarLinks = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: <i className="pr-4 text-xl fas fa-tachometer-alt"></i>,
  },
  {
    name: "Courses",
    path: "/student/courses",
    icon: <i className="pr-4 text-xl fas fa-book"></i>,
  },
  {
    name: "Assignments",
    path: "/student/assignments",
    icon: <i className="pr-4 text-xl fas fa-tasks"></i>,
  },
  {
    name: "BookMarks",
    path: "/student/bookmarks",
    icon: <i className="pr-4 text-xl fas fa-bookmark"></i>,
  },
  {
    name: "Profile",
    path: "/student/profile",
    icon: <i className="pr-4 text-xl fas fa-user"></i>,
  },
];

const StudentProfileModal = ({ className }) => {
  return (
    <div
      className={`fixed  z-19 top-15 ${className} border border-t-0 border-gray-200  bg-white  text-[#333] w-[334px] right-0 h-screen`}
    >
      <div></div>
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
