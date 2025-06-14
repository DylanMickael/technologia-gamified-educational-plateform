import LandingLayout from '../../layouts/LandingLayout';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import BannerSection from './components/BannerSection';
import ContactSection from './components/ContactSection';
import AnimatedCursor from '../../components/AnimatedCursor';
import butterflyCursor from '../../assets/cursors/Butterfly.ani';
import birdCursor from '../../assets/cursors/Bird.ani';

const Landing = () => {

  return (
    <LandingLayout>
      <HeroSection/>
      <AboutSection/>
      <BannerSection/>
      <ContactSection/>      
      <AnimatedCursor 
        selector=".animated-cursor" 
        cursor={butterflyCursor}
        darkCursor={birdCursor}
      />
    </LandingLayout>
  );
};

export default Landing;