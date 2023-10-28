import { useMutation } from "@tanstack/react-query";
import {
  signUp,
  signUpPasswordLess,
  confirmSignUp,
  resendCode,
  signIn,
  signInPasswordLess,
  confirmSignInPasswordless,
} from "@/libs/cognito/auth";

// import AWS from "aws-sdk";

// AWS.config.region = "us-east-1";

// const IDENTITY_POOL_ID = "us-east-1:d0a9cd7d-c21a-4a2a-9eb7-7d534a3ad6f9";
// const STREAM_NAME = "compose-analytics-vishal-dev-FirehoseLogStream-VjVLvrWDmk4A"
// const STREAM_NAME = "compose-analytics-vishal-dev-FirehoseStream-KePpqU8BkOdU";

// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: IDENTITY_POOL_ID,
// });

// const FirehoseClient = new AWS.Firehose();

// export async function trackEvent(event: any) {
//   const response = await FirehoseClient.putRecord({
//     DeliveryStreamName: STREAM_NAME,
//     Record: {
//       Data: JSON.stringify(event),
//     },
//   }).promise();

//   console.log("response", response);

//   return response;
// }

// export function useTrackEventMutation(options: any) {
//   return useMutation(
//     async (event) => {
//       return await trackEvent(event);
//     },
//     {
//       ...options,
//       onSuccess: (data, variables, context): void => {
//         options?.onSuccess?.(data, variables, context);
//       },
//       onError: (data, variables, context): void => {
//         options?.onError?.(data, variables, context);
//       },
//     }
//   );
// }

// export const aws = AWS;

export function useSignUp(options: any) {
  return useMutation(signUp, {
    ...options,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context): void => {
      options?.onError?.(data, variables, context);
    },
  });
}

export function useSignUpPasswordless(options: any) {
  return useMutation(signUpPasswordLess, {
    ...options,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context): void => {
      options?.onError?.(data, variables, context);
    },
  });
}

export function useSignInPasswordless(options: any) {
  return useMutation(signInPasswordLess, {
    ...options,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context): void => {
      options?.onError?.(data, variables, context);
    },
  });
}
export function useSignIn(options: any) {
  return useMutation(signIn, {
    ...options,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context): void => {
      options?.onError?.(data, variables, context);
    },
  });
}

export function useConfirmSignUp(options: any) {
  return useMutation(confirmSignUp, {
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
  });
}

export function useConfirmSignInPasswordless(options: any) {
  return useMutation(confirmSignInPasswordless, {
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
  });
}

export function useResendCode(options: any) {
  return useMutation(resendCode, {
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
  });
}
