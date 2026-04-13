import { useFeatureFlagEnabled } from "posthog-js/react";
import { posthogFeatureFlags } from "../posthog-feature-flags";

export const useIsHomePageEnabled = () => {
  const isNewContentEnabled = useFeatureFlagEnabled(
    posthogFeatureFlags.newHomePage,
  );

  return isNewContentEnabled;
};
