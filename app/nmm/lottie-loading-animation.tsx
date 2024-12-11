import Lottie from "lottie-react";
import groovyWalkAnimation from "./loading_animation.json";
import { cn } from "@/lib/utils";

export function LottieLoadingAnimation({ className }: { className?: string }) {
  return (
    <div className={cn("content-center my-8 sm:my-32", className)}>
      <Lottie
        className="h-60"
        // animationData={rocketAnimation}
        animationData={groovyWalkAnimation}
      />
    </div>
  );
}
