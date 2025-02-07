import { Loader } from "@mantine/core";

export const SheetLoader = ({ data }: { data: any }) => {
  return (
    <div>
      {!data && (
        <div className="pointer-events-none absolute inset-0 flex h-screen w-full items-center justify-center gap-2">
          <Loader type="dots" color="#333" size={20} />
          <p className="animate-pulse">Fetching sheet ...</p>
        </div>
      )}
    </div>
  );
};
