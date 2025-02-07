import { Button, MultiSelect, Select } from "@mantine/core";
import { CgSearchLoading } from "react-icons/cg";
import { SettingsModal } from "./SettingsModal";
import { SiGooglesheets } from "react-icons/si";
import { VscVmActive } from "react-icons/vsc";
import { GrClearOption } from "react-icons/gr";
import multistyle from "./multi.module.css";
import { useSetAtom } from "jotai";
import { sidebarOpenAtom } from "../../atoms/sidebar-atom";
import { BiSidebar } from "react-icons/bi";
import { motion } from "motion/react";
import { Supplier } from "../../types/sheets";

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

  // Sidebar
  const setSidebarOpen = useSetAtom(sidebarOpenAtom);
  const onOpenSidebar = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSidebarOpen((prev) => !prev);
  };
  return (
    <div>
      <section className="flex w-full items-center justify-between gap-2 px-5">
        <motion.img
          src="gcp.png"
          height={35}
          width={35}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        />
        <Button
          miw={150}
          variant="light"
          color="#333"
          rightSection={<VscVmActive size={20} />}
        >
          Active Sheet
        </Button>

        <Select
          className="font-Montserrat"
          defaultValue={sheets[0]}
          placeholder="Pick value"
          data={sheets}
          miw={300}
          value={selectedSheet}
          onChange={(sheet) => sheet && onChangeSheet(sheet)}
          styles={{
            option: { fontSize: 12 },
            input: { fontSize: 13 },
          }}
          rightSection={<SiGooglesheets size={20} />}
        />
        <MultiSelect
          className="m-2 w-full rounded-md"
          placeholder="Select items"
          data={data && data.map((d) => d.name)}
          searchable
          onChange={handleMultiSelectChange} // Update selection change handler
          value={value}
          classNames={multistyle}
          leftSection={<CgSearchLoading size={25} />}
          styles={{
            input: { maxHeight: 100 },
          }}
          hidePickedOptions
        />
        <Button
          variant="light"
          color="#333"
          onClick={onClear}
          miw={100}
          rightSection={<GrClearOption size={20} />}
          disabled={!value.length}
        >
          Clear
        </Button>
        <Button
          variant="light"
          color="#333"
          rightSection={<BiSidebar size={20} />}
          miw={120}
          onClick={onOpenSidebar}
        >
          Sidebar
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
