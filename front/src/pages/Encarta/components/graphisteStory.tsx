"use client"

import { ArrowLeft, Palette, Monitor, GamepadIcon } from "lucide-react"
import { useEffect, useState } from "react"

interface StorytellingPageProps {
  career: string
  onBack: () => void
}

export default function StorytellingPage({ career, onBack }: StorytellingPageProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)

      // Determine active section based on scroll position
      const sectionHeight = docHeight / 4
      const currentSection = Math.floor(scrollTop / sectionHeight)
      setActiveSection(Math.min(currentSection, 3))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getCareerData = () => {
    switch (career) {
      case "graphiste":
        return {
          title: "Graphiste",
          subtitle: "L'Art de Créer des Visuels Inoubliables",
          color: "from-orange-400 to-red-500",
          bgGradient: "from-orange-50 via-red-50 to-pink-50",
          icon: Palette,
          sections: [
            {
              title: "Les Origines de la Création",
              content:
                "Depuis la nuit des temps, l'humanité a ressenti le besoin de créer, de dessiner, de laisser une trace visuelle. Le graphisme moderne naît de cette passion ancestrale, transformée par la révolution numérique. Chaque trait, chaque couleur raconte une histoire unique.",
              illustration: "🎨",
              bgColor: "bg-orange-100",
            },
            {
              title: "L'Évolution Technologique",
              content:
                "Des premiers logiciels de PAO aux outils d'intelligence artificielle, le graphisme a su s'adapter et évoluer. Photoshop, Illustrator, Figma... chaque outil ouvre de nouvelles possibilités créatives. L'IA devient aujourd'hui un partenaire créatif, amplifiant l'imagination humaine.",
              illustration: "💻",
              bgColor: "bg-red-100",
            },
            {
              title: "L'Impact Visuel Moderne",
              content:
                "Dans notre monde hyperconnecté, le graphiste devient un architecte de l'attention. Chaque création influence, inspire, transforme. Des logos iconiques aux campagnes virales, le pouvoir du design façonne notre perception du monde et guide nos émotions.",
              illustration: "🚀",
              bgColor: "bg-pink-100",
            },
            {
              title: "Votre Futur Créatif",
              content:
                "Demain, vous pourriez être celui qui crée la prochaine identité visuelle révolutionnaire. Votre créativité, combinée aux outils de demain, peut transformer des idées en réalités visuelles qui marquent une génération. L'aventure créative vous attend.",
              illustration: "✨",
              bgColor: "bg-rose-100",
            },
          ],
        }
      case "web-designer":
        return {
          title: "Web Designer",
          subtitle: "Architecte de l'Expérience Digitale",
          color: "from-indigo-400 to-blue-500",
          bgGradient: "from-indigo-50 via-blue-50 to-cyan-50",
          icon: Monitor,
          sections: [
            {
              title: "La Naissance du Web Design",
              content:
                "En 1991, le premier site web voyait le jour. Simple, textuel, révolutionnaire. Depuis, le web design a transformé notre façon de communiquer, d'apprendre, de vivre. Chaque interface raconte l'histoire de l'évolution humaine vers le digital.",
              illustration: "🌐",
              bgColor: "bg-indigo-100",
            },
            {
              title: "L'Art de l'Expérience Utilisateur",
              content:
                "Au-delà de l'esthétique, le web designer orchestre des expériences. UX/UI, responsive design, accessibilité... Chaque pixel a sa raison d'être. L'objectif : créer des interfaces si intuitives qu'elles semblent naturelles, presque magiques.",
              illustration: "🎯",
              bgColor: "bg-blue-100",
            },
            {
              title: "Technologies et Innovation",
              content:
                "HTML5, CSS3, JavaScript, React... Le web designer maîtrise un arsenal technologique en constante évolution. Chaque nouvelle technologie ouvre des possibilités créatives inédites. L'innovation technique au service de la créativité humaine.",
              illustration: "⚡",
              bgColor: "bg-cyan-100",
            },
            {
              title: "Façonner le Web de Demain",
              content:
                "Réalité virtuelle, interfaces vocales, IA conversationnelle... Le futur du web se dessine aujourd'hui. En tant que web designer, vous serez aux premières loges de cette révolution, créant les expériences digitales qui définiront notre avenir.",
              illustration: "🔮",
              bgColor: "bg-teal-100",
            },
          ],
        }
      case "jeux-video":
        return {
          title: "Développeur Jeux Vidéo",
          subtitle: "Créateur d'Univers Interactifs",
          color: "from-purple-400 to-pink-500",
          bgGradient: "from-purple-50 via-pink-50 to-indigo-50",
          icon: GamepadIcon,
          sections: [
            {
              title: "L'Épopée du Jeu Vidéo",
              content:
                "De Pong à Fortnite, l'industrie du jeu vidéo a révolutionné le divertissement. Chaque jeu raconte une histoire, crée des émotions, rassemble des communautés. Le développeur de jeux vidéo est un conteur moderne, un architecte d'émotions interactives.",
              illustration: "🕹️",
              bgColor: "bg-purple-100",
            },
            {
              title: "La Magie de la Création Interactive",
              content:
                "Créer un jeu, c'est donner vie à un univers où les joueurs deviennent héros. Game design, programmation, narration interactive... Chaque élément contribue à créer une expérience unique où l'imagination devient réalité jouable.",
              illustration: "🎮",
              bgColor: "bg-pink-100",
            },
            {
              title: "Technologies et Moteurs de Jeu",
              content:
                "Unity, Unreal Engine, C#, Python... Les outils modernes permettent de concrétiser les rêves les plus fous. Réalité virtuelle, intelligence artificielle, physique avancée... La technologie repousse sans cesse les limites du possible.",
              illustration: "🛠️",
              bgColor: "bg-indigo-100",
            },
            {
              title: "L'Avenir du Gaming",
              content:
                "Cloud gaming, métavers, IA générative... L'industrie du jeu vidéo façonne l'avenir du divertissement interactif. En rejoignant cette aventure, vous participez à la création des expériences qui définiront la culture de demain.",
              illustration: "🌟",
              bgColor: "bg-violet-100",
            },
          ],
        }
      default:
        return null
    }
  }

  const careerData = getCareerData()
  if (!careerData) return null

  const Icon = careerData.icon

  return (
    <div className={`min-h-screen bg-gradient-to-br ${careerData.bgGradient} relative overflow-hidden`}>
      {/* CSS for robot animation */}
      <style jsx>{`
        .walking-robot {
          position: relative;
          display: inline-block;
          animation: walk 1s infinite;
        }
        
        .robot-body {
          width: 40px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          position: relative;
          margin: 0 auto;
        }
        
        .robot-head {
          width: 30px;
          height: 25px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: 50% 50% 20% 20%;
          position: absolute;
          top: -20px;
          left: 5px;
        }
        
        .robot-eyes {
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 8px;
          left: 8px;
          box-shadow: 10px 0 0 white;
          animation: blink 2s infinite;
        }
        
        .robot-legs {
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }
        
        .robot-leg {
          width: 8px;
          height: 15px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
          animation: leg-walk 0.5s infinite alternate;
        }
        
        .robot-leg:nth-child(2) {
          animation-delay: 0.25s;
        }
        
        .robot-arms {
          position: absolute;
          top: 10px;
          left: -8px;
          right: -8px;
          display: flex;
          justify-content: space-between;
        }
        
        .robot-arm {
          width: 6px;
          height: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 3px;
          animation: arm-swing 0.5s infinite alternate;
        }
        
        .robot-arm:nth-child(2) {
          animation-delay: 0.25s;
        }
        
        @keyframes walk {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        @keyframes leg-walk {
          0% { transform: rotate(-10deg); }
          100% { transform: rotate(10deg); }
        }
        
        @keyframes arm-swing {
          0% { transform: rotate(-15deg); }
          100% { transform: rotate(15deg); }
        }
        
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
        
        .page-section {
          transform-style: preserve-3d;
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .page-turn-left {
          transform: perspective(1000px) rotateY(-15deg) translateX(-50px);
          opacity: 0.7;
        }
        
        .page-turn-right {
          transform: perspective(1000px) rotateY(15deg) translateX(50px);
          opacity: 0.7;
        }
        
        .page-active {
          transform: perspective(1000px) rotateY(0deg) translateX(0px);
          opacity: 1;
          z-index: 10;
        }
        
        .illustration-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour</span>
          </button>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${careerData.color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-gray-800">{careerData.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-20 pb-16 text-center relative">
        <div className="container mx-auto px-4">
          <div
            className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${careerData.color} rounded-3xl shadow-2xl mb-8 transform hover:scale-110 transition-all duration-500`}
          >
            <Icon className="w-12 h-12 text-white" />
          </div>
          <h1
            className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${careerData.color} bg-clip-text text-transparent mb-4`}
          >
            {careerData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{careerData.subtitle}</p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-40 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-50 animate-bounce delay-500"></div>
        </div>
      </div>

      {/* Story Sections with Page Turn Effect */}
      <div className="container mx-auto px-4">
        {careerData.sections.map((section, index) => {
          let pageClass = "page-section"
          if (activeSection > index) pageClass += " page-turn-left"
          else if (activeSection < index) pageClass += " page-turn-right"
          else pageClass += " page-active"

          return (
            <div key={index} className={`min-h-screen flex items-center py-16 ${pageClass}`}>
              <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                {/* Left side - Story */}
                <div className={`order-2 md:order-1 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-16 h-16 ${section.bgColor} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}
                      >
                        {section.illustration}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-12 h-1 bg-gradient-to-r ${careerData.color} rounded-full`}></div>
                          <span className="text-sm text-gray-500 font-medium">Chapitre {index + 1}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{section.title}</h2>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">{section.content}</p>

                    {/* Decorative elements */}
                    <div className="flex justify-end mt-6">
                      <div className={`w-20 h-1 bg-gradient-to-r ${careerData.color} rounded-full opacity-50`}></div>
                    </div>
                  </div>
                </div>

                {/* Right side - Illustration */}
                <div className={`order-1 md:order-2 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="relative">
                    <div
                      className={`w-full h-96 ${section.bgColor} rounded-3xl shadow-2xl flex items-center justify-center text-9xl illustration-float relative overflow-hidden`}
                    >
                      {section.illustration}

                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-current rounded-full animate-spin"></div>
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-current rounded-full animate-ping"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-current rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Floating decorative elements */}
                    <div
                      className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${careerData.color} rounded-full opacity-20 animate-pulse`}
                    ></div>
                    <div
                      className={`absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br ${careerData.color} rounded-full opacity-30 animate-pulse delay-1000`}
                    ></div>
                    <div
                      className={`absolute top-1/2 -left-4 w-8 h-8 bg-gradient-to-br ${careerData.color} rounded-full opacity-25 animate-bounce delay-500`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center relative">
        <div className="container mx-auto px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400 to-pink-500"></div>
              <div className="absolute top-4 left-4 w-16 h-16 border-2 border-current rounded-full animate-spin"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-current rounded-full animate-ping"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Prêt à écrire votre propre histoire ?</h3>
              <p className="text-gray-600 text-lg mb-8">
                Rejoignez TechnoloGia et transformez votre passion en expertise professionnelle.
              </p>
              <button
                className={`px-12 py-4 bg-gradient-to-r ${careerData.color} text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden`}
              >
                <span className="relative z-10">Commencer mon parcours</span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Walking Robot Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">Progression de l'aventure</span>
            <span className="text-sm font-medium text-gray-800">{Math.round(scrollProgress)}%</span>
          </div>

          {/* Progress track */}
          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${careerData.color} rounded-full transition-all duration-300 ease-out relative`}
              style={{ width: `${scrollProgress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>

            {/* Walking Robot */}
            <div
              className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-out"
              style={{ left: `calc(${scrollProgress}% - 20px)` }}
            >
              <div className="walking-robot">
                <div className="robot-body">
                  <div className="robot-head">
                    <div className="robot-eyes"></div>
                  </div>
                  <div className="robot-arms">
                    <div className="robot-arm"></div>
                    <div className="robot-arm"></div>
                  </div>
                </div>
                <div className="robot-legs">
                  <div className="robot-leg"></div>
                  <div className="robot-leg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter indicators */}
          <div className="flex justify-between mt-3">
            {careerData.sections.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeSection >= index
                    ? `bg-gradient-to-r ${careerData.color} shadow-lg scale-110`
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
