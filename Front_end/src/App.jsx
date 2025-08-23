import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardLayout from "./components/layouts/DashboardLayout";
import MainLayout from "./components/layouts/MainLayout";
import Dashboard from "./pages/dashboard/admin/dashboard";
import Course from "./pages/dashboard/admin/Courses";
import Lessons from "./pages/dashboard/admin/Lessons";
import AddCourse from "./pages/dashboard/admin/AddCourse";
import Courses from "./pages/main/Courses";
import CourseDetail from "./pages/main/Course-detail";
import ReadCourse from "./pages/main/ReadCourse";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import BookMarks from "./pages/dashboard/student/BookMarks";
import Tutorials from "./pages/dashboard/student/Tutorials";
import MyCourses from "./pages/dashboard/student/MyCourses";

const router = createBrowserRouter([
  {
    id: "main",
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Courses /> },
      {
        path: "course/:slug",
        children: [
          {
            index: true,
            element: <CourseDetail />,
          },
          {
            path: "learn",
            element: <ReadCourse />,
          },
        ],
      },
      {
        id: "dashboard",
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "admin",
            children: [
              {
                index: true,
                element: <Dashboard />,
              },
              {
                path: "courses",
                element: <Course />,
              },
              {
                path: "lessons",
                element: <Lessons />,
              },
              {
                path: "courses/add",
                element: <AddCourse />,
              },
            ],
          },
          {
            path: "student",
            children: [
              {
                index: true,
                element: <StudentDashboard />,
              },
              {
                path: "bookmarks",
                element: <BookMarks />,
              },
              {
                path: "tutorials",
                element: <Tutorials />,
              },
              {
                path: "courses",
                element: <MyCourses />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <div className="relative">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
