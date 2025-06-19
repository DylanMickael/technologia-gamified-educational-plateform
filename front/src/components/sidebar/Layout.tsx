import type { ReactNode } from "react";

const SidebarLayout = ({children, className}:{children:ReactNode, className:string}) => {
    return (
        <div className={`
        ${className} 
        fixed 
        flex
        flex-col
        gap-10
        bg-white 
        dark:bg-gray-900 
        shadow-lg
        shadow-gray-200 
        dark:shadow-gray-950 
        h-screen 
        pr-15
        pl-12
        pt-8
        z-1
        transition-all
        duration-[600ms]
        ease-out
        `}>
            {children}
        </div>
    )
}

export default SidebarLayout;