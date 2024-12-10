import ytdl from "@distube/ytdl-core";
import https from "https";
import { httpRequest } from "./http-request";

const secondsInHour = 3600;
const secondsInMinute = 60;
const hourIndex = 0;
const minuteIndex = 1;
const secondIndex = 2;

// @ts-ignore
import { WebVTTParser } from "webvtt-parser";

const parser = new WebVTTParser();

export const langs = [
  "ar",
  "zh-CN",
  "en",
  "en",
  "fr",
  "de",
  "id",
  "it",
  "ja",
  "ko",
  "ms",
  "fa-IR",
  "pt",
  "es",
  "ta",
  "tr",
];

const getTrack = ({ tracks, lang }: { tracks: any; lang: string }) => {
  const track = tracks.find((t: any) => t.languageCode === lang);

  if (track) {
    return track;
  }

  if (tracks?.length === 1) {
    return tracks[0];
  }
};

const resolveTrack = ({ tracks, lang }: any) => {
  let zhTrack;
  try {
    zhTrack = getTrack({ lang: "zh-CN", tracks });
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
  if (!zhTrack) {
    try {
      zhTrack = getTrack({ lang: "zh-Hant", tracks });
    } catch (err) {
      zhTrack = null;
    }
  }
  if (!zhTrack) {
    try {
      zhTrack = getTrack({ lang, tracks });
    } catch (err) {
      zhTrack = null;
    }
  }

  if (!zhTrack) {
    zhTrack = tracks[0];
  }

  return zhTrack;
};

export const listSubtitles = async ({
  id,
  lang,
}: {
  id: string;
  lang: string;
}) => {
  const info = (await ytdl.getInfo(id)) as any;

  const { videoDetails, related_videos } = info;
  const { title, description, author, thumbnails } = info.videoDetails;

  const tracks =
    info.player_response.captions.playerCaptionsTracklistRenderer.captionTracks;

  if (tracks && tracks.length) {
    console.log(
      "Found captions for",
      tracks.map((t: any) => t?.name?.simpleText).join(", ")
    );

    const langCodes = tracks.map(
      (track: { languageCode: string }) => track.languageCode
    );

    let resolvedLang = langCodes?.[0] || lang;

    const zhTrack = resolveTrack({ lang: resolvedLang, tracks });

    let subtitles;

    try {
      subtitles = zhTrack
        ? ((await httpRequest(`${zhTrack?.baseUrl}&fmt=vtt`)) as any)
        : null;
    } catch (err) {
      subtitles = null;
    }

    const tree = parser.parse(subtitles, "metadata");

    const newSubtitles = tree?.cues?.map((cue: any) => {
      const hanziProps =
        resolvedLang === "zh-CN"
          ? {
              input: cue?.text?.split("\n").join(" "),
              pinyin: "",
            }
          : {
              input: cue?.text?.split("\n").join(" "),
            };

      return {
        lang: "zh",
        start: cue?.startTime,
        end: cue?.endTime,
        ...hanziProps,
      };
    });

    return {
      title,
      description,
      subtitles: newSubtitles,
      thumbnails,
      author,
    };
  } else {
    console.log("No captions found for this video");
  }

  return ytdl.getInfo(id).then(async (info: any) => {
    // const tracks =
    //   info.player_response.captions.playerCaptionsTracklistRenderer
    //     .captionTracks;

    // const { videoDetails } = info;
    const { videoDetails, related_videos } = info;
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    if (tracks && tracks.length) {
      console.log(
        "Found captions for",
        tracks.map((t: any) => t?.name?.simpleText).join(", ")
      );

      const langCodes = tracks.map(
        (track: { languageCode: string }) => track.languageCode
      );

      let resolvedLang = langCodes?.[0] || lang;

      const zhTrack = resolveTrack({ lang: resolvedLang, tracks });

      let subtitles;

      try {
        subtitles = zhTrack
          ? ((await httpRequest(`${zhTrack?.baseUrl}&fmt=vtt`)) as any)
          : null;
      } catch (err) {
        subtitles = null;
      }

      const tree = parser.parse(subtitles, "metadata");

      const newSubtitles = tree?.cues?.map((cue: any) => {
        const hanziProps =
          resolvedLang === "zh-CN"
            ? {
                input: cue?.text?.split("\n").join(" "),
                pinyin: "",
              }
            : {
                input: cue?.text?.split("\n").join(" "),
              };

        return {
          lang: "zh",
          start: cue?.startTime,
          end: cue?.endTime,
          ...hanziProps,
        };
      });

      return newSubtitles;

      return {
        subtitles: newSubtitles,
        videoDetails,
        tracks,
        relatedVideos: related_videos,
      };
    } else {
      console.log("No captions found for this video");
    }
  });
};

export const listTracks = ({ id, lang }: { id: string; lang: string }) => {
  return ytdl.getInfo(id).then(async (info: any) => {
    // const tracks =
    //   info.player_response.captions.playerCaptionsTracklistRenderer
    //     .captionTracks;

    // const { videoDetails } = info;
    const { videoDetails, related_videos } = info;
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    if (tracks && tracks.length) {
      console.log(
        "Found captions for",
        tracks.map((t: any) => t?.name?.simpleText).join(", ")
      );

      const langCodes = tracks.map(
        (track: { languageCode: string }) => track.languageCode
      );

      // console.log("TRACKS", tracks);

      let zhTrack;
      try {
        zhTrack = getTrack({ lang: "zh-CN", tracks });
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
      if (!zhTrack) {
        try {
          zhTrack = getTrack({ lang: "zh-Hant", tracks });
        } catch (err) {
          zhTrack = null;
        }
      }

      //
      // const englishCode = "en";
      // const englishTrack = getTrack({ lang: englishCode, tracks });
      // const frenchCode = "fr";
      // const frenchTrack = getTrack({ lang: frenchCode, tracks });
      // const spanishCode = "es";
      // const spanishTrack = getTrack({ lang: spanishCode, tracks });
      // const  =

      console.log("Track Found: === ", zhTrack);

      console.log("Retrieving captions:", zhTrack?.name?.simpleText);
      console.log("URL", zhTrack?.baseUrl);

      // console.log("RES", await res.json());

      let subtitles;

      try {
        subtitles = zhTrack
          ? ((await httpRequest(`${zhTrack?.baseUrl}&fmt=vtt`)) as any)
          : null;
      } catch (err) {
        subtitles = null;
      }

      // const englishSubtitles = englishTrack?.baseUrl
      //   ? ((await httpRequest(`${englishTrack?.baseUrl}&fmt=vtt`)) as any)
      //   : "";
      // const frenchSubtitles = frenchTrack?.baseUrl
      //   ? ((await httpRequest(`${frenchTrack?.baseUrl}&fmt=vtt`)) as any)
      //   : "";
      // const spanishSubtitles = spanishTrack?.baseUrl
      //   ? ((await httpRequest(`${spanishTrack?.baseUrl}&fmt=vtt`)) as any)
      //   : "";

      // console.log("RES", res);
      // return res;

      const lyrics = subtitles ? (subtitles || "")?.split("\n").slice(4) : [];
      // const englishLyrics =
      //   englishSubtitles.split("\n").filter(Boolean).slice(3) || [];

      // const frenchLyrics =
      //   frenchSubtitles?.split("\n")?.filter(Boolean)?.slice(3) || [];
      // const spanishLyrics =
      //   spanishSubtitles?.split("\n")?.filter(Boolean)?.slice(3) || [];

      const subtitlesList = lyrics.reduce((acc: any, curr: any, idx: any) => {
        if (curr === "") {
          // const timestamp = curr;
          // const value = lyrics[idx + 1] || "";
          const maybeTimestamp = lyrics[idx - 2];
          const timestampIdx = maybeTimestamp?.includes("-->")
            ? idx - 2
            : idx - 3;
          const timestamp = lyrics[timestampIdx];

          const value = maybeTimestamp?.includes("-->")
            ? lyrics[idx - 1]
            : lyrics[idx - 2];

          // const englishValue = englishLyrics[idx + 1];
          // const frenchValue = frenchLyrics[idx + 1];
          // const spanishValue = spanishLyrics[idx + 1];

          const startTimes = timestamp?.split(" ")?.[0]?.split(":") || [];
          const start = getTotalSeconds(startTimes);

          const endTimes = timestamp?.split(" ")?.[2]?.split(":") || [];

          const end = getTotalSeconds(endTimes);

          const hanziProps =
            lang === "zh-CN"
              ? {
                  input: value,
                  pinyin: "",
                  // en: englishValue,
                  // fr: frenchValue,
                  // es: spanishValue,
                }
              : {};

          return acc.concat({
            lang: "zh",
            start,
            end,
            ...hanziProps,
          });
        }

        return acc;
      }, []);

      return subtitlesList;

      return {
        subtitles: subtitlesList,
        videoDetails,
        tracks,
        relatedVideos: related_videos,
      };
    } else {
      console.log("No captions found for this video");
    }
  });
};

const getTotalSeconds = (times: any) => {
  return (
    parseFloat(times[hourIndex]) * secondsInHour +
    parseFloat(times[minuteIndex]) * secondsInMinute +
    parseFloat(times[secondIndex])
  );
};

// const id = "https://www.youtube.com/watch?v=7McMpWMuw9Q";
// const lang = "zh-CN";

// listSubtitles({ id, lang }).then((transcriptions) => {
//   console.log(transcriptions);
// });
