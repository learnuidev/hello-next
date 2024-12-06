/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetNextParams } from "../../hooks/use-get-next-params";
import { HtmlAnalyticsView } from "./components/html-analytics-view";
import { HtmlArticleView } from "./components/html-article-view";

export const HtmlParser = () => {
  const { url, view } = useGetNextParams();

  // const router = useRouter();

  // useEffect(() => {
  //   router.push(`/next?feature-id=html-parser&url=${url}`);
  // }, [router, url]);

  if (view === "analytics") {
    return <HtmlAnalyticsView />;
  }

  return <HtmlArticleView />;
};
