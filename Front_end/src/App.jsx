import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/dashboard";
import Course from "./pages/dashboard/courses";
import AddCourse from "./pages/dashboard/AddCourse";
import Lessons from "./pages/dashboard/Lessons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Courses from "./pages/main/courses";
import MainLayout from "./components/layouts/MainLayout";

const router = createBrowserRouter([
  {
    id: "main",
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Courses /> },
      {
        id: "dashboard",
        path: "/dashboard",
        element: <DashboardLayout />,
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
