export function isVideo(file: any) {
  if (typeof file === "string") {
    return file?.includes("mp4") || file?.includes("m4a");
  }

  return (
    ["video/mp4"]?.includes(file.type) ||
    file.path?.includes("mp4") ||
    file?.path?.includes("m4a")
  );
}
