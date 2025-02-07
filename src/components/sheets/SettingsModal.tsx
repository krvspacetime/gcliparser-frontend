import { Modal, Checkbox } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { motion } from "motion/react";
import { CiSettings } from "react-icons/ci";

export const SettingsModal = ({
  headers,
  headersToOmit,
  onChangeHeaders,
}: {
  headers: string[];
  headersToOmit: string[];
  onChangeHeaders: (key: string) => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} size="xl">
        <div>
          <Checkbox.Group value={headersToOmit}>
            <div className="flex flex-col gap-1">
              {headers.map((header) => (
                <Checkbox
                  key={header}
                  value={header}
                  label={header}
                  color="#333"
                  onClick={() => onChangeHeaders(header)}
                />
              ))}
            </div>
          </Checkbox.Group>
        </div>
      </Modal>

      <motion.div
        className="flex w-[50px] cursor-pointer justify-center rounded-md bg-[#333]/10 p-1 hover:bg-[#333]/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <CiSettings size={25} color="black" onClick={open} />
      </motion.div>
    </>
  );
};
