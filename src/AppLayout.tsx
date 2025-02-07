import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/sidebar/Sidebar";

export const AppLayout = () => {
  return (
    <div className="w-full text-black">
      <Sidebar />
      <Outlet />
    </div>
  );
};
//
