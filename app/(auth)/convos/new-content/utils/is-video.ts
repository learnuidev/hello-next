export function isVideo(file: any) {
  const isTrue =
    ["video/mp4"]?.includes(file.type) ||
    file.path?.includes("mp4") ||
    file?.path?.includes("m4a");

  if (isTrue) {
    return isTrue;
  }

  return file?.includes("mp4") || file?.includes("m4a");
}
