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
      className="bg-white rounded-3xl p-6 shadow-xl border-4 border-pink-300 hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
      onClick={speakObjectName}
    >
      {/* Image de l'objet */}
      <div className="relative mb-4">
        <img
          src={object.image || "/placeholder.svg"}
          alt={object.name}
          className="w-full h-48 object-contain  transition-colors duration-300"
        />

        {/* Étiquette avec le nom */}
        <div className="flex justify-center items-center px-4 py-2 ">
          <p className="font-comic text-2xl font-bold">
            C'est un <span className=" text-pink-600 ">"{object.name}"</span>
          </p>
        </div>
      </div>

      {/* Assistant robot */}
      <div className="flex justify-center mt-8">
        <RobotAssistant isReading={isReading} />
      </div>

      {/* Instruction pour l'enfant */}
      <div className="text-center mt-4">
        <p className="text-orange-600 font-semibold text-sm animate-pulse">
          Clique pour écouter !
        </p>
      </div>
    </div>
  );
}
