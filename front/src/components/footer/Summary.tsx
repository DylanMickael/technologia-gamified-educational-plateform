import { useTranslation } from 'react-i18next';
import Logo from '../../assets/Logo.png';

const SummaryHeader = () => {
    const { t } = useTranslation('Navbar');
    return (
        <div className='font-poppins flex items-center gap-2 mb-5'>
            <img src={Logo} alt="Our logo" className='w-[50px]' />
            <div>
                <p className='font-bold text-xl text-[#F3C1DBAB]'>{t('brand')}</p>
                <p className='text-xs text-[#F3C1DBAB]'>{t('subtitle')}</p>
            </div>
        </div>
    );
}

const Summary = () =>  {
    const { t } = useTranslation('Footer');
    return (
        <div>
            <SummaryHeader/>
            <p className='font-space text-md text-white dark:text-white max-w-xl'>
                {t('summary')}
            </p>
        </div>
    );
}

export default Summary;
