import ytdl from "@distube/ytdl-core";

import { httpRequest } from "./http-request";

const format = "vtt";

export const listSubtitlesRaw = ({ id, lang }: any) => {
  return ytdl.getInfo(id).then(async (info: any) => {
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    if (tracks && tracks.length) {
      const track = tracks.find((t: any) => t.languageCode === lang);
      if (track) {
        const output = `${info.videoDetails.title}.${track.languageCode}.${format}`;

        const res = await httpRequest(`${track.baseUrl}&fmt=${format}`);

        return res;
      } else {
      }
    } else {
    }
  });
};
