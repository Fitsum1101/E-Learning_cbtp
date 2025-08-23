import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white hidden lg:block overflow-scroll-y text-[#000] h-full p-5">
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Overview</h3>
        <div className="flex items-center text-md mb-2">
          <i className="fas fa-clock mr-3"></i>
          <Link className="" to="/dashboard/student">
            Dashboard
          </Link>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Learn</h3>
        <div className="flex items-center text-md mb-2">
          <i className="fas fa-book mr-3"></i>
          <Link className="" to="/dashboard/student/tutorials">
            Tutorials
          </Link>
        </div>
        <div className="flex items-center text-md mb-2">
          <i className="fas fa-bookmark mr-3"></i>
          <Link className="" to="/dashboard/student/bookmarks">
            Bookmarks
          </Link>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Grow</h3>
        <div className="flex items-center text-md mb-2">
          <i className="fas fa-graduation-cap mr-3"></i>
          <Link className="" to="/dashboard/student/courses">
            Courses
          </Link>
        </div>
        <div className="flex items-center text-md mb-2">
          <i className="fas fa-certificate mr-3"></i>
          <Link className="" to="/dashboard/courses">
            Certifications
          </Link>
        </div>
      </div>
      <div className="mb-5">
        <h3 className="text-sm font-semibold mb-2">Profile</h3>
        <div className="flex items-center text-md mb-2">
          <i className="fas fa-user mr-3"></i>
          <Link className="" to="/dashboard/profile">
            Profile
          </Link>
        </div>
      </div>
      <div>
        <div className="mb-5">
          <h3 className="text-sm font-semibold mb-2">admin</h3>
          <div className="flex items-center text-md mb-2">
            <i className="fas fa-user mr-3"></i>
            <Link className="" to="/dashboard/admin/courses">
              Courses
            </Link>
          </div>
          <div className="flex items-center text-md mb-2">
            <i className="fas fa-user mr-3"></i>
            <Link className="" to="/dashboard/admin/lessons">
              Lessons
            </Link>
          </div>
          <div className="flex items-center text-md mb-2">
            <i className="fas fa-user mr-3"></i>
            <Link className="" to="/dashboard/admin/resources">
              Resources
            </Link>
          </div>
          <div className="flex items-center text-md mb-2">
            <i className="fas fa-user mr-3"></i>
            <Link className="" to="/dashboard/admin/students">
              Students
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
