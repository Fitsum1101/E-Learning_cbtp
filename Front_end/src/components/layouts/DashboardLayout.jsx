import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex bg-gray-50 h-[88.5vh]">
      <Sidebar />
      <div className="relative w-full p-5 overflow-y-scroll ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
