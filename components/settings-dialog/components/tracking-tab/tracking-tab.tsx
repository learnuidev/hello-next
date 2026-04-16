import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import { useSettingsDialogState } from "../../settings-dialog.state";

export function TrackingTab() {
  const tab = useSettingsDialogState((state) => state.tab);
  const setCurrentTab = useSettingsDialogState((state) => state.setCurrentTab);
  const userPreferenceState = useSettingsDialogState(
    (state) => state.userPreferenceState,
  ) as any;
  const setUserPreferenceState = useSettingsDialogState(
    (state) => state.setUserPreferenceState,
  );

  return (
    <>
      <Card className="rounded border-gray-100 dark:border-black dark:bg-[#0b0b0f] shadow-sm  transition ">
        <CardHeader>
          <CardTitle>Tracking</CardTitle>
          <CardDescription className="text-gray-500 font-extralight">
            Manage your tracking here
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                id="navigation"
                checked={Boolean(userPreferenceState.isNavigationEnabled)}
                onCheckedChange={(event) => {
                  setUserPreferenceState({
                    isNavigationEnabled: event,
                  });
                }}
              />
              <Label htmlFor="airplane-mode">Navigation</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Track navigation through out the app
            </p>
          </div>
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                id="content-tracking"
                checked={Boolean(userPreferenceState.isContentTrackingEnabled)}
                onCheckedChange={(event) => {
                  setUserPreferenceState({
                    isContentTrackingEnabled: event,
                  });
                }}
              />
              <Label htmlFor="airplane-mode">Content</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Track the content you&apos;ve learned
            </p>
          </div>
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                id="search-tracking"
                checked={Boolean(userPreferenceState.isSearchEnabled)}
                onCheckedChange={(event) => {
                  setUserPreferenceState({
                    isSearchEnabled: event,
                  });
                }}
              />
              <Label htmlFor="airplane-mode">Search</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Track which you&apos;ve searched
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded border-gray-100 dark:border-black dark:bg-[#0b0b0f] shadow-sm  transition ">
        <CardHeader>
          <CardTitle>Auto Convert</CardTitle>
          <CardDescription className="text-gray-500 font-extralight">
            Manage automatic conversion settings
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                id="auto-conversion"
                checked={Boolean(userPreferenceState.autoConversion)}
                onCheckedChange={(event) => {
                  setUserPreferenceState({
                    autoConversion: event,
                  });
                }}
              />
              <Label htmlFor="auto-conversion">Auto Convert</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Automatically convert traditional to simplified Chinese
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
