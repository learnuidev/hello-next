"use client";

import {
  AuthAlert,
  AuthButton,
  AuthField,
  AuthShell,
  normalizeEmail,
  validateEmail,
  validateNewPassword,
} from "@/components/auth";
import {
  useConfirmSignUp,
  useResendCode,
  useSignUp,
} from "@/domain/auth/auth.mutations";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, KeyRound, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";

type Step = "register" | "confirm";

const RESEND_COOLDOWN_SECONDS = 30;

/** Three-bar password strength meter — advisory only, the server enforces policy. */
function getPasswordStrength(password: string) {
  if (!password) return { score: 0, label: "" };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) score += 1;

  const normalized = Math.min(3, Math.ceil(score * 0.75));

  return {
    score: normalized,
    label: ["Too short", "Weak", "Good", "Strong"][normalized] ?? "",
  };
}

function getConfirmError(error: unknown) {
  const message = (error as { message?: string })?.message ?? "";

  if (/code mismatch|invalid verification code|invalid code/i.test(message)) {
    return "That code doesn't match. Double-check the 6 digits and try again.";
  }

  if (/expired/i.test(message)) {
    return "That code has expired. Send yourself a fresh one.";
  }

  if (/attempts|too many/i.test(message)) {
    return "Too many incorrect attempts. Please request a new code.";
  }

  return message || "We couldn't verify that code. Please try again.";
}

export function Register() {
  const [step, setStep] = useState<Step>("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  /** Set when signup collided with an existing, still-unverified account. */
  const [unverifiedAccount, setUnverifiedAccount] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((value) => (value <= 1 ? 0 : value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const resendCodeMutation = useResendCode({
    onSuccess: () => {
      setStep("confirm");
      setFormError(null);
      setNotice("A new code is on its way — it should arrive within a minute.");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    },
    onError: (err: any) => {
      setFormError(
        /already confirmed|already verified/i.test(err?.message ?? "")
          ? "This account is already verified — you can sign in instead."
          : err?.message || "We couldn't resend the code. Please try again.",
      );
    },
  });

  const confirmSignUpMutation = useConfirmSignUp({
    onSuccess: () => {
      // Full reload so the Cognito session and server components start clean.
      window.location.href = "/login";
    },
    onError: (err: any) => {
      setCodeError(getConfirmError(err));
    },
  });

  const signUpMutation = useSignUp({
    onSuccess: () => {
      setFormError(null);
      setCode("");
      setStep("confirm");
      setNotice(
        "Your verification code is on its way — it should arrive within a minute.",
      );
      setCooldown(RESEND_COOLDOWN_SECONDS);
    },
    onError: (err: any) => {
      const message: string = err?.message ?? "";

      if (/already exists/i.test(message)) {
        setUnverifiedAccount(true);
        setFormError(
          "An account with this email already exists. If you haven't verified it yet, send yourself a new code.",
        );
        return;
      }

      if (/password/i.test(message)) {
        setPasswordError(message);
        return;
      }

      if (/email|username/i.test(message)) {
        setEmailError(message);
        return;
      }

      setFormError(
        message || "We couldn't create your account. Please try again.",
      );
    },
  });

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailValidation = validateEmail(email);
    const passwordValidation = validateNewPassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setFormError(null);
    setNotice(null);
    setUnverifiedAccount(false);

    if (emailValidation || passwordValidation) return;

    const normalizedEmail = normalizeEmail(email);
    setEmail(normalizedEmail);

    signUpMutation.mutate({
      username: normalizedEmail,
      password,
      email: normalizedEmail,
    });
  };

  const handleConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCodeError(null);
    setFormError(null);

    const trimmedCode = code.trim();

    if (trimmedCode.length < 4) {
      setCodeError("Enter the full code from your email.");
      return;
    }

    confirmSignUpMutation.mutate({ username: email, code: trimmedCode });
  };

  const handleResend = () => {
    if (cooldown > 0 || resendCodeMutation.isPending) return;

    setCodeError(null);
    setFormError(null);
    resendCodeMutation.mutate(email);
  };

  const backToRegister = () => {
    setStep("register");
    setCode("");
    setCodeError(null);
    setFormError(null);
    setNotice(null);
    setUnverifiedAccount(false);
    setCooldown(0);
  };

  if (step === "confirm") {
    return (
      <AuthShell
        size="compact"
        eyebrow="Almost there"
        title="Verify your email"
        description={
          <>
            Enter the code we sent to{" "}
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {email}
            </span>
            . It may take a minute to arrive.
          </>
        }
        footer={
          <button
            type="button"
            onClick={backToRegister}
            className="inline-flex items-center gap-1.5 font-medium text-gray-500 transition hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Use a different email
          </button>
        }
      >
        <form onSubmit={handleConfirm} className="space-y-5" noValidate>
          {notice ? <AuthAlert variant="success">{notice}</AuthAlert> : null}
          {formError ? (
            <AuthAlert variant="error">
              <p>{formError}</p>
              {/already verified/i.test(formError) ? (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 font-semibold underline decoration-rose-300 underline-offset-2 transition hover:decoration-rose-500"
                >
                  Go to sign in
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ) : null}
            </AuthAlert>
          ) : null}

          <AuthField
            id="register-code"
            label="Verification code"
            name="code"
            type="text"
            placeholder="123456"
            autoComplete="one-time-code"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={8}
            required
            value={code}
            onChange={(event) => {
              setCode(event.target.value.replace(/[^0-9]/g, ""));
              if (codeError) setCodeError(null);
            }}
            error={codeError}
            className="text-center font-mono text-base tracking-[0.45em] placeholder:tracking-[0.45em] placeholder:text-gray-300"
            disabled={confirmSignUpMutation.isPending}
          />

          <AuthButton
            type="submit"
            loading={confirmSignUpMutation.isPending}
            loadingText="Verifying…"
            icon={<Check className="h-4 w-4" />}
          >
            Verify email
          </AuthButton>

          <div className="flex items-center justify-center gap-1.5 pt-1 text-[13px] text-gray-500 dark:text-gray-400">
            <span>Didn&apos;t get it?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || resendCodeMutation.isPending}
              className={cn(
                "font-semibold transition",
                cooldown > 0 || resendCodeMutation.isPending
                  ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                  : "text-rose-600 hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300",
              )}
            >
              {resendCodeMutation.isPending
                ? "Sending…"
                : cooldown > 0
                  ? `Resend in ${cooldown}s`
                  : "Send a new code"}
            </button>
          </div>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      description="Start learning Chinese with the characters and stories you actually care about."
      footer={
        <>
          <span className="text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
          </span>
          <Link
            href="/login"
            className="font-semibold text-rose-600 transition hover:text-rose-500 dark:text-rose-400 dark:hover:text-rose-300"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleRegister} className="space-y-5" noValidate>
        {formError ? (
          <AuthAlert
            variant="error"
            action={
              unverifiedAccount ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCodeMutation.isPending}
                  className="whitespace-nowrap rounded-md border border-rose-300/70 bg-white px-2.5 py-1 text-[12px] font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-500/30 dark:bg-transparent dark:text-rose-300 dark:hover:bg-rose-500/10"
                >
                  {resendCodeMutation.isPending ? "Sending…" : "Send code"}
                </button>
              ) : null
            }
          >
            <p>{formError}</p>
            {unverifiedAccount ? (
              <Link
                href="/login"
                className="inline-block font-semibold underline decoration-rose-300 underline-offset-2 transition hover:decoration-rose-500"
              >
                Or sign in instead
              </Link>
            ) : null}
          </AuthAlert>
        ) : null}

        <AuthField
          id="register-email"
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
            if (emailError) setEmailError(null);
          }}
          icon={<Mail />}
          error={emailError}
          disabled={signUpMutation.isPending}
        />

        <div>
          <AuthField
            id="register-password"
            label="Password"
            type="password"
            name="password"
            placeholder="Create a password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (passwordError) setPasswordError(null);
            }}
            icon={<Lock />}
            error={passwordError}
            disabled={signUpMutation.isPending}
            hint={
              password ? undefined : "Use at least 8 characters, with a mix of letters and numbers."
            }
          />

          {password ? (
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex h-1 flex-1 gap-1" aria-hidden>
                {[0, 1, 2].map((index) => (
                  <span
                    key={index}
                    className={cn(
                      "h-full flex-1 rounded-full transition-colors",
                      index < strength.score
                        ? strength.score === 1
                          ? "bg-rose-400"
                          : strength.score === 2
                            ? "bg-amber-400"
                            : "bg-emerald-500"
                        : "bg-gray-200 dark:bg-gray-800",
                    )}
                  />
                ))}
              </div>
              <span
                className={cn(
                  "w-16 text-right text-[12px] font-medium",
                  strength.score === 1
                    ? "text-rose-500"
                    : strength.score === 2
                      ? "text-amber-500"
                      : "text-emerald-600 dark:text-emerald-400",
                )}
              >
                {strength.label}
              </span>
            </div>
          ) : null}
        </div>

        <AuthButton
          type="submit"
          loading={signUpMutation.isPending}
          loadingText="Creating account…"
          icon={<ArrowRight className="h-4 w-4" />}
        >
          Create account
        </AuthButton>

        <div className="flex items-start gap-2 rounded-lg bg-gray-50 px-3.5 py-3 text-[12px] leading-relaxed text-gray-500 dark:bg-gray-900/50 dark:text-gray-400">
          <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <p>
            We&apos;ll email you a one-time code to confirm it&apos;s really you.
            No password is stored anywhere else.
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
