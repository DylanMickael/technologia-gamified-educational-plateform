import { Link } from 'react-router-dom';
import { GreenRoundedButton, OutlinedGreenRoundedButton } from '../Buttons';
import NavbarLinks from './Links';
import { ThemeTogglerButton } from '../ThemeToggler';
import LanguageSwitcher from '../LanguageSwitcher';

const MobileNavbar = ({
    open,
    onClose
}: {
    open: boolean,
    onClose: () => void
}) => {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 backdrop-blur-sm bg-black/10 md:hidden z-40"
            onClick={onClose}
        >
            <div
                className="absolute z-50 top-0 right-0 w-3/4 max-w-xs h-full bg-navbg-light dark:bg-navbg-dark shadow-lg p-6 flex flex-col gap-6"
                onClick={e => e.stopPropagation()}
            >
                <button
                    type='button'
                    className="self-end text-3xl"
                    onClick={onClose}
                    aria-label="Close menu"
                >
                    ×
                </button>
                <NavbarLinks mobile onClick={onClose} />
                <div className="flex flex-col gap-2 mt-4">
                    <OutlinedGreenRoundedButton>
                        <Link to={'/'} onClick={onClose}>Sign In</Link>
                    </OutlinedGreenRoundedButton>
                    <GreenRoundedButton>
                        <Link to={'/'} onClick={onClose}>Sign Up</Link>
                    </GreenRoundedButton>
                </div>
                <div className="flex items-center gap-2 mt-4 ml-8 scale-120">
                    <ThemeTogglerButton />
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    );
};

export default MobileNavbar;