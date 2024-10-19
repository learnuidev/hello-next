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

import { useListUserCredentialsQuery } from "../hooks/use-list-user-credentials-query";

import { useDeleteUserCredentialMutation } from "../hooks/use-delete-user-credential-mutation";

import { Input } from "@/components/input";

export function DeleteApiKeyDialog({
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
