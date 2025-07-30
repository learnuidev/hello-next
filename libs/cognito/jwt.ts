import { CognitoJwtVerifier } from "aws-jwt-verify";
import { awsConfig } from "../aws/aws.config";
import {
  isSuperAdmin,
  superAdminEmails,
} from "../constants/super-admin-emails";

// const superAdminEmails = ["learnuidev@gmail.com", "anairdna16@gmail.com"];

// Verifier that expects valid access tokens:
export const verifyJwt = async (
  token: string,
  options = {} as { isAdmin?: boolean }
) => {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: awsConfig?.userPoolId,
    tokenUse: "id",
    clientId: awsConfig.userPoolWebClientId,
  });

  const samplePayload = {
    sub: "2b2ff5e1-e244-40ca-abea-ecfbe5c433d4",
    email_verified: true,
    iss: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_NbOkm8WdQ",
    "cognito:username": "2b2ff5e1-e244-40ca-abea-ecfbe5c433d4",
    origin_jti: "76331232-29ff-475b-985a-aaf964724900",
    aud: "5nohobmnjl7p7ou3emngansak4",
    event_id: "b38a699d-ba16-44fd-bece-2ef1a906bb13",
    token_use: "id",
    auth_time: 1716315636,
    exp: 1716473536,
    iat: 1716469936,
    jti: "c68781ab-8abf-4146-b691-f63d8e42190d",
    email: "learnuidev@gmail.com",
  };

  try {
    const payload = (await verifier.verify(token)) as any;
    // console.log("Token is valid. Payload:", payload);

    if (options?.isAdmin) {
      return isSuperAdmin(payload?.email);
    }

    return payload;
  } catch {
    console.log("Token not valid!");
    return false;
  }
};
