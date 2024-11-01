import { Icons } from "@/components/ui/icons.v2";
import { UploadFileResponse, useUploadFile } from "./use-upload-file";
import { PropsWithChildren } from "react";
import { listUserAssetsQueryKey } from "@/domain/asset/use-list-user-assets";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export const UploadFileButton = (
  props: PropsWithChildren & {
    onSuccess?: (resp: UploadFileResponse) => void;
    className?: string;
  }
) => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  const onUploadFileChange = useUploadFile((resp: UploadFileResponse) => {
    // alert(JSON.stringify(resp));
    props?.onSuccess !== undefined && props?.onSuccess(resp);

    queryClient.invalidateQueries([listUserAssetsQueryKey, authUser?.jwt]);
  });

  return (
    <div className={cn("space-x-2", props.className)}>
      <Icons.plusIcon />
      <input
        type="file"
        id="actual-btn"
        className="hidden"
        onChange={onUploadFileChange}
      />

      <label htmlFor="actual-btn">{props?.children || "Choose File"}</label>
    </div>
  );
};
