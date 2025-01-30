import { MultiSelect } from "@mantine/core";
import { Player } from "./SheetsLayout";
import multistyle from "./multi.module.css";
import { TbClipboardList, TbArrowsDiagonalMinimize2 } from "react-icons/tb";

export const FilterSearch = ({
  data,
  onSelectionChange,
  value,
}: {
  data: Player[];
  onSelectionChange: (selectedValues: string[]) => void;
  value: string[];
}) => {
  const handleMultiSelectChange = (selectedValues: string[]) => {
    onSelectionChange(selectedValues); // Call the handler passed from SheetsLayout
  };

  return (
    <section className="flex w-full justify-between">
      <MultiSelect
        className="m-2 w-full rounded-md border-[1px]"
        placeholder="Select items"
        data={data && data.map((d) => d.name)}
        searchable
        onChange={handleMultiSelectChange} // Update selection change handler
        value={value}
        classNames={multistyle}
        leftSection={<TbClipboardList />}
      />
    </section>
  );
};
