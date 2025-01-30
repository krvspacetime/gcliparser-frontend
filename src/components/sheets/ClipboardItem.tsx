import { Supplier } from "./SheetsLayout";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineExpandMore } from "react-icons/md";
import { useState } from "react";
import { TbCopy } from "react-icons/tb";

export const ClipboardItem = ({
  supplier,
  onClick,
}: {
  supplier: Supplier;
  onClick: (index: number) => void;
}) => {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <div className="flex w-full items-center justify-between px-2">
        <p className="">{supplier.name}</p>
        <div className="flex items-center gap-2">
          <TbCopy />
          <MdOutlineExpandMore
            size={20}
            onClick={() => setExpand((prev) => !prev)}
          />
          <TiDeleteOutline
            size={20}
            color="red"
            onClick={() => {
              onClick(supplier.index);
            }}
          />
        </div>
      </div>
      {expand && (
        <div className="block bg-emerald-100 px-3">
          <p>Name: {supplier.name}</p>
          <p>Position: {supplier.contact_person}</p>
          <p>Number: {supplier.contact_number}</p>
        </div>
      )}
    </div>
  );
};
