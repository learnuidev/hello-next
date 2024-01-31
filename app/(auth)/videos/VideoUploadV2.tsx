import { useState } from "react";
import AWS from "aws-sdk";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { config } from "@/lib/config";
import Axios from "axios";
import { useGetUploadUrlQuery } from "@/domain/asset/asset.queries";
import { getUploadUrl } from "@/domain/asset/asset.api";
// import { useCurrentAuthUser } from '../../react-query/auth/auth.queries';

AWS.config.region = "us-east-1";

const IDENTITY_POOL_ID = config.identityPoolId;
const UPLOAD_BUCKET_NAME = config.uploadBucketName;

const credits = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: IDENTITY_POOL_ID,
});

AWS.config.credentials = credits;

const myBucket = new AWS.S3({
  params: { Bucket: UPLOAD_BUCKET_NAME },
  region: "us-east-1",
});

const getContentType = (extension: string) => {
  switch (extension) {
    case "png":
      return "image/png";
    case "mp4":
      return "video/mp4";
    case "pdf":
      return "application/pdf";
    default:
      return "image/jpeg";
  }
};

const UploadImageToS3WithNativeSdk = ({ onUploadSuccess }: any) => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const { data: authUser } = useCurrentAuthUser();

  const handleFileInput = (e: any) => {
    console.log("Test", e.target.files[0]);
    // window.file = e.target.files[0];
    setSelectedFile(e.target.files[0]);
  };

  const obrizumKey = `AUTHOR_EMAIL/NODE_ID`;

  const uploadFile = async (file: any) => {
    try {
      console.log("UPLOADING");
      // const file = this.$refs.fileInput.files[0];

      console.log("FILE: ", file);

      const extension = file.name.split(".").pop();
      console.log("EXTENSION: ", extension);
      const contentType = getContentType(extension);

      const params = { contentType, extension, urlId: crypto.randomUUID() };
      console.log("PARAMS: ", params);

      const uploadResp = await getUploadUrl(params, {
        Authorization: authUser?.jwt,
      });

      const { signedUrl: url, s3Key } = uploadResp;

      console.log("UPLOAD RESP", uploadResp);

      console.log("S3Key", s3Key);
      const formData = new FormData();
      formData.append("image", file);
      const resp = await Axios.put(url, file, {
        headers: { ["Content-Type"]: contentType },
      });

      console.log("UPLOADED: ", resp);

      onUploadSuccess?.({ referenceId: resp });
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <div>
      <div>Native SDK File Upload Progress is {progress}%</div>
      <input type="file" onChange={handleFileInput} />
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
  );
};

// console.log('MY BUCKET', myBucket);

export const VideosPage = (props: any) => {
  return (
    <div>
      <p>Videos Page</p>
      <UploadImageToS3WithNativeSdk />
    </div>
  );
};
