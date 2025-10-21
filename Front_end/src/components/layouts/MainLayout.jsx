// import { Outlet } from "react-router-dom";

// import NavBar from "./NavBar";

// const MainLayout = () => {
//   return (
//     <div>
//       <NavBar />
//       <Outlet />
//     </div>
//   );
// };

// export default MainLayout;

import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "./NavBar";

import Footer from "./Footer";

const MainLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="relative min-h-screen ">
      <NavBar />

      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
          <ClipLoader color="#2563eb" size={60} />
          <p className="mt-4 text-lg font-semibold text-blue-600">
            Loading, please wait...
          </p>
        </div>
      )}

      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
