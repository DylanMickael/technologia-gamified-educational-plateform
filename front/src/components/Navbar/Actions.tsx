
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeTogglerButton } from '../ThemeToggler';
import LanguageSwitcher from '../LanguageSwitcher';
import { GreenRoundedButton, OutlinedGreenRoundedButton } from '../Buttons';

const NavbarActions = () => {
    const { t } = useTranslation('Navbar');
    
    return (
        <div className='flex items-center gap-4'>
            <div className='hidden md:flex items-center gap-2'>
                <OutlinedGreenRoundedButton>
                    <Link to={'/login'}>{t('signin')}</Link>
                </OutlinedGreenRoundedButton>
                <GreenRoundedButton>
                    <Link to={'/'}>{t('signup')}</Link>
                </GreenRoundedButton>
            </div>
            <div className="h-8 w-[2px] rounded-3xl mx-2 bg-black dark:bg-gray-500 hidden md:block" />
            <div className='flex items-center gap-4'>
                <ThemeTogglerButton />
                <LanguageSwitcher />
            </div>
        </div>
    );
}

export default NavbarActions;