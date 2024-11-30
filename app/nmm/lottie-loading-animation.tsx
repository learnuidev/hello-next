import Lottie from "lottie-react";
import groovyWalkAnimation from "./loading_animation.json";

export function LottieLoadingAnimation() {
  return (
    <div className="content-center my-64">
      <Lottie
        className="h-60"
        // animationData={rocketAnimation}
        animationData={groovyWalkAnimation}
      />
    </div>
  );
}
