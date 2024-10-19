import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useListUserCredentialsQuery } from "../hooks/use-list-user-credentials-query";

import { Icons } from "@/components/ui/icons.v2";

import { useState } from "react";

import { DeleteApiKeyDialog } from "./delete-api-key-dialog";
import { formatDate } from "../utils/format-date";

export function ApiKeysTable() {
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
