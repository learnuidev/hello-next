"use client";

import {
  AuthAlert,
  AuthButton,
  AuthField,
  AuthShell,
  normalizeEmail,
  validateEmail,
} from "@/components/auth";
import { useSignIn } from "@/domain/auth/auth.mutations";
import { queryIds as authQueryIds } from "@/domain/auth/queryIds";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

/**
 * Cognito returns a handful of deliberately vague messages. Map them onto copy
 * that tells the user what to do next without leaking account existence.
 */
function getSignInError(error: unknown) {
  const message = (error as { message?: string })?.message ?? "";

  if (/not confirmed|not verified/i.test(message)) {
    return {
      text: "This account still needs to be verified. Enter the code we emailed you to finish signing up.",
      needsVerification: true,
    };
  }

  if (/password attempts exceeded|too many/i.test(message)) {
    return {
      text: "Too many attempts. Please wait a moment and try again.",
      needsVerification: false,
    };
  }

  if (
    /incorrect username or password|user does not exist|invalid/i.test(message)
  ) {
    return {
      text: "Incorrect email or password. Please check your details and try again.",
      needsVerification: false,
    };
  }

  return {
    text: message || "We couldn't sign you in. Please try again.",
    needsVerification: false,
  };
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    text: string;
    needsVerification: boolean;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string | null;
    password?: string | null;
  }>({});

  const routeName = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const signInMutation = useSignIn({
    onSuccess: (data: any) => {
      setError(null);

      queryClient.invalidateQueries({
        queryKey: [authQueryIds?.currentAuthUser],
      });

      if (routeName === "/login") {
        router.push("/");
      }
    },
    onError: (err: any) => {
      console.error("error signing in", err);
      setError(getSignInError(err));
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = {
      email: validateEmail(email),
      password: password ? null : "Enter your password.",
    };

    setFieldErrors(nextErrors);
    setError(null);

    if (nextErrors.email || nextErrors.password) return;

    signInMutation.mutate({ username: normalizeEmail(email), password });
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to Mandarino"
      description="Pick up where you left off — your characters, reviews and lessons are waiting."
      footer={
        <>
          <span className="text-gray-500 dark:text-gray-400">
            New to Mandarino?{" "}
          </span>
          <Link
            href="/register"
            className="font-semibold text-rose-600 transition hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {error ? (
          <AuthAlert variant="error">
            <p>{error.text}</p>
            {error.needsVerification ? (
              <Link
                href="/register"
                className="inline-flex items-center gap-1 font-semibold underline decoration-rose-300 underline-offset-2 transition hover:decoration-rose-500"
              >
                Resend verification code
                <ArrowRight className="h-3 w-3" />
              </Link>
            ) : null}
          </AuthAlert>
        ) : null}

        <AuthField
          id="login-email"
          label="Email address"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (fieldErrors.email) {
              setFieldErrors((current) => ({ ...current, email: null }));
            }
          }}
          icon={<Mail />}
          error={fieldErrors.email}
          disabled={signInMutation.isPending}
        />

        <AuthField
          id="login-password"
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (fieldErrors.password) {
              setFieldErrors((current) => ({ ...current, password: null }));
            }
          }}
          icon={<Lock />}
          error={fieldErrors.password}
          disabled={signInMutation.isPending}
        />

        <AuthButton
          type="submit"
          loading={signInMutation.isPending}
          loadingText="Signing in…"
          icon={<ArrowRight className="h-4 w-4" />}
        >
          Sign in
        </AuthButton>
      </form>
    </AuthShell>
  );
}
