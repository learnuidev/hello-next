import OpenAI from "openai";
import fs from "fs";
import ytdl from "ytdl-core";
import https from "https";
import path from "path";

import axios from "axios";

// const http = require("http");
// const fs = require("fs");

fs.writeFileSync("./test.json", JSON.stringify({}));

const stream = fs.createReadStream(`./test.json`);

async function downloadAudioFromVideo({ videoURL }) {
  try {
    // Download the video using ytdl
    const videoInfo = await ytdl.getInfo(videoURL);
    const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly");

    const oneTwentyEightFormat = audioFormats?.find(
      (format) => format.audioBitrate === 128
    );

    const audioSource = oneTwentyEightFormat?.url || "";

    const fileName = `${videoURL}.mp3`;

    return axios
      .get(audioSource, {
        responseType: "arraybuffer",
      })
      .then(({ data }) => {
        // return data;
        fs.writeFileSync(`./${fileName}`, data);
      })
      .catch((err) => {
        // console.error(`an error ocurred while downloading ${url}`, err)
      });

    return oneTwentyEightFormat;
  } catch (error) {
    console.error("Error downloading video:", error);
    return {
      audioUrl: "",
    };
  }
}

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: "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",
});

async function transcribeAudio({ videoUrl }) {
  return downloadAudioFromVideo({ videoURL: videoUrl }).then(async (resp) => {
    // return Response.json({
    //   // ...resp,
    //   transcription: resp,
    // });

    // const transcription = await openai.audio.transcriptions.create({
    //   file: fs.createReadStream(`./${videoUrl}.mp3`),
    //   model: "whisper-1",
    // });

    // Respond with the stream
    return resp;
  });
}

// transcribeAudio({
//   videoUrl: "https://www.youtube.com/watch?v=m03e3iYK7m0",
// });
