import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Icons } from "../ui/icons.v2";
import { useSettingsDialogState } from "./settings-dialog.state";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";

import { useShortCuts } from "./use-short-cuts";

import { useUpdateUserPrefenceMutation } from "@/domain/user/use-update-user-preference-mutation";
import { ApiKeysTab } from "./components/api-keys-tab/api-keys-tab";
import { LearnTab } from "./components/learn-tab/learn-tab";
import { LoginAndSecurityTab } from "./components/login-and-security-tab/login-and-security-tab";
import { ProfileTab } from "./components/profile-tab/profile-tab";
import { TrackingTab } from "./components/tracking-tab/tracking-tab";
import { UiTab } from "./components/ui-tab/ui-tab";

export function SettingsDialogInner({
  isOpen,
  closeSettings,
}: {
  isOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}) {
  const tab = useSettingsDialogState((state) => state.tab);
  const setCurrentTab = useSettingsDialogState((state) => state.setCurrentTab);
  const userPreferenceState = useSettingsDialogState(
    (state) => state.userPreferenceState
  ) as any;
  const setUserPreferenceState = useSettingsDialogState(
    (state) => state.setUserPreferenceState
  );

  const updateUserPreferenceMutation = useUpdateUserPrefenceMutation();

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeSettings();
        }}
        className="sm:max-w-2xl border-gray-900 bg-gray-50 dark:bg-black mt-[-100px]"
      >
        <div>
          <Tabs
            onValueChange={(value) => {
              setCurrentTab(value);
              console.log("YO", value);
            }}
            defaultValue={tab}
            className="px-0 mx-0"
          >
            <TabsList className="px-0 mx-0 space-x-4 md:space-x-8">
              <TabsTrigger
                className={cn(
                  "px-0 mx-0 space-x-2",
                  tab === "app" ? "text-white" : "text-gray-500",
                  "transition"
                )}
                value="app"
              >
                <Icons.mobile /> <span>App & Dock</span>
              </TabsTrigger>
              <TabsTrigger
                className={cn(
                  "px-0 mx-0 space-x-2",
                  tab === "tracking" ? "text-white" : "text-gray-500",
                  "transition"
                )}
                value="tracking"
              >
                {tab === "tracking" ? (
                  <Icons.verticalStackSolid />
                ) : (
                  <Icons.verticalStack />
                )}
                <span>Tracking</span>
              </TabsTrigger>
              <TabsTrigger
                className={cn(
                  "px-0 mx-0 space-x-2",
                  tab === "learn" ? "text-white" : "text-gray-500",
                  "transition"
                )}
                value="learn"
              >
                {tab === "learn" ? <Icons.brain /> : <Icons.glassesRound />}
                <span>Learn</span>
              </TabsTrigger>
              <TabsTrigger
                className={cn(
                  "px-0 mx-0 space-x-2",
                  tab === "api-keys" ? "text-white" : "text-gray-500",
                  "transition"
                )}
                value="api-keys"
              >
                {tab === "api-keys" ? <Icons.lockSolid /> : <Icons.lock />}
                <span>API Keys</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-8">
              <ProfileTab />
            </TabsContent>
            <TabsContent value="account" className="mt-8">
              <LoginAndSecurityTab />
            </TabsContent>
            <TabsContent value="tracking" className="mt-8">
              <TrackingTab />
            </TabsContent>
            <TabsContent value="learn" className="mt-8">
              <LearnTab />
            </TabsContent>
            <TabsContent value="api-keys" className="mt-8">
              <ApiKeysTab />
            </TabsContent>
            <TabsContent value="app" className="mt-8">
              <UiTab />
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              closeSettings();
            }}
          >
            Close Settings
          </Button>
          <Button
            type="submit"
            onClick={() => {
              updateUserPreferenceMutation.mutate(userPreferenceState);
              closeSettings();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function isEditingContent(event: any) {
  let element = event.target;
  let tagName = element.tagName;
  return (
    element.isContentEditable ||
    tagName === "INPUT" ||
    tagName === "SELECT" ||
    tagName === "TEXTAREA"
  );
}

function useDocSearchKeyboardEvents({ isOpen, onOpen, onClose }: any) {
  useEffect(() => {
    function onKeyDown(event: any) {
      function open() {
        // We check that no other DocSearch modal is showing before opening
        // another one.
        if (!document.body.classList.contains("DocSearch--active")) {
          onOpen();
        }
      }

      if (
        (event.keyCode === 27 && isOpen) ||
        (event.key === "s" && (event.metaKey || event.ctrlKey)) ||
        (!isEditingContent(event) && event.key === "/" && !isOpen)
      ) {
        event.preventDefault();

        if (isOpen) {
          onClose();
        } else if (!document.body.classList.contains("DocSearch--active")) {
          open();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onOpen, onClose]);
}

export function SettingsDialog() {
  const [query, setQuery] = useState("");

  const { data: authUser, isLoading } = useCurrentAuthUser({});

  const isOpen = useSettingsDialogState((state) => state.isOpen);
  const setOpen = useSettingsDialogState((state) => state.setIsOpen);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
  });

  useShortCuts();

  // if (!authUser) {
  //   return null;
  // }

  return (
    <div>
      <SettingsDialogInner
        isOpen={isOpen}
        openSettings={onOpen}
        closeSettings={onClose}
      />
    </div>
  );
}
