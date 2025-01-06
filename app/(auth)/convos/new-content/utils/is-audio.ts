export function isAudio(file: any) {
  const isTrue =
    ["video/mp4"]?.includes(file?.type) ||
    file?.path?.includes("mp3") ||
    file?.path?.includes("wav");

  if (isTrue) {
    return isTrue;
  }

  return file?.includes("wav") || file?.includes("mp3");
}
