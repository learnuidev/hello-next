import { Icons } from "@/components/ui/icons.v2";
import { UploadFileResponse, useUploadFile } from "./use-upload-file";
import { PropsWithChildren } from "react";
import { listUserAssetsQueryKey } from "@/domain/asset/use-list-user-assets";
import { useCurrentAuthUser } from "@/domain/auth/auth.queries";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export const UploadFileButton = (
  props: PropsWithChildren & {
    icon?: any;
    types?: string[];
    context?: any;
    onSuccess?: (resp: UploadFileResponse) => void;
    className?: string;
  }
) => {
  const { data: authUser } = useCurrentAuthUser({});
  const queryClient = useQueryClient();
  const { onUploadFileChange, isUploading, percentCompleted } = useUploadFile(
    (resp: UploadFileResponse) => {
      // alert(JSON.stringify(resp));
      props?.onSuccess !== undefined && props?.onSuccess(resp);

      queryClient.invalidateQueries({
        queryKey: [listUserAssetsQueryKey, authUser?.jwt],
      });
    },
    props?.context,
    {
      types: [...(props?.types || []), "webm"],
    }
  );

  if (isUploading) {
    return (
      <div className={cn("text-gray-400 dark:text-gray-700", props.className)}>
        <p>Uploading: </p>

        <p className="mt-8">Upload progress: {`${percentCompleted}%`}</p>
      </div>
    );
  }
  return (
    <div
      className={cn(
        "space-x-2 text-gray-400 dark:text-gray-700",
        props.className
      )}
    >
      {!props?.icon && <Icons.plusIcon />}
      <input
        type="file"
        id="actual-btn"
        className="hidden"
        onChange={onUploadFileChange}
      />

      <label htmlFor="actual-btn">
        {props.icon || props?.children || "Add File"}
      </label>
    </div>
  );
};
