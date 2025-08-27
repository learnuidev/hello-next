import { useEffect } from "react";

import { useLearningMode } from "./learning-mode.store";

import { useViewType } from "@/app/(auth)/convos/_play-v2/use-view-type";
import { useGetReviewParams } from "@/app/review/use-get-review-params";
import { useIsContent } from "@/app/review/use-is-content";
import { useUnreviwedCharacters } from "@/app/review/use-unreviewed-characters";
import { useCommonCharacterMode } from "@/stores/use-common-character-mode-store";
import { useReadModeStore } from "@/stores/use-readmode-store";
import { usePathname, useRouter } from "next/navigation";
import { useSearchQueryStore } from "../search/state";
import { useBrightModeStore } from "./use-bright-mode-store";
import {
  getReviewUrl,
  useGetReviewUrl,
  useGetReviewUrlFn,
} from "./use-get-review-url";
import { usePreviewMode } from "./use-preview-mode";

export function useShortCuts() {
  const readMode = useReadModeStore((state) => state.readMode);
  const setReadMode = useReadModeStore((state) => state.setReadMode);

  const { setCommonCharacterMode } = useCommonCharacterMode();

  const { mode, setMode } = useLearningMode();
  const setFocus = useViewType((state) => state.setFocus);
  const routeName = usePathname();

  const setShowPinyin = useBrightModeStore((state: any) => state.setShowPinyin);
  const { data: unReviewedCharacters } = useUnreviwedCharacters();

  const setQuerySync = useSearchQueryStore((state) => state.setQuerySync);
  const setQuery = useSearchQueryStore((state) => state.setQuery);
  const setQuery2 = useSearchQueryStore((state) => state.setQuery2);

  const { setNextMode } = usePreviewMode();

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
        (event.metaKey || event.ctrlKey)
        // && event.shiftKey
      ) {
        event.preventDefault();
        router.push("/");
        return null;
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
        if (routeName?.includes("/convos/")) {
          return null;
        }
        event.preventDefault();
        router.push("/timeline");
      }

      // if (["p"]?.includes(event.key)) {
      //   event.preventDefault();
      //   setShowPinyin((showPinyin: any) => !showPinyin);
      // }

      if (["p"]?.includes(event.key) && event.metaKey) {
        event.preventDefault();
        router.push("/pinyin");
      }
      if (["p"]?.includes(event.key) && event.ctrlKey) {
        event.preventDefault();
        setShowPinyin((showPinyin: any) => !showPinyin);
      }
      if (["e"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/convos");
      }

      if (["b"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommonCharacterMode(false);
        setNextMode();
      }
      if (["m"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setNextMode();
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
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
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
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
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
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
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
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
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
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
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
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
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
          router.push(`/nmm?${reviewUrl}`);
        }
        if (routeName?.includes("/review")) {
          router.push(`/review?${reviewUrl}`);
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
    setQuery2,
    setShowPinyin,
    setCommonCharacterMode,
    setNextMode,
  ]);
}
