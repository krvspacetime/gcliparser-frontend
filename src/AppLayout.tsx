import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="w-full text-black">
      <nav className="h-[60px] w-full bg-zinc-800"></nav>
      <Outlet />
    </div>
  );
};
