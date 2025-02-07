import { Loader } from "@mantine/core";
import { AddSheetModal } from "./modals/AddSheetModal";

export const SheetLoader = ({
  data,
  sheets,
}: {
  data: any;
  sheets: string[] | null;
  selectedSheet: string;
}) => {
  return (
    <div className="pointer-events-none">
      {!sheets ||
        (sheets?.length === 0 && !data && (
          <div className="pointer-events-none absolute inset-0 z-[1000] flex h-screen w-full items-center justify-center gap-2">
            <p className="z-[2001]">Please add a sheet</p>
            <AddSheetModal />
          </div>
        ))}
      {!data && sheets && sheets?.length > 0 && (
        <div className="pointer-events-none absolute inset-0 flex h-screen w-full items-center justify-center gap-2">
          <Loader type="dots" color="#333" size={20} />
          <p className="animate-pulse">Fetching sheet ...</p>
        </div>
      )}
    </div>
  );
};
