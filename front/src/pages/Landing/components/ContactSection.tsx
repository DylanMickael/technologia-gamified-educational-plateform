import { useTranslation } from "react-i18next";
import ContactForm from './ContactForm';
import { CirclesBackground } from "../../../components/CircleIllustration";

const ContactContent = () => {
    const { t } = useTranslation('Landing');

    return (
        <div className="flex-1 flex flex-col items-start justify-center px-4 md:px-0">
            <h1 data-aos="fade-right" data-aos-delay="300" className="font-monument text-2xl md:text-4xl leading-snug font-bold mb-4 max-w-[700px]">
              {t('contact_title')}
            </h1>
            <p data-aos="fade-right" data-aos-delay="100" className="font-space mb-10 text-md md:text-md">
              {t('contact_text')}
            </p>
        </div>
    )
}

const ContactLayout = ({
  children
}:{
    children: React.ReactNode
}) => {

  return (
    <div data-aos="fade-in">
      <section className="contact-section flex flex-col md:flex-row gap-10 md:gap-40 items-center justify-center w-full max-w-7xl mx-auto mt-8">
        {children}
      </section>
    </div>
  );
}

const ContactSection = () => {
  return (
    <ContactLayout>
        <ContactContent />
        <ContactForm />
        <CirclesBackground circleNumber={20} />
    </ContactLayout>
  );
}

export default ContactSection;