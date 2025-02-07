import { useState } from "react";
import { ClipboardItem } from "../clipboard/ClipboardItem";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Supplier } from "../../../types/sheets";

export const Inspector = ({
  selectedRowsIndex,
  data,
  onClick,
}: {
  selectedRowsIndex: number[];
  data: Supplier[];
  onClick: (index: number) => void;
}) => {
  const [minimize, setMinimize] = useState(true);

  // Filter the data to get only the selected rows
  const selectedRows = selectedRowsIndex
    .map((index) => data.find((s) => s.index === index))
    .filter(Boolean);

  return (
    <motion.div
      className="fixed right-2 bottom-1 flex flex-col overflow-y-auto rounded-lg border border-[#666333]/30 bg-white"
      animate={{ height: minimize ? "30px" : "500px" }}
      transition={{ duration: 0.2 }}
      style={{ width: "350px", overflow: "hidden" }}
    >
      <div
        className="flex w-full items-center justify-between bg-[#333] px-2 text-white"
        style={{ height: "30px" }}
      >
        <div className="flex gap-2">
          <p>
            Rows selected:{" "}
            <span className="text-white">{selectedRows.length}</span>
          </p>
        </div>
        <div className="flex cursor-pointer gap-2">
          {minimize ? (
            <BiChevronUp
              size={20}
              onClick={() => setMinimize((prev) => !prev)}
            />
          ) : (
            <BiChevronDown
              size={20}
              onClick={() => setMinimize((prev) => !prev)}
            />
          )}
        </div>
      </div>
      {minimize ? null : (
        <div className="block px-3">
          <AnimatePresence mode="popLayout">
            {selectedRows.map((supplier, idx) => (
              <motion.div
                key={supplier?.index}
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ClipboardItem
                  supplier={supplier as Supplier}
                  onClick={() => onClick(selectedRowsIndex[idx])}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};
