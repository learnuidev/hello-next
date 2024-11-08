import { verifyJwt } from "@/libs/cognito/jwt";
import path from "path";
import fs from "fs";
import axios from "axios";
import util from "util";

// const readFile = require('util').promisify(fs.readFile);

import { headers } from "next/headers";

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

  if (isVerified) {
    // 1. Download audio as audio buffer
    const audioResponse = await axios.get(audioUrl, {
      responseType: "arraybuffer",
    });

    console.log("AUDIO RESPONSE", audioResponse);

    // 2. Get Upload Url
    const getUploadUrlParams = {
      extension: "mp3",
      contentType: audioResponse.headers["content-type"],
    };

    const uploadUrlResponse = (await getUploadUrl(getUploadUrlParams, {
      Authorization: jwtToken,
    })) as any;

    const { signedUrl: url, s3Key, assetUrl, id } = uploadUrlResponse;

    // 3. Upload to s3
    await axios.put(url, audioResponse?.data, {
      headers: {
        "Content-Type": audioResponse.headers["content-type"],
      },
    });

    // 4. Add user asset
    const userAssetParams = {
      id,
      name: component,
      size: parseInt(audioResponse.headers["content-length"]) || 0,
      contentType: getUploadUrlParams?.contentType,
      extension: getUploadUrlParams?.extension,
      sourceUrl: assetUrl,
      uploadBucketKey: s3Key,
    };

    await addUserAsset(userAssetParams, {
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

    // 6. Return response
    return Response.json(updatedComponent);
  } else {
    return Response.json({
      message: "Not authorized",
    });
  }
}
