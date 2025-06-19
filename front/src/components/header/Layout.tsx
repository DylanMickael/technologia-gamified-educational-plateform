import type { ReactNode } from "react";

const HeaderLayout = ({children}:{children:ReactNode}) => {
    return (
        <div className="
        fixed 
        w-screen
        flex 
        justify-between 
        items-center 
        bg-white 
        dark:bg-gray-900 
        shadow-md 
        shadow-gray-200 
        dark:shadow-gray-950 
        px-8
        md:px-15 
        py-5">
            {children}
        </div>
    )
}

export default HeaderLayout;