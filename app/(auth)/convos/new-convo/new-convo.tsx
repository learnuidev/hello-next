"use client";

import { useConvosStore } from "./use-convos-store";
import Axios from "axios";
// ts-ignore next
import { chineseConverter } from "mandarino/src/utils/chinese-converter";

import { CloseIcon } from "@/components/ui/icons";
import { useViewModeStore } from "./use-viewmode-store";

import Editor from "@monaco-editor/react";

import { useState } from "react";
import { useAddContentMutation } from "@/domain/content/content.mutations";

import {
  GetInfoResponse,
  useListSubtitlesQuery,
} from "@/domain/subtitle/subtitle.queries";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { getUploadUrl } from "@/domain/asset/asset.api";
import { useAddUserAssetMutation } from "@/domain/asset/asset.mutation";
import {
  StepContainerVariant1,
  StepTitle,
  StepTitleContainer,
  useNewConvoStore,
} from "@/components/step";

export const contentTypes = [
  "audio",
  "text",
  "convo",
  // "story",
  // "movie",
  "youtube",
  // "tutorial",
  "file",
];

export function NewConvo({ type }: { type?: string }) {
  const [resultView, setResultView] = useState("");
  const [showJSON, setShowJSON] = useState(false);
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const setConvo2 = useNewConvoStore((state) => state.setConvo2);
  const step = useNewConvoStore((state) => state.step);
  const setStep = useNewConvoStore((state) => state.setStep);

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

  // const { data: transcriptionV2 } = useTranscribeQueryV2(
  //   {
  //     videoUrl: newConvo?.audio,
  //   },
  //   {
  //     enabled: Boolean(newConvo?.audio) && !subtitles && !isSubtitlesLoading,
  //   }
  // );

  // const { data: transcription } = useTranscribeQuery(
  //   {
  //     mediaUrl: newConvo?.audio,
  //   },
  //   {
  //     enabled: Boolean(newConvo?.audio) && false,
  //     onSuccess: (data: any) => {
  //       if (data) {
  //         const transcriptions = data?.result?.segments.map(
  //           ({ id, start, end, text, temperature, ...rest }: any) => {
  //             return {
  //               id,
  //               start,
  //               end,
  //               hanzi: text,
  //               pinyin: text,
  //               en: text,
  //               // temperature
  //             };
  //           }
  //         );

  //         setConvo("transcriptions", transcriptions);
  //       }
  //     },
  //   }
  // );

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
      setConvo("transcriptions", JSON.parse(e?.target?.result as any));
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
      })
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

  const totalSentences = listSections(newConvo?.input, newConvo?.lang);

  const StepView = () => {
    switch (step) {
      case "type":
        return (
          <StepContainerVariant1>
            <StepTitle>type</StepTitle>
            <input
              value={newConvo?.type}
              onChange={(event) => {
                setConvo("type", event?.target?.value);
              }}
              onKeyDown={(event) => {
                if (event?.keyCode === 13) {
                  if (newConvo.type) {
                    setStep("title");
                  }
                }
              }}
              autoFocus
              placeholder=""
              className="w-full text-center text-3xl font-extralight focus:outline-0  p-2 border-0 border-none dark:text-gray-300"
            />
            <div className="grid md:grid-cols-3 grid-cols-1 w-full my-16 justify-around items-center">
              {contentTypes.map((item) => {
                return (
                  <button
                    key="item"
                    onClick={() => {
                      setConvo("type", item);
                    }}
                    className="text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    {" "}
                    {item}
                  </button>
                );
              })}
            </div>
          </StepContainerVariant1>
        );
      case "title":
        return (
          <StepContainerVariant1>
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
              className="w-full text-center text-3xl font-extralight focus:outline-0  p-2 border-0 border-none dark:text-gray-300"
            />
          </StepContainerVariant1>
        );
      case "lang":
        return (
          <StepContainerVariant1>
            <StepTitle>language of the content</StepTitle>

            <input
              onChange={(event) => {
                setConvo("lang", event?.target?.value);
              }}
              value={newConvo?.lang}
              onKeyDown={(event) => {
                if (event?.keyCode === 13) {
                  if (newConvo.title) {
                    setStep("level");
                  }
                }
              }}
              autoFocus
              placeholder=""
              className="w-full text-center text-3xl font-extralight focus:outline-0  p-2 border-0 border-none dark:text-gray-300"
            />
          </StepContainerVariant1>
        );

      case "author":
        return (
          <StepContainerVariant1>
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
              className="w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
            />
            <div className="flex justify-center w-full my-16 space-x-8">
              {["xiaoma", "mb", "yoyo", "ling ling", "mandarino"].map(
                (item) => {
                  return (
                    <button
                      key="item"
                      onClick={() => {
                        setConvo("author", item);
                      }}
                      className="text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-500 dark:hover:text-gray-300"
                    >
                      {" "}
                      {item}
                    </button>
                  );
                }
              )}
            </div>
          </StepContainerVariant1>
        );

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
            {newConvo.type === "text" && (
              <>
                {" "}
                <StepTitle>add text here</StepTitle>
                <textarea
                  value={newConvo?.input}
                  onChange={(event) => {
                    const sents = chineseConverter(event?.target?.value);

                    const sections = listSections(sents, newConvo?.lang);

                    setConvo("sections", sections);
                    setConvo(
                      "transcriptions",
                      sections?.map((section) => section?.phrases).flat()
                    );
                    setConvo("input", event?.target?.value);
                  }}
                  // onKeyDown={(event) => {
                  //   if (event?.keyCode === 13) {
                  //     if (newConvo.audio) {
                  //       setConvo("mediaUrl", newConvo?.audio);
                  //       setStep("title");
                  //     }
                  //   }
                  // }}
                  autoFocus
                  placeholder=""
                  className="w-full text-center font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
                />
                <div className="my-8">
                  <button
                    onClick={() => {
                      setShowJSON(!showJSON);
                    }}
                  >
                    {showJSON ? "Hide" : "Show"}
                  </button>
                </div>
                {showJSON && totalSentences?.length > 0 && (
                  <div>
                    <code>
                      <pre>{JSON.stringify(totalSentences, null, 2)}</pre>
                    </code>
                  </div>
                )}
              </>
            )}
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
              autoFocus
              placeholder=""
              className="w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
            />

            <div className="flex justify-center items-center flex-col w-full my-4">
              <button className="dark:text-gray-600 text-[12px] mb-2">
                Transcriptions
              </button>

              <div>
                <input
                  type="file"
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onChange={onFileChange}
                />
              </div>
            </div>
          </div>
        );
      }

      case "location":
        return (
          <StepContainerVariant1>
            <StepTitle>location of the conversation</StepTitle>
            <input
              value={newConvo?.location}
              onChange={(event) => {
                setConvo("location", event?.target?.value);
              }}
              onKeyDown={(event) => {
                if (event?.keyCode === 13) {
                  if (newConvo.location) {
                    setStep("summary");
                  }
                }
              }}
              autoFocus
              placeholder=""
              className="w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
            />
          </StepContainerVariant1>
        );

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
                      // title: string;
                      lang: newConvo?.lang,
                      audio: newConvo?.audio,
                      transcriptions: newConvo?.transcriptions,
                    });
                  }}
                >
                  add new convo
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="flex my-8 px-28">
        <div className="space-x-4">
          <button
            className="text-xl md:text-4xl dark:hover:text-white shadow-md md:px-4 py-1 rounded-full dark:text-slate-600 shadow-md rounded-full"
            onClick={() => {
              setViewMode("");
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <StepTitleContainer>
          {[
            {
              stepId: "type",
            },
            {
              stepId: "title",
            },
            {
              stepId: "location",
            },
            {
              stepId: "lang",
            },
            {
              stepId: "audio",
            },
            {
              stepId: "author",
            },

            {
              stepId: "summary",
            },
          ].map((item: any, idx: any) => {
            // const [time, ...rest] = item
            // const earliestTime = time[1][0]
            // const latestTime = time[1][time[1].length - 1]

            const currentTime = 1;
            const earliestTime = 2;
            const latestTime = 2;

            return (
              <button
                key={`${item?.stepId}-${idx}`}
                onClick={() => {
                  setStep(item?.stepId);
                }}
                className={`mx-4 my-2 text-xl ${
                  item?.stepId === step
                    ? "dark:text-slate-200"
                    : "dark:text-slate-500"
                } dark:hover:text-white font-extralight`}
              >
                <div
                  className={` ${
                    item?.stepId === step
                      ? "dark:bg-slate-200"
                      : "dark:bg-slate-600"
                  } h-2 w-2 rounded-full text`}
                ></div>
                {/* {idx + 1} */}
              </button>
            );
          })}
        </StepTitleContainer>

        <div></div>
      </div>

      <StepView />
    </div>
  );
}
