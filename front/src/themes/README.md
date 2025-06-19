# Theme System Usage

This project uses a custom theme context and Tailwind CSS for light/dark mode support.

## How to Use the Theme Switch

1. **Wrap your app with the `ThemeProvider`:**

```tsx
import { ThemeProvider } from './src/themes/provider';

const App = () => (
  <ThemeProvider>
    {/* your app components */}
  </ThemeProvider>
);
```

2. **Access and switch the theme in your components:**

```tsx
import { useTheme } from '../themes/hook';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};
```

3. **Style your components with Tailwind's `dark:` variant:**

To apply different styles in dark mode, use the `dark:` prefix in your Tailwind classes.

```tsx
<div className="bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
  This box adapts to the theme!
</div>
```

- Any Tailwind class can be prefixed with `dark:` to apply only in dark mode.
- The theme is persisted in `localStorage` and applied to the `<html>` element as a class (`light` or `dark`).

---

**Summary:**
- Always wrap your app with `ThemeProvider`.
- Use the `useTheme` hook to read or change the theme.
- Use Tailwind's `dark:` variant to style for dark mode.