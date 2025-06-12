import { useTheme } from '../themes/hook';
import type { ReactNode } from 'react';

interface ThemeTogglerProps {
    children?: ReactNode;
}

export const ThemeToggler = ({ children }: ThemeTogglerProps) => {
    const { toggleTheme } = useTheme();

    return (
        <div onClick={toggleTheme}>
            {children}
        </div>
    );
};

export const ThemeTogglerButton = () => {
    const { theme } = useTheme();
  
    return (
        <ThemeToggler>
            <button className='text-xl'>
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </ThemeToggler>
    );
}