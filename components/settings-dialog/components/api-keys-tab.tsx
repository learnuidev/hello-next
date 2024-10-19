import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

import {
  useListUserCredentialsQuery,
  UserCredential,
} from "../hooks/use-list-user-credentials-query";
import { useAddUserCredentialMutation } from "../hooks/use-add-user-credential-mutation";
import { Icons } from "@/components/ui/icons.v2";
import { useDeleteUserCredentialMutation } from "../hooks/use-delete-user-credential-mutation";
import { useState } from "react";
import { Input } from "@/components/input";
import { Label } from "@radix-ui/react-label";

function formatDate(timestamp: number) {
  const formattedDate = format(timestamp, "MMM d, yyyy");
  return formattedDate;
}

function DeleteApiKeyDialog({
  isOpen,
  apiKeyId,
  closeDeleteDialog,
}: {
  isOpen: boolean;
  apiKeyId?: string;
  closeDeleteDialog: () => void;
}) {
  const { data: userCredentials, isError } = useListUserCredentialsQuery();
  const deleteUserCredentialMutation = useDeleteUserCredentialMutation();

  const credential = userCredentials?.find(
    (credential) => credential?.id === apiKeyId
  );
  return (
    <Dialog open={isOpen}>
      <DialogContent
        onClick={() => {
          closeDeleteDialog();
        }}
        className="sm:max-w-2xl border-gray-900 bg-black mt-[-100px]"
      >
        <div>
          <Card className="rounded border-black shadow-sm transition bg-[#0b0b0f] p-8">
            <CardHeader>
              <CardTitle>Revoke secret key</CardTitle>
              <CardDescription className="text-gray-500 font-extralight">
                {`This API key will immediately be disabled. API requests made
                using this key will be rejected, which could cause any systems
                still depending on it to break. Once revoked, you'll no longer
                be able to view or modify this API key.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Change Password"
                value={credential?.previewApiSecret}
                className="border-gray-800 placeholder:text-gray-400"
              />
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <div className="space-x-4 px-4">
            <Button
              onClick={() => {
                closeDeleteDialog();
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600"
              type="submit"
              onClick={() => {
                deleteUserCredentialMutation
                  .mutateAsync({
                    credentialId: credential?.id || "",
                  })
                  .then(() => {
                    toast(`User credentials successfully deleted`);
                    closeDeleteDialog();
                  });
              }}
            >
              {deleteUserCredentialMutation?.isLoading
                ? "Revoking..."
                : "Revoke"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function AddApiKeyDialog({
  isOpen,

  closeAddDialog,
}: {
  isOpen: boolean;
  closeAddDialog: () => void;
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
                <Label className="text-gray-400"> Name </Label>
                <Input
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                  className="border-gray-800 placeholder:text-gray-400"
                />
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
                className="bg-green-600 hover:bg-green-700 rounded"
                onClick={() => {
                  addUserCredentialMutation
                    .mutateAsync({
                      title,
                    })
                    .then(({ apiKey, apiSecret }: UserCredential) => {
                      closeAddDialog();
                      setAddCredentials({ apiKey, apiSecret });

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

function AddApiKeySuccessDialog({
  isOpen,
  apiKey,
  apiSecret,
  closeAddDialog,
}: {
  isOpen: boolean;
  apiKey?: string;
  apiSecret: string;
  closeAddDialog: () => void;
}) {
  return (
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
              <CardTitle>Save your key</CardTitle>
              <CardDescription className="text-gray-500 font-extralight">
                <p>
                  {`Please save this secret key somewhere safe and accessible. For security reasons, you won't be able to view it again through your OpenAI account. If you lose this secret key, you'll need to generate a new one.`}
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label className="text-gray-400"> API Key </Label>
                <Input
                  value={apiKey}
                  className="border-gray-800 placeholder:text-gray-400"
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label className="text-gray-400"> Secret Key</Label>
                <Input
                  value={apiSecret}
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
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ApiKeysTable() {
  const { data: userCredentials, isError } = useListUserCredentialsQuery();

  const [deleteId, setDeleteId] = useState("");

  if (!userCredentials?.length) {
    return (
      <div className="text-center my-8">
        <Icons.mandarin className="text-2xl mb-4 text-gray-500" />
        <p className="text-gray-400 font-light">
          Nothing here. Please add a user credential
        </p>
      </div>
    );
  }

  return (
    <>
      <DeleteApiKeyDialog
        isOpen={Boolean(deleteId)}
        apiKeyId={deleteId}
        closeDeleteDialog={() => {
          setDeleteId("");
        }}
      />

      <Table>
        <TableCaption className="text-gray-500">
          A list of your recent API Keys.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Secret Key</TableHead>
            <TableHead>Created At</TableHead>
            {/* <TableHead className="text-right">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {userCredentials?.map((credential) => (
            <TableRow key={credential?.id}>
              <TableCell className="font-medium">{credential?.title}</TableCell>
              <TableCell className="font-medium">
                <p className="truncate overflow-hidden">
                  {credential?.apiKey?.slice(0, 8)}...
                </p>
              </TableCell>
              <TableCell className="font-medium">
                {credential?.previewApiSecret}
              </TableCell>
              <TableCell>{formatDate(credential?.createdAt)}</TableCell>
              {/* <TableCell>{credential.paymentMethod}</TableCell> */}
              <TableCell className="text-right" colSpan={3}>
                <button
                  onClick={() => {
                    setDeleteId(credential?.id);
                  }}
                >
                  <Icons.trash />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export function ApiKeysTab() {
  const [isAddCredentialOpen, setIsAddCredentialOpen] = useState(false);

  return (
    <>
      <AddApiKeyDialog
        isOpen={isAddCredentialOpen}
        closeAddDialog={() => {
          setIsAddCredentialOpen(false);
        }}
      />

      <Card className="rounded border-black shadow-sm hover:shadow-green-400 transition bg-[#0b0b0f]">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle>API Keys</CardTitle>

            <Button
              className="bg-green-600 hover:bg-green-700 rounded"
              onClick={() => {
                setIsAddCredentialOpen(true);
              }}
            >
              + Add API Key
            </Button>
          </div>
          <CardDescription className="text-gray-500 font-extralight mt-4">
            As the project owner, you can manage all API keys, but avoid sharing
            or exposing them in client-side code; Mandarino may disable any
            publicly leaked key for security.
          </CardDescription>
          <CardDescription className="text-gray-500 font-extralight"></CardDescription>
        </CardHeader>

        <CardContent>
          <ApiKeysTable />
        </CardContent>
      </Card>
    </>
  );
}
