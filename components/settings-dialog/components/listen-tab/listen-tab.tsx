import { Label } from "@/components/ui/label";

import { useLearningMode } from "@/components/settings-dialog/learning-mode.store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSettingsDialogState } from "../../settings-dialog.state";
import {
  officialAudioProviders,
  useAudioProviderState,
} from "../../hooks/use-audio-provider-state";
import { Slider } from "@/components/ui/slider";
import { useListenState } from "@/app/(auth)/listen/hooks/use-listen-state";

export function ListenTab() {
  const { theme, setTheme } = useTheme();

  const userPreferenceState = useSettingsDialogState(
    (state) => state.userPreferenceState
  ) as any;
  const setUserPreferenceState = useSettingsDialogState(
    (state) => state.setUserPreferenceState
  );

  const { provider, setProvider } = useAudioProviderState();
  const { playbackRate, setPlaybackRate } = useListenState();

  return (
    <div className="space-y-4">
      <Card className="rounded border-gray-100 dark:border-black dark:bg-[#0b0b0f] shadow-sm  transition ">
        <CardHeader>
          <CardTitle>Automatic Playback</CardTitle>
          <CardDescription className="text-gray-500 font-extralight">
            Turn automatic playback on or off
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div className="flex z-50 items-center space-x-2">
            <Checkbox
              checked={userPreferenceState?.autoPlayContent}
              onCheckedChange={(event) => {
                setUserPreferenceState({
                  autoPlayContent: !userPreferenceState?.autoPlayContent
                    ? true
                    : false,
                });
                // setUserPreferenceState
                // setProvider(providerItem.id);
              }}
            />
            <Label htmlFor="airplane-mode">
              {userPreferenceState?.autoPlayContent ? "Enabled" : "Disabled"}
            </Label>
          </div>
        </CardContent>
      </Card>
      <Card className="rounded border-gray-100 dark:border-black dark:bg-[#0b0b0f] shadow-sm  transition ">
        <CardHeader>
          <CardTitle>Audio Provider</CardTitle>
          <CardDescription className="text-gray-500 font-extralight">
            Set your AI audio provider
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
          {officialAudioProviders.map((providerItem) => (
            <div key={providerItem.id}>
              <div className="flex z-50 items-center space-x-2">
                <Checkbox
                  checked={provider === providerItem.id}
                  onCheckedChange={(event) => {
                    setProvider(providerItem.id);
                  }}
                />
                <Label htmlFor="airplane-mode">{providerItem.title}</Label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="rounded border-gray-100 dark:border-black dark:bg-[#0b0b0f] shadow-sm  transition ">
        <CardHeader>
          <CardTitle>Playback Speed</CardTitle>
          <CardDescription className="text-gray-500 font-extralight">
            Select your desired audio playback speed.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
          {/* <Slider
            className="mt-4"
            min={0.5}
            max={2.5}
            value={[playbackRate]}
            step={0.1}
            onValueChange={(value) => {
              setPlaybackRate(value[0]);
            }}
          /> */}

          <Slider
            className="mt-4"
            min={0.5}
            max={2}
            value={[playbackRate]}
            step={0.1}
            onValueChange={(value) => {
              setPlaybackRate(value[0]);
            }}
          />

          <p className="text-4xl">{playbackRate}x</p>
        </CardContent>
      </Card>
    </div>
  );
}
