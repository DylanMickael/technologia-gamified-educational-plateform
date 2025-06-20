import { useState } from "react";
import ChoixPersoSection from "../../components/pre_enfant/first_login/ChoixPersoSection";
import DonnerNomSection from "../../components/pre_enfant/first_login/DonnerNomSection";
import BienvenuSection from "../../components/pre_enfant/first_login/BienvenuSection";
import NavbarLogo from "../../components/Navbar/Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../../hooks/api";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store"; // adapte le chemin
import { updateCompagnion } from "../../store/authSlice";
import Username from "../../components/Username";
function FirstLogin() {
  const navigate = useNavigate();
  const [robotChoisi, setRobotChoisi] = useState<string | null>(null);
  const [nomRobot, setNomRobot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  // Remet à zéro uniquement le nom
  const retourDepuisBienvenue = () => {
    setNomRobot(null);
  };

  // Revenir au choix du personnage
  const retourDepuisNom = () => {
    setRobotChoisi(null);
    setNomRobot(null);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${api}/auth/login/compagnon/${user?.id}`,
        {
          compagnon_nom: nomRobot,
          compagnon_type: robotChoisi,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.accesstoken}`,
          },
        }
      );

      // Mettre à jour le Redux store
      if (nomRobot && robotChoisi) {
        dispatch(
          updateCompagnion({
            compagnion_nom: nomRobot,
            compagnion_type: robotChoisi,
          })
        );
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Réinitialiser le succès après 2 secondes et naviguer
      setTimeout(() => {
        setIsSuccess(false);
        if (user?.category_id == 1) {
          navigate("/acceuilEnfant");
        } else if (response.data.user.category_id == 2) {
          navigate("/");
        } else {
          navigate("/");
        }
      }, 2000);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="
        landing-layout
        w-screen
        h-full
        flex 
        flex-col 
        items-center 
        min-h-screen 
    "
    >
      <div className="flex justify-between items-center w-full">
        <NavbarLogo></NavbarLogo>
        <Username></Username>
      </div>
      {!robotChoisi && (
        <ChoixPersoSection onChoix={(img) => setRobotChoisi(img)} />
      )}

      {robotChoisi && !nomRobot && (
        <DonnerNomSection
          robotImage={robotChoisi}
          onValiderNom={(nom) => setNomRobot(nom)}
          onBack={retourDepuisNom}
        />
      )}

      {robotChoisi && nomRobot && (
        <BienvenuSection
          robotImage={robotChoisi}
          nom={nomRobot}
          onBack={retourDepuisBienvenue}
          onValidate={handleSubmit}
        />
      )}
    </div>
  );
}

export default FirstLogin;
