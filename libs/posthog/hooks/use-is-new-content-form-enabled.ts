import { useFeatureFlagEnabled } from "posthog-js/react";
import { posthogFeatureFlags } from "../posthog-feature-flags";

export const useIsNewContentFormEnabled = () => {
  const isNewContentEnabled = useFeatureFlagEnabled(
    posthogFeatureFlags.newContentForm
  );

  return !!isNewContentEnabled;
};
