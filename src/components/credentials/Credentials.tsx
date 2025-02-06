import { Button, FileInput } from "@mantine/core";
import { useState } from "react";
import { MdOutlineKey } from "react-icons/md";
import { notifications } from "@mantine/notifications";
import { PiCheckCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export const Credentials = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (file: File | null) => {
    try {
      if (!file) throw new Error("Error uploading file");
      setFile(file);
      notifications.show({
        title: "Success",
        message: "File uploaded successfully",
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  const sendFileData = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file!);
      const response = await fetch(`http://localhost:8000/auth`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error sending file");

      notifications.show({
        title: "Success",
        message: "File sent successfully",
        color: "green",
      });

      navigate("/app");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <div className="flex w-[500px] gap-2">
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
        <Button
          color="grey"
          variant="light"
          onClick={sendFileData}
          disabled={!file}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};
