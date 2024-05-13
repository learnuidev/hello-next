import { Fragment, useState, useEffect, useCallback, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
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

export function DialogDemo({
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
        className="sm:max-w-4xl"
      >
        <DialogHeader>
          <DialogTitle>Accounts & Settings</DialogTitle>
        </DialogHeader>
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
                <Icons.verticalStack /> <span>Tracking</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">Accounts and Credentails</TabsContent>
            <TabsContent value="tracking">Tracking Changes</TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
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

  return (
    <div>
      <DialogDemo
        isOpen={isOpen}
        openSettings={onOpen}
        closeSettings={onClose}
      />
    </div>
  );
}
