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
      onClick={() => {
        try {
          const contentInput = validateContentInput(newConvo);

          console.log("CONTENT IS SAFE", contentInput);
        } catch (err) {
          alert(JSON.stringify(err));
        }
      }}
    >
      {" "}
      Add Content
    </Button>
  );
};
