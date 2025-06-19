"use client";

import { useEffect, useState } from "react";
import { objects } from "../../data/pre_enfant/info_object";
import { ObjectCard } from "../../components/pre_enfant/games/object-card";

export default function LearningPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-orange-200 to-pink-300 p-4">
      {/* Message de bienvenue */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 border-4 border-pink-400 shadow-2xl text-center max-w-md">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              Bonjour petit explorateur !
            </h2>
            <p className="text-orange-600 mb-6">
              Clique sur les objets pour apprendre leurs noms avec moi !
            </p>
            <button
              onClick={welcomeMessage}
              className="bg-gradient-to-r from-pink-400 to-orange-400 text-white px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              Commencer ! 🚀
            </button>
          </div>
        </div>
      )}

      {/* En-tête */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-pink-600 mb-2 drop-shadow-lg">
          🌟 Apprends avec moi ! 🌟
        </h1>
        <p className="text-2xl text-orange-600 font-semibold">
          Découvre les objets et leurs noms
        </p>
      </header>

      {/* Compteur d'objets */}
      <div className="text-center mb-6">
        <div className="inline-block bg-white rounded-full px-6 py-2 border-3 border-pink-400 shadow-lg">
          <span className="text-xl font-bold text-pink-600">
            Objet {currentIndex + 1} sur {objects.length}
          </span>
        </div>
      </div>

      {/* Carte de l'objet actuel */}
      <div className="max-w-md mx-auto mb-8">
        <ObjectCard object={objects[currentIndex]} />
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={prevObject}
          className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg flex items-center space-x-2"
        >
          <span>👈</span>
          <span>Précédent</span>
        </button>

        <button
          onClick={nextObject}
          className="bg-gradient-to-r from-pink-400 to-orange-400 text-white px-6 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg flex items-center space-x-2"
        >
          <span>Suivant</span>
          <span>👉</span>
        </button>
      </div>

      {/* Grille de tous les objets (miniatures) */}
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
      </div>

      {/* Éléments décoratifs flottants */}
      <div className="fixed top-10 left-10 text-4xl animate-bounce opacity-60">
        🎈
      </div>
      <div className="fixed top-20 right-10 text-3xl animate-pulse opacity-60">
        ⭐
      </div>
      <div className="fixed bottom-10 left-20 text-5xl animate-spin-slow opacity-40">
        🌈
      </div>
      <div
        className="fixed bottom-20 right-20 text-4xl animate-bounce opacity-60"
        style={{ animationDelay: "1s" }}
      >
        🎨
      </div>
    </div>
  );
}
