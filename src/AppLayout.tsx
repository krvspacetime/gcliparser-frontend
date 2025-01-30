import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="w-full text-black">
      {/* <nav className="flex h-[60px] w-full justify-between border-[1px] bg-green-300 px-3 text-white">
        <div className="flex items-center gap-2">
          <p>HOME</p>
        </div>
      </nav> */}
      <Outlet />
    </div>
  );
};
