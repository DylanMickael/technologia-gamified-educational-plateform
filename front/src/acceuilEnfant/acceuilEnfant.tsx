import React from "react";
import quizz from "../assets/QUIZZ.png";
import dessin from "../assets/dessin.png";
import puzzle from "../assets/puzzle.png";
import { Link } from "react-router-dom";
import Username from "../components/Username";
import NavbarLogo from "../components/Navbar/Logo";
function AcceuilEnfant() {
  return (
    <div className="landing-layout  h-screen overflow-hidden p-10 ">
      <div className="hero-section">
        <div className="flex justify-between items-center">
          <NavbarLogo />
          <Username></Username>
        </div>

        <div className="flex flex-col h-screen gap-4 mt-10">
          <h1 className="font-monument text-3xl md:text-3xl leading-snug font-bold text-center ">
            Bonjour petit explorateur !
          </h1>
          <h1 className="font-monument text-3xl md:text-5xl leading-snug font-bold text-center text-orange-500 mb-10">
            CHOISISSEZ CE QUE VOUS ALLEZ FAIRE
          </h1>
          <div className="flex flex-row justify-evenly items-center">
            <Link
              to="/acceuilEnfant/apprentissage"
              className="flex flex-col justify-center w-1/5 items-center gap-5 rounded-3xl bg-gradient-to-br from-[#C95792]/20 to-[#EDA998]/20 p-8"
            >
              <div className="flex flex-col gap-5 items-center">
                <img
                  src={puzzle}
                  alt="quizz"
                  className="w-48 h-48 rounded-2xl"
                />
                <h1 className="font-monument text-xl md:text-2xl leading-snug font-bold ">
                  Apprentissage
                </h1>
              </div>
            </Link>
            <Link
              to="/acceuilEnfant/quizz"
              className="flex flex-col justify-center w-1/5 items-center gap-5 rounded-3xl bg-gradient-to-br from-[#C95792]/20 to-[#EDA998]/20 p-8"
            >
              <div className="flex flex-col gap-5 items-center">
                <img
                  src={quizz}
                  alt="quizz"
                  className="w-48 h-48 rounded-2xl"
                />
                <h1 className="font-monument text-xl md:text-2xl leading-snug font-bold ">
                  QUIZZ
                </h1>
              </div>
            </Link>
            <Link
              to="/acceuilEnfant/paintKids"
              className="flex flex-col justify-center w-1/5  gap-5 rounded-3xl bg-gradient-to-br from-[#C95792]/20 to-[#EDA998]/20 p-8"
            >
              <div className="flex flex-col gap-5 items-center">
                <img
                  src={dessin}
                  alt="quizz"
                  className="w-48 h-48 rounded-2xl"
                />
                <h1 className="font-monument text-xl md:text-2xl leading-snug font-bold ">
                  COLORIAGE
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcceuilEnfant;
