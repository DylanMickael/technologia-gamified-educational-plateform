import { useEffect, useRef } from 'react';
import { convertAniBinaryToCSS } from 'ani-cursor';
import { useTheme } from '../themes/hook';

export const useAnimatedCursor = (
  selector: string,
  cursorPath: string,
  darkCursorPath?: string,
) => {
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const applyCursor = async (path: string) => {
      try {
        const response = await fetch(path);
        const data = new Uint8Array(await response.arrayBuffer());
        const style = document.createElement('style');
        style.textContent = convertAniBinaryToCSS(selector, data);
        document.head.appendChild(style);
        styleRef.current = style;
      } catch (error) {
        console.error('Error applying cursor:', error);
      }
    };

    const path = isDarkMode && darkCursorPath ? darkCursorPath : cursorPath;
    applyCursor(path);

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, [selector, cursorPath, darkCursorPath, isDarkMode]);
};