import ytdl from "ytdl-core";
import https from "https";

const secondsInHour = 3600;
const secondsInMinute = 60;
const hourIndex = 0;
const minuteIndex = 1;
const secondIndex = 2;

const langs = [
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

function httpRequest(params: any) {
  return new Promise(function (resolve, reject) {
    var req = https.request(params, function (res: any) {
      // reject on bad status
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error("statusCode=" + res.statusCode));
      }
      // cumulate data
      var body = [] as any;
      res.on("data", function (chunk: any) {
        body.push(chunk);
      });
      // resolve on end
      res.on("end", function () {
        resolve(Buffer.concat(body).toString());
      });
    });
    // reject on request error
    req.on("error", function (err) {
      // This is not a "Second reject", just a different sort of failure
      reject(err);
    });

    // IMPORTANT
    req.end();
  });
}

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

      console.log("TRACKS", tracks);
      let zhTrack = getTrack({ lang, tracks });

      if (!zhTrack) {
        zhTrack = getTrack({ lang: "zh", tracks });
      }

      //
      const englishCode = "en";
      const englishTrack = getTrack({ lang: englishCode, tracks });
      const frenchCode = "fr";
      const frenchTrack = getTrack({ lang: "fr", tracks });
      const spanishCode = "es";
      const spanishTrack = getTrack({ lang: "es", tracks });
      // const  =

      console.log("Track Found: === ", zhTrack);

      console.log("Retrieving captions:", zhTrack?.name?.simpleText);
      console.log("URL", zhTrack?.baseUrl);

      // console.log("RES", await res.json());

      const subtitles = zhTrack
        ? ((await httpRequest(`${zhTrack?.baseUrl}&fmt=vtt`)) as any)
        : null;

      const englishSubtitles = (await httpRequest(
        `${englishTrack.baseUrl}&fmt=vtt`
      )) as any;
      const frenchSubtitles = (await httpRequest(
        `${frenchTrack.baseUrl}&fmt=vtt`
      )) as any;
      const spanishSubtitles = (await httpRequest(
        `${spanishTrack.baseUrl}&fmt=vtt`
      )) as any;

      // console.log("RES", res);
      // return res;

      const lyrics = subtitles
        ? (subtitles || "").split("\n").filter(Boolean).slice(3)
        : [];
      const englishLyrics = englishSubtitles
        .split("\n")
        .filter(Boolean)
        .slice(3);

      const frenchLyrics = frenchSubtitles.split("\n").filter(Boolean).slice(3);
      const spanishLyrics = spanishSubtitles
        .split("\n")
        .filter(Boolean)
        .slice(3);

      return (lyrics?.length ? lyrics : englishLyrics).reduce(
        (acc: any, curr: any, idx: any) => {
          if (idx % 2 === 0) {
            const timestamp = curr;
            const value = lyrics[idx + 1] || "";

            const englishValue = englishLyrics[idx + 1];
            const frenchValue = frenchLyrics[idx + 1];
            const spanishValue = spanishLyrics[idx + 1];

            const startTimes = timestamp.split(" ")[0].split(":") || [];
            const start = getTotalSeconds(startTimes);

            const endTimes = timestamp.split(" ")[2].split(":") || [];

            const end = getTotalSeconds(endTimes);

            const hanziProps =
              lang === "zh-CN"
                ? {
                    hanzi: value,
                    pinyin: "",
                    en: englishValue,
                    fr: frenchValue,
                    es: spanishValue,
                  }
                : {};

            return acc.concat({
              lang,
              start,
              end,
              ...hanziProps,
            });
          }

          return acc;
        },
        []
      );
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
