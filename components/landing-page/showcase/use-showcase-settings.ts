"use client";

import { useEffect } from "react";

import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";

/**
 * Shows a featured screen the way it is meant to be read — pinyin and English
 * on — through the app's own switches, put back when the tab goes away.
 */
export const useShowcaseSettings = () => {
  useEffect(() => {
    const { showPinyin, showEn } = useBrightModeStore.getState();

    useBrightModeStore.setState({ showPinyin: true, showEn: true });

    return () => {
      useBrightModeStore.setState({ showPinyin, showEn });
    };
  }, []);
};
