"use client";

import { useConvosStore } from "./use-convos-store";

import { CloseIcon } from "@/components/ui/icons";
import { useNewConvoStore, useViewModeStore } from "./use-viewmode-store";

import Editor from "@monaco-editor/react";

import { useState } from "react";
import { useAddContentMutation } from "@/domain/content/content.mutations";
import { useTranscribeQuery } from "@/domain/transcribe/transcribe.queries";

export function NewConvo({ type }: { type?: string }) {
  const [resultView, setResultView] = useState("");
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const setConvo2 = useNewConvoStore((state) => state.setConvo2);
  const step = useNewConvoStore((state) => state.step);
  const setStep = useNewConvoStore((state) => state.setStep);


  console.log("NEW CONVO", newConvo)

  const { data: transcription } = useTranscribeQuery(
    {
      mediaUrl: newConvo?.audio,
    },
    {
      enabled: Boolean(newConvo?.audio),
      onSuccess: (data: any) => {
        if (data) {
          setConvo("transcriptions", data);
        }
      },
    }
  );


  function handleEditorChange(value: any, event: any) {
    try {
      const val = JSON.parse(value);
      setConvo2(val);
      console.log("here is the current model value:", val);
    } catch (err) {
      // console.log("Err", err);
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

  const onFileChange = (e: any) => {
    // console.log('TODO', event.target.files[0])
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      // const res = transformRes(JSON.parse(e?.target?.result as any));
      // console.log('e.target.result', transformRes(res))

      // const { language, translations, transcriptions } = res;

      console.log("e.target.result");

      // setConvo("language", language);

      setConvo("transcriptions", JSON.parse(e?.target?.result as any));

      // const newLesson = transcriptions?.map((transcription: any) => {
      //   const { id, start, end, text } = transcription;

      //   if (language === "en") {
      //     return [
      //       ["time", [[start, end]]],
      //       ["", ""],
      //       ["", ""],
      //       ["", ""],
      //       ["", text],
      //     ];
      //   } else if (language === "zh") {
      //     return [
      //       ["time", [[start, end]]],
      //       ["", text],
      //       ["", ""],
      //       ["", ""],
      //       ["", ""],
      //     ];
      //   }
      // });

      // setConvo("lesson", newLesson);
    };
  };
  const onAudioFileChange = (e: any) => {
    const s = URL.createObjectURL(e.target.files[0]);
    // console.log('e.target.result', transformRes(res))
    setConvo("audio", s);
  };

  const addContentMutation = useAddContentMutation();

  const convos = useConvosStore((state) => state.convos);
  const addNewConvo_ = useConvosStore((state) => state.setConvo);

  const addNewConvo = () => {
    addNewConvo_(newConvo);

    // alert(JSON.stringify(newConvo))
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

        <div className="flex items-center w-full justify-center">
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
        </div>

        <div></div>
      </div>

      {step === "type" ? (
        <div className="md:mx-32 md:mt-32 flex flex-wrap">
          <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
            type
          </p>
          <input
            value={newConvo?.type}
            onChange={(event) => {
              setConvo("type", event?.target?.value);
            }}
            onKeyDown={(event) => {
              if (event?.keyCode === 13) {
                if (newConvo.type) {
                  setStep("title");
                  console.log("NEXT STEP 2", event);
                }
              }
            }}
            autoFocus
            placeholder=""
            className="w-full text-center text-3xl font-extralight focus:outline-0  p-2 border-0 border-none dark:text-gray-300"
          />
          <div className="flex justify-center w-full my-16 space-x-8">
            {["convo", "story", "movie", "music", "tutorial"].map((item) => {
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
        </div>
      ) : step === "title" ? (
        <div className="md:mx-32 md:mt-32 flex flex-wrap">
          <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
            title of the conversation
          </p>

          <input
            onChange={(event) => {
              setConvo("title", event?.target?.value);
            }}
            value={newConvo?.title}
            onKeyDown={(event) => {
              if (event?.keyCode === 13) {
                if (newConvo.title) {
                  setStep("level");
                  console.log("NEXT STEP 2", event);
                }
              }
            }}
            autoFocus
            placeholder=""
            className="w-full text-center text-3xl font-extralight focus:outline-0  p-2 border-0 border-none dark:text-gray-300"
          />
        </div>
      ) : step === "author" ? (
        <div className="md:mx-32 md:mt-32 flex flex-wrap">
          <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
            author
          </p>
          <input
            value={newConvo?.author}
            onChange={(event) => {
              setConvo("author", event?.target?.value);
            }}
            onKeyDown={(event) => {
              if (event?.keyCode === 13) {
                if (newConvo.author) {
                  setStep("location");
                  console.log("NEXT STEP 2", event);
                }
              }
            }}
            autoFocus
            placeholder=""
            className="w-full text-center text-3xl font-extralight focus:outline-0   p-2 border-0 border-none dark:text-gray-300"
          />
          <div className="flex justify-center w-full my-16 space-x-8">
            {["xiaoma", "mb", "yoyo", "ling ling", "mandarino"].map((item) => {
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
            })}
          </div>
        </div>
      ) : step === "audio" ? (
        <div className="md:mx-32 md:my-32 flex flex-wrap">
          <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
            audio link
          </p>
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
                  // console.log('NEXT STEP 2', event)
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
      ) : step === "location" ? (
        <div className="md:mx-32 md:mt-32 flex flex-wrap">
          <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
            location of the conversation
          </p>
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
        </div>
      ) : (
        <>
          <div className="md:mx-32 flex flex-wrap">
            <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
              preview
            </p>

            {/* <div className="flex flex-wrap">
              <pre>
                <code>{JSON.stringify(newConvo, null, 2)}</code>
              </pre>
            </div> */}

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
                    title: newConvo?.title,
                    type: newConvo?.type,
                    author: newConvo?.author,
                    location: newConvo?.location,
                    // title: string;
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
      )}
    </div>
  );
}
