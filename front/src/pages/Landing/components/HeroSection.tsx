import { CirclesBackground } from "../../../components/CircleIllustration";
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
        className="gradient-bg font-space w-fit px-5 py-1 text-md md:text-md rounded-3xl text-white dark:text-white mb-4"
      >
        {t("slogan")} 🚀
      </p>
      <h1
        data-aos="fade-right"
        data-aos-delay="100"
        className="font-monument text-2xl md:text-5xl leading-snug font-bold mb-4"
      >
        {t("headline1")}
      </h1>
      <h1
        data-aos="fade-right"
        data-aos-delay="400"
        className="font-monument text-2xl md:text-5xl font-bold mb-8 leading-snug"
      >
        <span className="font-normal px-4 mr-3 rounded bg-orange-400 text-white dark:text-black">
          {t("headline2")}
        </span>
        {t("headline3")}
      </h1>
      <p
        data-aos="fade-right"
        data-aos-delay="500"
        className="font-space mb-10 text-md md:text-md"
      >
        {t("subtext")}
      </p>
      <PrimaryButton type="button">
        <p className="font-monument font-bold text-md md:text-md">
          {t("read_more")}
        </p>
      </PrimaryButton>
    </div>
  );
};

const HeroIllustration = () => {
  const { t } = useTranslation("Landing");

  return (
    <div className="relative flex-1 flex justify-center items-center mt-10 md:mt-5">
      <div className="absolute bubble-text top-6 -left-5 reverse-gradient-bg text-white p-4 rounded-xl text-md">
        {t("title")}
      </div>
      <img
        data-aos="fade-left"
        src={Illustration}
        alt="Hero Illustration"
        className="w-full max-w-[300px] md:max-w-[800px] h-auto"
      />
    </div>
  );
};

const HeroLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <section className="hero-section min-h-[80vh] flex flex-col w-fit md:flex-row items-center justify-between py-10 md:py-5">
        {children}
      </section>
  );
};

const HeroSection = () => {
  return (
    <HeroLayout>
      <HeroContent />
      <HeroIllustration />
      <CirclesBackground circleNumber={20} />
    </HeroLayout>
  );
};

export default HeroSection;
