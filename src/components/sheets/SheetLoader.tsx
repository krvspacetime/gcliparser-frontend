import { Loader } from "@mantine/core";
import { AddSheetModal } from "./modals/AddSheetModal";

export const SheetLoader = ({
  data,
  sheets,
  selectedSheet,
}: {
  data: any;
  sheets: string[] | null;
  selectedSheet: string;
}) => {
  return (
    // <div>
    //   {!data && (
    //     <div className="pointer-events-none absolute inset-0 flex h-screen w-full items-center justify-center gap-2">
    //       <Loader type="dots" color="#333" size={20} />
    //       <p className="animate-pulse">Fetching sheet ...</p>
    //     </div>
    //   )}
    // </div>
    <div>
      {!sheets && (
        <div className="pointer-events-auto absolute inset-0 z-[2000] flex h-screen w-full items-center justify-center gap-2">
          {/* <Loader type="dots" color="#333" size={20} /> */}
          <p className="z-[2001]">Please add a sheet</p>
          <AddSheetModal />
        </div>
      )}
      {!data && sheets && (
        <div className="pointer-events-none absolute inset-0 flex h-screen w-full items-center justify-center gap-2">
          <Loader type="dots" color="#333" size={20} />
          <p className="animate-pulse">Fetching sheet ...</p>
        </div>
      )}
    </div>
  );
};
