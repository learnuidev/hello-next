import fs from "fs";
import axios from "axios";

export async function downloadFile({
  fileUrl,
  filePath,
}: {
  fileUrl: string;
  filePath: string;
}) {
  return axios({
    url: fileUrl,
    method: "GET",
    responseType: "stream",
  })
    .then((response) => {
      return new Promise((resolve: any, reject) => {
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        writer.on("finish", () => {
          console.log("File downloaded successfully!");
          resolve();
        });

        writer.on("error", (err) => {
          console.error("Error writing the file", err);
          reject(err);
        });
      });
    })
    .catch((error) => {
      console.error("Error downloading the file", error);
    });
}
