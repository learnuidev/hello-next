"use client";

import { useState } from "react";
import { useParseHtmlQuery } from "./hooks/use-parse-html";
import { Nothing } from "@/app/nmm/nothing";
import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";

export const HtmlParser = () => {
  const url = `http://f.china.com.cn/2021-02/09/content_77203266.htm`;

  const [urlState, setUrlState] = useState("");

  const { data, isError, isLoading } = useParseHtmlQuery(urlState);

  return (
    <div>
      <section>
        <div className="flex items-center w-full justify-center mt-8">
          <input
            className="w-full h-12 lg:h-[54px] sm:w-[740px] p-2 px-6 rounded-full outline-none text-lg font-extralight focus:shadow-sm focus:shadow-rose-400 transition bg-gray-100 dark:bg-[rgb(32,33,35)] placeholder:text-gray-300 dark:placeholder:text-gray-500"
            placeholder="http://www.mandarino.io"
            onKeyDown={(event: any) => {
              if (event.key === "Enter") {
                setUrlState(event.target.value);
              }
            }}
          />
        </div>
      </section>

      {isError ? (
        <Nothing message="Invalid url" />
      ) : !data ? (
        <Nothing />
      ) : isLoading ? (
        <LottieLoadingAnimation />
      ) : (
        <section className="mt-12">
          <code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </code>
        </section>
      )}
    </div>
  );
};
