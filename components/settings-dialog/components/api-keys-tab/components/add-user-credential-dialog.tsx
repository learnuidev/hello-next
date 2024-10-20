import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { UserCredential } from "@/components/settings-dialog/hooks/use-list-user-credentials-query";
import { useAddUserCredentialMutation } from "@/components/settings-dialog/hooks/use-add-user-credential-mutation";

import { useState } from "react";
import { Input } from "@/components/input";
import { Label } from "@radix-ui/react-label";
import { AddUserCredentialSuccessDialog } from "./add-user-credential-success-dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { PermissionItem } from "./permission-item";
import {
  defaultPermissionType,
  isNoneOnlyScope,
  noneOnlyScopes,
  permissionsList,
  permissionTypes,
} from "../constants/permissions-list";
import { getScopes } from "../utils/get-scopes";
import { getName } from "../utils/get-name";

export function AddUserCredentialDialog({
  isOpen,

  closeAddDialog,
  closeSettings,
}: {
  isOpen: boolean;
  closeAddDialog: () => void;
  closeSettings: () => void;
}) {
  const [title, setTitle] = useState("");
  const [permissionType, setPermissionType] = useState(defaultPermissionType);
  const [scopes, setScopes] = useState<string[]>(noneOnlyScopes);
  const addUserCredentialMutation = useAddUserCredentialMutation();
  const [addCredentials, setAddCredentials] = useState<{
    apiKey?: string;
    apiSecret: string;
  } | null>(null);

  const manageScope = (scopeId: string) => {
    setScopes((prevScopes) => {
      const initialScopeId = scopeId?.split(".")[0];

      if (prevScopes?.includes(scopeId)) {
        return prevScopes?.filter((item) => item !== scopeId);
      }

      const exists = prevScopes?.filter((scope) =>
        scope?.includes(initialScopeId)
      );

      if (exists?.length) {
        return prevScopes
          ?.filter((item) => !exists?.includes(item))
          .concat(scopeId);
      }
      return prevScopes.concat(scopeId);
    });
  };

  const resetState = () => {
    setTitle("");
    setScopes(noneOnlyScopes);
    setPermissionType(defaultPermissionType);
  };

  return (
    <>
      <AddUserCredentialSuccessDialog
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
          className="sm:max-w-2xl border-gray-900 bg-black mt-[-100px] p-8"
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
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">
                      <span className="font-bold"> Name </span>
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
                  <div className="space-y-2">
                    <Label className="text-gray-300">
                      <span className="font-bold"> Permissions </span>
                    </Label>

                    <Tabs
                      defaultValue={permissionType}
                      onValueChange={(value) => {
                        setPermissionType(value);
                      }}
                    >
                      <TabsList className="grid grid-cols-5">
                        {permissionTypes?.map((permissionType) => {
                          return (
                            <TabsTrigger
                              key={permissionType.id}
                              className="data-[state=active]:bg-rose-500 data-[state=active]:rounded data-[state=inactive]:bg-gray-900 "
                              value={permissionType.id}
                            >
                              {permissionType.title}
                            </TabsTrigger>
                          );
                        })}
                      </TabsList>
                      <TabsContent value="restricted">
                        <div className="flex justify-between items-center uppercase text-[10px] text-gray-200 font-semibold mt-2">
                          <h3> Resources </h3>

                          <p> Permissions </p>
                        </div>

                        <ScrollArea className="block space-y-6 h-[300px] rounded-md">
                          <div className="space-y-2">
                            {permissionsList?.map((permission) => {
                              if (permission?.enabled) {
                                return null;
                              }

                              return (
                                <PermissionItem
                                  key={permission.description}
                                  title={permission.title}
                                  description={permission.description}
                                  onSelectedScope={(id) => {
                                    manageScope(id);
                                    console.log("TODO");
                                  }}
                                  selectedScopes={scopes}
                                  scopesList={permission.scopesList}
                                  endpointsList={permission.endpointsList}
                                />
                              );
                            })}
                          </div>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <div className="space-x-4">
              <Button
                onClick={() => {
                  closeAddDialog();
                }}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="rounded-full hover:border-rose-400"
                disabled={
                  permissionType === "restricted" &&
                  scopes?.every((scope) => isNoneOnlyScope(scope))
                }
                onClick={() => {
                  addUserCredentialMutation
                    .mutateAsync({
                      title: title || getName(permissionType),
                      scopes: getScopes(permissionType, scopes),
                      permissionType,
                    })
                    .then(({ apiKey, apiSecret }: UserCredential) => {
                      closeAddDialog();
                      setAddCredentials({ apiKey, apiSecret });
                      resetState();

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
