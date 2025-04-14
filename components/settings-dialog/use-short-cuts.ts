import { useEffect } from "react";

import { useLearningModeStore } from "./learning-mode.store";

import { usePathname, useRouter } from "next/navigation";
import { useBrightModeStore } from "./use-bright-mode-store";
import { useViewType } from "@/app/(auth)/convos/_play-v2/use-view-type";
import { useUnreviwedCharacters } from "@/app/review/use-unreviewed-characters";
import { useReadModeStore } from "@/stores/use-readmode-store";
import {
  getReviewUrl,
  useGetReviewUrl,
  useGetReviewUrlFn,
} from "./use-get-review-url";
import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { useIsContent } from "@/app/review/use-is-content";
import { useSearchQueryStore } from "../search/state";

export function useShortCuts() {
  const setMode = useLearningModeStore((state) => state.setMode);
  const readMode = useReadModeStore((state) => state.readMode);
  const setReadMode = useReadModeStore((state) => state.setReadMode);
  const mode = useLearningModeStore((state) => state.mode);
  const setFocus = useViewType((state) => state.setFocus);
  const routeName = usePathname();

  const { data: unReviewedCharacters } = useUnreviwedCharacters();

  const brightMode = useBrightModeStore((state: any) => state.mode);
  const setQuerySync = useSearchQueryStore((state) => state.setQuerySync);
  const setQuery = useSearchQueryStore((state) => state.setQuery);
  const setQuery2 = useSearchQueryStore((state) => state.setQuery2);

  const setBrightMode = useBrightModeStore((state: any) => state.setMode);
  // const reviewUrl = useGetReviewUrl({ reviewMode: "all" });
  const reviewUrl = useGetReviewUrl();
  const reviewUrlFn = useGetReviewUrlFn();
  const {
    level,
    mode: viewMode,
    entryId,
    reviewMode,
    studyMode,
    view,
  } = useGetReviewParams();

  const isContent = useIsContent(viewMode);

  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: any) {
      if (event.key === "y" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMode("yct");
      }

      if (
        event.key === "h" &&
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey
      ) {
        event.preventDefault();
        router.push("/");
        return null;
      }

      if (event.key === "h" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        // router.push("/");
        // router.push("/nmm");
        setMode(mode === "hsk" ? "hsk3" : "hsk");

        if (routeName?.includes("/review")) {
          router.push(
            `/review?level=${level}&mode=${mode === "hsk" ? "hsk3" : "hsk"}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}${view ? `&view=${view}` : ``}`
          );
        }
      }

      if (["u"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/du");
      }
      if (["a"]?.includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        router.push("/apps");
      }

      if (["d"]?.includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        router.push("/diary");
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
      if (["o"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
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
        if (routeName?.includes("/review") || entryId || isContent) {
          if (reviewMode === "all") {
            router.push(reviewUrlFn({ reviewMode: "" }));
            return null;
          } else {
            router.push(reviewUrlFn({ reviewMode: "all" }));
            return null;
          }
          alert("yo");
        }
        event.preventDefault();
        setBrightMode((val: any) => !val);
        setReadMode(!readMode);
        setFocus((focus: string) => (focus === "hanzi" ? "en" : "hanzi"));
        // setView((prev: string) => (prev === "focus" ? "default" : "focus"));
      }

      if (["1"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        const reviewUrl = getReviewUrl({
          mode: viewMode,
          level: 1,
          entryId,
          studyMode,
          reviewMode,
        });

        if (routeName?.includes("/nmm")) {
          // router.push(
          //   `/nmm?level=${1}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );

          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);

          // router.push(
          //   `/review?level=${1}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
        }

        return;
      }
      if (["2"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        const reviewUrl = getReviewUrl({
          mode: viewMode,
          level: 2,
          entryId,
          studyMode,
          reviewMode,
        });

        if (routeName?.includes("/nmm")) {
          // router.push(
          //   `/nmm?level=${2}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
          // router.push(
          //   `/review?level=${2}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
        }

        return;
      }
      if (["3"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        const reviewUrl = getReviewUrl({
          mode: viewMode,
          level: 3,
          entryId,
          studyMode,
          reviewMode,
        });

        if (routeName?.includes("/nmm")) {
          // router.push(
          //   `/nmm?level=${3}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
          // router.push(
          //   `/review?level=${3}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
        }

        return;
      }
      if (["4"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        const reviewUrl = getReviewUrl({
          mode: viewMode,
          level: 4,
          entryId,
          studyMode,
          reviewMode,
        });
        if (routeName?.includes("/nmm")) {
          // router.push(
          //   `/nmm?level=${4}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
          // router.push(
          //   `/review?level=${4}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
        }

        return;
      }
      if (["5"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        const reviewUrl = getReviewUrl({
          mode: viewMode,
          level: 5,
          entryId,
          studyMode,
          reviewMode,
        });
        if (routeName?.includes("/nmm")) {
          // router.push(
          //   `/nmm?level=${5}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
          // router.push(
          //   `/review?level=${5}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
        }

        return;
      }
      if (["6"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        const reviewUrl = getReviewUrl({
          mode: viewMode,
          level: 6,
          entryId,
          studyMode,
          reviewMode,
        });

        if (routeName?.includes("/nmm")) {
          // router.push(
          //   `/nmm?level=${6}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
          // router.push(
          //   `/review?level=${6}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
        }

        return;
      }
      if (
        (["7"]?.includes(event.key) ||
          ["8"]?.includes(event.key) ||
          ["9"]?.includes(event.key)) &&
        (event.metaKey || event.ctrlKey)
      ) {
        const reviewUrl = getReviewUrl({
          mode: viewMode,
          level: 9,
          entryId,
          studyMode,
          reviewMode,
        });

        if (routeName?.includes("/nmm")) {
          // router.push(
          //   `/nmm?level=${9}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
          // router.push(
          //   `/review?level=${9}&mode=${viewMode}&entry-id=${entryId}&study-mode=${studyMode}${reviewMode ? `&review-mode=${reviewMode}` : ``}`
          // );
        }

        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);

    const onCopy = (event: any) => {
      const selection: any = document.getSelection()?.toString();
      setQuerySync(selection);
      setQuery(selection);
      setQuery2(selection);
      event.clipboardData.setData("text/plain", selection.toString());
      event.preventDefault();
    };

    window.addEventListener("copy", onCopy);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("copy", onCopy);
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
    viewMode,
    studyMode,
    routeName,
    level,
    view,
    reviewMode,
    entryId,
    isContent,
    reviewUrlFn,
    setQuerySync,
    setQuery,
  ]);
}
