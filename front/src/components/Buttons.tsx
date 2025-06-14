import type { ReactNode, MouseEventHandler } from 'react';

type ButtonProps = {
    type: "button" | "submit" | "reset" | undefined;
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const PrimaryButton = ({
    type,
    children,
    onClick
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="
            bg-green-900 
            text-white 
            px-4 py-2 
            rounded-lg
            hover:bg-green-700 
            transition-colors"
        >
            {children}
        </button>
    );
}

export const GreenRoundedButton = ({ 
    type,
    children, 
    onClick 
}: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="
            font-space 
            bg-green-700 
            text-white 
            px-4 
            py-2 
            rounded-4xl 
            hover:bg-green-600 
            hover:text-white 
            transition-colors"
        >
            {children}
        </button>
    );
};

export const OutlinedGreenRoundedButton = ({ type, children, onClick }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="
            font-space 
            border-0
            border-green-600 
            text-green-600 
            px-4 py-2  
            rounded-4xl 
            hover:bg-green-500 
            hover:text-white 
            transition-colors"
        >
            {children}
        </button>
    );
};