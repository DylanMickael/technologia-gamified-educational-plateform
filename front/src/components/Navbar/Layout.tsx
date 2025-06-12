import type { ReactNode } from 'react';
import { useNavbarVisibility } from '../../hooks/useNavbarVisibility';
import { AnimatedContainer } from '../AnimatedComponents';
import { fadeDownContainer } from '../../animations/fade';

const NavbarLayout = ({
    children
}:{
    children:ReactNode
}) => {
    const show = useNavbarVisibility();

    return (
        <AnimatedContainer
        variants={fadeDownContainer}
        className={`
            fixed top-0
            w-[92vw] min-w-fit
            flex justify-between items-center 
            px-8 py-2 my-10
            rounded-full
            shadow-[0_4px_24px_0_rgba(16,78,36,0.15)]
            bg-navbg-light 
            dark:bg-navbg-dark 
            text-text-light
            dark:text-text-dark
            transition-opacity duration-300
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
        `}>
            {children}
        </AnimatedContainer>
    );
};

export default NavbarLayout;