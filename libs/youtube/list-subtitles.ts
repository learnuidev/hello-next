import ytdl from "ytdl-core";
import https from "https";

const secondsInHour = 3600;
const secondsInMinute = 60;
const hourIndex = 0;
const minuteIndex = 1;
const secondIndex = 2;

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

const listSubtitlesRaw = ({ id, lang }: { id: string; lang: string }) => {
  return ytdl.getInfo(id).then(async (info: any) => {
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    if (tracks && tracks.length) {
      console.log(
        "Found captions for",
        tracks.map((t: any) => t.name.simpleText).join(", ")
      );

      console.log("TRACKS", tracks);
      const track = tracks.find((t: any) => t.languageCode === lang);

      console.log("Track Found: === ", track);
      if (track) {
        console.log("Retrieving captions:", track.name.simpleText);
        console.log("URL", track.baseUrl);

        // console.log("RES", await res.json());

        const res = await httpRequest(`${track.baseUrl}&fmt=vtt`);

        // console.log("RES", res);
        return res;
      } else {
        console.log("Could not find captions for", lang);
      }
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

export const listSubtitles = async ({
  id,
  lang,
}: {
  id: string;
  lang: string;
}) => {
  const subtitles = await listSubtitlesRaw({ id, lang }).then(
    (subtitles: any) => {
      const lyrics = subtitles.split("\n").filter(Boolean).slice(3);

      return lyrics.reduce((acc: any, curr: any, idx: any) => {
        if (idx % 2 === 0) {
          const timestamp = curr;
          const value = lyrics[idx + 1];

          const startTimes = timestamp.split(" ")[0].split(":") || [];
          const start = getTotalSeconds(startTimes);

          const endTimes = timestamp.split(" ")[2].split(":") || [];

          const end = getTotalSeconds(endTimes);

          const hanziProps =
            lang === "zh-CN" ? { hanzi: value, pinyin: "", en: "" } : {};

          return acc.concat({
            lang,
            start,
            end,
            value,
            ...hanziProps,
          });
        }

        return acc;
      }, []);
    }
  );

  console.log("SUBTITLES", subtitles);

  return subtitles;
};

// const id = "https://www.youtube.com/watch?v=7McMpWMuw9Q";
// const lang = "zh-CN";

// listSubtitles({ id, lang }).then((transcriptions) => {
//   console.log(transcriptions);
// });
