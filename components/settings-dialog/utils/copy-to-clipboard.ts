export async function copyTextToClipboard(text: string) {
  if (navigator.clipboard) {
    // Use the Clipboard API for modern browsers
    return navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
        return null;
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  } else {
    return null;
    // Fallback for older browsers
  }
}
