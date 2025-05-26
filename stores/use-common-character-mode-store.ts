"use client";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import { useReadModeStore } from "./use-readmode-store";
import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

export const useCommonCharacterModeStore = create((set: any, get: any) => ({
  commonCharaterMode: false,
  setCommonCharacterMode: (f: any) =>
    typeof f === "function"
      ? set({ commonCharacterMode: f(get().commonCharacterMode) })
      : set({ commonCharacterMode: f }),
}));

export function useCommonCharacterMode() {
  const setReadMode = useReadModeStore((state) => state.setReadMode);

  const setBrightMode = useBrightModeStore((state: any) => state.setMode);

  const commonCharacterMode = useCommonCharacterModeStore(
    (state) => state.commonCharaterMode
  );
  const _setCommonCharacterMode = useCommonCharacterModeStore(
    (state) => state.setCommonCharacterMode
  );

  const setCommonCharacterMode = (val?: boolean) => {
    if (val !== false) {
      setBrightMode(false);
      setReadMode(false);
    }

    _setCommonCharacterMode((mode: any) => {
      if (typeof val === "boolean") {
        return val;
      }

      return !mode;
    });
  };

  return { commonCharacterMode, setCommonCharacterMode };
}
