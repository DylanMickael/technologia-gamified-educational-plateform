import React from "react";
import CardRobot from "../CardRobot";
import { PrimaryButton } from "../../Buttons";
import { Link } from "react-router-dom";

type Props = {
  robotImage: string;
  nom: string;
};
function BienvenuSection({ robotImage, nom }: Props) {
  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        <div
          data-aos="fade-right"
          className=" w-full min-w-md md:min-w-sm mx-auto "
        >
          <h1
            data-aos="fade-right"
            data-aos-delay="400"
            className="font-monument text-2xl md:text-4xl font-bold mb-8"
          >
            BIENVENUE <br />
            parmis nous
          </h1>
        </div>
        <div
          data-aos="fade-right"
          className=" w-full min-w-md md:min-w-sm mx-auto "
        >
          <h2 className="text-2xl font-bold">
            Bienvenue ! Je suis <span className="text-blue-500">{nom}</span>,
          </h2>
          <p className="mt-2 text-lg">
            Prêt(e) à apprendre et t’amuser avec moi ? 🚀
          </p>

          <CardRobot image={robotImage}></CardRobot>
        </div>
      </div>

      <div className="w-full flex justify-end items-center mt-4">
        <Link to={"/"}></Link>
        <PrimaryButton type="button">
          <p className="font-monument font-bold text-sm md:text-md">Valider</p>
        </PrimaryButton>
      </div>
    </div>
  );
}

export default BienvenuSection;
