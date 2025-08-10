"use client";

import Axios from "axios";
import { useConvosStore } from "./use-convos-store";
// ts-ignore next

import { useViewModeStore } from "./use-viewmode-store";

import Editor from "@monaco-editor/react";

import { useAddContentMutation } from "@/domain/content/content.mutations";
import { useRef, useState } from "react";

import {
  StepContainerVariant1,
  StepTitle,
  useNewConvoStore,
} from "@/components/step";
import { getUploadUrl } from "@/domain/asset/asset.api";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import {
  GetInfoResponse,
  useListSubtitlesQuery,
} from "@/domain/subtitle/subtitle.queries";
import { NewConvoInput } from "./new-convo-input";

import { WebVTTParser } from "webvtt-parser";
import { contentFormats, contentTypes } from "../constants/content-types";
import { useGetVideoByIdQuery } from "@/domain/youtube/get-video-by-id";
import { cn } from "@/lib/utils";
import { languages } from "@/app/next/features/phrase/languages";

function parseVTT(_vttString: string, lang: string) {
  const vttString = `
WEBVTT

${_vttString?.replaceAll(",", ".")}
  `;
  const parser = new WebVTTParser();
  const tree = parser.parse(vttString, "metadata");

  console.log("TREE", tree);

  const cues = tree.cues.map((rawSub: any) => {
    const { id, startTime, endTime, text } = rawSub;
    const tags = /<(v|c).*?>|<\/c>/g;

    return {
      id: crypto.randomUUID(),
      start: startTime,
      end: endTime,
      input: text?.replace(tags, ""),
      lang: lang,
    } as any;
  });

  return cues;
}

export function StepView() {
  const [resultView, setResultView] = useState("");
  const [showJSON, setShowJSON] = useState(false);
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);
  const fileInputRef = useRef(null);

  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const setConvo2 = useNewConvoStore((state) => state.setConvo2);
  const step = useNewConvoStore((state) => state.step);
  const setStep = useNewConvoStore((state) => state.setStep);

  const { data: youtubeVideo } = useGetVideoByIdQuery(newConvo?.audio);

  const { data: subtitles, isLoading: isSubtitlesLoading } =
    useListSubtitlesQuery(
      {
        videoUrl: newConvo?.audio,
        lang: newConvo?.lang,
      },
      {
        enabled:
          Boolean(newConvo?.audio) && newConvo?.audio?.includes("youtube"),
        onSuccess: (transcriptions: GetInfoResponse) => {
          setConvo("transcriptions", transcriptions.subtitles);
          setConvo("title", transcriptions.title);
          setConvo("description", transcriptions.description);
          setConvo("author", transcriptions.author.user);
          setConvo("thumbnails", transcriptions.thumbnails);
        },
      }
    );

  function handleEditorChange(value: any, event: any) {
    try {
      const val = JSON.parse(value);
      setConvo2(val);
    } catch (err) {
      console.error("Err", err);
    }
  }

  const transformRes = (res: any) => {
    const transcriptions = res?.result?.segments.map(
      ({ id, start, end, text, temperature, ...rest }: any) => {
        return {
          id,
          start,
          end,
          text,
          // temperature
        };
      }
    );

    const translations = res?.translation?.segments.map(
      ({ id, start, end, text, temperature, ...rest }: any) => {
        return {
          id,
          start,
          end,
          text,
          // temperature
        };
      }
    );

    return {
      translations: translations,
      language: res?.result?.language,
      transcriptions,
      meta: {
        ...res,
      },
    };
  };

  function getFileExtension(file: any) {
    return file.name.split(".").pop().toLowerCase();
  }

  const onFileChange = (e: any) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");

    fileReader.onload = (e) => {
      const result = e?.target?.result as any;

      try {
        setConvo("transcriptions", JSON.parse(result as any));
      } catch (err) {
        const res = parseVTT(result, newConvo?.lang);
        setConvo("transcriptions", res);
      }
      // @ts-ignore
      fileInputRef.current.value = "";
    };
  };

  const { data: authUser } = useCurrentAuthUser({});

  const addContentMutation = useAddContentMutation();
  const addUserAssetMutation = useAddUserAssetMutation();

  const onUploadFileChange = async (e: any) => {
    const file = e.target.files[0];
    const extension = getFileExtension(file) || "";

    const contentType = file.type || "";

    const response = (await getUploadUrl(
      { extension, contentType },
      {
        Authorization: authUser?.jwt,
      }
    )) as any;

    const { signedUrl: url, s3Key, assetUrl, id } = response;

    // const formData = new FormData();
    // formData.append("image", file);

    Axios.put(url, file, {
      headers: { "Content-Type": contentType },
    });

    addUserAssetMutation
      .mutateAsync({
        id,
        contentType,
        extension,
        sourceUrl: assetUrl,
        uploadBucketKey: s3Key,
      } as any)
      .then(async () => {
        alert("DONE");
      });
  };

  const onAudioFileChange = (e: any) => {
    const s = URL.createObjectURL(e.target.files[0]);

    setConvo("audio", s);
  };

  const convos = useConvosStore((state) => state.convos);
  const addNewConvo_ = useConvosStore((state) => state.setConvo);

  const addNewConvo = () => {
    addNewConvo_(newConvo);

    // alert(JSON.stringify(newConvo))
  };

  const listSections = (txt: string, lang: string) => {
    if (lang === "zh") {
      return txt
        ?.replaceAll("–", "")
        .split("\n")
        .filter(Boolean)
        ?.map((x) => {
          const sectionId = crypto.randomUUID();
          return {
            id: sectionId,
            type: "section",
            text: x?.trim(),
            phrases: x
              .trim()
              .split("。")
              ?.filter(Boolean)
              ?.map((phrase) => {
                return {
                  id: crypto.randomUUID(),
                  sectionId,
                  lang: "zh",
                  input: phrase,
                };
              }),
          };
        })
        .flat();
    }
    // return txt?.replaceAll("–", "").split("\n").filter(Boolean);
    return txt
      ?.replaceAll("–", "")
      .split("\n")
      .filter(Boolean)
      ?.map((x) => {
        return {
          id: crypto.randomUUID(),
          type: "section",
          text: x?.trim(),
          phrases: x
            .trim()
            .split(".")
            ?.filter(Boolean)
            ?.map((phrase) => {
              return {
                id: crypto.randomUUID(),
                lang: lang,
                input: phrase,
              };
            }),
        };
      })
      .flat();
  };

  switch (step) {
    case "lang":
      return (
        <>
          <StepContainerVariant1>
            <StepTitle>language of the content</StepTitle>

            <div className="grid md:grid-cols-3 grid-cols-1 w-full my-16 justify-around items-center">
              {languages.map((item) => {
                return (
                  <button
                    key={`content-format-${JSON.stringify(item)}`}
                    onClick={() => {
                      setConvo("lang", item.id);
                    }}
                    className={cn(
                      "text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-500 dark:hover:text-gray-300",
                      newConvo?.lang === item?.id
                        ? "dark:text-white text-black"
                        : "text-gray-500"
                    )}
                  >
                    {" "}
                    {item.title}
                  </button>
                );
              })}
            </div>
          </StepContainerVariant1>

          <StepContainerVariant1>
            <StepTitle>type</StepTitle>
            <div className="flex w-full my-16 justify-around items-center">
              {contentFormats.map((item) => {
                return (
                  <button
                    key={`content-format-${JSON.stringify(item)}`}
                    onClick={() => {
                      setConvo("type", item.id);
                    }}
                    className={cn(
                      "text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-500 dark:hover:text-gray-300",
                      newConvo?.type === item?.id
                        ? "dark:text-white text-black"
                        : "text-gray-500"
                    )}
                  >
                    {" "}
                    {item.title}
                  </button>
                );
              })}
            </div>
          </StepContainerVariant1>

          <StepContainerVariant1>
            <StepTitle>Content Type</StepTitle>
            <div className="grid md:grid-cols-3 grid-cols-1 w-full my-16 justify-around items-center">
              {contentTypes.map((item) => {
                return (
                  <button
                    key={`content-format-${JSON.stringify(item)}`}
                    onClick={() => {
                      setConvo("contentType", item.id);
                    }}
                    className={cn(
                      "text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-500 dark:hover:text-gray-300",
                      newConvo?.contentType === item?.id
                        ? "dark:text-white text-black"
                        : "text-gray-500"
                    )}
                  >
                    {" "}
                    {item.title}
                  </button>
                );
              })}
            </div>
          </StepContainerVariant1>
        </>
      );

    // case "author":
    //   return (
    //     <StepContainerVariant1>
    //       <StepTitle>author</StepTitle>
    //       <input
    //         value={newConvo?.author}
    //         onChange={(event) => {
    //           setConvo("author", event?.target?.value);
    //         }}
    //         onKeyDown={(event) => {
    //           if (event?.keyCode === 13) {
    //             if (newConvo.author) {
    //               setStep("location");
    //             }
    //           }
    //         }}
    //         autoFocus
    //         placeholder=""
    //         className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
    //       />
    //       <div className="flex justify-center w-full my-16 space-x-8">
    //         {["xiaoma", "mb", "yoyo", "ling ling", "mandarino"].map((item) => {
    //           return (
    //             <button
    //               key="item"
    //               onClick={() => {
    //                 setConvo("author", item);
    //               }}
    //               className="text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-500 dark:hover:text-gray-300"
    //             >
    //               {" "}
    //               {item}
    //             </button>
    //           );
    //         })}
    //       </div>
    //     </StepContainerVariant1>
    //   );

    case "audio": {
      if (newConvo.type === "file") {
        return (
          <div className="md:mx-32 md:my-32 flex flex-wrap">
            <div className="flex justify-center items-center flex-col w-full my-4">
              <button className="dark:text-gray-600 text-[12px] mb-2">
                Upload File
              </button>

              <div>
                <input
                  type="file"
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onChange={onUploadFileChange}
                />
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="md:mx-32 md:my-32 flex flex-wrap">
          <StepTitle>audio link</StepTitle>
          <input
            value={newConvo?.audio}
            onChange={(event) => {
              setConvo("audio", event?.target?.value);
            }}
            onKeyDown={(event) => {
              if (event?.keyCode === 13) {
                if (newConvo.audio) {
                  setConvo("mediaUrl", newConvo?.audio);
                  setStep("title");
                }
              }
            }}
            // autoFocus
            placeholder=""
            className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
          />

          <div className="flex justify-center items-center flex-col w-full my-4">
            <StepTitle>title of the conversation</StepTitle>

            <input
              onChange={(event) => {
                setConvo("title", event?.target?.value);
              }}
              value={newConvo?.title}
              onKeyDown={(event) => {
                if (event?.keyCode === 13) {
                  if (newConvo.title) {
                    setStep("lang");
                  }
                }
              }}
              autoFocus
              placeholder=""
              className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full text-center text-3xl font-extralight focus:outline-0  p-2 border-0 border-none dark:text-gray-300"
            />
          </div>
          <div className="flex justify-center items-center flex-col w-full my-4">
            <StepTitle>author</StepTitle>
            <input
              value={newConvo?.author}
              onChange={(event) => {
                setConvo("author", event?.target?.value);
              }}
              onKeyDown={(event) => {
                if (event?.keyCode === 13) {
                  if (newConvo.author) {
                    setStep("location");
                  }
                }
              }}
              autoFocus
              placeholder=""
              className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
            />
          </div>

          <div className="flex justify-center items-center flex-col w-full my-4">
            <StepTitle>source</StepTitle>

            <input
              value={newConvo?.source}
              className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
              onChange={(event) => {
                setConvo("source", event?.target?.value);
              }}
            />
          </div>

          <NewConvoInput />

          <div className="flex justify-center items-center flex-col w-full my-4">
            <button className="dark:text-gray-600 text-[12px] mb-2">
              Transcriptions
            </button>

            <div>
              <input
                ref={fileInputRef}
                type="file"
                className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onChange={onFileChange}
              />
            </div>
          </div>
        </div>
      );
    }

    // case "location":
    //   return (
    //     <StepContainerVariant1>
    //       <StepTitle>location of the conversation</StepTitle>
    //       <input
    //         value={newConvo?.location}
    //         onChange={(event) => {
    //           setConvo("location", event?.target?.value);
    //         }}
    //         onKeyDown={(event) => {
    //           if (event?.keyCode === 13) {
    //             if (newConvo.location) {
    //               setStep("summary");
    //             }
    //           }
    //         }}
    //         autoFocus
    //         placeholder=""
    //         className="bg-gray-100 dark:bg-[rgb(21,22,23)] w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
    //       />
    //     </StepContainerVariant1>
    //   );

    default:
      return (
        <>
          <div className="md:mx-32 flex flex-wrap">
            <StepTitle>preview</StepTitle>

            <Editor
              height="400px"
              language="json"
              theme="vs-dark"
              value={JSON.stringify(newConvo, null, 2)}
              onChange={handleEditorChange}
            />

            <div className="w-full flex justify-center">
              <button
                className="dark:text-gray-300 text-center"
                onClick={() => {
                  addNewConvo();

                  addContentMutation.mutateAsync({
                    thumbnails: newConvo.thumbnails,
                    description: newConvo.description,
                    title: newConvo?.title,
                    type: newConvo?.type,
                    author: newConvo?.author,
                    location: newConvo?.location,
                    source: newConvo?.source,
                    // title: string;
                    contentType: newConvo?.contentType,
                    lang: newConvo?.lang,
                    audio: newConvo?.audio,
                    transcriptions: newConvo?.transcriptions,
                  } as any);
                }}
              >
                add new convo
              </button>
            </div>
          </div>
        </>
      );
  }
}
