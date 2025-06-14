import FooterLayout from './Layout';
import Copyright from './Copyright';
import Shortcuts from './Shortcuts';
import Summary from './Summary';

const Footer = () => {
    return (
        <FooterLayout>
            <div className='flex flex-col md:flex-row justify-between md:px-30 gap-10 md:gap-80'>
                <Summary/>
                <Shortcuts/>
            </div>
            <hr className='mt-15 mb-5 border-1 border-gray-200 dark:border-gray-700' />
            <Copyright/>
        </FooterLayout>
    );
};

export default Footer;