import { useTranslation } from "react-i18next";
import { CirclesBackground } from "../../../components/CircleIllustration";
import Logo from '../../../assets/Logo.png';
import Stylo from '../../../assets/img/Stylo.png';
import Manette from '../../../assets/img/Manette.png';
import Puzzle from '../../../assets/img/Puzzle.png';
import Ordi from '../../../assets/img/Ordi.png';

const AboutContent = () => {
    const { t } = useTranslation('Landing');

    return (
        <div>
            <h1 data-aos="fade-left" data-aos-delay="300" className="font-monument font-bold mb-4 text-3xl">{t('about_title')}</h1>
            <p data-aos="fade-left" data-aos-delay="100" className="font-poppins text-md max-w-3xl">
              {t('about_text')} 🚀.
            </p>
        </div>
    )
}

const AboutImage = () => {
    return (
      <div className="relative">
        <img data-aos="zoom-in" data-aos-delay="100" className="max-w-xl" src={Logo} alt="" />
        <img data-aos="zoom-in-right" data-aos-delay="400" className="max-w-[100px] absolute top-10 left-10" src={Stylo} alt="" />
        <img data-aos="zoom-in-left" data-aos-delay="400" className="max-w-[100px]  absolute top-10 right-12" src={Manette} alt="" />
        <img data-aos="zoom-in-right" data-aos-delay="400" className="max-w-[100px]  absolute bottom-10 left-10" src={Puzzle} alt="" />
        <img data-aos="zoom-in-left" data-aos-delay="400" className="max-w-[100px]  absolute bottom-10 right-10" src={Ordi} alt="" />
      </div>
    )
}

const AboutLayout = ({
  children
}:{
    children: React.ReactNode
}) => {

  return (
      <section className="about-section flex flex-col-reverse md:flex-row items-center justify-center py-10 md:py-10 gap-10 md:gap-50 bg-background-light dark:bg-background-dark w-full">
        {children}
      </section>
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