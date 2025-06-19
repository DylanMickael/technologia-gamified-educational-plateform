# How to Add New Translations

To add new translations to the project, follow these steps:

## 1. Create JSON Files for Each Language

For each component or page, create a JSON file with the component's name in the corresponding language folder (`en/`, `fr/`, `mg/`).  
Each JSON file should contain all the text keys and their translations for that component.

**Example:**

```
src/locales/en/Navbar.json
src/locales/fr/Navbar.json
src/locales/mg/Navbar.json
```

**en/Navbar.json**
```json
{
  "home": "Home",
  "about": "About",
  "contact": "Contact"
}
```

**fr/Navbar.json**
```json
{
  "home": "Accueil",
  "about": "À propos",
  "contact": "Contact"
}
```

**mg/Navbar.json**
```json
{
  "home": "Fandraisana",
  "about": "Momba",
  "contact": "Mifandray"
}
```

## 2. Register the Component/Page in the Constants

Add the component or page name to the `NAMESPACES` array in  
`src/locales/constants.ts`:

```typescript
export const NAMESPACES = ['Landing', 'Navbar', 'YourComponent'] as const;
```

## 3. Use the Translation in Your Component

Import and use the `useTranslation` hook from `react-i18next`.  
Specify the namespace (component name) when calling the hook.

**Example:**

```tsx
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation('Navbar');

  return (
    <nav>
      <a>{t('home')}</a>
      <a>{t('about')}</a>
      <a>{t('contact')}</a>
    </nav>
  );
};
```

---

**Summary:**  
- Add or update JSON files for each language in the correct folder.
- Register the component/page name in `NAMESPACES`.
- Use `useTranslation('ComponentName')` and `t('key')` in your React component.