/* eslint-disable @next/next/no-img-element */
"use client";

import { LottieLoadingAnimation } from "@/app/nmm/lottie-loading-animation";
import { Nothing } from "@/app/nmm/nothing";
import { useListHSKWordsQuery } from "@/domain/hsk/hsk.queries";
import { useListComponents } from "@/domain/lesson/component.queries";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetNextParams } from "../../../hooks/use-get-next-params";
import { useListDictionaryMeaningsQuery } from "../hooks/use-dictionary-list-meanings";
import { ParseHtmlResponse, useParseHtmlQuery } from "../hooks/use-parse-html";
import { UploadFileButton } from "@/domain/file-upload/upload-file-button";
import { useListUserAssets } from "@/domain/asset/use-list-user-assets";
import { useMusicV2 } from "@/app/(auth)/convos/_play-v2/use-music-v2";
import { Icons } from "@/components/ui/icons.v2";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

function CodeBlock({ code }: { code: string }) {
  return (
    <SandpackProvider
      options={{
        autorun: false,
      }}
      template="react"
      theme="dark"
      files={{
        "/App.js": code,
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor />
        {/* <SandpackPreview /> */}
      </SandpackLayout>
    </SandpackProvider>
  );
}

function SectionView({ section, viewPinyin, setSelected }: any) {
  const { data: context } = useListDictionaryMeaningsQuery(section?.hanzi);
  if (section?.image || section?.img) {
    if (viewPinyin) {
      return null;
    }
    return (
      <div
        key={JSON.stringify(section)}
        className="flex justify-center items-center"
      >
        <img
          className="rounded-2xl text-center mt-6 w-full sm:max-w-xl"
          alt="Image"
          src={section?.image || section?.img}
        />
      </div>
    );
  }

  if (section.title) {
    const subsectionStyle = "my-4 font-semibold text-2xl";

    if (section?.href) {
      return (
        <Link
          className={cn(subsectionStyle, "block")}
          href={section?.href}
          // href={`/next?feature-id=html-parser&url=${section?.href}`}
          target="_blank"
        >
          {section?.title}
        </Link>
      );
    }
    return <h3 className={subsectionStyle}>{section?.title}</h3>;
  }

  if (section?.h3Title) {
    if (section?.ul?.length > 0) {
      return (
        <div className="bg-[rgb(18,19,20)] p-8 rounded">
          <h3 className="text-xl text-gray-400"> {section?.h3Title}</h3>
          {section?.ul?.map((item: any) => {
            return <li key={item}>{item?.item || item?.hanzi}</li>;
          })}
        </div>
      );
    }

    return <h3 className="text-xl"> {section?.h3Title}</h3>;
  }

  if (section.caption) {
    if (viewPinyin) {
      return null;
    }
    return (
      <p
        key={JSON.stringify(section)}
        className="text-center mt-4 text-gray-400 text-sm"
      >
        {section?.hanzi}
      </p>
    );
  }

  if (section.code) {
    return <CodeBlock code={section.code} />;
  }

  return (
    <>
      {viewPinyin && context !== undefined && context?.length > 0 ? (
        <p className="my-8">
          {context?.map((item: any) => {
            return (
              <span
                onMouseEnter={() => {
                  setSelected(item);
                }}
                onMouseLeave={() => {
                  setSelected(null);
                }}
                className="text-gray-300 text-lg sm:text-xl hover:text-blue-400 inline-flex flex-col items-center"
                key={JSON.stringify(item)}
              >
                {viewPinyin && (
                  <span
                    className={cn("text-xs", item?.pinyin ? "" : "text-black")}
                  >
                    {item?.pinyin || "."}
                  </span>
                )}
                <Link
                  href={`/nmm/${item?.hanzi}?lang=zh`}
                  target="_blank"
                  className="text-lg sm:text-2xl"
                >
                  {item?.hanzi}
                </Link>
              </span>
            );
          })}
        </p>
      ) : (
        <p className="my-8 text-gray-300 text-lg" key={JSON.stringify(section)}>
          {section?.hanzi}
        </p>
      )}
    </>
  );
}

export const HtmlArticleView = () => {
  const { url, view, title } = useGetNextParams();
  const [viewPinyin, togglePinyin] = useState(false);

  const { data: userAssets, isLoading: isAssetsLoading } = useListUserAssets();

  const userAsset = (userAssets || []).find(
    (userAsset: any) => userAsset?.webpageUrl === url
  );

  const { isPlaying, togglePlay, seek, currentTime, reset } = useMusicV2({
    url: userAsset?.sourceUrl || "",
  });

  const [selected, setSelected] = useState<any>(null);

  const router = useRouter();

  const { data: hskWords2 } = useListHSKWordsQuery();

  const { data: allChars } = useListComponents();

  const { data, isError, isLoading } = useParseHtmlQuery(url);

  const { data: titleContext } = useListDictionaryMeaningsQuery(
    data?.data?.title || ""
  );

  // const dataWithContext = data?.data?.sections?.map((section) => {
  //   return {
  //     ...section,
  //     context: contextualizeHanzi(
  //       allChars || [],
  //       hskWords2 || [],
  //       section?.hanzi || ""
  //     )?.new,
  //   };
  // });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (["b"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        togglePinyin((view) => !view);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [togglePinyin]);

  // console.log("DATA WITH CTX", dataWithContext);

  return (
    <div>
      <section>
        <div className="flex items-center w-full justify-center mt-[-60px]">
          <input
            className="w-full h-12 lg:h-[44px] sm:w-[740px] py-2 px-6 rounded-full outline-none text-[16px] font-extralight focus:shadow-sm focus:shadow-rose-400 transition bg-gray-100 dark:bg-[rgb(32,33,35)] placeholder:text-gray-300 dark:placeholder:text-gray-500"
            placeholder={url || "https://www.mandarino.io"}
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

      {viewPinyin && view !== "analytics" && (
        <div className="z-30 sticky top-0 pt-4 pb-[4px] bg-[rgb(9,10,11)]">
          {/* <div className="pb-4">
            <h4 className="text-xs text-gray-500">Sentence meaning</h4>
            <div className="h-16 flex justify-between items-center mt-2 w-full">
              <p className="space-x-2 sm:text-xl text-[16px] font-extralight pb-[4px]">
                {activeSubtitle?.sentence || "..."}
              </p>
            </div>
          </div> */}

          <div className="h-16 mb-4 hidden sm:block mt-4">
            <h4 className="text-xs text-gray-500">Word meaning</h4>

            {selected && selected?.en ? (
              <div className="h-14 mt-2 w-full">
                <div className="flex justify-between items-center">
                  <p className="space-x-2 text-[16px] font-extralight">
                    <span>{selected?.hanzi}</span>

                    <span className="text-red-400">{selected?.pinyin}</span>
                  </p>

                  {selected?.hsk ||
                    (selected?.hskLevel && (
                      <p>HSK {selected?.hsk || selected?.hskLevel}</p>
                    ))}
                </div>

                <p className="font-extralight">
                  <span className="truncate">
                    {selected?.meaning || selected?.en}
                  </span>
                </p>
              </div>
            ) : (
              <div className="h-14"></div>
            )}
          </div>
        </div>
      )}

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
        <section className={viewPinyin ? "" : "mt-12"}>
          <div className="flex justify-between items-center">
            <div></div>
            <div className="flex space-x-8 items-center lg:px-80 sm:px-32 px-8">
              {viewPinyin ? (
                <div className="block text-center ">
                  {titleContext?.map((item: any) => {
                    return (
                      <span
                        onMouseEnter={() => {
                          setSelected(item);
                        }}
                        onMouseLeave={() => {
                          setSelected(null);
                        }}
                        className="text-gray-300 text-lg sm:text-xl hover:text-blue-400 inline-flex flex-col items-center"
                        key={JSON.stringify(item)}
                      >
                        {viewPinyin && (
                          <span
                            className={cn(
                              "text-xs",
                              item?.pinyin ? "" : "text-black"
                            )}
                          >
                            {item?.pinyin || "."}
                          </span>
                        )}
                        <Link
                          href={`/nmm/${item?.hanzi}?lang=zh`}
                          target="_blank"
                          className="text-xl sm:text-3xl"
                        >
                          {item?.hanzi}
                        </Link>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <Link
                  target="_blank"
                  href={data?.url}
                  className="block text-center text-xl sm:text-3xl"
                >
                  {data?.data?.title}
                </Link>
              )}

              {userAsset?.webpageUrl && (
                <div className="space-x-4">
                  <button
                    className="text-2xl"
                    onClick={() => {
                      togglePlay();
                    }}
                  >
                    {isPlaying ? <Icons.pause /> : <Icons.play />}
                  </button>

                  <button
                    className="text-2xl"
                    onClick={() => {
                      reset();
                    }}
                  >
                    <Icons.stop />
                  </button>
                </div>
              )}
            </div>

            {!isAssetsLoading && !userAsset?.webpageUrl ? (
              <UploadFileButton context={{ webpageUrl: url }} />
            ) : (
              <div></div>
            )}
          </div>

          <div>
            <Link
              className="text-center block space-x-2 mt-2 text-gray-400 text-sm"
              href={data?.url}
              target="_blank"
            >
              <span> {data?.data?.publicationDate}</span>
            </Link>
          </div>

          <div className="max-w-5xl m-auto mt-2 border-t-[1px] border-gray-900" />

          <div className="max-w-5xl m-auto">
            {data?.data?.sections?.length === 0 ? (
              <Nothing />
            ) : (
              data?.data?.sections?.map((section, idx, ctx) => {
                return (
                  <SectionView
                    key={JSON.stringify(section)}
                    section={section}
                    setSelected={setSelected}
                    viewPinyin={viewPinyin}
                  />
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

          <RelatedArticles data={data} />
        </section>
      )}
    </div>
  );
};

function RelatedArticles({ data }: { data: ParseHtmlResponse }) {
  const { url, view, title } = useGetNextParams();

  return (
    <>
      {data?.data?.relatedArticles?.length > 0 && (
        <div className="mt-12 mb-32">
          <h3 className="text-center text-xl font-semibold my-8">Related</h3>

          <div className="max-w-5xl overflow-y-auto flex flex-row m-auto gap-4">
            {data?.data?.relatedArticles?.map((lesson, idx) => {
              return (
                <Link
                  href={`/next?feature-id=html-parser&url=${lesson?.href}&view=${view}`}
                  key={JSON.stringify(lesson)}
                  className={cn(
                    "block",
                    lesson?.image ? "" : "p-4 border-[1px] border-gray-800"
                  )}
                >
                  {lesson?.image !== undefined && (
                    <div className="block w-56">
                      <img
                        className="object-cover rounded-xl h-32 w-96"
                        src={lesson?.image}
                        alt={lesson?.title}
                      />
                    </div>
                  )}

                  <div className="mt-2 flex justify-between lessons-center w-full">
                    <div>
                      <p className="truncate text-sm w-full">
                        {lesson?.title?.length > 30
                          ? `${lesson?.title?.slice(0, 30)}...`
                          : lesson?.title}
                      </p>
                      {/* <p className="font-light text-gray-400 text-xs sm:text-sm capitalize">
                  {" "}
                  <span>{lesson?.level}</span>
                </p> */}
                    </div>

                    {/* {lesson?.status === "not_started" ? (
                <Icons.questionMark className="sm:text-2xl text-lg" />
              ) : (
                <Icons.badgeCheck className="text-rose-400 sm:text-2xl text-lg" />
              )} */}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
