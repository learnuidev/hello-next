import { useNewConvoStore } from "@/components/step";
import { Button } from "@/components/ui/button";
import { useAddContentMutation } from "@/domain/content/content.mutations";
import { validateContentInput } from "../utils/validate-content-input";

export const AddContentButton = () => {
  const newConvo = useNewConvoStore((state) => state.convo) as any;

  const addContentMutation = useAddContentMutation();

  return (
    <Button
      className="w-full sm:w-40 my-8"
      disabled={addContentMutation.isPending}
      onClick={() => {
        const contentInput = validateContentInput(newConvo);

        if (contentInput?.error?.issues) {
        } else {
          if (contentInput.success) {
            addContentMutation.mutateAsync(contentInput.data as any);
          }
        }
      }}
    >
      {" "}
      Add Content
    </Button>
  );
};
