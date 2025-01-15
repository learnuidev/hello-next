const ytdl = require("@distube/ytdl-core");
const https = require("https");

// @ts-ignore
const { WebVTTParser } = require("webvtt-parser");

const parser = new WebVTTParser();

const secondsInHour = 3600;
const secondsInMinute = 60;
const hourIndex = 0;
const minuteIndex = 1;
const secondIndex = 2;

function httpRequest(params) {
  return new Promise(function (resolve, reject) {
    var req = https.request(params, function (res) {
      // reject on bad status
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error("statusCode=" + res.statusCode));
      }
      // cumulate data
      var body = [];
      res.on("data", function (chunk) {
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

const getTrack = ({ tracks, lang }) => {
  const track = tracks.find((t) => t.languageCode === lang);

  if (track) {
    return track;
  }

  if (tracks?.length === 1) {
    return tracks[0];
  }
};

const resolveTrack = ({ tracks, lang }) => {
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
      zhTrack = getTrack({ lang: "zh-Hans", tracks });
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

const listSubtitles = async ({ id, lang }) => {
  //   return ytdl.getInfo(id);
  const info = await ytdl.getInfo(id);

  // return info.videoDetails;

  const { title, description, author, thumbnails } = info.videoDetails;

  // const tracks =
  //   info.player_response.captions.playerCaptionsTracklistRenderer
  //     .captionTracks;

  // const { videoDetails } = info;
  const { videoDetails, related_videos } = info;
  const tracks =
    info.player_response.captions.playerCaptionsTracklistRenderer.captionTracks;
  if (tracks && tracks.length) {
    console.log(
      "Found captions for",
      tracks.map((t) => t?.name?.simpleText).join(", ")
    );

    const langCodes = tracks.map((track) => track.languageCode);

    // console.log("LANG CODES", langCodes);

    let resolvedLang =
      langCodes?.find((code) => "zh-Hans" === code) || langCodes?.[0] || lang;

    const zhTrack = resolveTrack({ lang: resolvedLang, tracks });

    let subtitles;

    try {
      subtitles = zhTrack
        ? await httpRequest(`${zhTrack?.baseUrl}&fmt=vtt`)
        : null;
    } catch (err) {
      subtitles = null;
    }

    const tree = parser.parse(subtitles, "metadata");

    const newSubtitles = tree?.cues?.map((cue) => {
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
      subtitles: newSubtitles,
      title,
      description,
      author,
      thumbnails,
    };
  } else {
    console.log("No captions found for this video");
  }
};

const getTotalSeconds = (times) => {
  return (
    parseFloat(times[hourIndex]) * secondsInHour +
    parseFloat(times[minuteIndex]) * secondsInMinute +
    parseFloat(times[secondIndex])
  );
};

module.exports = {
  listSubtitles,
  getTotalSeconds,
};

// const id = "https://www.youtube.com/watch?v=87tHecsCjtE";
// const lang = "zh-CN";

// listSubtitles({ id, lang }).then((transcriptions) => {
//   console.log(transcriptions);
// });
