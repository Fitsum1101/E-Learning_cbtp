import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-[#F3F4F6] relative w-full p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
