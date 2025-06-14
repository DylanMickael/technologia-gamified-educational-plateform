import React from 'react';

interface CircleComponentProps {
  size?: number;
  color?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  x?: number,
  y?: number,
}

const CircleComponent: React.FC<CircleComponentProps> = ({
  x = 0,
  y = 0,
  size = 50,
  color = '#fff',
  children,
  style = {},
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default CircleComponent;
