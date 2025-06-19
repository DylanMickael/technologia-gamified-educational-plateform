import { useState } from "react";
import ChoixPersoSection from "../../components/pre_enfant/first_login/ChoixPersoSection";
import DonnerNomSection from "../../components/pre_enfant/first_login/DonnerNomSection";
import BienvenuSection from "../../components/pre_enfant/first_login/BienvenuSection";
function FirstLogin() {
  const [robotChoisi, setRobotChoisi] = useState<string | null>(null);
  const [nomRobot, setNomRobot] = useState<string | null>(null);

  return (
    <div>
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
        <BienvenuSection robotImage={robotChoisi} nom={nomRobot} />
      )}
    </div>
  );
}

export default FirstLogin;
