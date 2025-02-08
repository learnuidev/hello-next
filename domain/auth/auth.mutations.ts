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
