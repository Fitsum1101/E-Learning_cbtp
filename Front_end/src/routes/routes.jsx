import { createBrowserRouter } from "react-router-dom";
import Certificate from "../components/common/progress/Certificate";
import DashboardLayout from "../components/layouts/DashboardLayout";
import MainLayout from "../components/layouts/MainLayout";
import AddCourse from "../pages/dashboard/admin/AddCourse";
import Course from "../pages/dashboard/admin/Courses";
import Dashboard from "../pages/dashboard/admin/dashboard";
import Lessons from "../pages/dashboard/admin/Lessons";
import Questions from "../pages/dashboard/admin/Questions";
import BookMarks from "../pages/dashboard/student/BookMarks";
import MyCourses from "../pages/dashboard/student/MyCourses";
import StudentDashboard from "../pages/dashboard/student/StudentDashboard";
import CourseDetail from "../pages/main/Course-detail";
import CourseExam from "../pages/main/CourseExam";
import Courses from "../pages/main/Courses";
import UpdateProifle from "../pages/main/Profile";
import ReadCourse from "../pages/main/ReadCourse";
import Exam from "../components/learn/Exam";
import ExamPage from "../pages/dashboard/admin/ExamPage";

export const router = createBrowserRouter([
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
            element: <Exam />,
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
              {
                path: "exam",
                element: <ExamPage />,
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
