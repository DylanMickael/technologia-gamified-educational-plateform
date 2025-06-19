"use client";

import { useState } from "react";
import type { ObjectType } from "../../../types/ObjectType";
import { RobotAssistant } from "./robot-assistant";

interface ObjectCardProps {
  object: ObjectType;
}

export function ObjectCard({ object }: ObjectCardProps) {
  const [isReading, setIsReading] = useState(false);

  const speakObjectName = () => {
    if ("speechSynthesis" in window) {
      setIsReading(true);

      // Arrêter toute lecture en cours
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(object.name);

      // Configuration pour une voix d'enfant (plus aiguë et plus lente)
      utterance.rate = 0.7; // Plus lent
      utterance.pitch = 1.5; // Plus aigu
      utterance.volume = 0.8;
      utterance.lang = "fr-FR";

      // Essayer de trouver une voix féminine française (plus proche d'une voix d'enfant)
      const voices = window.speechSynthesis.getVoices();
      const frenchVoice =
        voices.find(
          (voice) =>
            voice.lang.includes("fr") &&
            voice.name.toLowerCase().includes("female")
        ) || voices.find((voice) => voice.lang.includes("fr"));

      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      utterance.onend = () => {
        setIsReading(false);
      };

      utterance.onerror = () => {
        setIsReading(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-3xl p-6 shadow-xl border-4 border-pink-300 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
      onClick={speakObjectName}
    >
      {/* Image de l'objet */}
      <div className="relative mb-4">
        <img
          src={object.image || "/placeholder.svg"}
          alt={object.name}
          className="w-full h-48 object-cover rounded-2xl border-3 border-orange-300 group-hover:border-pink-400 transition-colors duration-300"
        />

        {/* Étiquette avec le nom */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 border-3 border-pink-400 shadow-lg">
          <span className="text-2xl font-bold text-pink-600 font-comic">
            {object.name}
          </span>
        </div>
      </div>

      {/* Assistant robot */}
      <div className="flex justify-center mt-8">
        <RobotAssistant isReading={isReading} />
      </div>

      {/* Instruction pour l'enfant */}
      <div className="text-center mt-4">
        <p className="text-orange-600 font-semibold text-sm animate-pulse">
          Clique pour écouter ! 👆
        </p>
      </div>

      {/* Effets visuels */}
      <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="text-4xl animate-spin-slow">⭐</div>
      </div>
    </div>
  );
}
