import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import { UserCredential } from "../hooks/use-list-user-credentials-query";
import { useAddUserCredentialMutation } from "../hooks/use-add-user-credential-mutation";

import { useState } from "react";
import { Input } from "@/components/input";
import { Label } from "@radix-ui/react-label";
import { AddApiKeySuccessDialog } from "./add-api-key-success-dialog";

export function AddApiKeyDialog({
  isOpen,

  closeAddDialog,
  closeSettings,
}: {
  isOpen: boolean;
  closeAddDialog: () => void;
  closeSettings: () => void;
}) {
  const [title, setTitle] = useState("");
  const addUserCredentialMutation = useAddUserCredentialMutation();
  const [addCredentials, setAddCredentials] = useState<{
    apiKey?: string;
    apiSecret: string;
  } | null>(null);

  return (
    <>
      <AddApiKeySuccessDialog
        isOpen={Boolean(addCredentials)}
        apiSecret={addCredentials?.apiSecret || ""}
        apiKey={addCredentials?.apiKey || ""}
        closeAddDialog={() => {
          setAddCredentials(null);
          closeSettings();
        }}
      />

      <Dialog open={isOpen}>
        <DialogContent
          onClick={() => {
            closeAddDialog();
          }}
          className="sm:max-w-2xl border-gray-900 bg-black mt-[-100px]"
        >
          <div>
            <Card className="rounded border-black shadow-sm transition bg-[#0b0b0f] p-8">
              <CardHeader>
                <CardTitle>Create new secret key</CardTitle>
                <CardDescription className="text-gray-500 font-extralight">
                  <p>
                    {`This API key is tied to your user and can make requests against the selected project. If you are removed from the organization or project, this key will be disabled.`}
                  </p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label className="text-gray-400">
                    Name{" "}
                    <span className="text-gray-500 ml-[2px]">Optional</span>
                  </Label>
                  <Input
                    value={title}
                    placeholder="My test key"
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                    className="border-gray-800 placeholder:text-gray-400"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <div className="space-x-4 px-4">
              <Button
                onClick={() => {
                  closeAddDialog();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="rounded-full hover:border-orange-400"
                // className="bg-green-600 hover:bg-green-700 rounded"
                onClick={() => {
                  addUserCredentialMutation
                    .mutateAsync({
                      title: title || `Secret-Key-${Date.now()}`,
                    })
                    .then(({ apiKey, apiSecret }: UserCredential) => {
                      closeAddDialog();
                      setAddCredentials({ apiKey, apiSecret });
                      setTitle("");

                      toast(`User credentials successfully added`);
                    });
                }}
              >
                {addUserCredentialMutation?.isLoading
                  ? "Creating..."
                  : "Create secret key"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
