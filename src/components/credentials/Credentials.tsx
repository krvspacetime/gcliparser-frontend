import { Button, FileInput, Tooltip } from "@mantine/core";
import { useState } from "react";
import { MdOutlineKey } from "react-icons/md";
import { notifications } from "@mantine/notifications";
import { PiCheckCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { BiCheckCircle } from "react-icons/bi";
import notifStyles from "../../styles/notifications.module.css";
import { FaArrowRight, FaGofore } from "react-icons/fa";
import { motion } from "motion/react";

export const Credentials = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (file: File | null) => {
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
    try {
      const formData = new FormData();
      formData.append("file", file!);
      const response =
        import.meta.env.VITE_NODE_ENV === "development"
          ? await fetch(`${import.meta.env.VITE_API_URL}/auth`, {
              method: "POST",
              body: formData,
            })
          : await fetch(
              `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/auth`,
              {
                method: "POST",
                body: formData,
              },
            );

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
      const response = await fetch("http://localhost:8000/auth");

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
          // autoClose: 2000,
        });
      }
    }
  };
  return (
    <motion.div
      className="flex h-screen w-full flex-col items-center justify-center gap-2"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-[600px] gap-2">
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FileInput
            w={300}
            accept="application/json"
            placeholder="Select credentials file"
            leftSection={<MdOutlineKey size={25} color="gray" />}
            onChange={handleFileChange}
            styles={{
              input: { color: "gray" },
            }}
            rightSection={file ? <PiCheckCircleFill /> : null}
          />
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
          </Tooltip>
        </motion.div>
      </div>
    </motion.div>
  );
};
