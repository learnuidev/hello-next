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

export function LearnTab() {
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
          <CardTitle>Learning Mode</CardTitle>
          <CardDescription className="text-gray-500 font-extralight">
            Select your preferred learning method
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                checked={userPreferenceState.learningMode === "nmm"}
                onCheckedChange={(event) => {
                  setUserPreferenceState({ learningMode: "nmm" });
                  if (event) {
                    setMode("nmm");
                  } else {
                    setMode("");
                  }
                }}
              />
              <Label htmlFor="airplane-mode">Nomad Method Blueprint</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Based on Nomad Method Blueprint Curriculum
            </p>
          </div>
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                checked={userPreferenceState.learningMode === "hsk"}
                onCheckedChange={(event) => {
                  const learningMode = "hsk";
                  if (event) {
                    setMode(learningMode);
                    setUserPreferenceState({ learningMode });
                  } else {
                    setMode("");
                    setUserPreferenceState({ learningMode: "nmm" });
                  }
                }}
              />
              <Label htmlFor="airplane-mode">HSK</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Great for HSK Exam Preparation (Recommended)
            </p>
          </div>
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                checked={userPreferenceState.learningMode === "hsk3"}
                onCheckedChange={(event) => {
                  const learningMode = "hsk3";
                  if (event) {
                    setMode(learningMode);
                    setUserPreferenceState({ learningMode });
                  } else {
                    setMode("");
                    setUserPreferenceState({ learningMode: "nmm" });
                  }
                }}
              />
              <Label htmlFor="airplane-mode">HSK 3.0</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              For HSK 3.0 Exam Preparation
            </p>
          </div>
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                checked={mode === "yct"}
                onCheckedChange={(event) => {
                  const learningMode = "yct";
                  if (event) {
                    setMode(learningMode);
                    setUserPreferenceState({ learningMode });
                  } else {
                    setMode("");
                    setUserPreferenceState({ learningMode: "nmm" });
                  }
                }}
              />
              <Label htmlFor="airplane-mode">YCT</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Great for Youth Chinese Test Preparation
            </p>
          </div>
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                checked={mode === "xiaoma"}
                onCheckedChange={(event) => {
                  const learningMode = "xiaoma";
                  if (event) {
                    setMode(learningMode);
                    setUserPreferenceState({ learningMode });
                  } else {
                    setMode("");
                    setUserPreferenceState({ learningMode: "nmm" });
                  }
                }}
              />
              <Label htmlFor="airplane-mode">Speak</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Focuses on Speaking Chinese Components
            </p>
            {/* <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Based on Street Mandarin by Xiaoma (Focuses on Speaking Chinese)
            </p> */}
          </div>
        </CardContent>
      </Card>
      <Card className="rounded border-black shadow-sm  transition bg-[#0b0b0f]">
        <CardHeader>
          <CardTitle>UI Settings</CardTitle>
          <CardDescription className="text-gray-500 font-extralight">
            Change your UI Settings
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div>
            <div className="flex z-50 items-center space-x-2">
              <Checkbox
                checked={userPreferenceState.showNavbar}
                onCheckedChange={(event) => {
                  setUserPreferenceState({
                    showNavbar: !userPreferenceState.showNavbar,
                  });
                }}
              />
              <Label htmlFor="airplane-mode">Display Navbar</Label>
            </div>

            <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
              Show or hide navbar
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
