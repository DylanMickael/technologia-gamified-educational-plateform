import React from "react";
import CardRobot from "../CardRobot";
import { PrimaryButton } from "../../Buttons";
import { SecondaryButton } from "../../Buttons";

type Props = {
  robotImage: string;
  nom: string;
  onBack: () => void;
  onValidate: () => Promise<void>;
};
function BienvenuSection({ robotImage, nom, onBack, onValidate }: Props) {
  return (
    <div>
      <h1
        data-aos="fade-right"
        data-aos-delay="400"
        className="font-monument text-2xl md:text-4xl font-bold mb-8 text-center mt-12 text-orange-400"
      >
        BIENVENUE parmis nous
      </h1>
      <div className="flex justify-center items-center gap-4">
        <div
          data-aos="fade-right"
          className=" w-full min-w-md md:min-w-sm mx-auto "
        >
          <h2 className="text-2xl font-bold">
            Coucou! Je suis <span className="text-orange-500">{nom}</span>,
          </h2>
          <p className="mt-2 text-lg">
            Prêt(e) à apprendre et t’amuser avec moi ? 🚀
          </p>
        </div>
        <div
          data-aos="fade-right"
          className=" w-full min-w-md md:min-w-sm mx-auto "
        >
          <CardRobot image={robotImage}></CardRobot>
        </div>
      </div>

      <div className="w-full flex justify-end items-center mt-4">
        <div className="flex justify-between items-center w-full ">
          <div onClick={onBack} className="w-full flex items-center mt-4">
            <SecondaryButton type="button">
              <p className="font-space font-bold text-md md:text-md">
                Retouner
              </p>
            </SecondaryButton>
          </div>
          <div onClick={onValidate} className=" mt-4">
            <PrimaryButton type="button">
              <p className="font-space font-bold text-md md:text-md">Valider</p>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BienvenuSection;
