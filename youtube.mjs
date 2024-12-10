import ytdl from "@distube/ytdl-core";
// import fs from "fs";
import https from "https";
import fs from "fs/promises";

let id = "https://www.youtube.com/watch?v=4GXyYMVoJu4";

async function writeFile(fileName, data) {
  try {
    // Writing data to the specified file
    await fs.writeFile(fileName, data, { encoding: "utf8" });
    console.log(`File written successfully: ${fileName}`);
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
  }
}

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

async function getSubtitles(track) {
  return await httpRequest(`${track?.baseUrl}&fmt=vtt`);
}

async function getVideoInfo(title, id) {
  const info = await ytdl.getInfo(id);
  const { videoDetails } = info;
  const tracks =
    info?.player_response?.captions?.playerCaptionsTracklistRenderer
      ?.captionTracks;

  const infoDetails = {
    title: videoDetails.title,
    description: videoDetails.description,
    ownerChannelName: videoDetails.ownerChannelName,
    keywords: videoDetails.keywords,
  };

  // const subtitle = await getSubtitles(tracks[0]);

  if (tracks?.length > 0) {
    await Promise.all(
      tracks.map(async (track) => {
        const subtitles = await getSubtitles(track);
        await writeFile(`./mao/${title}_${track?.languageCode}.vtt`, subtitles);
        return subtitles;
      })
    );
  }

  // console.log("SUBS", subtitle);

  await writeFile(`./mao/${title}.json`, JSON.stringify(info));
  await writeFile(`./mao/${title}_info.json`, JSON.stringify(infoDetails));
  // console.log("ID", tracks);
  return infoDetails;
}

const videos = [
  "https://www.youtube.com/watch?v=4GXyYMVoJu4",
  "https://www.youtube.com/watch?v=l6PUYSwMl8U&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=3",
  "https://www.youtube.com/watch?v=IRISWtLYyMY&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=4",
  "https://www.youtube.com/watch?v=EI4ExCI-X7E&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=5",
  "https://www.youtube.com/watch?v=hCHJpIXffHE&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=6",
  "https://www.youtube.com/watch?v=2CX5Y1K9iAI&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=7",
  "https://www.youtube.com/watch?v=ru3N_tzAR58&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=8",
  "https://www.youtube.com/watch?v=I3TO1b0GeDU&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=9",
  "https://www.youtube.com/watch?v=yttWRikXaHM&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=10",
  "https://www.youtube.com/watch?v=WBvRDzMWDxo&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=11",
  "https://www.youtube.com/watch?v=34jjMbXV7ak&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=12",
  "https://www.youtube.com/watch?v=D2vz2Z-y5Gk&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=13",
  "https://www.youtube.com/watch?v=OxI7V_ThvqE&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=14",
  "https://www.youtube.com/watch?v=EgNotLjDKwY&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=15",
  "https://www.youtube.com/watch?v=FXMzqnDvgUs&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=16",
  "https://www.youtube.com/watch?v=H7LU7MK9Pmg&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=17",
  "https://www.youtube.com/watch?v=dUtVhIzkkIc&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=18",
  "https://www.youtube.com/watch?v=BYIMno-MzZk&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=19",
  "https://www.youtube.com/watch?v=V5RptaMQPKM&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=20",
  "https://www.youtube.com/watch?v=fyJpOXQSido&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=21",
  "https://www.youtube.com/watch?v=znwLBplYGrw&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=22",
  "https://www.youtube.com/watch?v=e0BWrcsG9U4&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=23",
  "https://www.youtube.com/watch?v=pzIYht09s44&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=24",
  "https://www.youtube.com/watch?v=oWr3_iENESs&list=PLxPljs1ejx5FCOkX7kizxM4nDOJRMWTYx&index=25",
];

await Promise.all(
  videos?.map(async (video, idx) => {
    const resp = await getVideoInfo(`${idx}`, video);
  })
);

// ytdl.getInfo(id).then((resp) => {
//   //   fs.writeFileSync(`./${Date.now()}.json`, JSON.stringify(resp));
//   const info = getVideoInfo("01", resp);

//   return info;
// });
