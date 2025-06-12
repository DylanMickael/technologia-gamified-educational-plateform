import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

const NavbarLayout = ({
    children
}:{
    children:ReactNode
}) => {
    const [show, setShow] = useState(true);
    const lastScroll = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScroll.current && currentScroll > 50) {
                setShow(false); // Scroll down
            } else {
                setShow(true); // Scroll up
            }
            lastScroll.current = currentScroll;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`
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
            transition-all duration-300
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
        `}>
            {children}
        </div>
    );
}

export default NavbarLayout;