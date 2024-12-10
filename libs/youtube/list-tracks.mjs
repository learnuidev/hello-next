import ytdl from "@distube/ytdl-core";

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

export const listTracks = ({ id, lang }) => {
  return ytdl.getInfo(id).then(async (info) => {
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    return tracks;
  });
};

let id = "https://www.youtube.com/watch?v=7McMpWMuw9Q";
id = "https://www.youtube.com/watch?v=zqdqxu93eIs";
const lang = "zh-CN";

listTracks({ id, lang }).then((transcriptions) => {
  console.log(transcriptions);
});
