import { Textarea } from "@mantine/core";
import { CopyClipboard } from "./CopyClipboard";
import { useState } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import { motion } from "framer-motion";

interface ClipboardTextAreaProps {
  value: string;
}

export const ClipboardTextArea = ({ value }: ClipboardTextAreaProps) => {
  const [expand, setExpand] = useState(false);
  return (
    <motion.div
      layout
      className="pointer-events-auto fixed bottom-1 left-5 rounded-lg"
      animate={{ height: expand ? "auto" : "30px" }}
      transition={{ duration: 0.1 }}
      style={{ overflow: "hidden" }}
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
          </div>
          <div className="flex gap-2 hover:cursor-pointer">
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
          <motion.div
            layout
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Textarea
              autosize
              value={value}
              maxRows={20}
              minRows={10}
              w={400}
              resize="vertical"
              placeholder="Clipboard"
              //   onChange={(event) => setValue(event.currentTarget.value)}
            />
            <section className="absolute top-8 right-2">
              <CopyClipboard copyButtonValue={value} />
            </section>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
