import { atomWithStorage } from "jotai/utils";

export const sheetsAtom = atomWithStorage<string[] | null>("sheets", null);
export const selectedSheetAtom = atomWithStorage<string>("selectedSheet", "");
