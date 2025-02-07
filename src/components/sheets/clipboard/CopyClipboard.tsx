import { CopyButton, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
// import { useState } from "react";
import { PiCopySimpleFill } from "react-icons/pi";
import { TbCopy, TbCopyCheck } from "react-icons/tb";

interface CopyClipboardProps {
  copyButtonValue: string;
}

export const CopyClipboard = ({ copyButtonValue }: CopyClipboardProps) => {
  return (
    <Tooltip label="Copy items" variant="">
      <div>
        <CopyButton value={copyButtonValue}>
          {({ copied, copy }) =>
            copied ? (
              <TbCopyCheck size={25} />
            ) : (
              <TbCopy
                size={25}
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
                color={copied ? "black" : "#333"}
              />
            )
          }
        </CopyButton>
      </div>
    </Tooltip>
  );
};
