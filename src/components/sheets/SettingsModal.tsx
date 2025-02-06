import { Modal, Button, Checkbox, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
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
      <Modal opened={opened} onClose={close} title="Omit Headers">
        <div>
          <Checkbox.Group value={headersToOmit}>
            <div className="flex flex-col gap-1">
              {headers.map((header) => (
                <Checkbox
                  key={header}
                  value={header}
                  label={header}
                  onClick={() => onChangeHeaders(header)}
                />
              ))}
            </div>
          </Checkbox.Group>
        </div>
      </Modal>

      <Button
        variant="light"
        onClick={open}
        miw={120}
        color="#333"
        rightSection={<CiSettings size={20} />}
      >
        Settings
      </Button>
    </>
  );
};
