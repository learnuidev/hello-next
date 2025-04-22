export const isVideoUrl = (val: string) => {
  return (
    val?.includes(".mp4") || val?.includes(".m4a") || val?.includes("webm")
  );
};
