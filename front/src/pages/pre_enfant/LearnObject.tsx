"use client";

import { useEffect, useState } from "react";
import { objects } from "../../data/pre_enfant/info_object";
import { ObjectCard } from "../../components/pre_enfant/games/object-card";
import { ArrowLeftIcon } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { PrimaryButton } from "../../components/Buttons";
import Username from "../../components/Username";
import NavbarLogo from "../../components/Navbar/Logo";
export default function LearnObject() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  useEffect(() => {
    // Charger les voix disponibles
    if ("speechSynthesis" in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Sélectionne une voix douce en français
        console.log("les voix");
        console.log(voices);
        console.log("les voix");
        const selected =
          voices.find((v) => v.name.toLowerCase().includes("eloise")) ||
          voices.find(
            (v) => v.name.toLowerCase().includes("google") && v.lang === "fr-FR"
          ) ||
          voices.find((v) => v.lang === "fr-FR");

        if (selected) {
          setVoice(selected);
          console.log(voice);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const nextObject = () => {
    setCurrentIndex((prev) => (prev + 1) % objects.length);
  };

  const prevObject = () => {
    setCurrentIndex((prev) => (prev - 1 + objects.length) % objects.length);
  };

  const welcomeMessage = () => {
    if ("speechSynthesis" in window && voice) {
      const utterance = new SpeechSynthesisUtterance(
        "Bonjour ! Clique sur les objets pour apprendre leurs noms !"
      );
      utterance.voice = voice;
      utterance.rate = 0.8;
      utterance.pitch = 1.4;
      utterance.lang = "fr-FR";
      window.speechSynthesis.speak(utterance);
    }
    setShowWelcome(false);
  };

  return (
    <div className="w-full p-4">
      {/* En-tête */}
      <div className="flex justify-between items-center w-full">
        <NavbarLogo></NavbarLogo>
        <Username></Username>
      </div>
      <header className="text-center mb-4">
        <h1
          data-aos="fade-right"
          data-aos-delay="400"
          className="font-monument text-2xl md:text-4xl font-bold mb-8"
        >
          Apprends avec moi !
        </h1>
        <p className="text-2xl text-pink-600 font-semibold">
          Découvre les objets et leurs noms
        </p>
      </header>

      {/* Compteur d'objets */}
      <div className="text-center mb-6">
        <div className="inline-block">
          <span className="text-sm font-bold ">
            Objet {currentIndex + 1} sur {objects.length}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-8 w-full">
        {/* Carte de l'objet actuel */}
        <div onClick={prevObject}>
          <PrimaryButton type="button">
            <ArrowLeftIcon size={40}></ArrowLeftIcon>
          </PrimaryButton>
        </div>
        <div className=" md:w-[500px] mx-auto mb-8 ">
          <ObjectCard object={objects[currentIndex]} />
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={nextObject}>
            <PrimaryButton type="button">
              <ArrowRightIcon size={40}></ArrowRightIcon>
            </PrimaryButton>
          </button>
        </div>
      </div>

      {/* Grille de tous les objets (miniatures)
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-pink-600 text-center mb-4">
          Tous les objets :
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {objects.map((obj, index) => (
            <div
              key={obj.id}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer rounded-2xl border-3 p-2 transition-all duration-300 hover:scale-105 ${
                index === currentIndex
                  ? "border-pink-500 bg-pink-100 shadow-lg"
                  : "border-orange-300 bg-white hover:border-pink-400"
              }`}
            >
              <img
                src={obj.image || "/placeholder.svg"}
                alt={obj.name}
                className="w-full h-16 object-cover rounded-xl"
              />
              <p className="text-center text-sm font-bold text-pink-600 mt-1">
                {obj.name}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
