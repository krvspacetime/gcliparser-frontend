import { useEffect, useState } from "react";
import { Supplier } from "./SheetsLayout";
import { ClipboardItem } from "./ClipboardItem";

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

  useEffect(() => {
    console.log("SELECTED ROWS", selectedRows);
  }, [selectedRows]);

  return (
    <div
      className="fixed right-2 bottom-1 overflow-y-auto rounded-lg bg-white outline"
      style={{ width: "250px", height: minimize ? "30px" : "500px" }}
    >
      <div
        className="flex w-full items-center justify-between bg-zinc-300 px-2"
        style={{ height: "30px" }}
      >
        <div className="flex gap-2">
          <p>
            Selected items:{" "}
            <span className="font-extrabold text-green-500">
              {selectedRows.length}
            </span>
          </p>
        </div>
        <div className="flex cursor-pointer gap-2">
          <p onClick={() => setMinimize((prev) => !prev)}>Toggle</p>
        </div>
      </div>
      {minimize ? null : (
        <div className="block bg-emerald-100 px-3">
          {selectedRows.map((supplier, idx) => (
            <ClipboardItem
              supplier={supplier as Supplier}
              key={supplier && supplier.name}
              onClick={() => onClick(selectedRowsIndex[idx])} // Pass the index from selectedRowsIndex
            />
          ))}
        </div>
      )}
    </div>
  );
};
