import { getRandomNumber } from "../utils/randomiser";

export const getInfiniteRandomPulse = () => ({
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: getRandomNumber(1, 2), 
        duration: getRandomNumber(1, 3),
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  });