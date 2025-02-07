import { useState } from "react";
import { ClipboardItem } from "../clipboard/ClipboardItem";
import { motion } from "framer-motion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Supplier } from "../../../types/sheets";

export const DataView = ({
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
            Selected items:{" "}
            <span className="font-extrabold text-white">
              {selectedRows.length}
            </span>
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
          {selectedRows.map((supplier, idx) => (
            <ClipboardItem
              supplier={supplier as Supplier}
              key={supplier && supplier.name}
              onClick={() => onClick(selectedRowsIndex[idx])} // Pass the index from selectedRowsIndex
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};
