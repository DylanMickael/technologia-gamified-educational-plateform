import { useTranslation } from 'react-i18next';
import BlitzLogo from '../../assets/Logo Blitz.png';

const Copyright = () => {
    const { t } = useTranslation('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full py-4 flex justify-center items-center bg-transparent">
            <img className='w-[20px] mx-2' src={BlitzLogo} alt="Logo" />
            <span className="font-space text-center text-gray-500 dark:text-gray-400 text-sm">
                {currentYear}, {t('copyright')}.
            </span>
        </div>
    );
} 

export default Copyright;
