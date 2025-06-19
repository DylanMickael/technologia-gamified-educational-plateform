import { type ReactNode } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import useVisibility from "../hooks/useVisibility";

const AdminLayout = ({children}:{children:ReactNode}) => {
    const {isVisible, toggleVisibility} = useVisibility();
    const containerClassName = isVisible ? "md:pl-75 pt-20":"pt-20";
    const sidebarClassName = isVisible ? "left-0":"-left-100";

    return (
        <main className="admin-layout min-h-screen">
            <Sidebar className={sidebarClassName}/>
            <Header showSidebar={isVisible} toggleSidebar={toggleVisibility}/>
            <div className={containerClassName}>
                <div className="py-8 px-10">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default AdminLayout;