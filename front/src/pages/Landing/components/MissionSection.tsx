import { useTranslation } from "react-i18next";
import Mission1 from '../../../assets/img/Mission1.png';
import Mission2 from '../../../assets/img/Mission2.png';
import Mission3 from '../../../assets/img/Mission3.png';
import { CirclesBackground } from "../../../components/CircleIllustration";

const MissionContent = () => {
    const { t } = useTranslation('Landing');

    return (
        <div>
            <h1 data-aos="fade-right" data-aos-delay="300" className="font-monument font-bold mb-10 text-4xl">{t('mission_title')}</h1>
        </div>
    )
}

const MissionCard = ({text, src, delay}:{text:string, src:string, delay:string}) => {
    return (
        <div data-aos="slide-up" data-aos-delay={delay} className="mission-card gounded-l bg-background-light mb-5 flex flex-col justify-between pt-10 px-5 rounded-3xl max-w-100">
            <p className="text-center text-xl font-bold font-monument text-black dark:text-black">{text}</p>
            <img className="max-w-80" src={src} alt="" />
        </div>
    )
}

const MissionImages = () => {
    const { t } = useTranslation('Landing');
    return (
        <div data-aos="fade-in" className="flex flex-col md:flex-row gap-20">
            <MissionCard src={Mission1} delay="200" text={t('mission_card_1')}/>
            <MissionCard src={Mission2} delay="400" text={t('mission_card_2')}/>
            <MissionCard src={Mission3} delay="600" text={t('mission_card_3')}/>
        </div>
    )
}

const MissionLayout = ({
  children
}:{
    children: React.ReactNode
}) => {

  return (
    <div data-aos="fade-in">
      <section className="Mission-section gap-5 items-center justify-center w-full max-w-7xl mx-auto py-10 md:py-20">
        {children}
      </section>
    </div>
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