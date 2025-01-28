import { useState } from "react";
import { Player } from "./SheetsLayout";
import { ClipboardItem } from "./ClipboardItem";
import { TbClipboardList, TbArrowsDiagonalMinimize2 } from "react-icons/tb";

export const DataView = ({
  selectedRows,
  onClick,
}: {
  selectedRows: Player[];
  onClick: (index: number) => void;
}) => {
  const [minimize, setMinimize] = useState(true);
  return (
    <div
      className="fixed right-2 bottom-1 overflow-y-auto rounded-lg bg-white outline"
      style={{
        width: "250px",
        height: minimize ? "30px" : "500px",
      }}
    >
      <div
        className="flex w-full items-center justify-between bg-red-500 px-2"
        style={{
          height: "30px",
        }}
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
          <p
            onClick={() => {
              setMinimize((prev) => !prev);
            }}
          >
            <section className="flex gap-1">
              <TbClipboardList size={20} />

              <TbArrowsDiagonalMinimize2 size={20} />
            </section>
          </p>
        </div>
      </div>
      {selectedRows.map((item, idx) => {
        return (
          <ClipboardItem
            player={item}
            key={idx}
            onClick={(index: number) => onClick(index)}
          />
        );
      })}
    </div>
  );
};
