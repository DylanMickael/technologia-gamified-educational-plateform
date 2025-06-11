import { useTranslation } from 'react-i18next';
import { ThemeTogglerButton } from '../components/ThemeToggler';
import LanguageSwitcher from '../components/LanguageSwitcher';

const LandingPage = () => {
  const { t } = useTranslation('LandingPage');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light text-text-light dark:bg-background-dark dark:text-text-dark">
        <div className="absolute top-4 right-4 flex gap-4">
          <ThemeTogglerButton/>
          <LanguageSwitcher/>
        </div>
      
      <h1 className="text-4xl font-bold mb-4 ">
        {t('title')}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        {t('description')}
      </p>
      <button className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-600 transition">
        {t('button')}
      </button>
    </div>
  );
};

export default LandingPage;