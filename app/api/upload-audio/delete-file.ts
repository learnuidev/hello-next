import { unlink } from "fs/promises";

export async function deleteFile(filePath: string) {
  try {
    await unlink(filePath); // Delete the file
    console.log("File deleted successfully!"); // Success message
  } catch (err: any) {
    console.error(`Error deleting file: ${err.message}`); // Error handling
  }
}
