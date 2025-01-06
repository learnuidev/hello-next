export function isAudio(file: any) {
  if (typeof file === "string") {
    return file?.includes("wav") || file?.includes("mp3");
  }

  return (
    ["video/mp4"]?.includes(file?.type) ||
    file?.path?.includes("mp3") ||
    file?.path?.includes("wav")
  );
}
