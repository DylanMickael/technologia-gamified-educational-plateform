import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import NavbarLogo from "../components/navbar/Logo";
import city from "../assets/CITY.png";
import { AnimatedDiv } from "../components/AnimationComponents";
import { Link, useNavigate } from 'react-router-dom';
import { infiniteSlideUpAndZoomIn } from "../animations/slideAndZoom";
import { useState, type JSX } from "react";
import gamin from "../assets/gamin.png";
import { api } from "../hooks/api";
import axios, { AxiosError } from "axios";
import { AlertCircle, Eye, EyeOff, Lock, Mail } from "lucide-react";

// Interfaces TypeScript
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

export default function Login(): JSX.Element {
  const { t } = useTranslation("Login");
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

  // Fonction de traduction (à implémenter selon votre logique)
  const Traduction = (fr: string, en: string, mg: string): string => {
    // Logique de traduction selon la langue actuelle
    // Pour l'instant, retourne le français par défaut
    return fr;
  };

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

      // Stocker le token
      localStorage.setItem("token", response.data.access);
      
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
        server: Traduction(
          "Erreur de connexion. Vérifiez vos identifiants.",
          "Login error. Check your credentials.",
          "Hadisoana amin'ny fidirana. Hamarino ny fampahalalana anao."
        ),
      });
    }
  };

  return (
    <div className="landing-layout px-20 py-10 h-screen">
      <div className="hero-section flex flex-col justify-around h-full">
        <div className="flex flex-row justify-between">
          <NavbarLogo />
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
        
        <div className="flex flex-row justify-evenly">
          <div className="space-y-10">
            <div className="flex flex-col gap-5">
              <h1 
                data-aos="fade-right" 
                data-aos-delay="100" 
                className="font-monument text-3xl md:text-4xl leading-snug font-bold max-w-[700px]"
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
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="flex flex-col space-y-5">
                {/* Champ Email */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full p-5 rounded-lg bg-white border border-gray-2 text-xl"
                    placeholder="Votre email"
                  />
                  {errors.email && (
                    <motion.p
                      className="mt-1 text-sm text-red-500 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Champ Mot de passe */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 w-full p-5 rounded-lg bg-white border border-gray-2 text-xl"
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <motion.p
                      className="mt-1 text-sm text-red-500 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {errors.password}
                    </motion.p>
                  )}
                </div>
              </div>
              
              {/* Erreur serveur */}
              {errors.server && (
                <motion.p
                  className="text-sm text-red-500 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={14} className="mr-1" />
                  {errors.server}
                </motion.p>
              )}
              
              <div className="flex flex-row justify-between">
                <p 
                  data-aos="fade-right" 
                  data-aos-delay="500" 
                  className="font-space text-sm md:text-sm"
                >
                  Mot de passe oublié ?
                </p>
              </div>
              
              {/* Bouton de soumission */}
              <motion.button
                type="submit"
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
                  transition-colors
                  disabled:opacity-50
                  disabled:cursor-not-allowed"
                style={{ fontFamily: "Poppins" }}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Connexion en cours ....
                  </div>
                ) : (
                  <>Connexion</>
                )}
              </motion.button>
              
              {/* Message de succès */}
              {isSuccess && (
                <motion.p
                  className="text-sm text-green-500 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Connexion réussie ! Redirection en cours...
                </motion.p>
              )}
            </form>
          </div>
          
          <AnimatedDiv variants={infiniteSlideUpAndZoomIn}>
            <img
              src={gamin}
              alt="gamin"
              className="w-[600px] h-[500px]"
            />
          </AnimatedDiv>
        </div>
      </div>
    </div>
  );
}