import { Table } from "@mantine/core";
import { useEffect, useMemo, useState, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import { FilterSearch } from "./FilterSearch";
import { SheetLoader } from "./SheetLoader";
import { DataView } from "./DataView";
import { ClipboardTextArea } from "./ClipboardTextArea";
import { notifications } from "@mantine/notifications";

export interface Supplier {
  index: number;
  name: string;
  location: string;
  contact_person: string;
  role: string;
  item: string;
  contact_number: string;
  email: string;
}

const headers = [
  "Index",
  "Name",
  "Location",
  "Contact Person",
  "Role",
  "Item",
  "Contact Number",
  "Email",
];

const omittedKeys = ["img_src_avatar", "caps", "index"];

const ROW_HEIGHT = 35; // Adjust this value based on your table row height
const HEADER_HEIGHT = 50; // Adjust this value based on your table header height

export const SheetsLayout = () => {
  const [multiSelectInputValue, setMultiSelectInputValue] = useState<string[]>(
    [],
  );
  const [data, setData] = useState<Supplier[] | null>(null);
  const [selectedRows, setSelectedRows] = useState<Supplier[]>([]);
  const [selectedRowsIndex, setSelectedRowsIndex] = useState<number[]>([]);
  const tableHeaders = headers.map((head, idx) => {
    return (
      <Table.Th key={idx} style={{ minWidth: "150px", width: "150px" }}>
        {head}
      </Table.Th>
    );
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(500); // Default height

  useEffect(() => {
    if (tableContainerRef.current) {
      const windowHeight = window.innerHeight;
      const containerTop =
        tableContainerRef.current.getBoundingClientRect().top;
      setContainerHeight(windowHeight - containerTop - 100); // Subtract some padding
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/df/cached`);

      if (!response) {
        throw new Error(`Error fetching data. ${response}`);
      }

      if (response.redirected) {
        notifications.show({
          title: "Redirected",
          message: "Cached not found to fetching fresh dataframe.",
          position: "top-right",
          withCloseButton: true,
          withBorder: true,
          color: "red",
        });
      }

      const data = await response.json();
      console.log("data", data);
      setData(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const handleRowClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    supplier: Supplier,
    index: number,
  ) => {
    event.preventDefault();
    setSelectedRowsIndex((prev) => {
      const isSelected = prev.includes(index);
      if (isSelected) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
    setMultiSelectInputValue((prev) => {
      if (prev.includes(supplier.name)) {
        return prev.filter(
          (i) => i.toLowerCase() !== supplier.name.toLowerCase(),
        );
      } else {
        return [...prev, supplier.name];
      }
    });
  };

  const onClear = () => {
    setMultiSelectInputValue([]);
    setSelectedRows([]);
    setSelectedRowsIndex([]);
  };

  const removeFromSelectedRow = (index: number) => {
    setSelectedRowsIndex((prev) => prev.filter((i) => i !== index));
  };

  const copyButtonValue = useMemo(() => {
    return selectedRowsIndex
      .map((index) => {
        const row = data?.find((d) => d.index === index); // Get the supplier using the index
        if (!row) return ""; // Handle the case where row is undefined
        if (row) {
          return (
            Object.entries(row)
              .filter(([key]) => !omittedKeys.includes(key))
              .map(
                ([key, value]) =>
                  `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`,
              )
              .join("\n") + "\n"
          );
        } else {
          return "";
        }
      })
      .join("\n");
  }, [selectedRowsIndex, data]);

  const handleSelectionChange = (selectedValues: string[]) => {
    console.log("selectedValues", selectedValues);

    // Update multiSelectInputValue directly from selectedValues
    setMultiSelectInputValue(selectedValues);

    // Update selectedRowsIndex based on the selected values
    const newSelectedRowsIndex = selectedValues
      .map((value) => {
        const supplier = data?.find((d) => d.name === value);
        return supplier ? supplier.index : null; // Get the index or null if not found
      })
      .filter((index) => index !== null); // Filter out null values

    // Set the new selected rows index
    setSelectedRowsIndex(newSelectedRowsIndex as number[]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data:", data);
    console.log("Selected Rows Index:", selectedRowsIndex);

    const selectedRows = data?.filter((supplier, index) =>
      selectedRowsIndex.includes(index),
    );
    setSelectedRows(selectedRows || []);
    console.log("selectedRowsIndex", selectedRowsIndex);
  }, [data, selectedRowsIndex]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const d = data?.[index];
    if (!d) return null;

    return (
      <Table.Tr
        key={d.name + index}
        onClick={(event) => handleRowClick(event, d, d.index)}
        style={{
          ...style,
          backgroundColor: selectedRowsIndex.includes(d.index)
            ? "lightgreen"
            : "transparent",
          display: "flex",
          width: "100%",
          minWidth: "fit-content",
        }}
      >
        <Table.Td style={{ minWidth: "150px", width: "150px" }}>
          {d.index}
        </Table.Td>
        <Table.Td style={{ minWidth: "150px", width: "150px" }}>
          {d.name}
        </Table.Td>
        <Table.Td style={{ minWidth: "150px", width: "150px" }}>
          {d.location}
        </Table.Td>
        <Table.Td style={{ minWidth: "150px", width: "150px" }}>
          {d.contact_person}
        </Table.Td>
        <Table.Td style={{ minWidth: "150px", width: "150px" }}>
          {d.role}
        </Table.Td>
        <Table.Td style={{ minWidth: "150px", width: "150px" }}>
          {d.item}
        </Table.Td>
        <Table.Td style={{ minWidth: "150px", width: "150px" }}>
          {d.contact_number}
        </Table.Td>
        <Table.Td style={{ minWidth: "150px", width: "150px" }}>
          {d.email}
        </Table.Td>
      </Table.Tr>
    );
  };

  return (
    <>
      <div>
        <FilterSearch
          data={data ?? []}
          value={multiSelectInputValue}
          onSelectionChange={handleSelectionChange}
          onClear={onClear}
        />
        <section className="p-5">
          <SheetLoader data={data} />
          <div
            ref={tableContainerRef}
            style={{
              height: containerHeight,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Table
              stickyHeader
              striped
              style={{ width: "100%", tableLayout: "fixed" }}
            >
              <Table.Thead
                className="z-[1001]"
                style={{ display: "block", width: "100%" }}
              >
                <Table.Tr
                  className="font-bolder text-black"
                  style={{ display: "flex" }}
                >
                  {tableHeaders}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody style={{ display: "block", width: "100%" }}>
                {data && (
                  <List
                    height={containerHeight - HEADER_HEIGHT}
                    itemCount={data.length}
                    itemSize={ROW_HEIGHT}
                    width="100%"
                    style={{ overflowX: "auto" }}
                  >
                    {Row}
                  </List>
                )}
              </Table.Tbody>
            </Table>
          </div>
        </section>
        <DataView
          data={data ?? []}
          selectedRowsIndex={selectedRowsIndex}
          onClick={removeFromSelectedRow}
        />
      </div>
      <ClipboardTextArea value={copyButtonValue} />
    </>
  );
};
