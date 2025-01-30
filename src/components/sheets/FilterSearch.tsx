import { Button, MultiSelect } from "@mantine/core";
import { Supplier } from "./SheetsLayout";
import multistyle from "./multi.module.css";
import { CgSearchLoading } from "react-icons/cg";

export const FilterSearch = ({
  data,
  onSelectionChange,
  value,
  onClear,
}: {
  data: Supplier[];
  onSelectionChange: (selectedValues: string[]) => void;
  value: string[];
  onClear: () => void;
}) => {
  const handleMultiSelectChange = (selectedValues: string[]) => {
    onSelectionChange(selectedValues); // Call the handler passed from SheetsLayout
  };

  return (
    <section className="flex w-full items-center justify-between px-5">
      <MultiSelect
        className="m-2 w-full rounded-md border-[1px]"
        placeholder="Select items"
        data={data && data.map((d) => d.name)}
        searchable
        onChange={handleMultiSelectChange} // Update selection change handler
        value={value}
        classNames={multistyle}
        leftSection={<CgSearchLoading size={25} />}
      />
      <Button variant="outline" color="gray" onClick={onClear}>
        Clear
      </Button>
    </section>
  );
};
