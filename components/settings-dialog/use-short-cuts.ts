import { useEffect } from "react";

import { useLearningModeStore } from "./learning-mode.store";

import { usePathname, useRouter } from "next/navigation";
import { useBrightModeStore } from "./use-bright-mode-store";
import { useViewType } from "@/app/(auth)/convos/_play-v2/use-view-type";
import { useUnreviwedCharacters } from "@/app/review/use-unreviewed-characters";
import { useReadModeStore } from "@/stores/use-readmode-store";
import { useGetReviewUrl } from "./use-get-review-url";

export function useShortCuts() {
  const setMode = useLearningModeStore((state) => state.setMode);
  const readMode = useReadModeStore((state) => state.readMode);
  const setReadMode = useReadModeStore((state) => state.setReadMode);
  const mode = useLearningModeStore((state) => state.mode);
  const setFocus = useViewType((state) => state.setFocus);
  const routeName = usePathname();

  const { data: unReviewedCharacters } = useUnreviwedCharacters();

  const brightMode = useBrightModeStore((state: any) => state.mode);

  const setBrightMode = useBrightModeStore((state: any) => state.setMode);
  const reviewUrl = useGetReviewUrl();

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
        // router.push("/nmm");
        setMode(mode === "hsk" ? "hsk3" : "hsk");
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

        router.push(reviewUrl);
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
        setReadMode(!readMode);
        setFocus((focus: string) => (focus === "hanzi" ? "en" : "hanzi"));
        // setView((prev: string) => (prev === "focus" ? "default" : "focus"));
      }

      if (["1"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        if (routeName?.includes("/nmm")) {
          router.push(`/nmm?level=${1}`);
        }

        return;
      }
      if (["2"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        if (routeName?.includes("/nmm")) {
          router.push(`/nmm?level=${2}`);
        }

        return;
      }
      if (["3"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        if (routeName?.includes("/nmm")) {
          router.push(`/nmm?level=${3}`);
        }

        return;
      }
      if (["4"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        if (routeName?.includes("/nmm")) {
          router.push(`/nmm?level=${4}`);
        }

        return;
      }
      if (["5"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        if (routeName?.includes("/nmm")) {
          router.push(`/nmm?level=${5}`);
        }

        return;
      }
      if (["6"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        if (routeName?.includes("/nmm")) {
          router.push(`/nmm?level=${6}`);
        }

        return;
      }
      if (
        (["7"]?.includes(event.key) ||
          ["8"]?.includes(event.key) ||
          ["9"]?.includes(event.key)) &&
        (event.metaKey || event.ctrlKey)
      ) {
        if (routeName?.includes("/nmm")) {
          router.push(`/nmm?level=${9}`);
        }

        return;
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
    setReadMode,
    readMode,
    reviewUrl,
  ]);
}
