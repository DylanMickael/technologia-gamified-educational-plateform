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
