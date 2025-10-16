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
import Courses from "../pages/main/Courses";
import UpdateProifle from "../pages/main/Profile";
import ReadCourse from "../pages/main/ReadCourse";
import Exam from "../components/learn/Exam";
import ExamPage from "../pages/dashboard/admin/ExamPage";
import CertificatePage from "../pages/dashboard/student/Certificate";
import CourseExam from "../pages/main/CourseExam";
import ExamResult from "../pages/main/ExamResult";
import AdminCourseDetail from "../components/course/admin/CourseDetail";
import StudentsPage from "../pages/dashboard/student/Student";
import StudentDetailPage from "../pages/dashboard/student/StudentDetail";
import Analaytices from "../pages/dashboard/admin/Analaytices";
import ResourcesPage from "../pages/dashboard/admin/Resources";
import ResourcesAddPage from "../pages/dashboard/admin/ResourcesAddPage";
import AvatersPage from "../pages/dashboard/admin/Avaters";
import EditAvaterPage from "../pages/dashboard/admin/EditAvater";
import ViewAvater from "../pages/dashboard/admin/ViewAvater";

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
            path: "exam/:examId",
            children: [
              { index: true, element: <Exam /> },
              { path: "start/:id", element: <CourseExam /> },
              { path: "result/:id", element: <ExamResult /> },
            ],
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
                path: "students",
                element: <StudentsPage />,
              },
              {
                path: "students/:id",
                element: <StudentDetailPage />,
              },
              {
                path: "courses",
                children: [
                  {
                    index: true,
                    element: <Course />,
                  },
                  {
                    path: ":id",
                    element: <AdminCourseDetail />,
                  },
                ],
              },
              {
                path: "analaytices",
                element: <Analaytices />,
              },
              {
                path: "lessons",
                element: <Lessons />,
              },
              {
                path: "resources",
                children: [
                  {
                    index: true,
                    element: <ResourcesPage />,
                  },
                  {
                    path: "add",
                    element: <ResourcesAddPage />,
                  },
                ],
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
              {
                path: "avaters",
                children: [
                  { index: true, element: <AvatersPage /> },
                  { path: "edit/:id", element: <EditAvaterPage /> },
                  { path: "view", element: <ViewAvater /> },
                ],
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
                element: <CertificatePage />,
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
