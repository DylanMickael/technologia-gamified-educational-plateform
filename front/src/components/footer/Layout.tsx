import type { ReactNode } from 'react';

const FooterLayout = ({
    children
}:{
    children:ReactNode
}) => {
    return (
        <footer
        data-aos="fade-in"
        data-aos-delay="100"
        data-aos-offset="80"
        className={`
            mt-10
            px-20 pt-20
            w-full min-w-fit
            shadow-[0_4px_24px_0_rgba(16,78,36,0.15)]
            bg-[#2C0A1C]
            dark:bg-gray-900
            text-text-light
            dark:text-text-dark
        `}>
            {children}
        </footer>
    );
};

export default FooterLayout;