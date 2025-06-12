import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NavbarLinks = ({ mobile = false, onClick }: { mobile?: boolean, onClick?: () => void }) => {
    const { t } = useTranslation('Navbar');
    const { pathname } = useLocation();
    const linkClass = mobile
        ? 'block py-2 px-4 text-lg font-bold'
        : '';
    const getActiveClass = (to: string) => pathname === to ? 'font-bold' : '';
    
    return (
        <ul className={mobile ? 'flex flex-col gap-2 font-space' : 'flex items-center gap-8 font-space'}>
            <li className={linkClass}><Link to={'/'} onClick={onClick} className={getActiveClass('/')}>{t('home')}</Link></li>
            <li className={linkClass}><Link to={'/about'} onClick={onClick} className={getActiveClass('/about')}>{t('about')}</Link></li>
            <li className={linkClass}><Link to={'/energy'} onClick={onClick} className={getActiveClass('/energies')}>{t('energies')}</Link></li>
            <li className={linkClass}><Link to={'/contacts'} onClick={onClick} className={getActiveClass('/contacts')}>{t('contacts')}</Link></li>
        </ul>
    );
}

export default NavbarLinks;