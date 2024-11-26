import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLearningModeStore } from "@/components/settings-dialog/learning-mode.store";
import { Checkbox } from "@/components/ui/checkbox";
import { useSettingsDialogState } from "../../settings-dialog.state";

export function UiTab() {
  const setMode = useLearningModeStore((state: any) => state.setMode);
  const mode = useLearningModeStore((state: any) => state.mode);

  const userPreferenceState = useSettingsDialogState(
    (state) => state.userPreferenceState
  ) as any;
  const setUserPreferenceState = useSettingsDialogState(
    (state) => state.setUserPreferenceState
  );

  return (
    <div className="space-y-4">
      <Card className="rounded border-black shadow-sm  transition bg-[#0b0b0f]">
        <CardHeader>
          <CardTitle>App & Dock</CardTitle>
          <CardDescription className="text-gray-500 font-extralight">
            Change your App & Dock display settings
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                checked={userPreferenceState.automaticallyShowAndHideDock}
                onCheckedChange={(event) => {
                  setUserPreferenceState({
                    automaticallyShowAndHideDock:
                      !userPreferenceState.automaticallyShowAndHideDock,
                  });
                }}
              />
              <Label htmlFor="airplane-mode">The Dock</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Automatically hide and show the Dock
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
