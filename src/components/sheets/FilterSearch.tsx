import { MultiSelect } from "@mantine/core";
import { Player } from "./SheetsLayout";

export const FilterSearch = ({ data }: { data: Player[] }) => {
  return (
    <section className="flex w-full justify-between">
      {/* <input
        type="search"
        className="m-2 min-w-[20%] border-[1px] border-black/30 indent-2"
        placeholder="Search"
      /> */}
      <MultiSelect
        className="m-2 w-full border-[1px] border-black/30"
        placeholder="Pick value"
        data={data && data.map((d) => d.name)}
        searchable
      />
    </section>
  );
};
