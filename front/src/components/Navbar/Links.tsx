import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NavbarLinks = ({ mobile = false, onClick }: { mobile?: boolean, onClick?: () => void }) => {
    const { t } = useTranslation('Navbar');
    const linkClass = mobile
        ? 'block py-2 px-4 text-lg font-bold'
        : 'font-bold';
    return (
        <ul className={mobile ? 'flex flex-col gap-2' : 'flex items-center gap-8'}>
            <li className={linkClass}><Link to={'/'} onClick={onClick}>{t('home')}</Link></li>
            <li className={linkClass}><Link to={'/'} onClick={onClick}>{t('about')}</Link></li>
            <li className={linkClass}><Link to={'/'} onClick={onClick}>{t('energy')}</Link></li>
            <li className={linkClass}><Link to={'/'} onClick={onClick}>{t('contacts')}</Link></li>
        </ul>
    );
}

export default NavbarLinks;