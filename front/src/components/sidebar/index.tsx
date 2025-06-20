import SidebarLayout from "./Layout";
import Links from "./Links";
import Logo from "../Navbar/logo";
import UserInfo from "../sidebar/UserInfo";

const Sidebar = ({className}:{className:string}) => {
    return (
        <SidebarLayout className={className}>
            <Logo/>
            <div>
                <UserInfo/>
                <Links/>
            </div>
        </SidebarLayout>
    )
}

export default Sidebar;