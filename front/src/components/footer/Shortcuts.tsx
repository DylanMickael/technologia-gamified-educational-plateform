import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Shortcuts = () => {
    const footerTranslator = useTranslation('Footer').t;
    const navTranslator = useTranslation('Navbar').t;

    return (
        <div className="text-center md:text-right">
            <h1 className="font-space mb-2 font-bold text-lg">{footerTranslator('shortcuts')}</h1>
            <ul className="flex flex-col gap-2">
                <li><Link to={'/'}>{navTranslator('home')}</Link></li>
                <li><Link to={'/about'}>{navTranslator('about')}</Link></li>
                <li><Link to={'/energy'}>{navTranslator('energies')}</Link></li>
                <li><Link to={'/contacts'}>{navTranslator('contacts')}</Link></li>
            </ul>
        </div>
    );
}
  
  export default Shortcuts;
  