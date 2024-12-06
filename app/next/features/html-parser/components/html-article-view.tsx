/* eslint-disable @next/next/no-img-element */
"use client";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { useRouter } from "next/navigation";
import { useGetNextParams } from "../../../hooks/use-get-next-params";
import { useParseHtmlQuery } from "../hooks/use-parse-html";
import Link from "next/link";
import { Icons } from "@/components/ui/icons.v2";

export const HtmlArticleView = () => {
  const { url } = useGetNextParams();

  const router = useRouter();

  const { data, isError, isLoading } = useParseHtmlQuery(url);

  return (
    <div>
      <section>
        <div className="flex items-center w-full justify-center mt-8">
          <input
            className="w-full h-12 lg:h-[54px] sm:w-[740px] p-2 px-6 rounded-full outline-none text-lg font-extralight focus:shadow-sm focus:shadow-rose-400 transition bg-gray-100 dark:bg-[rgb(32,33,35)] placeholder:text-gray-300 dark:placeholder:text-gray-500"
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

      {isError ? (
        <Nothing message="Invalid url" />
      ) : !data ? (
        <Nothing />
      ) : isLoading ? (
        <LottieLoadingAnimation />
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
                if (section?.image) {
                  return (
                    <div
                      key={JSON.stringify(section)}
                      className="flex justify-center items-center"
                    >
                      <img
                        className="rounded-2xl text-center"
                        alt="Image"
                        src={section?.image}
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
                    className="my-12 text-gray-300 sm:my-16 text-lg sm:text-xl"
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
        </section>
      )}
    </div>
  );
};
