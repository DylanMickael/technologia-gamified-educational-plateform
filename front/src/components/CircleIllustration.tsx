import { getInfiniteRandomPulse } from "../animations/pulse";
import { getRandomNumber, getRandomColor } from "../utils/randomiser";
import { AnimatedDiv } from "./AnimationComponents";

interface CircleComponentProps {
  size?: number;
  color?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  x?: number,
  y?: number,
}

export const CircleComponent: React.FC<CircleComponentProps> = ({
  x = 0,
  y = 0,
  size = 50,
  color = '#fff',
  children,
  style = {},
}) => {
  return (
    <AnimatedDiv
      variants={getInfiniteRandomPulse()}
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: 1,
        filter: 'blur(8px)',
        ...style,
      }}
    >
      {children}
    </AnimatedDiv>
  );
};

export const CirclesBackground = ({circleNumber}:{circleNumber:number}) => {
  const circles = Array.from({ length: circleNumber }).map((_, i) => {
    const size = getRandomNumber(10, 15);
    const x = getRandomNumber(0, 1300);
    const y = getRandomNumber(0, 500);
    const color = getRandomColor();
      return (
        <CircleComponent
          key={i}
          color={color}
          size={size}
          x={x}
          y={y}
        />
      );
  });
  return (
    <div className="absolute top-0 left-0 pointer-events-none -z-1">
        {circles}
    </div>
  );
};