import { Icons } from "@/components/ui/icons.v2";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { useUploadFileNew } from "./use-upload-file-new";

export const UploadFileButtonNew = (
  props: PropsWithChildren & {
    icon?: any;
    types?: string[];
    context?: any;
    // onSuccess?: (resp: UploadFileResponse) => void;
    className?: string;
  }
) => {
  const onUploadFileChange = useUploadFileNew();

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
