"use client";

import { useState, useEffect } from "react";

interface RobotAssistantProps {
  isReading: boolean;
}

export function RobotAssistant({ isReading }: RobotAssistantProps) {
  const [eyesBlink, setEyesBlink] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setEyesBlink(true);
      setTimeout(() => setEyesBlink(false), 150);
    }, 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      className={`relative transition-transform duration-300 ${
        isReading ? "animate-bounce" : ""
      }`}
    >
      {/* Corps du robot */}
      <div className="w-16 h-20 bg-gradient-to-b from-orange-300 to-orange-400 rounded-2xl border-4 border-orange-500 shadow-lg">
        {/* Tête */}
        <div className="w-12 h-12 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full border-3 border-pink-500 mx-auto -mt-2 relative">
          {/* Yeux */}
          <div className="flex justify-center items-center pt-3 space-x-2">
            <div
              className={`w-2 h-2 bg-blue-600 rounded-full transition-all duration-150 ${
                eyesBlink ? "h-0.5" : ""
              }`}
            ></div>
            <div
              className={`w-2 h-2 bg-blue-600 rounded-full transition-all duration-150 ${
                eyesBlink ? "h-0.5" : ""
              }`}
            ></div>
          </div>
          {/* Bouche */}
          <div
            className={`w-3 h-1.5 bg-red-400 rounded-full mx-auto mt-1 transition-all duration-300 ${
              isReading ? "animate-pulse bg-red-500" : ""
            }`}
          ></div>

          {/* Antennes */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-0.5 h-3 bg-gray-400 mx-auto"></div>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Bras */}
        <div className="flex justify-between px-1 mt-2">
          <div className="w-1 h-6 bg-orange-400 rounded-full"></div>
          <div className="w-1 h-6 bg-orange-400 rounded-full"></div>
        </div>

        {/* Boutons sur le corps */}
        <div className="flex justify-center space-x-1 mt-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <div
            className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      {/* Bulle de parole quand il lit */}
      {isReading && (
        <div className="absolute -top-8 -right-4 bg-white rounded-lg px-2 py-1 border-2 border-pink-300 shadow-lg animate-pulse">
          <div className="text-xs">🔊</div>
          <div className="absolute bottom-0 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
}
