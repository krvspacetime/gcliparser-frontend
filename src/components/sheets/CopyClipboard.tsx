import { Button, CopyButton, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { PiCopySimpleFill } from "react-icons/pi";

interface CopyClipboardProps {
  copyButtonValue: string;
}

export const CopyClipboard = ({ copyButtonValue }: CopyClipboardProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Tooltip label="Copy items" variant="">
      <div>
        <CopyButton value={copyButtonValue}>
          {({ copied, copy }) => (
            <PiCopySimpleFill
              onClick={() => {
                copy();
                notifications.show({
                  title: "Copied.",
                  message: "Copied items to clipboard.",
                  position: "top-right",
                  withCloseButton: true,
                  withBorder: true,
                  color: "gray",
                });
              }}
              size={hovered ? 30 : 25}
              color={hovered ? "black" : "gray"}
              onMouseOver={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
          )}
        </CopyButton>
      </div>
    </Tooltip>
  );
};
