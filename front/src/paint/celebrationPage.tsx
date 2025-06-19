"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CelebrationPageProps {
  onClose: () => void
  onNewDrawing: () => void
  drawingImage?: string
  childName?: string
}

// Composant pour les bulles flottantes colorées
const FloatingBubble = ({ delay = 0, size = "w-4 h-4", color = "bg-pink-300" }) => {
  return (
    <motion.div
      className={`absolute ${size} ${color} rounded-full opacity-60`}
      initial={{
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
        y: typeof window !== "undefined" ? window.innerHeight + 50 : 800,
        scale: 0,
      }}
      animate={{
        y: -100,
        scale: [0, 1, 0.8, 1, 0],
        x: [null, null, Math.random() * 100 - 50, null, null],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay: delay,
        ease: "easeOut",
        repeat: Number.POSITIVE_INFINITY,
      }}
    />
  )
}

// Composant pour les particules brillantes
const SparkleParticle = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
      initial={{
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
        y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 3,
      }}
    />
  )
}

export default function CelebrationPage({
  onClose,
  onNewDrawing,
  drawingImage,
  childName = "Champion",
}: CelebrationPageProps) {
  const [currentMessage, setCurrentMessage] = useState(0)

  const celebrationMessages = [
    "🎉 BRAVO CHAMPION ! 🎉",
    "✨ TON DESSIN EST PARFAIT ! ✨",
    "🌟 TU ES UN VRAI ARTISTE ! 🌟",
    "🎨 MAGNIFIQUE CRÉATION ! 🎨",
  ]

  const bubbleColors = [
    "bg-pink-300",
    "bg-orange-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-red-300",
    "bg-indigo-300",
  ]

  const bubbleSizes = ["w-3 h-3", "w-4 h-4", "w-5 h-5", "w-6 h-6", "w-8 h-8"]

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % celebrationMessages.length)
    }, 2500)

    return () => clearInterval(messageInterval)
  }, [celebrationMessages.length])

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100">
      {/* Bulles flottantes d'arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <FloatingBubble
            key={i}
            delay={i * 0.3}
            size={bubbleSizes[i % bubbleSizes.length]}
            color={bubbleColors[i % bubbleColors.length]}
          />
        ))}
      </div>

      {/* Particules brillantes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <SparkleParticle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Contenu principal centré */}
      <div className="h-full flex flex-col items-center justify-center px-4 relative z-10">
        {/* Message principal avec animation */}
        <motion.div
          key={currentMessage}
          initial={{ scale: 0, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.6,
          }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">
            {celebrationMessages[currentMessage]}
          </h1>
        </motion.div>

        {/* Badge de récompense avec effet 3D */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Ombre du badge */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full blur-xl opacity-50 scale-110"></div>

            {/* Badge principal */}
            <div className="relative bg-gradient-to-br from-yellow-300 via-orange-300 to-pink-300 rounded-full p-6 border-4 border-white shadow-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="text-6xl md:text-8xl"
              >
                🏆
              </motion.div>
            </div>

            {/* Effet de brillance */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-br from-white to-transparent rounded-full opacity-30"
            ></motion.div>
          </div>
        </motion.div>

        {/* Aperçu du dessin avec cadre moderne */}
        {drawingImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8"
          >
            <div className="relative">
              {/* Ombre colorée */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-orange-300 rounded-3xl blur-2xl opacity-40 scale-105"></div>

              {/* Cadre du dessin */}
              <div className="relative bg-white rounded-3xl p-4 border-4 border-gradient-to-r from-pink-300 to-orange-300 shadow-xl">
                <img
                  src={drawingImage || "/placeholder.svg"}
                  alt="Ton magnifique dessin"
                  className="w-48 h-36 md:w-64 md:h-48 object-contain rounded-2xl"
                />
                <p className="text-lg md:text-xl font-bold text-gray-700 mt-3 text-center">Ton Chef-d'œuvre ! 🎨</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Message d'encouragement avec style moderne */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-pink-200 shadow-lg">
            <p className="text-lg md:text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tu es un artiste extraordinaire ! ✨
            </p>
          </div>
        </motion.div>

        {/* Statistiques avec design cards modernes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-3 gap-3 md:gap-6 mb-8 w-full max-w-md"
        >
          {[
            { icon: "🎨", label: "Créativité", value: "100%", color: "from-pink-400 to-rose-400" },
            { icon: "⭐", label: "Talent", value: "★★★★★", color: "from-yellow-400 to-orange-400" },
            { icon: "🏆", label: "Réussite", value: "TOP!", color: "from-purple-400 to-pink-400" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.4 + index * 0.1, type: "spring" }}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-3 md:p-4 text-center shadow-lg border-2 border-white/50`}
            >
              <div className="text-2xl md:text-3xl mb-1">{stat.icon}</div>
              <div className="text-xs md:text-sm font-bold text-white/90">{stat.label}</div>
              <div className="text-sm md:text-lg font-black text-white">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Boutons d'action avec style moderne */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
        >
          <motion.button
            onClick={onNewDrawing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold py-3 px-6 rounded-full shadow-lg border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
          >
            🎨 Nouveau Dessin
          </motion.button>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold py-3 px-6 rounded-full shadow-lg border-2 border-white/30 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
          >
            🏠 Retour
          </motion.button>
        </motion.div>

        {/* Boutons de partage discrets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-6 flex gap-3"
        >
          <button className="bg-white/70 backdrop-blur-sm text-blue-600 px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-white/90 transition-all duration-300">
            📧 Partager
          </button>
          <button className="bg-white/70 backdrop-blur-sm text-green-600 px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-white/90 transition-all duration-300">
            💾 Sauvegarder
          </button>
        </motion.div>
      </div>

      {/* Éléments décoratifs fixes dans les coins */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-pink-300 rounded-full opacity-60"></div>
      <div className="absolute top-8 right-8 w-6 h-6 bg-yellow-300 rounded-full opacity-60"></div>
      <div className="absolute bottom-12 left-8 w-10 h-10 bg-orange-300 rounded-full opacity-60"></div>
      <div className="absolute bottom-4 right-4 w-4 h-4 bg-purple-300 rounded-full opacity-60"></div>

      {/* Éléments décoratifs supplémentaires */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-300 rounded-full opacity-40"></div>
      <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-green-300 rounded-full opacity-40"></div>
    </div>
  )
}
