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

type SignUpVariables = {
  username: string;
  password: string;
  email: string;
};

type SignInVariables = {
  username: string;
  password: string;
};

type ConfirmSignUpVariables = {
  username: string;
  code: string;
};

/**
 * The auth hooks are thin wrappers over the Cognito calls in
 * `libs/cognito/auth`. Each one is explicitly typed so call sites get
 * autocomplete and checking on `mutate(...)` variables instead of `@ts-ignore`.
 */
export function useSignUp(options?: any) {
  return useMutation<
    Awaited<ReturnType<typeof signUp>>,
    any,
    SignUpVariables
  >({
    mutationFn: signUp,
    ...options,
  });
}

export function useSignUpPasswordless(options?: any) {
  return useMutation<
    Awaited<ReturnType<typeof signUpPasswordLess>>,
    any,
    { email: string }
  >({
    mutationFn: signUpPasswordLess,
    ...options,
  });
}

export function useSignInPasswordless(options?: any) {
  return useMutation<
    Awaited<ReturnType<typeof signInPasswordLess>>,
    any,
    { email: string }
  >({
    mutationFn: signInPasswordLess,
    ...options,
  });
}

export function useSignIn(options?: any) {
  return useMutation<
    Awaited<ReturnType<typeof signIn>>,
    any,
    SignInVariables
  >({
    mutationFn: signIn,
    ...options,
  });
}

export function useConfirmSignUp(options?: any) {
  return useMutation<
    Awaited<ReturnType<typeof confirmSignUp>>,
    any,
    ConfirmSignUpVariables
  >({
    mutationFn: confirmSignUp,
    ...options,
  });
}

export function useConfirmSignInPasswordless(options?: any) {
  return useMutation<
    Awaited<ReturnType<typeof confirmSignInPasswordless>>,
    any,
    { authUser: string; code: string }
  >({
    mutationFn: confirmSignInPasswordless,
    ...options,
  });
}

export function useResendCode(options?: any) {
  return useMutation<Awaited<ReturnType<typeof resendCode>>, any, string>({
    mutationFn: resendCode,
    ...options,
  });
}
