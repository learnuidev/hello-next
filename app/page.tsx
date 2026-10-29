import { LandingPage } from "@/components/landing-page/landing-page";

/**
 * `/` is the public landing page.
 *
 * Logged-in visitors never actually see it: <Authenticated> (in the root
 * layout) owns the auth gate and hands them to `/convos`. Keeping the redirect
 * out of here means a logged-out visitor is never pushed into an app route.
 */
export default function Home() {
  return <LandingPage />;
}
