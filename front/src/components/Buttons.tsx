import type { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const PrimaryButton = ({ type, children, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className=" 
            bg-background-orange
            text-white 
            px-4 py-2 
            rounded-lg
            hover:bg-orange-700 
            transition-colors"
    >
      {children}
    </button>
  );
};

export const GreenRoundedButton = ({
  type,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
            font-space 
            bg-background-orange
            text-white 
            px-4 
            py-2 
            rounded-4xl 
            hover:bg-orange-900
            hover:text-white 
            transition-colors"
    >
      {children}
    </button>
  );
};

export const OutlinedGreenRoundedButton = ({
  type,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
            font-space 
            border-0
            text-text-orange 
            px-4 py-2  
            rounded-4xl 
            hover:bg-background-orange 
            hover:text-white 
            transition-colors"
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children }: ButtonProps) => {
  return (
    <button
      className=" bg-gray-300
            text-black
            px-4 py-2 
            rounded-lg
            hover:bg-orange-70"
    >
      {" "}
      {children}
    </button>
  );
};
