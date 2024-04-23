import ytdl from "ytdl-core";
import { httpRequest } from "./http-request";
import { getTotalSeconds } from "./get-total-seconds";
import * as R from "ramda";
// @ts-ignore
import webvtt from "node-webvtt";
// @ts-ignore
import { WebVTTParser } from "webvtt-parser";
const parser = new WebVTTParser();

const segmentDuration = 10; // default to 10
const startOffset = 0; // Starting MPEG TS offset to be used in timestamp map, default 900000

const getTrack = ({ tracks, lang }: { tracks: any; lang: string }) =>
  tracks.find((t: any) => t.languageCode === lang);

export const listSubtitles = ({ id, lang }: { id: string; lang: string }) => {
  return ytdl.getInfo(id).then(async (info: any) => {
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    if (tracks && tracks.length) {
      console.log(
        "Found captions for",
        tracks.map((t: any) => t?.name?.simpleText).join(", ")
      );

      // console.log("TRACKS", tracks);

      let zhTrack;
      try {
        zhTrack = getTrack({ lang, tracks });
      } catch (err) {
        zhTrack = null;
      }

      if (!zhTrack) {
        try {
          zhTrack = getTrack({ lang: "zh", tracks });
        } catch (err) {
          zhTrack = null;
        }
      }

      //
      const englishCode = "en";
      const englishTrack = getTrack({ lang: englishCode, tracks });
      const frenchCode = "fr";
      const frenchTrack = getTrack({ lang: "fr", tracks });
      const spanishCode = "es";
      const spanishTrack = getTrack({ lang: "es", tracks });
      // const  =

      // console.log("RES", await res.json());

      let subtitles;

      try {
        subtitles = zhTrack
          ? ((await httpRequest(`${zhTrack?.baseUrl}&fmt=vtt`)) as any)
          : null;
      } catch (err) {
        subtitles = null;
      }

      const englishSubtitles = englishTrack?.baseUrl
        ? ((await httpRequest(`${englishTrack?.baseUrl}&fmt=vtt`)) as any)
        : "";
      const frenchSubtitles = frenchTrack?.baseUrl
        ? ((await httpRequest(`${frenchTrack?.baseUrl}&fmt=vtt`)) as any)
        : "";
      const spanishSubtitles = spanishTrack?.baseUrl
        ? ((await httpRequest(`${spanishTrack?.baseUrl}&fmt=vtt`)) as any)
        : "";

      const parseAndFormatSubtitles = (subtitles: any, key: any) => {
        return parser.parse(subtitles, "metadata")?.cues?.map((item: any) => {
          return {
            [key]: item?.text,
            start: parseInt(item?.startTime),
            end: parseInt(item?.endTime),
          };
        });
      };

      // const parsed = webvtt.parse(subtitles || englishSubtitles);
      const hanziParsed = parseAndFormatSubtitles(subtitles, "hanzi");
      const englishParsed = parseAndFormatSubtitles(englishSubtitles, "en");
      const frenchParsed = parseAndFormatSubtitles(frenchSubtitles, "fr");
      const spanishParsed = parseAndFormatSubtitles(spanishSubtitles, "fr");

      const items = [
        ...hanziParsed,
        ...englishParsed,
        ...frenchParsed,
        ...spanishParsed,
      ]
        ?.filter(Boolean)
        ?.sort((a: any, b: any) => {
          return a?.start - b?.start;
        });

      const groupByStart = R.groupBy((x: any) => x.start);

      return Object.values(groupByStart(items)).map((item: any) => {
        return item.reduce((acc: any, curr: any) => {
          return {
            ...acc,
            ...curr,
            hanzi: acc?.hanzi || curr?.hanzi || "",
            pinyin: "",
            en: acc?.en || curr?.en || "",
          };
        }, {});
      });

      // console.log("RES", res);
      // return res;

      // const lyrics = subtitles
      //   ? (subtitles || "")?.split("\n").filter(Boolean).slice(3)
      //   : [];
      // const englishLyrics = englishSubtitles
      //   .split("\n")
      //   .filter(Boolean)
      //   .slice(3);

      // const frenchLyrics = frenchSubtitles.split("\n").filter(Boolean).slice(3);
      // const spanishLyrics = spanishSubtitles
      //   .split("\n")
      //   .filter(Boolean)
      //   .slice(3);

      // return (lyrics?.length ? lyrics : englishLyrics).reduce(
      //   (acc: any, curr: any, idx: any) => {
      //     if (idx % 2 === 0) {
      //       const timestamp = curr;
      //       const value = lyrics[idx + 1] || "";

      //       const englishValue = englishLyrics[idx + 1];
      //       const frenchValue = frenchLyrics[idx + 1];
      //       const spanishValue = spanishLyrics[idx + 1];

      //       const startTimes = timestamp.split(" ")[0].split(":") || [];
      //       const start = getTotalSeconds(startTimes);

      //       const endTimes = timestamp.split(" ")[2].split(":") || [];

      //       const end = getTotalSeconds(endTimes);

      //       const hanziProps =
      //         lang === "zh-CN"
      //           ? {
      //               hanzi: value,
      //               pinyin: "",
      //               en: englishValue,
      //               fr: frenchValue,
      //               es: spanishValue,
      //             }
      //           : {};

      //       return acc.concat({
      //         lang,
      //         start,
      //         end,
      //         ...hanziProps,
      //       });
      //     }

      //     return acc;
      //   },
      //   []
      // );
    } else {
      console.log("No captions found for this video");
    }
  });
};

// const id = "https://www.youtube.com/watch?v=7McMpWMuw9Q";
// const lang = "zh-CN";

// listSubtitles({ id, lang }).then((transcriptions) => {
//   console.log(transcriptions);
// });
