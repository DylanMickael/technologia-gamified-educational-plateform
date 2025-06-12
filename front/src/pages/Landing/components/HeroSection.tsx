import { PrimaryButton } from "../../../components/Buttons";
import Illustration from '../../../assets/img/dashboard.illustration.png';
import { useTranslation } from 'react-i18next';

const HeroContent = () => {
    const { t } = useTranslation('Landing');

    return (
        <div className="flex-1 flex flex-col items-start justify-center px-4 md:px-0">
            <p className="w-fit px-5 py-1 text-base md:text-lg rounded-3xl bg-green-700 text-white dark:text-white mb-4">
                {t('slogan')}
            </p>
            <h1 className="text-4xl md:text-6xl leading-snug font-bold mb-4 max-w-[600px]">
                {t('headline1')}
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
                <span className="px-4 mr-3 rounded bg-yellow-300 text-white dark:text-black">
                    {t('headline2')}
                </span>
                {t('headline3')}
            </h1>
            <p className="mb-10 text-base md:text-lg">{t('subtext')}</p>
            <PrimaryButton>
                <p className="font-bold text-lg md:text-xl">{t('read_more')}</p>
            </PrimaryButton>
        </div>
    )
}

const HeroIllustration = () => {
  return (
    <div className="flex-1 flex justify-center items-center mt-8 md:mt-0">
      <img
        src={Illustration}
        alt="Hero Illustration"
        className="w-full max-w-[400px] md:max-w-[700px] h-auto"
      />
    </div>
  );
}

const HeroLayout = ({
  children
}:{
    children: React.ReactNode
}) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto py-10 md:py-20">
      {children}
    </section>
  );
}

const HeroSection = () => {
  return (
    <HeroLayout>
        <HeroContent />
        <HeroIllustration />
    </HeroLayout>
  );
}

export default HeroSection;