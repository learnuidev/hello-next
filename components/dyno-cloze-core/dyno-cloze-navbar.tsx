/* eslint-disable react-hooks/exhaustive-deps */

import { useReviewModeView } from "@/app/review/use-review-mode";
import { Icons } from "@/components/ui/icons.v2";

export const DynaClozeNavbar = ({ onClose }: { onClose: () => void }) => {
  return (
    <nav className="flex w-screen fixed top-4 left-0 items-center">
      <div className="flex-1 flex justify-start px-4 lg:px-12">
        <button
          onClick={() => {
            onClose();
          }}
        >
          <Icons.xMark className="text-2xl" />
        </button>
      </div>
      <div className="flex-1 flex justify-center px-4">
        <h1 className="text-center text-2xl font-mono">dynacloze</h1>
      </div>
      <div className="flex-1 flex justify-end px-4"></div>
    </nav>
  );
};
