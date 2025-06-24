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
  return useMutation({
    mutationFn: signUp,

    ...options,

    onSuccess: (data: any, variables: any, context: any): void => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context): void => {
      options?.onError?.(data, variables, context);
    },
  });
}

export function useSignUpPasswordless(options: any) {
  return useMutation({
    mutationFn: signUpPasswordLess,
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
  return useMutation({
    mutationFn: signInPasswordLess,
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
  return useMutation({
    mutationFn: signIn,
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
  return useMutation({
    mutationFn: confirmSignUp,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
  });
}

export function useConfirmSignInPasswordless(options: any) {
  return useMutation({
    mutationFn: confirmSignInPasswordless,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
  });
}

export function useResendCode(options: any) {
  return useMutation({
    mutationFn: resendCode,
    onSuccess: (data, variables, context): void => {
      options?.onSuccess?.(data, variables, context);
    },
  });
}
