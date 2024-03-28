export interface AWSConfig {
  awsRegion: string;
  userPoolId: string;
  userPoolWebClientId: string;
  mandatorySignIn: true;
  graphqlEndpoint: string;
  authenticationType: "AMAZON_COGNITO_USER_POOLS";
  identityPoolId: string;
  uploadBucketName: string;
}

export const awsConfig = {
  awsRegion: process.env.NEXT_PUBLIC_AWS_REGION,
  userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USERPOOL_ID,
  userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_WEBCLIENT_ID,
  mandatorySignIn: true,
  graphqlEndpoint: process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT,
  authenticationType: "AMAZON_COGNITO_USER_POOLS",
  identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
  uploadBucketName: process.env.NEXT_PUBLIC_UPLOAD_BUCKET_NAME,
} as AWSConfig;
