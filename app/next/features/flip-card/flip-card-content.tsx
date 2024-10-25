"use client";

import type { MouseEvent } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons.v2";

// import type { RouterOutputs } from "@acme/api";
// import type { Session } from "@acme/auth";
// import { cn } from "@acme/ui";
// import { Button } from "@acme/ui/button";

// import { useSignInDialogContext } from "~/contexts/sign-in-dialog-context";
// import useStar from "~/hooks/useStar";
// import EditFlashcardDialog from "../shared/edit-flashcard-dialog";

interface FlipCardContentProps {
  title: string;
  content: string;
  editable?: boolean;
  back?: boolean;
  variant?: "vertical" | "horizontal";
  //   flashcard: RouterOutputs["studySet"]["byId"]["flashcards"][0];
  //   session: Session | null;
}

const FlipCardContent = ({
  back,
  title,
  content,
  editable,
  variant,
  //   flashcard,
  //   session,
}: FlipCardContentProps) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full [backface-visibility:hidden]",
        variant === "vertical"
          ? {
              "[transform:rotateX(180deg)]": back,
            }
          : {
              "[transform:rotateY(180deg)]": back,
            }
      )}
    >
      <div className="flex h-full w-full flex-col rounded-lg bg-primary-foreground p-4 drop-shadow-lg md:p-4">
        <div className="flex items-center justify-between">
          <span className="select-none font-semibold text-[12px]">{title}</span>
          <div className="flex justify-end gap-2">
            {/* {editable && <EditFlashcardDialog flashcard={flashcard} />} */}
            <button
              className="rounded-full"
              //   onClick={onStarClick}
            >
              <Icons.lightBulbSolid />
              {/* <Star
                size={16}
                className={flashcard.starred ? "text-yellow-300" : undefined}
              /> */}
            </button>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="select-none text-3xl">{content}</span>
        </div>
      </div>
    </div>
  );
};

export default FlipCardContent;
