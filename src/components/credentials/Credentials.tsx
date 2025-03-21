import { Button, FileInput, Tooltip } from "@mantine/core";
import { useEffect, useState } from "react";
import { MdOutlineKey } from "react-icons/md";
import { notifications } from "@mantine/notifications";
import { PiCheckCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { BiCheckCircle, BiChevronRight } from "react-icons/bi";
import notifStyles from "../../styles/notifications.module.css";
import { FaArrowRight, FaGofore } from "react-icons/fa";
import { motion } from "motion/react";
import { sidebarOpenAtom } from "../../atoms/sidebar-atom";
import { useSetAtom } from "jotai";
import { useAuth } from "../../hooks/useAuth";

export const Credentials = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const setSidebarOpen = useSetAtom(sidebarOpenAtom);
  const handleFileChange = (file: File | null) => {
    console.log("File selected:", file);
    try {
      if (!file) throw new Error("Error uploading file");
      setFile(file);
      notifications.show({
        title: "Success",
        message: "File loaded.",
        color: "green",
        autoClose: 2000,
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
        autoClose: 2000,
      });
    }
  };

  const sendFileData = async () => {
    console.log("file", file);
    try {
      const formData = new FormData();
      formData.append("file", file!);
      const response =
        import.meta.env.VITE_NODE_ENV == "production"
          ? await fetch(`${import.meta.env.VITE_PROD_URL}/auth/`, {
              method: "POST",
              body: formData,
            })
          : await fetch("http://localhost:8000/auth/", {
              method: "POST",
              body: formData,
            });

      if (!response.ok) throw new Error("Error sending file");

      notifications.show({
        title: "Success",
        message: "File sent successfully",
        color: "green",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  const navigateToApp = async () => {
    const id = notifications.show({
      title: "Authentication",
      message: "Checking credentials ...",
      color: "orange",
      classNames: notifStyles,
      icon: <MdOutlineKey size={18} />,
    });

    try {
      const response =
        import.meta.env.VITE_NODE_ENV == "production"
          ? await fetch(`${import.meta.env.VITE_PROD_URL}/auth/`)
          : await fetch(
              `${import.meta.env.VITE_LOCALHOST}:${import.meta.env.VITE_PORT}/auth/`,
            );

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();
      if (data !== null) {
        notifications.update({
          id,
          color: "teal",
          title: "Success!",
          message: "Credentials loaded.",
          icon: <BiCheckCircle size={18} />,
          loading: false,
          autoClose: 2000,
        });
        navigate("/");
      }
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        notifications.update({
          id,
          color: "red",
          title: "Error",
          message: e.message,
          loading: false,
        });
      }
    }
  };

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      notifications.show({
        title: "Success",
        message: "You are logged in.",
        color: "teal",
        autoClose: 2000,
      });
    } else {
      notifications.show({
        title: "Error",
        message: "You are not logged in.",
        color: "red",
        autoClose: 2000,
      });
    }
  }, [user, loading]);
  return (
    <motion.div
      className="flex h-screen w-full flex-col items-center justify-center gap-2"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-[600px] justify-center gap-2">
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FileInput
            w={300}
            accept="application/json"
            // placeholder="Select credentials file"
            leftSection={<MdOutlineKey size={25} color="gray" />}
            onChange={handleFileChange}
            styles={{
              input: { color: "gray" },
            }}
            rightSection={file ? <PiCheckCircleFill /> : null}
            className="flex-none"
          />
          {!file && !user ? (
            <p className="text-xs text-gray-500">
              Please select credentials file.
            </p>
          ) : user ? (
            <p className="text-xs text-green-500">
              Valid credentials already uploaded to server.
            </p>
          ) : (
            <></>
          )}
        </motion.div>
        <motion.div
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            color="#333"
            variant="light"
            onClick={sendFileData}
            disabled={!file}
            w={150}
          >
            Upload
          </Button>
        </motion.div>
        <motion.div
          className="absolute top-2 right-4"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tooltip
            variant="light"
            label="If credentials are already set, go to app to check if they are valid."
          >
            <div className="flex flex-col items-center">
              <Button
                variant="light"
                color="#333"
                onClick={navigateToApp}
                miw={200}
                leftSection={<FaGofore size={20} />}
                rightSection={<FaArrowRight size={20} />}
              >
                Go to app
              </Button>
              {user ? (
                <p className="text-xs text-green-500">Already signed in</p>
              ) : (
                <></>
              )}
            </div>
          </Tooltip>
        </motion.div>
        <motion.div
          className="absolute top-2 left-4"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1, x: 5, cursor: "pointer" }}
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <Tooltip variant="light" label="Open sidebar.">
            <BiChevronRight size={30} />
          </Tooltip>
        </motion.div>
      </div>
    </motion.div>
  );
};
