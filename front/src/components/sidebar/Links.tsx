import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LucideLayoutDashboard, LucideLightbulb, LucideNewspaper, LucideSettings } from 'lucide-react';

export const NavbarLinks = ({ onClick }: { onClick?: () => void }) => {
    const { t } = useTranslation('Navbar');
    const { pathname } = useLocation();
    const getActiveClass = (to: string) => pathname === to ? 'flex items-center font-bold color-green' : 'flex items-center';
    
    return (
        <ul className='flex flex-col gap-8 font-space'>
            <li>
                <Link to={'/app/dashboard'} onClick={onClick} className={getActiveClass('/app/dashboard')}>
                    <LucideLayoutDashboard className='mr-3' size={20}/> {t('Dashboard')}
                </Link>
            </li>
            <li>
                <Link to={'/app/energy'} onClick={onClick} className={getActiveClass('/app/energy')}>
                    <LucideLightbulb className='mr-3' size={20}/> {t('Energy')}
                </Link>
            </li>
            <li>
                <Link to={'/app/news'} onClick={onClick} className={getActiveClass('/app/news')}>
                    <LucideNewspaper className='mr-3' size={20}/> {t('News')}
                </Link>
            </li>
            <li>
                <Link to={'/app/settings'} onClick={onClick} className={getActiveClass('/app/settings')}>
                    <LucideSettings className='mr-3' size={20}/>{t('Settings')}
                </Link>
            </li>
        </ul>
    );
}

export default NavbarLinks;