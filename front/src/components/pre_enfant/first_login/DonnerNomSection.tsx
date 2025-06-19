import { useState } from "react";
import CardRobot from "../CardRobot";
import { PrimaryButton } from "../../Buttons";
type Props = {
  robotImage: string;
  onValiderNom: (nom: string) => void;
  onBack: () => void;
};

function DonnerNomSection({ robotImage, onValiderNom, onBack }: Props) {
  const [nom, setNom] = useState("");
  return (
    <div className="flex justify-center items-center gap-4">
      <div
        data-aos="fade-right"
        className=" w-full min-w-md md:min-w-sm mx-auto "
      >
        <CardRobot image={robotImage}></CardRobot>
      </div>
      <div
        data-aos="fade-right"
        className=" w-full min-w-md md:min-w-sm mx-auto "
      >
        <h1
          data-aos="fade-right"
          data-aos-delay="400"
          className="font-monument text-2xl md:text-4xl font-bold mb-8"
        >
          Donne un nom à ton compagnon !
        </h1>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Ex: Roby, Lili..."
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
          onClick={() => nom && onValiderNom(nom)}
          className="w-full flex justify-end items-center mt-4"
        >
          <PrimaryButton type="button">
            <p className="font-monument font-bold text-sm md:text-md">
              Valider
            </p>
          </PrimaryButton>
        </div>
        <div
          onClick={onBack}
          className="w-full flex justify-end items-center mt-4"
        >
          <PrimaryButton type="button">
            <p className="font-monument font-bold text-sm md:text-md">
              Retouner
            </p>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default DonnerNomSection;
