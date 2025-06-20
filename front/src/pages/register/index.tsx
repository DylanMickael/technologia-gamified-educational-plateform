import NavbarLogo from "../../components/Navbar/logo";
import { motion, AnimatePresence } from "framer-motion"
import { PrimaryButton } from "../../components/Buttons";
import { AnimatedDiv } from "../../components/AnimationComponents";
import { infiniteSlideUpAndZoomIn } from "../../animations/slideAndZoom";
import Illustration from "../../../src/assets/img/dashboard.illustration.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { api } from "../../hooks/api";
import gamin2 from "../../assets/gamin2.png"
import { AlertCircle, Check, Eye, EyeOff, Lock, Mail, User, Calendar} from "lucide-react";
interface FormData {
  nom: string,
  category_id : number,
  email: string;
  password: string;

}

interface FormErrors {
  nom?: string
  email?: string;
  password?: string;
  server?: string;
}

interface InscriptionResponse {
  access: string;
  refresh?: string;
}

interface ErrorResponse {
  message?: string;
  detail?: string;
}

function Register() {
  return (
    <RegisterLayout>
      <div className="landing-layout flex justify-between items-center overflow-hidden">
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
            <Link to="/">Retour</Link>
          </button>
      </div>

      <div className="w-[90%] flex flex-row justify-evenly  w-full items-center m-auto my-10 gap-4">
        <RegisterIllustration></RegisterIllustration>
        <RegisterForm></RegisterForm>
      </div>
    </RegisterLayout>
  );
}

export default Register;

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-aos="fade-in" className="animated-cursor w-full ">
      <section className="hero-section flex flex-col  mx-auto py-10 md:py-20">
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
              src={gamin2}
              alt="gamin"
              className="w- h-[600px]"
            />
    </AnimatedDiv>
  );
};

const RegisterForm = () => {
  return (
    <div
      data-aos="fade-right"
      className="flex-1 flex flex-col items-start justify-center gap-5"
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
  const navigate = useNavigate();
  
  // États du composant
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    nom:"",
    category_id : 1,
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  
 console.log(formData)

  // Fonction de mise à jour des champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
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


    // Validation du pseudo
    if (!formData.nom.trim()) {
      newErrors.nom = "Le champs nom requis"
    } else if (formData.nom.length < 3) {
      newErrors.nom = "Le nom doit contenir au moins 3 caractères"
    }


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
      const response = await axios.post<InscriptionResponse>(
        `${api}/auth/inscription`,
        {
          nom :  formData.nom,
          category_id :  formData.category_id,
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
          nom:"",
          category_id : 1,
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
    <div
      data-aos="fade-right"
      className="flex items-start"
    >
     
      <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ nom */}
              <div className="">

                <div className="relative">
                  <div
                    className={`absolute inset-y-0 left-0 w-full flex items-center pl-3 pointer-events-none`}
                  >
                    <User size={18}  />
                  </div>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className={`w-[500px] rounded-lg bg-white py-5 px-10 text-md border border-gray-200`}
                    placeholder="Nom"
                  />
                  {errors.nom && (
                    <motion.p
                      className="mt-1 text-sm text-red-500 flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle size={14} className="mr-1" />
                      {errors.nom}
                    </motion.p>
                  )}
                </div>
              </div>

               {/* Champ Age */}
              <div className="">

                <div className="relative">
                  <div
                    className={`absolute inset-y-0 left-0 w-full flex items-center pl-3 pointer-events-none`}
                  >
                    <Calendar size={18}  />
                  </div>
                 <select
                  value={formData.category_id}
                  name="category_id"
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white py-5 px-10 text-md border border-gray-200"
                >
                  <option value={1}>3 - 7 ans</option>
                  <option value={2}>8 - 14 ans</option>
                  <option value={3}>15 - 18 ans</option>
                </select>
                </div>
              </div>

              {/* Champ Email */}
              <div className="">
               
                <div className="relative">
                  <div
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none`}
                  >
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-lg  bg-white py-5 px-10 px-10 text-md border border-gray-200`}
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
              </div>

              {/* Champ Mot de passe */}
              <div className="">
                <div className="relative">
                  <div
                    className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none`}
                  >
                    <Lock size={18}/>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full py-5 px-10 rounded-lg bg-white p-5 text-md border border-gray-200`}
                    placeholder="Votre Mot de passE"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 flex items-center pr-3`}
                  >
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
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
                  transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                   Inscription en cours ...
                  </div>
                ) : (
                 <> S'incrire</>
                )}
              </motion.button>

              {/* Message de succès */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    className={`mt-4 p-3 rounded-lg flex items-center`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Check size={18} className="mr-2 flex-shrink-0" />
                    <span>
                      Inscription réussie ! Bienvenue dans l'aventure.
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
    </div>
  );
};
