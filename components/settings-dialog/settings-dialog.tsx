import { Fragment, useState, useEffect, useCallback, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSettingsDialogState } from "./settings-dialog.state";
import { Icons } from "../ui/icons.v2";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../input";
import { Checkbox } from "../ui/checkbox";
import { useLearningModeStore } from "./learning-mode.store";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useRouter } from "next/navigation";

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

  const setMode = useLearningModeStore((state: any) => state.setMode);
  const mode = useLearningModeStore((state: any) => state.mode);

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeSettings();
        }}
        className="sm:max-w-2xl border-gray-900 bg-black mt-[-100px]"
      >
        {/* <DialogHeader className="mb-0 pb-0 flex">
          <DialogTitle>Accounts & Settings</DialogTitle>
        </DialogHeader> */}

        {/* <h1 className="mb-0">Accounts & Settings</h1> */}
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
            </TabsList>
            <TabsContent value="profile" className="mt-8 h-52">
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
            <TabsContent value="account" className="mt-8 h-52">
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
            <TabsContent value="tracking" className="mt-8 h-52">
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
            <TabsContent value="learn" className="mt-8 h-52">
              <Card className="rounded border-black shadow-sm hover:shadow-green-400 transition bg-[#0b0b0f]">
                <CardHeader>
                  <CardTitle>Learn</CardTitle>
                  <CardDescription className="text-gray-500 font-extralight">
                    Select your preferred learning method
                  </CardDescription>
                </CardHeader>
                <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <div className="flex z-50 items-center space-x-2">
                      <Checkbox
                        checked={mode === "nmm"}
                        onCheckedChange={(event) => {
                          if (event) {
                            setMode("nmm");
                          } else {
                            setMode("");
                          }
                        }}
                      />
                      <Label htmlFor="airplane-mode">Mandarin Blueprint</Label>
                    </div>

                    <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
                      Based on Mandarin Blueprint Curriculum
                    </p>
                  </div>
                  <div>
                    <div className="flex z-50 items-center space-x-2">
                      <Checkbox
                        checked={mode === "hsk"}
                        onCheckedChange={(event) => {
                          if (event) {
                            setMode("hsk");
                          } else {
                            setMode("");
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
                        checked={mode === "xiaoma"}
                        onCheckedChange={(event) => {
                          if (event) {
                            setMode("xiaoma");
                          } else {
                            setMode("");
                          }
                        }}
                      />
                      <Label htmlFor="airplane-mode">Xiaoma</Label>
                    </div>

                    <p className="text-gray-400 font-extralight text-[10px] mt-[2px]">
                      Based on Street Mandarin by Xiaoma (Focuses on Speaking
                      Chinese)
                    </p>
                  </div>
                </CardContent>
              </Card>
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

function useLearnModeEvents() {
  const setMode = useLearningModeStore((state: any) => state.setMode);
  const mode = useLearningModeStore((state: any) => state.mode);

  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: any) {
      if (event.key === "h" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMode("hsk");
      }
      if (["m"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMode("nmm");
      }
      if (["x"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMode("xiaoma");
      }
      if (["i"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/insights");
      }
      if (["o"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/");
      }
      if (["r"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/review");
      }
      if (["l"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/timeline");
      }
      if (["p"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/pinyin");
      }
      if (["e"]?.includes(event.key) && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        router.push("/convos");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mode, setMode]);
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

  useLearnModeEvents();

  if (!authUser) {
    return null;
  }

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
