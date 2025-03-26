interface IConfig {
  awsRegion: string;
  userPoolId: string;
  userPoolWebClientId: string;
  mandatorySignIn: true;
  graphqlEndpoint: string;
  authenticationType: "AMAZON_COGNITO_USER_POOLS";
  identityPoolId: string;
  uploadBucketName: string;
}

interface IMapBoxConfig {
  mapboxApiKey: string;
}

const mapBoxConfig: IMapBoxConfig = {
  mapboxApiKey: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "",
};

export const awsConfig: IConfig = {
  //   AWS
  awsRegion: process.env.NEXT_PUBLIC_AWS_REGION as string,
  userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USERPOOL_ID as string,
  userPoolWebClientId: process.env
    .NEXT_PUBLIC_AWS_COGNITO_WEBCLIENT_ID as string,
  mandatorySignIn: true,
  graphqlEndpoint: process.env
    .NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT as string,
  authenticationType: "AMAZON_COGNITO_USER_POOLS",

  identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string,
  uploadBucketName: process.env.NEXT_PUBLIC_UPLOAD_BUCKET_NAME as string,
};

export const siteConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
  apiUrlV2: process.env.NEXT_PUBLIC_API_URL_V2 || "",
};
