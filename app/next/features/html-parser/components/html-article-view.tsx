/* eslint-disable @next/next/no-img-element */
"use client";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { useRouter } from "next/navigation";
import { useGetNextParams } from "../../../hooks/use-get-next-params";
import { useParseHtmlQuery } from "../hooks/use-parse-html";
import Link from "next/link";
import { Icons } from "@/components/ui/icons.v2";
import { cn } from "@/lib/utils";

export const HtmlArticleView = () => {
  const { url, view, title } = useGetNextParams();

  const router = useRouter();

  const { data, isError, isLoading } = useParseHtmlQuery(url);

  return (
    <div>
      <section>
        <div className="flex items-center w-full justify-center mt-[-60px]">
          <input
            className="w-full h-12 lg:h-[44px] sm:w-[740px] py-2 px-6 rounded-full outline-none text-[16px] font-extralight focus:shadow-sm focus:shadow-rose-400 transition bg-gray-100 dark:bg-[rgb(32,33,35)] placeholder:text-gray-300 dark:placeholder:text-gray-500"
            placeholder={"https://www.mandarino.io"}
            onKeyDown={(event: any) => {
              if (event.key === "Enter") {
                if (event.target.value) {
                  router.push(
                    `/next?feature-id=html-parser&url=${event.target.value || url}`
                  );
                }
              }
            }}
          />
        </div>
      </section>

      {/* <p>{url}</p> */}

      {isLoading ? (
        <LottieLoadingAnimation />
      ) : isError ? (
        <Nothing message="Invalid url" />
      ) : !data ? (
        <Nothing />
      ) : ["unknown", "people.cn"]?.includes(data?.sourceId) ||
        data?.type === "not-supported" ? (
        <section className="mt-12">
          <code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </code>
        </section>
      ) : (
        <section className="mt-12">
          <h1 className="text-center text-xl sm:text-3xl lg:px-80 sm:px-32 px-8">
            {data?.data?.title}
          </h1>

          <div className="underline">
            <Link
              className="text-center block space-x-2 mt-4 text-gray-400 text-xs"
              href={data?.url}
              target="_blank"
            >
              <span> Original Article</span>

              <Icons.externalLink />
            </Link>
          </div>

          <div className="max-w-5xl m-auto">
            {data?.data?.sections?.length === 0 ? (
              <Nothing />
            ) : (
              data?.data?.sections?.map((section, idx, ctx) => {
                if (section?.image || section?.img) {
                  return (
                    <div
                      key={JSON.stringify(section)}
                      className="flex justify-center items-center"
                    >
                      <img
                        className="rounded-2xl text-center mt-12 w-full sm:max-w-xl"
                        alt="Image"
                        src={section?.image || section?.img}
                      />
                    </div>
                  );
                }

                if (section.caption) {
                  return (
                    <p
                      key={JSON.stringify(section)}
                      className="text-center mt-4 text-gray-400 text-sm"
                    >
                      {section?.hanzi}
                    </p>
                  );
                }

                return (
                  <p
                    className="my-8 text-gray-300 text-lg sm:text-xl"
                    key={JSON.stringify(section)}
                  >
                    {section?.hanzi}
                  </p>
                );
              })
            )}
          </div>
          {/* <code>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </code> */}

          {data?.data?.links?.length !== 1 && (
            <div className="flex justify-center items-center space-x-4">
              {data?.data?.links?.map((link) => {
                return (
                  <button
                    className={cn(
                      "text-2xl transition-all font-extralight",
                      title == link?.title ? "text-white" : "text-gray-400"
                    )}
                    onClick={() => {
                      router.push(
                        `/next?feature-id=html-parser&url=${link?.href}&view=${view}&title=${link?.title}`
                      );
                    }}
                    key={JSON.stringify(link)}
                  >
                    {link?.title}
                  </button>
                );
              })}
            </div>
          )}

          {/* <div className="flex justify-center items-center">
            <code>
              <pre>{JSON.stringify(data?.data?.links, null, 4)}</pre>
            </code>
          </div> */}
        </section>
      )}
    </div>
  );
};
