import { useEffect } from "react";

import { useLearningModeStore } from "./learning-mode.store";

import { useRouter } from "next/navigation";
import { useBrightModeStore } from "./use-bright-mode-store";
import { useViewType } from "@/app/(auth)/convos/_play-v2/use-view-type";
import { useUnreviwedCharacters } from "@/app/review/use-unreviewed-characters";

export function useShortCuts() {
  const setMode = useLearningModeStore((state) => state.setMode);
  const mode = useLearningModeStore((state) => state.mode);
  const setFocus = useViewType((state) => state.setFocus);

  const unReviewedCharacters = useUnreviwedCharacters();

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const setBrightMode = useBrightModeStore((state: any) => state.setMode);

  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: any) {
      if (event.key === "y" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMode("yct");
      }
      if (event.key === "h" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        // router.push("/");
        setMode("hsk");
      }
      if (["m"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMode("nmm");
      }
      if (["x"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMode("xiaoma");
      }
      if (["i"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/insights");
      }
      if (["o"]?.includes(event.key) && event.metaKey) {
        event.preventDefault();
        router.push("/nmm");
      }

      if (["t"]?.includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        router.push("/tita");
      }
      if (["r"]?.includes(event.key) && event.ctrlKey) {
        event.preventDefault();

        if (unReviewedCharacters?.[0]?.hanzi) {
          router.push(`/review?character=${unReviewedCharacters?.[0]?.hanzi}`);
        } else {
          router.push("/review");
        }
      }
      if (["l"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/timeline");
      }
      if (["p"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/pinyin");
      }
      if (["e"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/convos");
      }

      if (["b"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setBrightMode((val: any) => !val);
        setFocus((focus: string) => (focus === "hanzi" ? "en" : "hanzi"));
        // setView((prev: string) => (prev === "focus" ? "default" : "focus"));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [
    mode,
    setMode,
    setBrightMode,
    brightMode,
    router,
    unReviewedCharacters,
    setFocus,
  ]);
}
