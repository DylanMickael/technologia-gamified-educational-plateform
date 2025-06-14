import NavbarLogo from "../../components/navbar/Logo";
import { PrimaryButton } from "../../components/Buttons";
import { AnimatedDiv } from "../../components/AnimationComponents";
import { infiniteSlideUpAndZoomIn } from "../../animations/slideAndZoom";
import Illustration from "../../../src/assets/img/dashboard.illustration.png";

function Register() {
  return (
    <RegisterLayout>
      <div className="flex justify-between items-center">
        <NavbarLogo></NavbarLogo>
        <PrimaryButton type="button">
          <p className="font-monument font-bold text-sm md:text-md">
            {" "}
            go back{" "}
          </p>
        </PrimaryButton>
      </div>

      <div className="w-[90%] flex justify-between items-center m-auto my-10 gap-4">
        <RegisterIllustration></RegisterIllustration>
        <RegisterForm></RegisterForm>
      </div>
    </RegisterLayout>
  );
}

export default Register;

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-aos="fade-in" className="animated-cursor w-full">
      <section className="hero-section flex flex-col max-w-[90rem] mx-auto py-10 md:py-20">
        {children}
      </section>
    </div>
  );
};

const RegisterIllustration = () => {
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

const RegisterForm = () => {
  return (
    <div
      data-aos="fade-right"
      className="flex-1 flex flex-col items-start justify-center px-10 md:px-0"
    >
      <h1
        data-aos="fade-right"
        data-aos-delay="100"
        className="font-monument text-2xl md:text-4xl leading-snug font-bold mb-4 max-w-[700px]"
      >
        Sign in to EcoCity
      </h1>
      <p
        data-aos="fade-right"
        data-aos-delay="200"
        className="font-space w-fit px-5 py-1 text-sm md:text-md rounded-3xl bg-green-700 text-white dark:text-white mb-4"
      >
        Shape your World with the Force of Renewables.
      </p>
      <p
        data-aos="fade-right"
        data-aos-delay="500"
        className="font-space mb-10 text-sm md:text-md"
      >
        Design your sustainable city, powered by clean and renewable energy.
      </p>
      <Form></Form>
    </div>
  );
};

const Form = () => {
  return (
    <div
      data-aos="fade-right"
      className=" w-full min-w-md md:min-w-sm mx-auto "
    >
      <h1 className="text-2xl font-monument font-bold mb-6 text-gray-800 dark:text-gray-100">
        {/* {t("contact_form_title")} */}
      </h1>
      <form action="" className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          // placeholder={t("email_placeholder")}
          placeholder="Email adress"
          required
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="password"
          type="password"
          // placeholder={t("email_placeholder")}
          placeholder="Password"
          required
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="confirmed_password"
          type="password"
          // placeholder={t("email_placeholder")}
          placeholder="Confirm password"
          required
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center justify-start gap-2  px-2">
          <input type="checkbox" />
          <p className="text-sm text-gray-600 dark:text-gray-300 ">
            I accept the terms of uses and the privacy policy
          </p>
        </div>
        <div className=" flex justify-between items-center px-2 mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 ">
            already have an account?
          </p>
          <PrimaryButton type="submit">
            <p className="font-monument font-bold text-sm md:text-md">
              {/* {t("send_button")} */}
              Sign In
            </p>
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
