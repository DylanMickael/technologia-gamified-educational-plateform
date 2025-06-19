import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'fr', label: 'fr' },
  { code: 'en', label: 'en' },
  { code: 'mg', label: 'mg' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      name='language'
      value={i18n.language}
      onChange={handleChange}
      className="
        custom-select
        cursor-pointer
        px-1
        py-1
        text-lg
        rounded
        bg-white
        dark:bg-gray-900
        focus:outline-none
        focus:px-2
        transition-all
        duration-200
      "
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;