import { Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "motion/react";
import { IoMdAdd } from "react-icons/io";
import { SiGooglesheets } from "react-icons/si";
import { selectedSheetAtom, sheetsAtom } from "../../../atoms/sheets-atom";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

export const AddSheetModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const [sheets, setSheets] = useAtom(sheetsAtom);
  const [selectedSheet, setSelectedSheet] = useAtom(selectedSheetAtom);
  const addSheet = (value: string) => {
    if (sheets?.includes(value)) {
      notifications.show({
        title: "Not allowed.",
        message: "Sheet already added.",
        position: "top-right",
        withCloseButton: true,
        withBorder: true,
        color: "red",
        autoClose: 2000,
      });
      return;
    } else if (value === "") {
      notifications.show({
        title: "Not allowed.",
        message: "Sheet name cannot be empty.",
        position: "top-right",
        withCloseButton: true,
        withBorder: true,
        color: "red",
        autoClose: 2000,
      });
    } else {
      setSheets((prev) => [...(prev || []), value]);
      setSelectedSheet(value);
      notifications.show({
        title: "Sheet added.",
        message: "Sheet added successfully.",
        position: "top-right",
        withCloseButton: true,
        withBorder: true,
        color: "#333",
        autoClose: 1000,
      });
    }
  };
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Google Sheet"
        zIndex={2001}
      >
        <motion.div
          className="flex w-full items-center"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.2, type: "tween" }}
        >
          <TextInput
            leftSection={<SiGooglesheets size={20} color="#333" />}
            w={"100%"}
            placeholder="Enter sheet name"
            required
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <div
            className="flex h-full cursor-pointer items-center p-1"
            onClick={() => {
              addSheet(value);
              close();
            }}
          >
            <IoMdAdd size={25} />
          </div>
        </motion.div>
      </Modal>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={open}
        className="flex rounded bg-[#333]/10 p-1 hover:cursor-pointer"
      >
        <IoMdAdd size={20} />
      </motion.div>
    </div>
  );
};
