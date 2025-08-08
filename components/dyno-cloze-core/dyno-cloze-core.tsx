import { ReactNode } from "react";

export const DynoOptionsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-2 gap-8 mt-12 max-w-md m-auto lg:mt-24">
      {children}
    </div>
  );
};
