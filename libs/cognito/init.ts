import { Amplify } from "aws-amplify";
// import awsExports from './aws-exports';
import { config } from "@/lib/config";

const awsExports = {
  region: config?.awsRegion,
  userPoolId: config?.userPoolId,
  userPoolWebClientId: config?.userPoolWebClientId,
  mandatorySignIn: true,
  graphqlEndpoint: config?.graphqlEndpoint,
  authenticationType: "AMAZON_COGNITO_USER_POOLS",
};

Amplify.configure(awsExports);
