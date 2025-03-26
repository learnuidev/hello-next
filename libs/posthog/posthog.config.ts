interface PosthogConfig {
  apiKey: string;
  apiHost: string;
}

export const posthogConfig = {
  apiKey: process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
  apiHost: process.env.NEXT_PUBLIC_API_HOST,
} as PosthogConfig;
