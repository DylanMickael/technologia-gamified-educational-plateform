
import type React from "react"
import { useState, useEffect } from "react"
import "./celebration.css" 


interface CelebrationPageProps {
  onClose: () => void
  onNewDrawing: () => void
}

// Composant Confetti
const Confetti: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const colors = ["#C95792", "#D4A474", "#FF6B9D", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const randomSize = Math.random() * 10 + 5
  const randomLeft = Math.random() * 100
  const randomDuration = Math.random() * 3 + 2

  return (
    <div
      className="absolute confetti-fall"
      style={{
        left: `${randomLeft}%`,
        backgroundColor: randomColor,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${randomDuration}s`,
        borderRadius: Math.random() > 0.5 ? "50%" : "0%",
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  )
}

// Composant Étoile flottante
const FloatingIcon: React.FC<{ icon: string; delay?: number }> = ({ icon, delay = 0 }) => {
  const randomLeft = Math.random() * 100
  const randomDuration = Math.random() * 4 + 3

  return (
    <div
      className="absolute text-4xl floating-icon"
      style={{
        left: `${randomLeft}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${randomDuration}s`,
      }}
    >
      {icon}
    </div>
  )
}

// Composant Button festif
const CelebrationButton: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  className?: string
}> = ({ children, onClick, variant = "primary", className = "" }) => {
  const baseClasses =
    "px-8 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl hover:shadow-3xl border-4 celebration-button"

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-white hover:from-pink-600 hover:to-purple-700",
    secondary:
      "bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-white hover:from-yellow-500 hover:to-orange-600",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default function CelebrationPage({ onClose, onNewDrawing }: CelebrationPageProps) {
  const [showFireworks, setShowFireworks] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const celebrationMessages = [
    "🎨 BRAVO PETIT ARTISTE ! 🎨",
    "✨ TON DESSIN EST MAGNIFIQUE ! ✨",
    "🌟 TU ES UN VRAI CHAMPION ! 🌟",
    "🎪 QUELLE BELLE CRÉATION ! 🎪",
    "🦄 TU AS DES MAINS MAGIQUES ! 🦄",
  ]

  const encouragements = [
    "Tu as fait un travail fantastique !",
    "Tes couleurs sont si belles !",
    "Continue à créer des merveilles !",
    "Tu es un artiste incroyable !",
    "Ton imagination est extraordinaire !",
  ]

  const badges = [
    { emoji: "🏆", name: "Super Artiste", color: "from-yellow-400 to-orange-500" },
    { emoji: "🌈", name: "Maître des Couleurs", color: "from-pink-400 to-purple-500" },
    { emoji: "⭐", name: "Étoile Créative", color: "from-blue-400 to-cyan-500" },
    { emoji: "🎨", name: "Pinceau d'Or", color: "from-green-400 to-teal-500" },
  ]

  const randomBadge = badges[Math.floor(Math.random() * badges.length)]

  useEffect(() => {
    console.log("CelebrationPage mounted") // Debug log
    setShowFireworks(true)
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % celebrationMessages.length)
    }, 2000)

    return () => clearInterval(messageInterval)
  }, [celebrationMessages.length])

  return (
    <div className="celebration-container">
      {/* Confettis animés */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <Confetti key={i} delay={i * 0.1} />
          ))}
        </div>
      )}

      {/* Icônes flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {["⭐", "❤️", "🌈", "🦄", "🌸", "🎈", "✨", "🎪", "🎯", "🍭"].map((icon, i) => (
          <FloatingIcon key={i} icon={icon} delay={i * 0.5} />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto p-8">
        {/* Message principal animé */}
        <div className="mb-8">
          <h1 className="celebration-title">{celebrationMessages[currentMessage]}</h1>
        </div>

        {/* Badge de récompense */}
        <div className="mb-8 flex justify-center">
          <div className={`badge-container bg-gradient-to-r ${randomBadge.color}`}>
            <div className="text-center">
              <div className="text-6xl mb-2 badge-emoji">{randomBadge.emoji}</div>
              <div className="text-white font-bold text-xl">{randomBadge.name}</div>
            </div>
          </div>
        </div>

    
        {/* Message d'encouragement */}
        <div className="mb-8">
          <p className="text-2xl font-bold text-gray-700 bg-white bg-opacity-80 rounded-full px-8 py-4 shadow-lg backdrop-blur-sm">
            {encouragements[currentMessage]}
          </p>
        </div>

        {/* Statistiques amusantes */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="stat-card border-pink-200">
            <div className="text-4xl mb-2">🎨</div>
            <div className="text-lg font-bold text-gray-700">Couleurs Utilisées</div>
            <div className="text-3xl font-bold" style={{ color: "#C95792" }}>
              {Math.floor(Math.random() * 8) + 3}
            </div>
          </div>
          <div className="stat-card border-yellow-200">
            <div className="text-4xl mb-2">⏱️</div>
            <div className="text-lg font-bold text-gray-700">Temps de Création</div>
            <div className="text-3xl font-bold" style={{ color: "#D4A474" }}>
              {Math.floor(Math.random() * 15) + 5} min
            </div>
          </div>
          <div className="stat-card border-purple-200">
            <div className="text-4xl mb-2">✨</div>
            <div className="text-lg font-bold text-gray-700">Niveau Magique</div>
            <div className="text-3xl font-bold text-purple-600">{"⭐".repeat(Math.floor(Math.random() * 3) + 3)}</div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <CelebrationButton onClick={onNewDrawing} variant="primary">
            🎨 Nouveau Dessin Magique ! 🎨
          </CelebrationButton>
          <CelebrationButton onClick={onClose} variant="secondary">
            🏠 Retour à l'Atelier 🏠
          </CelebrationButton>
        </div>

        {/* Messages de partage */}
        <div className="mt-8">
          <p className="text-lg font-bold text-gray-600 mb-4">Partage ta création avec tes parents ! 📱</p>
          <div className="flex justify-center gap-4">
            <button className="share-button bg-blue-500 hover:bg-blue-600">📧 Envoyer par Email</button>
            <button className="share-button bg-green-500 hover:bg-green-600">💾 Sauvegarder</button>
          </div>
        </div>
      </div>

      {/* Effets de particules en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
