import { MdOutlineExpandMore } from "react-icons/md";
import { useState } from "react";
import { Supplier } from "../../../types/sheets";
import { CopyButton } from "@mantine/core";
import { BsClipboard2Check, BsClipboard2Plus } from "react-icons/bs";
import { notifications } from "@mantine/notifications";
import { IoIosRemove } from "react-icons/io";

export const ClipboardItem = ({
  supplier,
  onClick,
}: {
  supplier: Supplier;
  onClick: (index: number) => void;
}) => {
  const [expand, setExpand] = useState(false);

  const copyToClipboard = (copy: () => void) => {
    copy();
    notifications.show({
      title: "Copied.",
      message: "Copied items to clipboard.",
      position: "top-right",
      withCloseButton: true,
      withBorder: true,
      color: "#333",
      autoClose: 1000,
    });
  };
  return (
    <div>
      <div className="flex w-full items-center justify-between px-2">
        <p className="">{supplier.name}</p>
        <div className="flex items-center gap-2">
          <CopyButton
            value={`Name: ${supplier.name}\nLocation: ${supplier.location}\nContact Person: ${supplier.contact_person}\nRole: ${supplier.role}\nContact Number: ${supplier.contact_number}\nEmail: ${supplier.email}`}
          >
            {({ copied, copy }) =>
              copied ? (
                <BsClipboard2Check size={20} />
              ) : (
                <BsClipboard2Plus
                  size={20}
                  onClick={() => copyToClipboard(copy)}
                />
              )
            }
          </CopyButton>
          <MdOutlineExpandMore
            size={20}
            onClick={() => setExpand((prev) => !prev)}
          />
          <IoIosRemove
            size={20}
            color="#333"
            onClick={() => {
              onClick(supplier.index);
            }}
          />
        </div>
      </div>
      {expand && (
        <div className="border-opacity-20 rounded-lg border border-[#333] p-2 text-sm">
          {Object.keys(supplier)
            .slice(1, 8)
            .map((key) => (
              <p key={key} className="flex items-center justify-between">
                <span>{key}:</span>
                <span className="line-clamp-1">
                  {supplier[key as keyof Supplier]}
                </span>
              </p>
            ))}
        </div>
      )}
    </div>
  );
};
