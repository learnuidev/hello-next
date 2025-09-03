import ytdl from "@distube/ytdl-core";
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
    } else {
      console.log("No captions found for this video");
    }
  });
};
