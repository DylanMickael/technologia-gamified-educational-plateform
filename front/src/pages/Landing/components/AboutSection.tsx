import { useTranslation } from "react-i18next";
import About1 from '../../../assets/img/About1.jfif';
import About2 from '../../../assets/img/About2.jfif';
import About3 from '../../../assets/img/About3.jfif';
import { CirclesBackground } from "../../../components/CircleIllustration";

const AboutContent = () => {
    const { t } = useTranslation('Landing');

    return (
        <div>
            <h1 data-aos="fade-right" data-aos-delay="300" className="font-poppins font-bold mb-4 text-2xl">{t('about_title')}</h1>
            <p data-aos="fade-right" data-aos-delay="100" className="font-poppins text-sm">
              {t('about_text')} 🚀.
            </p>
        </div>
    )
}

const AboutImage = ({src, delay}:{src:string, delay:string}) => {
    return (
        <div data-aos="slide-up" data-aos-delay={delay} className="w-[85vw] md:w-[220px] h-[220px] mx-5 rounded-lg my-5"
            style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <span></span>
        </div>
    )
}

const AboutImages = () => {
    return (
        <div data-aos="fade-in" className="flex flex-col md:flex-row">
            <AboutImage src={About1} delay="100"/>
            <AboutImage src={About2} delay="200"/>
            <AboutImage src={About3} delay="300"/>
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
      <section className="about-section flex flex-col md:flex-row gap-5 items-center justify-center w-full max-w-7xl mx-auto py-10 md:py-20">
        {children}
      </section>
    </div>
  );
}

const HeroSection = () => {
  return (
    <AboutLayout>
        <AboutContent />
        <AboutImages />
        <CirclesBackground circleNumber={20} />
    </AboutLayout>
  );
}

export default HeroSection;