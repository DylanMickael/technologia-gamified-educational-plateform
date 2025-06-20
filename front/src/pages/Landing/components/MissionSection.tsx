import { useTranslation } from "react-i18next";
import Mission1 from '../../../assets/img/Mission1.png';
import Mission2 from '../../../assets/img/Mission2.png';
import Mission3 from '../../../assets/img/Mission3.png';
import { CirclesBackground } from "../../../components/CircleIllustration";
import { Link } from "react-router-dom";

const MissionContent = () => {
    const { t } = useTranslation('Landing');

    return (
        <div>
            <h1 data-aos="fade-up" data-aos-delay="100" className="font-monument font-bold mb-10 text-4xl">{t('mission_title')}</h1>
        </div>
    )
}

const MissionCard = ({text, link, src, delay}:{text:string, link:string, src:string, delay:string}) => {
    return (
      <Link to={link}>
        <div data-aos="slide-up" data-aos-delay={delay} className="mission-card gounded-l bg-background-light dark:bg-background-dark mb-5 flex flex-col justify-between pt-15 px-10 rounded-3xl max-w-100 cursor-pointer min-h-100">
            <p className="text-center text-xl font-bold font-monument text-black dark:text-orange-200">{text}</p>
            <img className="max-w-100" src={src} alt="" />
        </div>
      </Link>
    )
}

const MissionImages = () => {
    const { t } = useTranslation('Landing');
    return (
        <div data-aos="fade-in" className="flex flex-col md:flex-row gap-20">
            <MissionCard src={Mission1} delay="200" link="/" text={t('mission_card_1')}/>
            <MissionCard src={Mission2} delay="400" link="/" text={t('mission_card_2')}/>
            <MissionCard src={Mission3} delay="600" link="/app/formations" text={t('mission_card_3')}/>
        </div>
    )
}

const MissionLayout = ({
  children
}:{
    children: React.ReactNode
}) => {

  return (
      <section className="Mission-section gap-5 items-center flex flex-col justify-center w-full mx-auto py-10 md:py-20">
        {children}
      </section>
  );
}

const MissionSection = () => {
  return (
    <MissionLayout>
        <MissionContent />
        <MissionImages />
        <CirclesBackground circleNumber={20} />
    </MissionLayout>
  );
}

export default MissionSection;