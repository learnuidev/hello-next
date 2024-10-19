import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { useSettingsDialogState } from "./settings-dialog.state";
import { Icons } from "../ui/icons.v2";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../input";
import { Checkbox } from "../ui/checkbox";

import { useCurrentAuthUser } from "@/domain/auth/auth.queries";

import { useShortCuts } from "./use-short-cuts";

import { ApiKeysTab } from "./components/api-keys-tab";
import { LearnTab } from "./components/learn-tab";

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

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeSettings();
        }}
        className="sm:max-w-2xl border-gray-900 bg-black mt-[-100px]"
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
                  tab === "profile" ? "text-white" : "text-gray-500",
                  "transition"
                )}
                value="profile"
              >
                {tab === "profile" ? <Icons.userSolid /> : <Icons.user />}

                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger
                className={cn(
                  "px-0 mx-0 space-x-2",
                  tab === "account" ? "text-white" : "text-gray-500",
                  "transition"
                )}
                value="account"
              >
                <Icons.fingerPrint /> <span>Login and Security</span>
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
              <Card className="rounded border-black shadow-sm hover:shadow-blue-400 transition bg-[#0b0b0f]">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription className="text-gray-500 font-extralight">
                    Manage Your profile here
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Username"
                    className="border-gray-800 placeholder:text-gray-400"
                  />
                  <Input
                    placeholder="Email"
                    className="border-gray-800 placeholder:text-gray-400"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="account" className="mt-8">
              <Card className="rounded border-black shadow-sm hover:shadow-orange-400 transition bg-[#0b0b0f]">
                <CardHeader>
                  <CardTitle>Password Manager</CardTitle>
                  <CardDescription className="text-gray-500 font-extralight">
                    Manage Your password here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Change Password"
                    className="border-gray-800 placeholder:text-gray-400"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tracking" className="mt-8">
              <Card className="rounded border-black shadow-sm hover:shadow-green-400 transition bg-[#0b0b0f]">
                <CardHeader>
                  <CardTitle>Tracking</CardTitle>
                  <CardDescription className="text-gray-500 font-extralight">
                    Manage your tracking here
                  </CardDescription>
                </CardHeader>
                <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <div className="flex z-50 items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="airplane-mode">Navigation</Label>
                    </div>

                    <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
                      Track navigation through out the app
                    </p>
                  </div>
                  <div>
                    <div className="flex z-50 items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="airplane-mode">Content</Label>
                    </div>

                    <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
                      Track which content you&apos;ve interacted with
                    </p>
                  </div>
                  <div>
                    <div className="flex z-50 items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="airplane-mode">Search</Label>
                    </div>

                    <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
                      Track which you&apos;ve searched
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="learn" className="mt-8">
              <LearnTab />
            </TabsContent>
            <TabsContent value="api-keys" className="mt-8">
              <ApiKeysTab closeSettings={closeSettings} />
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
            Save changes
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
