import { useTranslation } from "react-i18next";
import CityBackground from '../../../assets/img/city.png';

const AboutContent = () => {
    const { t } = useTranslation('Landing');

    return (
        <div>
            <div data-aos="fade-left" data-aos-delay="100" className="bg-[#270818D6] p-20 rounded-2xl text-white">
                <h1 data-aos="fade-left" data-aos-delay="300" className="font-monument font-bold mb-4 text-2xl md:text-4xl text-gradient">{t('banner_title')}</h1>
                <p data-aos="fade-left" data-aos-delay="100" className="font-poppins text-md">
                    {t('banner_text')} 🚀.
                </p>
            </div>
        </div>
    )
}

const AboutLayout = ({
  children
}:{
    children: React.ReactNode
}) => {

  return (
    <div data-aos="fade-in" className="w-full">
      <section  
        style={{
            backgroundImage: `url(${CityBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} 
        className="w-full banner-section flex items-center justify-center mx-auto px-5 md:px-80 py-10 md:py-20 mt-10">
        {children}
      </section>
    </div>
  );
}

const HeroSection = () => {
  return (
    <AboutLayout>
        <AboutContent />
    </AboutLayout>
  );
}

export default HeroSection;