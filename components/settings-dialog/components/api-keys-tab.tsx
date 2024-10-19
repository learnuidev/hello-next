import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// import { useToast } from "@/components/ui/use-toast";
import { useListUserCredentialsQuery } from "../hooks/use-list-user-credentials-query";
import { useAddUserCredentialMutation } from "../hooks/use-add-user-credential-mutation";
import { Icons } from "@/components/ui/icons.v2";
import { useDeleteUserCredentialMutation } from "../hooks/use-delete-user-credential-mutation";

function formatDate(timestamp: number) {
  const formattedDate = format(timestamp, "MMM d, yyyy");
  console.log(formattedDate);

  return formattedDate;
}

function ApiKeysTable() {
  const { data: userCredentials, isError } = useListUserCredentialsQuery();

  const deleteUserCredentialMutation = useDeleteUserCredentialMutation();

  return (
    <>
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
          {userCredentials?.map(
            (credential: {
              title: string;
              id: string;
              createdAt: number;
              apiKey: string;
              apiSecret: string;
              previewApiSecret: string;
            }) => (
              <TableRow key={credential?.id}>
                <TableCell className="font-medium">
                  {credential?.title}
                </TableCell>
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
                    onDoubleClick={() => {
                      deleteUserCredentialMutation
                        .mutateAsync({
                          credentialId: credential?.id,
                        })
                        .then(() => {
                          //   toast({
                          //     title: "Success!",
                          //     description: "User credentials successfully added",
                          //     // action: (
                          //     //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                          //     // ),
                          //   });

                          toast(`User credentials successfully deleted`);
                        });
                    }}
                  >
                    <Icons.trash />
                  </button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </>
  );
}

export function ApiKeysTab() {
  const addUserCredentialMutation = useAddUserCredentialMutation();

  //   const { toast } = useToast();

  return (
    <Card className="rounded border-black shadow-sm hover:shadow-green-400 transition bg-[#0b0b0f]">
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription className="text-gray-500 font-extralight">
          As the project owner, you can manage all API keys, but avoid sharing
          or exposing them in client-side code; Mandarino may disable any
          publicly leaked key for security.
        </CardDescription>
        <CardDescription className="text-gray-500 font-extralight"></CardDescription>
      </CardHeader>
      {/* <CardContent className="gap-4 grid grid-cols-1 md:grid-cols-2"> */}
      <CardContent>
        {/* {isError ? "ERROR" : JSON.stringify(userCredentials)} */}

        <ApiKeysTable />

        <div>
          <button
            onClick={() => {
              addUserCredentialMutation
                .mutateAsync({
                  title: "My first api",
                })
                .then(({ apiKey, apiSecret }) => {
                  alert(JSON.stringify({ apiKey, apiSecret }));
                  //   toast({
                  //     title: "Success!",
                  //     description: "User credentials successfully added",
                  //     // action: (
                  //     //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                  //     // ),
                  //   });

                  toast(`User credentials successfully added`);
                });
            }}
          >
            Add API Key
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
