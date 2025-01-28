import { Button, CopyButton, Tooltip } from "@mantine/core";
import { useState } from "react";
import { PiCopySimpleFill } from "react-icons/pi";

interface CopyClipboardProps {
  copyButtonValue: string;
}

export const CopyClipboard = ({ copyButtonValue }: CopyClipboardProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Tooltip label="Copy">
      <div>
        <CopyButton value={copyButtonValue}>
          {({ copied, copy }) => (
            <PiCopySimpleFill
              onClick={copy}
              size={hovered ? 30 : 25}
              color={!hovered ? "rgba(255, 0, 0, 0.5)" : "rgba(255, 0, 0, 1)"}
              onMouseOver={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            />
          )}
        </CopyButton>
      </div>
    </Tooltip>
  );
};
