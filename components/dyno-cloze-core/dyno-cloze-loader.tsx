import { AnimatedLoadingText } from "@/components/animated-loading-text";

export const DynoClozeLoader = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-center mt-32 ">
        <AnimatedLoadingText className="text-xl" message={message} />
      </p>
    </div>
  );
};
