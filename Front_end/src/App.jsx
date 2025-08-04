import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/dashboard";
import Course from "./pages/dashboard/courses";
import AddCourse from "./pages/dashboard/AddCourse";
import Lessons from "./pages/dashboard/Lessons";
const router = createBrowserRouter([
  {
    path: "/",
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
]);

const App = () => {
  return (
    <div className="relative">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
