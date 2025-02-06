import { Loader } from "@mantine/core";

export const SheetLoader = ({ data }: { data: any }) => {
  return (
    <div>
      {!data && (
        <div className="pointer-events-none absolute inset-0 flex h-screen w-full flex-col items-center justify-center">
          <Loader type="bars" color="#333" />
          <p className="animate-pulse">Fetching sheet ...</p>
        </div>
      )}
    </div>
  );
};
