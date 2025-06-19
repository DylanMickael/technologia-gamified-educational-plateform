import { PrimaryButton } from "../../../components/Buttons";
import Illustration from "../../../assets/img/dashboard.illustration.png";
import { useTranslation } from "react-i18next";
import { AnimatedDiv } from "../../../components/AnimationComponents";
import { infiniteSlideUpAndZoomIn } from "../../../animations/slideAndZoom";

const HeroContent = () => {
  const { t } = useTranslation("Landing");

  return (
    <div
      data-aos="fade-right"
      className="flex-1 flex flex-col items-start justify-center px-4 md:px-0"
    >
      <p
        data-aos="fade-right"
        data-aos-delay="200"
        className="font-space w-fit px-5 py-1 text-sm md:text-md rounded-3xl bg-green-700 text-white dark:text-white mb-4"
      >
        {t("slogan")}
      </p>
      <h1
        data-aos="fade-right"
        data-aos-delay="100"
        className="font-monument text-2xl md:text-4xl leading-snug font-bold mb-4 max-w-[700px]"
      >
        {t("headline1")}
      </h1>
      <h1
        data-aos="fade-right"
        data-aos-delay="400"
        className="font-monument text-2xl md:text-4xl font-bold mb-8"
      >
        <span className="font-normal px-4 mr-3 rounded bg-yellow-400 text-white dark:text-black">
          {t("headline2")}
        </span>
        {t("headline3")}
      </h1>
      <p
        data-aos="fade-right"
        data-aos-delay="500"
        className="font-space mb-10 text-sm md:text-md"
      >
        {t("subtext")}
      </p>
      <PrimaryButton type="button">
        <p className="font-monument font-bold text-sm md:text-md">
          {t("read_more")}
        </p>
      </PrimaryButton>
    </div>
  );
};

const HeroIllustration = () => {
  return (
    <AnimatedDiv
      variants={infiniteSlideUpAndZoomIn}
      className="flex-1 flex justify-center items-center mt-8 md:mt-0"
    >
      <img
        src={Illustration}
        alt="Hero Illustration"
        className="w-full max-w-[400px] md:max-w-[700px] h-auto"
      />
    </AnimatedDiv>
  );
};

const HeroLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-aos="fade-in" className="animated-cursor w-full">
      <section className="hero-section flex flex-col w-fit md:flex-row items-center justify-center max-w-[90rem] mx-auto py-10 md:py-20">
        {children}
      </section>
    </div>
  );
};

const HeroSection = () => {
  return (
    <HeroLayout>
      <HeroContent />
      <HeroIllustration />
    </HeroLayout>
  );
};

export default HeroSection;
