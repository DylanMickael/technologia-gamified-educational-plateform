import SidebarLayout from "./Layout";
import Links from "./Links";
import Logo from "../Navbar/Logo";
const Sidebar = ({className}:{className:string}) => {
    return (
        <SidebarLayout className={className}>
            <Logo/>
            <Links/>
        </SidebarLayout>
    )
}


export default Sidebar;
