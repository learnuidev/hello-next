import {
  ClerkProvider as _ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <_ClerkProvider>{children}</_ClerkProvider>;
}
