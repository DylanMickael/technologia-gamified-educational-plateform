import React from "react";
import { AnimatedDiv } from "../../components/AnimationComponents";
import { infiniteSlideUpAndZoomIn } from "../../animations/slideAndZoom";

type CardRobotProps = {
  image: string;
};
function CardRobot({ image }: CardRobotProps) {
  return (
    <div className="flex-1 flex justify-center items-center mt-8 md:mt-0 hover:scale-105 ease-in-out duration-300 cursor-pointer ">
      <img
        src={image}
        alt="Hero Illustration"
        className="w-full max-w-[200px] md:max-w-[400px] h-auto"
      />
    </div>
  );
}

export default CardRobot;
