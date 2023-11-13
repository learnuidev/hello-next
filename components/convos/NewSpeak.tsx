"use client";
// import { Xiaoma } from './stsml/v1/XiaomaV2'

// import { useConvosStore } from 'ui/data/convos/bm1'
import Link from "next/link";

import { CloseIcon } from "@/components/ui/icons";
import { useNewConvoStore, useViewModeStore } from "./useViewModeStore";
// import {
//   useTranscribeQuery,
//   useTranscriptionStore
// } from '../../react-query/transcribe/transcribe.queries'
import { useState } from "react";
// import { lesson1 } from "ui/data/convos/bm1/level_1";
import { useSpeakStore } from "../speak/useSpeakStore";

export function NewSpeak({ type }: { type?: string }) {
  const [resultView, setResultView] = useState("");
  const [audioType, setAudioType] = useState("url");
  const setViewMode = useViewModeStore((state: any) => state.setViewMode);

  const newConvo = useNewConvoStore((state) => state.convo) as any;
  const setConvo = useNewConvoStore((state) => state.setConvo);
  const step = useNewConvoStore((state) => state.step);
  const setStep = useNewConvoStore((state) => state.setStep);

  //   const { data: transcription } = useTranscribeQuery(
  //     {
  //       mediaUrl: newConvo?.mediaUrl
  //     },
  //     {
  //       enabled: Boolean(newConvo?.mediaUrl),
  //       onSuccess: (data: any) => {
  //         if (data) {
  //           setConvo('transcriptions', data)
  //         }
  //       }
  //     }
  //   )

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
      const res = transformRes(
        JSON.parse(e?.target?.result as any)?.results[0]
      );
      // console.log('e.target.result', transformRes(res))

      const { language, translations, transcriptions } = res;

      console.log("e.target.result");

      setConvo("language", language);

      const newLesson = transcriptions?.map((transcription: any) => {
        const { id, start, end, text } = transcription;

        if (language === "en") {
          return [
            ["time", [[start, end]]],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", text],
          ];
        } else if (language === "zh") {
          return [
            ["time", [[start, end]]],
            ["", text],
            ["", ""],
            ["", ""],
            ["", ""],
          ];
        }
      });

      setConvo("lesson", newLesson);
    };
  };
  const onAudioFileChange = (e: any) => {
    const s = URL.createObjectURL(e.target.files[0]);
    // console.log('e.target.result', transformRes(res))
    setConvo("audio", s);
  };

  const lessons = useSpeakStore((state) => state.lessons);
  const addNewSpeak = useSpeakStore((state) => state.setSpeak);

  const addNewConvo = () => {
    addNewSpeak(newConvo?.lessonId, newConvo);

    // alert(JSON.stringify(newConvo))
  };

  return (
    <div className="w-full">
      <div className="z-10 fixed flex items-center justify-between min-w-full md:px-32 my-[64px]">
        <div>
          {/* <button
            className='text-xl md:text-4xl dark:hover:text-white shadow-md md:px-4 py-1 rounded-full dark:text-slate-600 shadow-md rounded-full'
            onClick={() => {
              setViewMode('')
              console.log('SHOW ANALYTICS')
            }}
          >
            <CloseIcon />
          </button> */}
        </div>

        <div className="space-x-4">
          <Link
            href="/speak"
            className="text-xl md:text-4xl dark:hover:text-white shadow-md md:px-4 py-1 rounded-full dark:text-slate-600 shadow-md rounded-full"
            // onClick={() => {
            //   setViewMode('')
            //   console.log('SHOW ANALYTICS')
            // }}
          >
            <CloseIcon />
          </Link>
        </div>
      </div>

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 pt-24 flex flex-wrap">
        {[
          {
            stepId: "lesson",
          },
          // {
          //   stepId: 'type'
          // },
          {
            stepId: "audio",
          },
          {
            stepId: "title",
          },
          // {
          //   stepId: 'lesson'
          // },
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
              key={item?.stepId}
              onClick={() => {
                // seek(earliestTime[0])
                // setRepeatHistories({
                //   lessonId: lesson1.id,
                //   eventType: 'speech/repeat',
                //   eventTime: new Date().getTime(),
                //   startTime: earliestTime[0],
                //   scriptIndex: idx
                //   // item
                // })
                setStep(item?.stepId);
              }}
              className={`mx-4 my-2 text-xl ${
                item?.stepId === step
                  ? "dark:text-slate-200"
                  : "dark:text-slate-500"
              } dark:hover:text-white font-extralight`}
            >
              {/* {formatTime(earliestTime[0])} */}
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
            className="w-full text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-300"
          />
          <div className="flex justify-center w-full my-16 space-x-8">
            {["speak", "convo", "listen", "hmm"].map((item) => {
              return (
                <button
                  key={item}
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
            title
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
            className="w-full text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-300"
          />
        </div>
      ) : step === "lesson" ? (
        <div className="md:mx-32 md:mt-32 flex flex-wrap">
          <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
            lesson
          </p>
          <input
            onChange={(event) => {
              setConvo("lessonId", event?.target?.value);
            }}
            value={newConvo?.lessonId}
            autoFocus
            placeholder=""
            className="w-full text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-300"
          />
          <div className="flex justify-center w-full my-16 space-x-8 flex-wrap">
            {(lessons || []).map((item) => {
              return (
                <button
                  key={item?.id}
                  onClick={() => {
                    setConvo("lessonId", item.id);
                  }}
                  className="m-4 text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-500 dark:hover:text-gray-300"
                >
                  {" "}
                  {item?.title}
                </button>
              );
            })}
          </div>
          {/* <input
            value={newConvo?.level}
            onChange={event => {
              setConvo('level', event?.target?.value)
            }}
            onKeyDown={event => {
              if (event?.keyCode === 13) {
                if (newConvo.level) {
                  setStep('author')
                  console.log('NEXT STEP 2', event)
                }
              }
            }}
            autoFocus
            placeholder=''
            className='w-full text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-300'
          /> */}
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
                  setStep("summary");
                  console.log("NEXT STEP 2", event);
                }
              }
            }}
            autoFocus
            placeholder=""
            className="w-full text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-300"
          />
          <div className="flex justify-center w-full my-16 space-x-8">
            {["xiaoma", "mb", "yoyo", "ling ling", "mandarino"].map((item) => {
              return (
                <button
                  key={item}
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
          {audioType === "url" ? (
            <>
              <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
                link of the audio
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
                placeholder="audio url"
                className="dark:placeholder:text-gray-900 w-full text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-300"
              />

              <input
                placeholder="pinyin"
                value={newConvo?.pinyin}
                onChange={(event) => {
                  setConvo("pinyin", event?.target?.value);
                }}
                className="dark:placeholder:text-gray-900 w-full text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-300"
              />
              <input
                placeholder="hanzi"
                value={newConvo?.hanzi}
                onChange={(event) => {
                  setConvo("hanzi", event?.target?.value);
                }}
                className="dark:placeholder:text-gray-900 w-full text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-300"
              />
              <input
                placeholder="en"
                value={newConvo?.en}
                onChange={(event) => {
                  setConvo("en", event?.target?.value);
                }}
                className="dark:placeholder:text-gray-900 w-full text-center text-3xl font-extralight focus:outline-0 dark:bg-black  p-2 border-0 border-none dark:text-gray-300"
              />
            </>
          ) : (
            <div className="flex justify-center items-center flex-col w-full">
              <button className="dark:text-gray-600 text-[12px]">audio</button>
              <div>
                <input
                  type="file"
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onChange={onAudioFileChange}
                />
              </div>

              <button className="dark:text-gray-600 text-[12px]">
                subtitle
              </button>

              <div>
                <input
                  type="file"
                  className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  onChange={onFileChange}
                />
              </div>
            </div>
          )}

          <div className="justify-center w-full z-40 pt-24 flex flex-wrap">
            {[
              {
                stepId: "url",
              },
              {
                stepId: "file",
              },
            ].map((item: any, idx: any) => {
              return (
                <button
                  key={`${item?.stepId}-${idx}`}
                  onClick={() => {
                    // seek(earliestTime[0])
                    // setRepeatHistories({
                    //   lessonId: lesson1.id,
                    //   eventType: 'speech/repeat',
                    //   eventTime: new Date().getTime(),
                    //   startTime: earliestTime[0],
                    //   scriptIndex: idx
                    //   // item
                    // })
                    setAudioType(item?.stepId);
                  }}
                  className={`mx-4 my-2 text-xl ${
                    item?.stepId === audioType
                      ? "dark:text-slate-200"
                      : "dark:text-slate-500"
                  } dark:hover:text-white font-extralight`}
                >
                  {/* {formatTime(earliestTime[0])} */}
                  <div
                    className={` ${
                      item?.stepId === audioType
                        ? "dark:bg-slate-200"
                        : "dark:bg-slate-600"
                    } h-2 w-2 rounded-full text`}
                  ></div>
                  {/* {idx + 1} */}
                </button>
              );
            })}
          </div>

          {/* <div className='w-full text-center my-12 dark:text-gray-800'>
            <p>OR</p>
          </div> */}
        </div>
      ) : (
        <>
          <div className="md:mx-32 md:mt-32 flex flex-wrap">
            <p className="w-full text-xl my-8 text-center font-extralight dark:text-gray-500">
              preview
            </p>

            {/* <div className='flex flex-wrap'>
            <pre>
              <code>{JSON.stringify(transcription, null, 2)}</code>
            </pre>
          </div> */}
          </div>

          {/* <Xiaoma lessonId={newConvo?.id} /> */}
        </>
      )}

      {/* {newConvo.translations ? ( */}
      <div className="w-full flex justify-center">
        <button
          className="dark:text-gray-300 text-center"
          onClick={() => {
            addNewConvo();
          }}
        >
          add new speak
        </button>
      </div>
      {/* ) : null} */}
    </div>
  );
}
