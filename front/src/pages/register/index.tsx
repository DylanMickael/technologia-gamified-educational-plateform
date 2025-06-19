import NavbarLogo from "../../components/navbar/Logo";
import { PrimaryButton } from "../../components/Buttons";
import { AnimatedDiv } from "../../components/AnimationComponents";
import { infiniteSlideUpAndZoomIn } from "../../animations/slideAndZoom";
import Illustration from "../../../src/assets/img/dashboard.illustration.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { api } from "../../hooks/api";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  server?: string;
}

interface LoginResponse {
  access: string;
  refresh?: string;
}

interface ErrorResponse {
  message?: string;
  detail?: string;
}

function Register() {

   const navigate = useNavigate();
  
  // États du composant
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  
 console.log(formData)

  // Fonction de mise à jour des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Nettoyer l'erreur du champ modifié
    if (errors[name as keyof FormErrors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await axios.post<LoginResponse>(
        `${api}/auth/login/`,
        {
          email: formData.email,
          password: formData.password
        }
      );
      
    console.log(response.data)
      
      setIsSubmitting(false);
      setIsSuccess(true);

      // Réinitialiser le succès après 2 secondes et naviguer
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/hall");
      }, 2000);

    } catch (error) {
      console.error('Erreur de connexion:', error);
      setIsSubmitting(false);
      
      const axiosError = error as AxiosError<ErrorResponse>;
      setErrors({
        server: "Erreur de connexion. Vérifiez vos identifiants."
      });
    }
  };

  return (
    <RegisterLayout>
      <div className="flex justify-between items-center">
        <NavbarLogo></NavbarLogo>
        <button
            className="
              font-space 
              bg-background-orange
              text-white 
              px-4 
              py-2 
              rounded-xl 
              text-xl
              hover:bg-orange-900
              hover:text-white 
              transition-colors"
          >
            <Link to="/">Rétour</Link>
          </button>
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
         Bienvenu sur TecnoloGIa
      </h1>
      <p
        data-aos="fade-right"
        data-aos-delay="200"
        className="gradient-bg font-space w-fit px-5 py-1 text-md md:text-md rounded-3xl text-white dark:text-white mb-4"
      >
        Démarrez l'aventure avec nous 🚀
      </p>
      <p
        data-aos="fade-right"
        data-aos-delay="500"
         className="font-space text-sm md:text-lg"
      >
         Préparons ensemble la prochaine génération de talents tech.
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
