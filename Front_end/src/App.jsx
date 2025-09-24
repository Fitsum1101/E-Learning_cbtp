import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CourseContextProvider from "./store/course/CourseContextProvider";
import { router } from "./routes/routes";

const App = () => {
  return (
    <div className="relative">
      <ToastContainer />
      <CourseContextProvider>
        <RouterProvider router={router} />
      </CourseContextProvider>
    </div>
  );
};

export default App;
