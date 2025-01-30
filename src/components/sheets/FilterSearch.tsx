import { Button, MultiSelect, Select } from "@mantine/core";
import { Supplier } from "./SheetsLayout";
import multistyle from "./multi.module.css";
import { CgSearchLoading } from "react-icons/cg";
import { SettingsModal } from "./SettingsModal";

export const FilterSearch = ({
  data,
  onSelectionChange,
  value,
  onClear,
  headers,
  headersToOmit,
  onChangeHeaders,
  sheets,
  selectedSheet,
  onChangeSheet,
}: {
  data: Supplier[];
  sheets: string[];
  selectedSheet: string;
  onSelectionChange: (selectedValues: string[]) => void;
  value: string[];
  headers: string[];
  headersToOmit: string[];
  onChangeHeaders: (key: string) => void;
  onChangeSheet: (sheetName: string) => void;
  onClear: () => void;
}) => {
  const handleMultiSelectChange = (selectedValues: string[]) => {
    onSelectionChange(selectedValues); // Call the handler passed from SheetsLayout
  };

  return (
    <div>
      <section className="flex w-full items-center justify-between gap-2 px-5">
        <Button w={200} variant="light" color="green">
          ACTIVE SHEET
        </Button>
        <Select
          defaultValue={sheets[0]}
          placeholder="Pick value"
          data={sheets}
          w={400}
          value={selectedSheet}
          onChange={(sheet) => sheet && onChangeSheet(sheet)}
        />
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
        <Button
          variant="filled"
          color="gray"
          onClick={onClear}
          className="border-[1px]"
          w={150}
        >
          Clear
        </Button>
        <SettingsModal
          headers={headers}
          headersToOmit={headersToOmit}
          onChangeHeaders={onChangeHeaders}
        />
      </section>
    </div>
  );
};
