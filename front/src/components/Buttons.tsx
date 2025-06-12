import type { ReactNode, MouseEventHandler } from 'react';

type ButtonProps = {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const PrimaryButton = ({
    children,
    onClick
}: ButtonProps) => {
    return (
        <button
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
    children, 
    onClick 
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="
            font-space 
            border-1
            border-gray-300
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

export const OutlinedGreenRoundedButton = ({ children, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="
            font-space 
            border-3 
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