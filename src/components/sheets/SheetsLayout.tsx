import { Table } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { FilterSearch } from "./FilterSearch";
import { SheetLoader } from "./SheetLoader";
import { DataView } from "./DataView";
import { ClipboardTextArea } from "./ClipboardTextArea";
import { notifications } from "@mantine/notifications";

export interface Player {
  index: number;
  name: string;
  position: string;
  number: number;
  date_of_birth: string;
  caps: number;
  goals: number;
  assists: number;
}

const headers = [
  "number",
  "position",
  "name",
  "date_of_birth",
  "caps",
  "goals",
  "assists",
];

const omittedKeys = ["img_src_avatar", "caps", "index"];

export const SheetsLayout = () => {
  const [multiSelectInputValue, setMultiSelectInputValue] = useState<string[]>(
    [],
  );
  const [data, setData] = useState<Player[] | null>(null);
  const [selectedRows, setSelectedRows] = useState<Player[]>([]);
  const [selectedRowsIndex, setSelectedRowsIndex] = useState<number[]>([]);
  const tableHeaders = headers.map((head, idx) => {
    return <Table.Th key={idx}>{head}</Table.Th>;
  });

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
    player: Player,
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
      if (prev.includes(player.name)) {
        return prev.filter((i) => i !== player.name);
      } else {
        return [...prev, player.name];
      }
    });
  };

  const removeFromSelectedRow = (index: number) => {
    setSelectedRowsIndex((prev) => prev.filter((i) => i !== index));
  };

  const copyButtonValue = useMemo(() => {
    return selectedRows
      .map(
        (row) =>
          Object.entries(row)
            .filter(([key]) => !omittedKeys.includes(key))
            .map(
              ([key, value]) =>
                `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`,
            )
            .join("\n") + "\n",
      )
      .join("\n");
  }, [selectedRows]);

  const handleSelectionChange = (selectedValues: string[]) => {
    // Assuming selected values are the names or identifiers of the rows
    const selectedIndexes = selectedValues.map(
      (value) => data?.findIndex((player) => player.name === value) || 0,
    );
    setSelectedRowsIndex(selectedIndexes);
    setMultiSelectInputValue(selectedValues);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const selectedRows = data?.filter((player, index) =>
      selectedRowsIndex.includes(index),
    );
    setSelectedRows(selectedRows || []);
  }, [data, selectedRowsIndex]);

  return (
    <>
      <div>
        <FilterSearch
          data={data ?? []}
          value={multiSelectInputValue}
          onSelectionChange={handleSelectionChange}
        />
        <section className="p-5">
          <SheetLoader data={data} />
          <Table stickyHeader withColumnBorders striped>
            <Table.Thead className="z-[1001]">
              <Table.Tr className="font-bolder text-black">
                {tableHeaders}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data &&
                data.map((d, idx) => {
                  return (
                    <Table.Tr
                      key={d.name + idx}
                      onClick={(event) => handleRowClick(event, d, d.index)}
                      style={{
                        backgroundColor: selectedRowsIndex.includes(d.index)
                          ? "gray"
                          : "transparent",
                        fontWeight: selectedRowsIndex.includes(d.index)
                          ? "bold"
                          : "normal",
                      }}
                    >
                      <Table.Td>{d.number}</Table.Td>
                      <Table.Td>{d.position}</Table.Td>
                      <Table.Td>{d.name}</Table.Td>
                      <Table.Td>{d.date_of_birth}</Table.Td>
                      <Table.Td>{d.caps}</Table.Td>
                      <Table.Td>{d.goals}</Table.Td>
                      <Table.Td>{d.assists}</Table.Td>
                    </Table.Tr>
                  );
                })}
            </Table.Tbody>
          </Table>
        </section>
        <DataView selectedRows={selectedRows} onClick={removeFromSelectedRow} />
      </div>
      <ClipboardTextArea value={copyButtonValue} />
    </>
  );
};
