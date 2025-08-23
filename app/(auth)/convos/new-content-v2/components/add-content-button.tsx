import { useNewConvoStore } from "@/components/step";
import { Button } from "@/components/ui/button";
import { useAddContentMutation } from "@/domain/content/content.mutations";
import { removeNull } from "@/lib/utils";
import { validateContentInput } from "../utils/validate-content-input";

export const AddContentButton = () => {
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  const addContentMutation = useAddContentMutation();

  return (
    <Button
      className="w-full sm:w-40 my-8"
      onClick={() => {
        const contentInput = validateContentInput(newConvo);

        if (contentInput?.error?.issues) {
          console.log("contentInput.error!.issues", contentInput.error!.issues);
        } else {
          if (contentInput.success) {
            addContentMutation.mutateAsync(contentInput.data as any);
            console.log("Content is valid", contentInput.data);
          }
        }
      }}
    >
      {" "}
      Add Content
    </Button>
  );
};
