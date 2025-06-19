"use client"

import { Code, User, Palette, Gamepad2, Monitor, Music, Shield, Camera, Briefcase, X, ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"
import logoT from "../../../assets/img/Logo technologia 1.png"

// Robot 3D Component
function Robot3D({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Suivre la souris avec une rotation douce
      const targetRotationY = (mousePosition.x - 0.5) * 0.5
      const targetRotationX = (mousePosition.y - 0.5) * 0.3

      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1)
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetRotationX, 0.1)

      // Animation de flottement
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Corps du robot */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1, 0.6]} />
        <meshStandardMaterial color="#4f46e5" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Tête */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Yeux */}
      <mesh position={[-0.15, 0.9, 0.31]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff44" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.15, 0.9, 0.31]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff44" emissiveIntensity={0.5} />
      </mesh>

      {/* Bras */}
      <mesh position={[-0.6, 0.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#5b21b6" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.6, 0.2, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.3]} />
        <meshStandardMaterial color="#5b21b6" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Jambes */}
      <mesh position={[-0.25, -0.8, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.4]} />
        <meshStandardMaterial color="#3730a3" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.25, -0.8, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.4]} />
        <meshStandardMaterial color="#3730a3" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Antenne */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.06]} />
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

// Story Modal Component
function StoryModal({ career, onClose }: { career: any; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stories = {
    graphiste: {
      title: "L'Odyssée du Graphiste Digital",
      steps: [
        {
          title: "L'Éveil Créatif",
          content:
            "Dans un monde où l'image règne en maître, vous découvrez votre pouvoir : transformer des idées abstraites en visuels captivants. Chaque pixel devient votre pinceau, chaque couleur votre émotion.",
          visual: "🎨",
        },
        {
          title: "La Maîtrise des Outils",
          content:
            "Photoshop, Illustrator, Figma... Ces noms résonnent comme des sorts magiques. Vous apprenez à dompter ces outils puissants, créant des univers visuels qui racontent des histoires sans mots.",
          visual: "⚡",
        },
        {
          title: "L'Innovation IA",
          content:
            "L'intelligence artificielle devient votre alliée. Midjourney, DALL-E, Stable Diffusion... Vous explorez de nouveaux horizons créatifs, repoussant les limites de l'imagination humaine.",
          visual: "🤖",
        },
        {
          title: "L'Impact Global",
          content:
            "Vos créations voyagent à travers le monde digital. Chaque design influence, inspire et transforme la perception de milliers de personnes. Vous êtes devenu un architecte de l'émotion visuelle.",
          visual: "🌍",
        },
      ],
    },
    "web-designer": {
      title: "L'Aventure du Web Designer",
      steps: [
        {
          title: "L'Architecture Numérique",
          content:
            "Vous découvrez l'art de construire des expériences web. Chaque site devient un univers à explorer, où l'utilisateur est le héros de sa propre aventure digitale.",
          visual: "🏗️",
        },
        {
          title: "L'Harmonie UX/UI",
          content:
            "Vous maîtrisez l'équilibre parfait entre beauté et fonctionnalité. Chaque bouton, chaque animation, chaque transition est pensée pour créer une symphonie d'interactions fluides.",
          visual: "🎼",
        },
        {
          title: "La Révolution Responsive",
          content:
            "Mobile, tablette, desktop... Vous créez des expériences qui s'adaptent à tous les écrans. Votre design devient liquide, s'épanouissant sur chaque support avec élégance.",
          visual: "📱",
        },
        {
          title: "L'Écosystème Digital",
          content:
            "Vos créations web deviennent des ponts entre les marques et leurs communautés. Vous façonnez l'avenir du commerce, de l'éducation et de la communication digitale.",
          visual: "🌐",
        },
      ],
    },
    "jeux-video": {
      title: "L'Épopée du Créateur de Jeux",
      steps: [
        {
          title: "L'Univers Imaginaire",
          content:
            "Vous donnez vie à des mondes fantastiques. Chaque personnage, chaque environnement, chaque mécanisme de jeu naît de votre imagination débordante et de votre passion ludique.",
          visual: "🎮",
        },
        {
          title: "La Technologie Immersive",
          content:
            "Unity, Unreal Engine, réalité virtuelle... Vous maîtrisez les technologies qui transforment vos rêves en expériences interactives captivantes et mémorables.",
          visual: "🚀",
        },
        {
          title: "L'Émotion Interactive",
          content:
            "Vos jeux ne sont pas que du divertissement, ils sont des vecteurs d'émotions. Joie, suspense, émerveillement... Vous orchestrez les sentiments des joueurs avec maestria.",
          visual: "💫",
        },
        {
          title: "La Communauté Mondiale",
          content:
            "Vos créations rassemblent des millions de joueurs à travers le globe. Vous créez des liens sociaux, des souvenirs partagés et des expériences qui marquent des générations.",
          visual: "🌟",
        },
      ],
    },
  }

  const currentStory = stories[career.id as keyof typeof stories]
  const currentStoryStep = currentStory?.steps[currentStep]

  if (!currentStory) return null

  return (
    <div
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"}`}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${career.color} p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <career.icon className="w-8 h-8" />
                <h2 className="text-2xl font-bold">{currentStory.title}</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex space-x-2">
              {currentStory.steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full flex-1 transition-all duration-300 ${
                    index <= currentStep ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">{currentStoryStep?.visual}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{currentStoryStep?.title}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{currentStoryStep?.content}</p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium transition-all hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>

            <span className="text-gray-500 font-medium">
              {currentStep + 1} / {currentStory.steps.length}
            </span>

            {currentStep < currentStory.steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className={`px-6 py-3 bg-gradient-to-r ${career.color} text-white rounded-lg font-medium transition-all hover:shadow-lg transform hover:scale-105 flex items-center space-x-2`}
              >
                <span>Suivant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className={`px-6 py-3 bg-gradient-to-r ${career.color} text-white rounded-lg font-medium transition-all hover:shadow-lg transform hover:scale-105`}
              >
                Commencer l'aventure
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TechnologiaCareerTree() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedCareer, setSelectedCareer] = useState<any>(null)
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", updateScreenSize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const careers = [
    {
      id: "graphiste",
      name: "Graphiste",
      description: "Créez des visuels époustouflants",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      icon: Palette,
      badge: "Story",
      position: {
        desktop: { top: "15%", left: "25%" },
        tablet: { top: "8%", left: "10%" },
        mobile: { top: "15%", left: "5%" },
      },
    },
    {
      id: "chef-projet",
      name: "Chef de projet",
      description: "Dirigez l'innovation digitale",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      icon: Briefcase,
      position: {
        desktop: { top: "15%", left: "49%" },
        tablet: { top: "3%", left: "50%" },
        mobile: { top: "8%", left: "50%" },
      },
    },
    {
      id: "community",
      name: "Community Manager",
      description: "Connectez les communautés",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      icon: User,
      position: {
        desktop: { top: "15%", right: "15%" },
        tablet: { top: "8%", right: "10%" },
        mobile: { top: "15%", right: "5%" },
      },
    },
    {
      id: "programmeur",
      name: "Programmeur",
      description: "Codez le futur",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      icon: Code,
      position: {
        desktop: { top: "38%", left: "25%" },
        tablet: { top: "23%", left: "5%" },
        mobile: { top: "28%", left: "2%" },
      },
    },
    {
      id: "web-designer",
      name: "Web Designer",
      description: "Designez le web de demain",
      color: "from-indigo-400 to-blue-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      icon: Monitor,
      badge: "Story",
      position: {
        desktop: { top: "39%", right: "15%" },
        tablet: { top: "23%", right: "5%" },
        mobile: { top: "28%", right: "2%" },
      },
    },
    {
      id: "jeux-video",
      name: "Jeux Vidéo",
      description: "Créez des expériences ludiques",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      icon: Gamepad2,
      badge: "Story",
      position: {
        desktop: { top: "62%", left: "25%" },
        tablet: { top: "38%", left: "1%" },
        mobile: { top: "43%", left: "0%" },
      },
    },
    {
      id: "cybersecurite",
      name: "Cybersécurité",
      description: "Protégez le monde numérique",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      icon: Shield,
      position: {
        desktop: { top: "64%", right: "15%" },
        tablet: { top: "38%", right: "1%" },
        mobile: { top: "43%", right: "0%" },
      },
    },
    {
      id: "musicien",
      name: "Musicien",
      description: "Composez l'avenir sonore",
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      icon: Music,
      position: {
        desktop: { top: "86%", left: "25%" },
        tablet: { top: "63%", left: "5%" },
        mobile: { top: "68%", left: "2%" },
      },
    },
    {
      id: "artiste",
      name: "Artiste/Peintre",
      description: "Exprimez votre créativité",
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
      icon: Palette,
      position: {
        desktop: { top: "87%", right: "15%" },
        tablet: { top: "63%", right: "5%" },
        mobile: { top: "68%", right: "2%" },
      },
    },
    {
      id: "photographe",
      name: "Photographe",
      description: "Capturez l'instant parfait",
      color: "from-gray-400 to-slate-500",
      bgColor: "bg-gray-50",
      textColor: "text-gray-600",
      icon: Camera,
      position: {
        desktop: { top: "85%", left: "49%" },
        tablet: { top: "78%", left: "50%" },
        mobile: { top: "83%", left: "50%" },
      },
    },
  ]

  const getResponsivePosition = (career: any) => {
    if (screenSize.width >= 1024) return career.position.desktop
    if (screenSize.width >= 768) return career.position.tablet
    return career.position.mobile
  }

  const getCardSize = () => {
    if (screenSize.width >= 1024) return "w-52"
    if (screenSize.width >= 768) return "w-44"
    return "w-36"
  }

  const handleCardClick = (career: any) => {
    if (["graphiste", "web-designer", "jeux-video"].includes(career.id)) {
      setSelectedCareer(career)
    }
  }

  return (
    <div
      style={{ fontFamily: "Space Grotesk, sans-serif" }}
      className="min-h-screen landing-layout relative overflow-hidden"
    >
      {/* Cercles gradients flous */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-400/30 via-pink-400/20 to-transparent rounded-full blur-3xl animate-pulse z-1" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/30 via-cyan-400/20 to-transparent rounded-full blur-3xl animate-pulse z-1" />

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden z-2">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Floating particles - reduced for mobile */}
          {Array.from({ length: screenSize.width < 768 ? 20 : 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-slate-400/30 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Gradient orbs - responsive sizes */}
        <div className="absolute -top-20 -right-20 md:-top-40 md:-right-40 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 md:-bottom-40 md:-left-40 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-tr from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full min-h-screen">
        {/* Robot 3D au centre */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative">
            {/* Animated rings around robot - responsive */}
            <div
              className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-slate-300/50 animate-spin"
              style={{ animationDuration: "20s" }}
            ></div>
            <div
              className="absolute inset-2 md:inset-4 w-28 h-28 md:w-40 md:h-40 rounded-full border border-purple-400/40 animate-spin"
              style={{ animationDuration: "15s", animationDirection: "reverse" }}
            ></div>
            <div
              className="absolute inset-4 md:inset-8 w-24 h-24 md:w-32 md:h-32 rounded-full border border-blue-400/30 animate-spin"
              style={{ animationDuration: "10s" }}
            ></div>

            {/* Polygone décoratif autour du robot */}
            <div className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
              <svg
                className="w-36 h-36 md:w-56 md:h-56 animate-spin"
                style={{ animationDuration: "25s", animationDirection: "reverse" }}
                viewBox="0 0 100 100"
              >
                <polygon
                  points="50,5 85,25 85,75 50,95 15,75 15,25"
                  fill="none"
                  stroke="url(#polygonGradient)"
                  strokeWidth="1"
                  className="opacity-60"
                />
                <defs>
                  <linearGradient id="polygonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="33%" stopColor="#06b6d4" />
                    <stop offset="66%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Canvas 3D pour le robot */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Robot3D mousePosition={mousePosition} />
                <Environment preset="studio" />
              </Canvas>
            </div>
          </div>

          {/* Logo et texte réorganisés en 2 colonnes */}
          <div className="flex items-center justify-center mt-6 md:mt-12 space-x-4">
            {/* Logo à gauche */}
            <div className="flex-shrink-0">
              <img
                src={logoT}
                className="w-12 h-12 md:w-16 md:h-16"
                alt="TechnoloGia Logo"
              />
            </div>

            {/* Titre et paragraphe à droite */}
            <div className="text-left">
              <h1 style={{ color: "#671B42" }} className="text-xl md:text-3xl font-bold mb-1">
                TechnoloGia
              </h1>
              <p className="text-slate-600 text-sm md:text-base">Le futur est entre vos mains</p>
            </div>
          </div>
        </div>

        {/* Career Cards */}
        {careers.map((career, index) => {
          const Icon = career.icon
          const isClickable = ["graphiste", "web-designer", "jeux-video"].includes(career.id)
          const position = getResponsivePosition(career)

          return (
            <div
              key={career.id}
              className={`absolute group ${isClickable ? "cursor-pointer" : "cursor-default"}`}
              style={{
                ...position,
                transform: "translate(-50%, -50%)",
                animationDelay: `${index * 100}ms`,
                zIndex: 15,
              }}
              onMouseEnter={() => setHoveredCard(career.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(career)}
            >
              <div
                className={`relative bg-white/80 backdrop-blur-md rounded-xl md:rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-3 hover:scale-110 border border-slate-200/50 ${
                  hoveredCard === career.id ? "bg-white/90 shadow-xl shadow-purple-500/15" : ""
                }`}
              >
                {/* Clickable indicator */}
                {isClickable && (
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2 py-1 md:px-3 md:py-1.5 rounded-full font-bold z-10 animate-bounce shadow-lg">
                    Story
                  </div>
                )}

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br ${career.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm`}
                ></div>

                {/* Card content */}
                <div className={`relative p-3 md:p-5 ${getCardSize()}`}>
                  {/* Icon */}
                  <div className="flex items-center justify-center mb-3 md:mb-4">
                    <div
                      className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${career.color} group-hover:scale-125 transition-transform duration-300 shadow-xl`}
                    >
                      <Icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                    </div>
                    {career.badge && (
                      <div
                        className={`ml-2 md:ml-3 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-gradient-to-r ${career.color} text-white text-xs font-bold shadow-lg`}
                      >
                        {career.badge}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm md:text-base font-bold text-slate-800 mb-2 md:mb-3 text-center group-hover:text-purple-600 transition-colors leading-tight">
                    {career.name}
                  </h3>

                  {/* Description - visible on all screen sizes but smaller on mobile */}
                  <p className="text-xs md:text-sm text-slate-600 text-center opacity-80 group-hover:opacity-100 transition-opacity leading-relaxed">
                    {career.description}
                  </p>

                  {/* Action indicator */}
                  <div className="flex justify-center mt-3 md:mt-4">
                    <div
                      className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r ${career.color} group-hover:scale-150 transition-transform duration-300 animate-pulse shadow-lg`}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Hover tooltip - only on desktop */}
              {hoveredCard === career.id && screenSize.width >= 768 && (
                <div className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 bg-slate-800/90 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap z-20 shadow-xl border border-slate-300/30">
                  {isClickable ? "Cliquez pour découvrir l'histoire" : "Explorer ce métier"}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800/90 rotate-45"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Story Modal */}
      {selectedCareer && <StoryModal career={selectedCareer} onClose={() => setSelectedCareer(null)} />}
    </div>
  )
}
