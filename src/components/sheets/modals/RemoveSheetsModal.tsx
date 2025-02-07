import { Modal, Button, Checkbox, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { color, motion } from "framer-motion";
import { useAtom } from "jotai";
import { sheetsAtom, selectedSheetAtom } from "../../../atoms/sheets-atom";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

export const RemoveSheetsModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [sheets, setSheets] = useAtom(sheetsAtom);
  const [selectedSheet, setSelectedSheet] = useAtom(selectedSheetAtom);
  const [deleteList, setDeleteList] = useState<string[]>([]);

  const handleDelete = () => {
    setSheets(
      (prev) => prev?.filter((sheet) => !deleteList.includes(sheet)) || null,
    );

    if (deleteList.includes(selectedSheet)) {
      setSelectedSheet("");
    }
    setDeleteList([]);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Manage Sheets"
        size="md"
        zIndex={2001}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {sheets?.length ? (
            <ScrollArea h={300}>
              <div className="space-y-2">
                {sheets.map((sheet) => (
                  <motion.div
                    key={sheet}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2, type: "tween" }}
                    className="flex items-center justify-between rounded-lg bg-[#333]/10 p-3"
                  >
                    <Checkbox
                      size="xs"
                      label={sheet}
                      checked={deleteList.includes(sheet)}
                      color="#333"
                      onChange={(e) =>
                        setDeleteList((prev) =>
                          e.target.checked
                            ? [...prev, sheet]
                            : prev.filter((s) => s !== sheet),
                        )
                      }
                    />
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="py-4 text-center text-gray-500">
              No sheets to manage
            </div>
          )}

          {sheets && sheets?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex justify-end"
            >
              <Button
                color="#333"
                leftSection={<MdDelete />}
                onClick={handleDelete}
                disabled={!deleteList.length}
              >
                Delete Selected ({deleteList.length})
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Modal>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex rounded bg-[#333]/10 p-1 hover:cursor-pointer"
        onClick={open}
      >
        <MdDelete size={20} />
      </motion.div>
    </>
  );
};
