"use client";

import { useEffect } from "react";

import { useBrightModeStore } from "@/components/settings-dialog/use-bright-mode-store";
import { useListenState } from "@/app/(auth)/listen/hooks/use-listen-state";

/**
 * Shows a featured screen the way it is meant to be read — pinyin and English
 * on — through the app's own switches, put back when the tab goes away.
 */
export const useShowcaseSettings = () => {
  const { playbackRate, setPlaybackRate } = useListenState();

  useEffect(() => {
    const { showPinyin, showEn } = useBrightModeStore.getState();

    useBrightModeStore.setState({ showPinyin: true, showEn: true });
    setPlaybackRate(1);

    return () => {
      useBrightModeStore.setState({ showPinyin, showEn });
      setPlaybackRate(playbackRate);
    };
    // Only on mount: these are restored with the values they had when the tab
    // opened, not with every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
