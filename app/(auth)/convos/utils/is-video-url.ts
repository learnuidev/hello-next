export const isVideoUrl = (val: string) => {
  return val?.includes(".mp4") || val?.includes("webm");
};
