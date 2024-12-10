import OpenAI from "openai";
import fs from "fs";
import ytdl from "@distube/ytdl-core";
import https from "https";
import axios from "axios";
import path from "path";

export const maxDuration = 60;
//

async function downloadAudioFromVideo({
  videoURL,
  fileLocation,
}: {
  videoURL: string;
  fileLocation: string;
}) {
  try {
    // Download the video using ytdl
    const videoInfo = await ytdl.getInfo(videoURL);
    const audioFormats = ytdl.filterFormats(videoInfo.formats, "audioonly");

    const oneTwentyEightFormat = audioFormats?.find(
      (format) => format.audioBitrate === 128
    );

    const audioSource = oneTwentyEightFormat?.url || "";

    return axios
      .get(audioSource, {
        responseType: "arraybuffer",
      })
      .then(({ data }) => {
        fs.writeFileSync(fileLocation, data);
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
import { openaiConfig } from "@/libs/openai/openai.config";

const openai = new OpenAI({
  apiKey: openaiConfig?.apiKey,
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { videoUrl } = await req.json();

  const fileName = `${videoUrl}.mp3`;
  const fileLocation = path.basename(fileName);

  // // 1. Download video
  return downloadAudioFromVideo({ videoURL: videoUrl, fileLocation }).then(
    async (resp) => {
      try {
        const transcription = await openai.audio.transcriptions.create({
          file: fs.createReadStream(fileLocation),
          model: "whisper-1",
          response_format: "verbose_json",
          // timestamp_granularities: ["word"],
        });
        const translations = await openai.audio.translations.create({
          file: fs.createReadStream(fileLocation),
          model: "whisper-1",
        });

        // Respond with the stream
        return Response.json({
          // ...resp,
          transcription,
          translations,
        });
      } catch (err: any) {
        return Response.json({
          // ...resp,
          err: err.message,
        });
      }
    }
  );
}
