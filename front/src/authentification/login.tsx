import { ThemeTogglerButton } from "../components/ThemeToggler"
import LanguageSwitcher from "../components/LanguageSwitcher"
import { useTranslation } from "react-i18next"
import NavbarLogo from "../components/navbar/Logo"
import city from "../assets/CITY.png"
import { AnimatedDiv } from "../components/AnimationComponents"
import { Link } from 'react-router-dom';
import { infiniteSlideUpAndZoomIn } from "../animations/slideAndZoom"
export default function Login() {
  const { t } = useTranslation("Login")
  return (
  <div className="px-20 py-10   h-screen">
   <div className="hero-section flex flex-col justify-around  h-full">
     <div className="flex flex-row justify-between">
      <NavbarLogo/>
      <button
      className="
            font-space 
            text-md
            bg-green-700 
            text-white 
            px-4 
            py-2
            rounded-lg
            hover:bg-green-600 
            hover:text-white 
            transition-colors"
      >
       <Link to="/">{t("back")}</Link>
      </button>
    </div>
      <div className="flex flex-row justify-evenly items-center">
        <div className="space-y-10">
        <div className="flex flex-col gap-5">
          <h1 data-aos="fade-right" data-aos-delay="100" className="font-monument text-3xl md:text-4xl leading-snug font-bold max-w-[700px]">
            {t("title")}
          </h1>
            <p data-aos="fade-right" data-aos-delay="200" className="font-space w-fit px-5 py-1 text-sm md:text-lg rounded-3xl bg-green-700 text-white dark:text-white ">
                  {t('slogan')}
            </p>
            <p data-aos="fade-right" data-aos-delay="500" className="font-space  text-sm md:text-lg">
              {t("subtext")}
            </p>
        </div>
        <form className="space-y-10">
          <div className="flex flex-col space-y-5">
              <input  className="bg-white broder border-1 border-gray-500 dark:border-0 dark:bg-gray-800 rounded-xl px-10 py-4 text-md text-black dark:text-white" placeholder={t("placeholder_mail")}/>
              <input  className="bg-white broder border-1 border-gray-500 dark:border-0 dark:bg-gray-800 rounded-xl px-10 py-4 text-md text-black dark:text-white" placeholder={t("placeholder_password")}/>
          </div>
          <div className="flex flex-row justify-between">
            <Link to="/faciale" data-aos="fade-right" data-aos-delay="500" className="font-space  text-sm md:text-sm">
              {t("faciale")}
            </Link>
             <p data-aos="fade-right" data-aos-delay="500" className="font-space  text-sm md:text-sm">
              {t("forgot")}
            </p>
          </div>
          <button
          type="submit"
            className="
                  font-space 
                  text-md
                  bg-green-700 
                  text-white 
                  px-4 
                  py-2
                  rounded-lg
                  hover:bg-green-600 
                  hover:text-white 
                  transition-colors"
            >
              {t("connexion")}
          </button>
            </form>
            </div>
              <AnimatedDiv variants={infiniteSlideUpAndZoomIn}>
                <img
                  src={city}
                  alt="Hero Illustration"
                  className="w-full max-w-[400px] md:max-w-[700px] h-auto"
                />
              </AnimatedDiv>
      </div>
    
      <div className="flex justify-end">
          <div className="flex flex-row items-center gap-5 border-b-1  border-black">
          <ThemeTogglerButton/>
          <LanguageSwitcher/>
        </div>
      </div>
   </div>
  </div>
  )
}
