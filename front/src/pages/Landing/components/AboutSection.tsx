import { useTranslation } from "react-i18next";
import { CirclesBackground } from "../../../components/CircleIllustration";
import Logo from '../../../assets/Logo.png';

const AboutContent = () => {
    const { t } = useTranslation('Landing');

    return (
        <div>
            <h1 data-aos="fade-left" data-aos-delay="300" className="font-monument font-bold mb-4 text-3xl">{t('about_title')}</h1>
            <p data-aos="fade-left" data-aos-delay="100" className="font-poppins text-md">
              {t('about_text')} 🚀.
            </p>
        </div>
    )
}

const AboutImage = () => {
    return (
        <div data-aos="fade-in" className="flex flex-col md:flex-row">
            <img className="max-w-[400px]" src={Logo} alt="" />
        </div>
    )
}

const AboutLayout = ({
  children
}:{
    children: React.ReactNode
}) => {

  return (
    <div data-aos="fade-in">
      <section className="about-section flex flex-col-reverse md:flex-row items-center justify-center w-full max-w-7xl py-10 md:py-10 gap-20">
        {children}
      </section>
    </div>
  );
}

const AboutSection = () => {
  return (
    <AboutLayout>
        <AboutImage />
        <AboutContent />
        <CirclesBackground circleNumber={20} />
    </AboutLayout>
  );
}

export default AboutSection;