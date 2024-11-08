import { verifyJwt } from "@/libs/cognito/jwt";
import path from "path";
import fs from "fs";
import axios from "axios";
import util from "util";

// const readFile = require('util').promisify(fs.readFile);

import { headers } from "next/headers";

import { deleteFile } from "./delete-file";
import { downloadFile } from "./download-file";
import { getUploadUrl } from "@/domain/asset/asset.api";
import { addUserAsset } from "@/domain/asset/add-user-asset.api";
import { updateComponent } from "@/domain/component/update-component.api";

export const maxDuration = 60;

function readFile(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

export async function POST(req: Request) {
  const headersApi = headers();

  const { audioUrl, component, componentId } = await req.json();

  const jwtToken = headersApi.get("authorization") || "";
  const isVerified = await verifyJwt(jwtToken, { isAdmin: false });

  console.log("VERIFIED", isVerified);

  if (isVerified || true) {
    // 2. Get Upload Url
    const getUploadUrlParams = { extension: "mp3", contentType: "audio/mpeg" };

    const uploadUrlResponse = (await getUploadUrl(getUploadUrlParams, {
      Authorization: jwtToken,
    })) as any;

    const { signedUrl: url, s3Key, assetUrl, id } = uploadUrlResponse;

    console.log("UPLAOD URL RESP", uploadUrlResponse);

    // 1. Download audio - DONE
    const dateNow = Date.now();

    // const fileName = `${component}_${dateNow}.m4a`;
    const fileName = s3Key;
    const filePath = path.basename(fileName);
    await downloadFile({ filePath, fileUrl: audioUrl });

    // // 2. Get Upload Url
    // const getUploadUrlParams = {
    //   contentType: "audio/x-m4a",
    //   extension: "m4a",
    // };

    // const uploadUrlResponse = (await getUploadUrl(getUploadUrlParams, {
    //   Authorization: jwtToken,
    // })) as any;

    // const { signedUrl: url, s3Key, assetUrl, id } = uploadUrlResponse;

    console.log("URL", url);

    // console.log("FILE PATH", filePath);

    // 2. Upload to s3 - TODO
    // Upload the file using fetch
    const fileStream = readFile(filePath);

    // console.log("FILE STREAM", fileStream);

    // await fetch(url, {
    //   method: "PUT",
    //   // @ts-ignore
    //   body: fileStream,
    //   duplex: "half", // Add this line to specify the duplex option
    //   headers: {
    //     "Content-Type": "application/octet-stream", // Adjust based on your file type
    //   },
    // });

    const response = await axios.put(
      url,
      {
        data: fileStream,
      },
      {
        headers: {
          // "Content-Type": getUploadUrlParams.contentType,
          ["Content-Type"]: getUploadUrlParams.contentType, // Match content type used in signed URL
          // ["Content-Type"]: "application/octet-stream", // Match content type used in signed URL
        },
      }
    );

    const userAssetParams = {
      id,
      name: component,
      // size: fileSize,
      contentType: getUploadUrlParams?.contentType,
      extension: getUploadUrlParams?.extension,
      sourceUrl: assetUrl,
      uploadBucketKey: s3Key,
    };

    // 4. Add user asset
    const userAsset = await addUserAsset(userAssetParams, {
      Authorization: jwtToken,
    });

    // 5. Edit component - TODO
    const updatedComponent = await updateComponent(
      {
        id: componentId,
        audio: assetUrl,
      },
      {
        Authorization: jwtToken,
      }
    );
    // 6. Delete audio after uploading - DONE
    await deleteFile(filePath);

    // 7. Return response
    return Response.json(updatedComponent);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
