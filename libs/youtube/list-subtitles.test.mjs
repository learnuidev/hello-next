import OpenAI from "openai";
import fs from "fs";
import ytdl from "@distube/ytdl-core";
import https from "https";
import axios from "axios";
import path from "path";
// import webvtt from "node-webvtt";
import * as webVttParser from "webvtt-parser";

const WebVTTParser = webVttParser.WebVTTParser;

const segmentDuration = 10; // default to 10
const startOffset = 0; // Starting MPEG TS offset to be used in timestamp map, default 900000

// Can be xml, ttml, vtt, srv1, srv2, srv3
const format = "vtt";

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

const listSubtitleTracks = ({ id, lang }) => {
  return ytdl.getInfo(id).then(async (info) => {
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    return tracks;
  });
};

const listSubtitlesRaw = ({ id, lang }) => {
  return ytdl.getInfo(id).then(async (info) => {
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    if (tracks && tracks.length) {
      const track = tracks.find((t) => t.languageCode === lang);
      if (track) {
        const output = `${info.videoDetails.title}.${track.languageCode}.${format}`;

        const res = await httpRequest(
          `${track.baseUrl}&fmt=${format !== "json" ? format : ""}`
        );

        return res;
      } else {
      }
    } else {
    }
  });
};

const secondsInHour = 3600;
const secondsInMinute = 60;
const hourIndex = 0;
const minuteIndex = 1;
const secondIndex = 2;

const getTotalSeconds = (times) => {
  return parseFloat(
    parseFloat(times[hourIndex]) * secondsInHour +
      parseFloat(times[minuteIndex]) * secondsInMinute +
      parseFloat(times[secondIndex])
  );
};

const listSubtitles = ({ id, lang }) => {
  return listSubtitlesRaw({ id, lang }).then((subtitles) => {
    const subtitlesAll = subtitles.split("\n").filter(Boolean);
    const lyrics = subtitlesAll.slice(3);

    return lyrics.reduce((acc, curr, idx) => {
      if (idx % 2 === 0) {
        const timestamp = curr;
        const value = lyrics[idx + 1];

        const startTimes = timestamp.split(" ")[0].split(":") || [];
        const start = getTotalSeconds(startTimes);

        const endTimes = timestamp.split(" ")[2].split(":") || [];

        const end = getTotalSeconds(endTimes);

        return acc.concat({
          lang,
          start,
          end,
          value,
        });
      }

      return acc;
    }, []);
  });
};

const id = "https://www.youtube.com/watch?v=Jxj-kwTQTCs";

const lang = "zh-Hant";
