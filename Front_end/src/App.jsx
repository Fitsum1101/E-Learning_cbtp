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
import CourseExam from "./pages/main/CourseExam";
import ReadCourse from "./pages/main/ReadCourse";
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import BookMarks from "./pages/dashboard/student/BookMarks";
import MyCourses from "./pages/dashboard/student/MyCourses";
import UpdateProifle from "./pages/main/Profile";
import Certificate from "./pages/dashboard/student/certificate";
import Questions from "./pages/dashboard/admin/Questions";

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
          {
            path: "exam",
            element: <CourseExam />,
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
              {
                path: "questions",
                element: <Questions />,
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
                path: "courses",
                element: <MyCourses />,
              },
              {
                path: "certificates",
                element: <Certificate />,
              },
            ],
          },
          {
            path: "profile",
            element: <UpdateProifle />,
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
