import { Textarea } from "@mantine/core";
import { CopyClipboard } from "./CopyClipboard";
import { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";

interface ClipboardTextAreaProps {
  value: string;
}

export const ClipboardTextArea = ({ value }: ClipboardTextAreaProps) => {
  const [expand, setExpand] = useState(false);
  return (
    <div
      className="pointer-events-auto fixed bottom-1 left-5 rounded-lg"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="relative">
        <div
          className="flex w-full items-center justify-between rounded-lg bg-[#333] px-2"
          style={{
            height: "30px",
            minWidth: "400px",
          }}
        >
          <div className="flex gap-2">
            <p className="text-white">CLIPBOARD</p>
            <p>
              {value.length === 0 && (
                <span className="from-neutral-400 font-thin">| EMPTY</span>
              )}
            </p>
          </div>
          <div className="flex gap-2">
            {expand ? (
              <BiChevronUp
                size={20}
                onClick={() => setExpand(false)}
                color="white"
              />
            ) : (
              <BiChevronDown
                size={20}
                onClick={() => setExpand(true)}
                color="white"
              />
            )}
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
          <section className="absolute top-8 right-2">
            <CopyClipboard copyButtonValue={value} />
          </section>
        )}
      </div>
    </div>
  );
};
