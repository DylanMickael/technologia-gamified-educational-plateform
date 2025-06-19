import { useTranslation } from "react-i18next";
import { PrimaryButton } from "../../../components/Buttons";

const ContactForm = () => {
  const { t } = useTranslation('Landing');

  return (
    <div data-aos="fade-left">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl px-10 py-10 w-full min-w-sm md:min-w-lg mx-auto">
        <h1 className="text-2xl font-monument font-bold mb-6 text-gray-800 dark:text-gray-100">
          {t('contact_form_title')}
        </h1>
        <form action="" className="flex flex-col gap-4">
            <input 
              name="first-name" 
              type="text" 
              placeholder={t('first_name_placeholder')} 
              required 
              className="px-6 py-4 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              name="last-name" 
              type="text" 
              placeholder={t('last_name_placeholder')} 
              required 
              className="px-6 py-4 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              name="email" 
              type="email" 
              placeholder={t('email_placeholder')} 
              required 
              className="px-6 py-4 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              name="phone-number" 
              type="tel" 
              placeholder={t('phone_number_placeholder')} 
              pattern="[0-9]*" 
              required 
              className="px-6 py-4 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea 
              placeholder={t('message_placeholder')} 
              required 
              className="px-6 py-4 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
            />
            <PrimaryButton type='submit'>
                <p className="font-monument font-bold text-md md:text-md">
                  {t('send_button')}
                </p>
            </PrimaryButton>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;