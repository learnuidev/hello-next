// import { useState } from "react";
// import AWS from "aws-sdk";
// import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
// import { config } from "@/lib/config";
// // import { useCurrentAuthUser } from '../../react-query/auth/auth.queries';

// AWS.config.region = "us-east-1";

// const IDENTITY_POOL_ID = config.identityPoolId;
// const UPLOAD_BUCKET_NAME = config.uploadBucketName;

// const credits = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: IDENTITY_POOL_ID,
// });

// AWS.config.credentials = credits;

// const myBucket = new AWS.S3({
//   params: { Bucket: UPLOAD_BUCKET_NAME },
//   region: "us-east-1",
// });

// const UploadImageToS3WithNativeSdk = ({ onUploadSuccess }: any) => {
//   const [progress, setProgress] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const { data: authUser } = useCurrentAuthUser({});

//   const handleFileInput = (e: any) => {
//     console.log("Test", e.target.files[0]);
//     // window.file = e.target.files[0];
//     setSelectedFile(e.target.files[0]);
//   };

//   const obrizumKey = `AUTHOR_EMAIL/NODE_ID`;

//   const uploadFile = (file: any) => {
//     // const date = new Date();
//     // const [year, month, restDate] = date.toJSON().split('-');

//     // const inputKey = year + '_' + month + '_' + restDate + '_' + file.name;
//     const referenceId = crypto.randomUUID();

//     const params = {
//       ACL: "public-read",
//       Body: file,
//       Bucket: UPLOAD_BUCKET_NAME,
//       Key: `${authUser?.email}/${referenceId}/${file.name.replaceAll(
//         " ",
//         "-"
//       )}`,
//       // Key: inputKey,
//     };

//     myBucket
//       .putObject(params)
//       .on("httpUploadProgress", (evt) => {
//         setProgress(Math.round((evt.loaded / evt.total) * 100));
//       })
//       .send((err) => {
//         if (err) console.log(err);
//       });

//     onUploadSuccess?.({ referenceId });
//   };

//   return (
//     <div>
//       <div>Native SDK File Upload Progress is {progress}%</div>
//       <input type="file" onChange={handleFileInput} />
//       <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
//     </div>
//   );
// };

// console.log('MY BUCKET', myBucket);

export const VideosPage = (props: any) => {
  return (
    <div>
      <p>Videos Page</p>
      {/* <UploadImageToS3WithNativeSdk /> */}
    </div>
  );
};
