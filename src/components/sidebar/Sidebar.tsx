import { useAtom } from "jotai";
import { sidebarOpenAtom } from "../../atoms/sidebar-atom";
import { BsGoogle } from "react-icons/bs";
import { Button } from "@mantine/core";
import { SiAuthy, SiGooglesearchconsole } from "react-icons/si";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { BiChevronLeft, BiToggleLeft } from "react-icons/bi";
import { motion } from "motion/react";

export const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div
        className="fixed z-[1000] flex h-screen w-[300px] flex-col justify-between bg-[#333] px-4 py-6 text-white"
        style={{ visibility: sidebarOpen ? "visible" : "hidden" }}
      >
        <div className="flex w-full justify-center">
          <motion.div initial={{ x: -50 }} animate={{ x: 0 }}>
            <BsGoogle size={50} />
          </motion.div>
        </div>
        <motion.div className="flex w-full flex-col justify-center gap-1">
          <Button
            variant="subtle"
            rightSection={<SiGooglesearchconsole size={20} />}
            color="white"
            onClick={() => navigate("/")}
            className="hover:cursor-pointer"
          >
            App
          </Button>
          <Button
            variant="subtle"
            rightSection={<SiAuthy size={20} />}
            color="white"
            onClick={() => navigate("/auth")}
            className="hover:cursor-pointer"
          >
            Credentials
          </Button>
        </motion.div>
        <div className="flex w-full flex-col justify-center gap-1">
          <Button
            variant="subtle"
            rightSection={<CiSettings size={20} />}
            color="white"
          >
            Settings
          </Button>
        </div>
        <motion.div
          className="absolute top-2 right-2"
          initial={{ x: 0 }}
          animate={{ rotate: sidebarOpen ? 360 : 0 }}
          whileHover={{ x: -5 }}
        >
          <BiChevronLeft
            size={30}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </motion.div>
      </div>
    </div>
  );
};
