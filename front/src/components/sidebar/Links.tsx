import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LucideLayoutDashboard, LucideLightbulb, LucideSettings } from 'lucide-react';

export const NavbarLinks = ({ onClick }: { onClick?: () => void }) => {
    const { t } = useTranslation('Navbar');
    const { pathname } = useLocation();
    const getActiveClass = (to: string) => pathname === to ? 'flex items-center font-bold color-green' : 'flex items-center';
    
    return (
        <ul className='flex flex-col gap-8 font-space mt-5'>
            <li>
                <Link to={'/app/dashboard'} onClick={onClick} className={getActiveClass('/app/dashboard')}>
                    <LucideLayoutDashboard className='mr-3' size={20}/> {t('Tableau de bord')}
                </Link>
            </li>
            <li>
                <Link to={'/app/reporting'} onClick={onClick} className={getActiveClass('/app/reporting')}>
                    <LucideLightbulb className='mr-3' size={20}/> {t('Assistant IA')}
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