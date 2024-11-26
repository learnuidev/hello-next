import { useSettingsDialogState } from "@/components/settings-dialog/settings-dialog.state";
import { useGetUserPreferenceQuery } from "@/domain/user/use-get-user-preference-query";

export const useShowAutomaticallyTheDock = () => {
  const userPreferenceState = useSettingsDialogState(
    (state) => state.userPreferenceState
  ) as any;

  const { data } = useGetUserPreferenceQuery();

  return data?.automaticallyShowAndHideDock !==
    userPreferenceState?.automaticallyShowAndHideDock
    ? userPreferenceState?.automaticallyShowAndHideDock
    : data?.automaticallyShowAndHideDock;
};
