import { Textarea } from "@mantine/core";
import { CopyClipboard } from "./CopyClipboard";
import { TbClipboardList, TbArrowsDiagonalMinimize2 } from "react-icons/tb";
import { useMemo, useState } from "react";
import { Supplier } from "./SheetsLayout";

interface ClipboardTextAreaProps {
  value: string;
}

export const ClipboardTextArea = ({ value }: ClipboardTextAreaProps) => {
  const [expand, setExpand] = useState(false);
    return (
    <div
      className="pointer-events-auto fixed bottom-1 left-5 rounded-lg border-[1px]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="relative">
        <div
          className="flex w-full items-center justify-between rounded-t-lg bg-zinc-300 px-2"
          style={{
            height: "30px",
            minWidth: "200px",
          }}
        >
          <div className="flex gap-2">
            <p>CLIPBOARD</p>
            <p>
              {value.length === 0 && (
                <span className="from-neutral-400 font-thin">| EMPTY</span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <TbArrowsDiagonalMinimize2
              onClick={() => setExpand((prev) => !prev)}
            />
          </div>
        </div>
        {expand && (
          <Textarea
            // contentEditable
            autosize
            value={value}
            maxRows={20}
            minRows={10}
            w={400}
            resize="vertical"
            placeholder="Clipboard"
            //   onChange={(event) => setValue(event.currentTarget.value)}
          />
        )}
        {expand && (
          <section className="absolute right-1 bottom-1">
            <CopyClipboard copyButtonValue={value} />
          </section>
        )}
      </div>
    </div>
  );
};
