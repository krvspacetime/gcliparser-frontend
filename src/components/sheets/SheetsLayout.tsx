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

const ROW_HEIGHT = 35; // Adjust this value based on your table row height
const HEADER_HEIGHT = 50; // Adjust this value based on your table header height
const SHEETS = ["ITC MOCK SUPPLIER CONTACTS", "PH FOOTBALL WIKI DATA"];

export const SheetsLayout = () => {
  const [sheets, _] = useState<string[]>(SHEETS);
  const [selectedSheet, setSelectedSheet] = useState(SHEETS[0]);
  const [multiSelectInputValue, setMultiSelectInputValue] = useState<string[]>(
    [],
  );
  const [data, setData] = useState<Supplier[] | null>(null);
  const [selectedRowsIndex, setSelectedRowsIndex] = useState<number[]>([]);
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [omittedKeys, setOmittedKeys] = useState<string[]>([]);
  const tableHeaders_ = tableHeaders.map((head, idx) => {
    if (omittedKeys.includes(head)) return null;
    return (
      <Table.Th key={idx} style={{ flex: "1 1 0" }}>
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

  const fetchData = async (sheetName: string) => {
    try {
      const params = new URLSearchParams({
        sheet_name: sheetName,
      });
      const response = await fetch(
        `http://localhost:8000/sheets/df/cached?${params}`,
      );

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
      setData(data.data);
      setTableHeaders(data.headers);
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

  const onChangeOmmitedKeys = (key: string) => {
    setOmittedKeys((prev) => {
      if (prev.includes(key)) return prev.filter((i) => i !== key);
      return [...prev, key];
    });
  };

  const onChangeSheet = (sheetName: string) => {
    setSelectedSheet(sheetName);
    fetchData(sheetName);
  };

  useEffect(() => {
    fetchData(sheets[0]);
  }, []);

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
        className="rounded-lg"
        onClick={(event) => handleRowClick(event, d, d.index)}
        style={{
          ...style,
          backgroundColor: selectedRowsIndex.includes(d.index)
            ? "#333"
            : "transparent",
          color: selectedRowsIndex.includes(d.index) ? "white" : "black",
          display: "flex",
          width: "100%",
          minWidth: "fit-content",
        }}
      >
        {Object.keys(d).map(
          (key) =>
            !omittedKeys.includes(key) && (
              <Table.Td
                style={{
                  // minWidth: "150px",
                  flex: "1 1 0",
                  // whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                key={key}
              >
                {d[key as keyof Supplier]}
              </Table.Td>
            ),
        )}
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
          headers={tableHeaders}
          headersToOmit={omittedKeys}
          onChangeHeaders={onChangeOmmitedKeys}
          sheets={sheets}
          selectedSheet={selectedSheet}
          onChangeSheet={onChangeSheet}
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
              // stickyHeader
              style={{
                width: "100%",
                tableLayout: "fixed",
                overflow: "auto",
              }}
            >
              <Table.Thead
                className="z-[1001]"
                style={{ display: "block", width: "100%" }}
              >
                <Table.Tr
                  className="font-bolder text-black"
                  style={{ display: "flex" }}
                >
                  {tableHeaders_}
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
