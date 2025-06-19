import { useTranslation } from 'react-i18next';
import Logo from '../../assets/Logo.png';

const NavbarLogo = () => {
    const { t } = useTranslation('Navbar');
    return (
        <div className='font-poppins flex items-center gap-2'>
            <img src={Logo} alt="Our logo" className='w-[50px]' />
            <div>
                <p className='font-bold text-xl text-text-orange dark:text-white'>{t('brand')}</p>
                <p className='text-xs text-text-orange dark:text-white'>{t('subtitle')}</p>
            </div>
        </div>
    );
}

export default NavbarLogo;