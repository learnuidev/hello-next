import { Amplify } from "aws-amplify";
// import awsExports from './aws-exports';
import { awsConfig } from "@/lib/config";

const awsExports = {
  region: awsConfig?.awsRegion,
  userPoolId: awsConfig?.userPoolId,
  userPoolWebClientId: awsConfig?.userPoolWebClientId,
  mandatorySignIn: true,
  graphqlEndpoint: awsConfig?.graphqlEndpoint,
  authenticationType: "AMAZON_COGNITO_USER_POOLS",
};

Amplify.configure(awsExports);
