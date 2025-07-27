import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "./components/layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
