import type { ReactNode } from 'react';
import { useNavbarVisibility } from '../../hooks/useNavbarVisibility';

const NavbarLayout = ({
    children
}:{
    children:ReactNode
}) => {
    const show = useNavbarVisibility();

    return (
        <div data-aos="fade-down"
        className={`
            z-10
            sticky top-0
            w-[92vw] min-w-fit
            flex justify-between items-center 
            px-8 py-2 mt-10
            rounded-full
            shadow-[0_4px_24px_0_rgba(78,78,78,0.15)]
            bg-white 
            dark:bg-gray-900
            text-text-light
            dark:text-text-dark
            transition-opacity duration-100
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20 pointer-events-none'}
        `}>
            {children}
        </div>
    );
};

export default NavbarLayout;