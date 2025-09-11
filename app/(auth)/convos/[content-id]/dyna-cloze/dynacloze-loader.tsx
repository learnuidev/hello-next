import { AnimatedLoadingText } from "@/components/animated-loading-text";

export const DynaClozeLoader = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-center mt-32 ">
        <AnimatedLoadingText className="text-xl" message={message} />
      </p>
    </div>
  );
};
