import { Link } from 'react-router-dom';
import { GreenRoundedButton, OutlinedGreenRoundedButton } from '../Buttons';
import NavbarLinks from './Links';
import { ThemeTogglerButton } from '../ThemeToggler';
import LanguageSwitcher from '../LanguageSwitcher';
import type { ReactNode } from 'react';

const Overlay = ({onClose}:{onClose: () => void}) => {
    return (
        <div 
            data-aos="fade-in"
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
        />
    )
}

const Wrapper = ({children}:{children:ReactNode}) => {
    return (
        <div
            data-aos="slide-left"
            className="fixed z-50 top-0 right-0 w-3/4 max-w-xs h-full bg-navbg-light dark:bg-gray-900 shadow-lg p-6 flex flex-col gap-6"
            onClick={e => e.stopPropagation()}
        >
            {children}
        </div>
    )
}

const MobileNavbar = ({
    open,
    onClose
}: {
    open: boolean,
    onClose: () => void
}) => {
    if (!open) return null;
    return (
        <>
            <Overlay onClose={onClose} />
            <Wrapper>
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
                    <OutlinedGreenRoundedButton type="button">
                        <Link to={'/'} onClick={onClose}>Sign In</Link>
                    </OutlinedGreenRoundedButton>
                    <GreenRoundedButton type="button">
                        <Link to={'/'} onClick={onClose}>Sign Up</Link>
                    </GreenRoundedButton>
                </div>
                <div className="flex items-center gap-2 mt-4 ml-8 scale-120">
                    <ThemeTogglerButton />
                    <LanguageSwitcher />
                </div>
            </Wrapper>
        </>
    );
};

export default MobileNavbar;