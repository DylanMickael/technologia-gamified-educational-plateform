import HeaderLayout from "./Layout";
import { ThemeTogglerButton } from "../ThemeToggler";
import LanguageSwitcher from "../LanguageSwitcher";
import { LogOut } from "lucide-react";
interface headerType {
    showSidebar: boolean;
    toggleSidebar: () => void;
}

const Header = ({showSidebar, toggleSidebar} : headerType) => {
    const containerClassName = showSidebar? "ml-70":"ml-5";
    return (
        <HeaderLayout>
            <button onClick={()=>toggleSidebar()} className={containerClassName}>☰</button>
            <div className="flex items-center gap-5">
                <ThemeTogglerButton/>
                <LanguageSwitcher/>
                <button className="bg-red-400 rounded-lg p-2">
                    <LogOut size={16} color="white"/>
                </button>
            </div>
        </HeaderLayout>
    )
}

export default Header;