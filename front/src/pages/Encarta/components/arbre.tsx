"use client"

import {
  Code,
  User,
  Palette,
  Gamepad2,
  Monitor,
  Music,
  Shield,
  Camera,
  Briefcase,
  X,
  ArrowRight,
  Sparkles,
  Zap,
  ArrowLeft,
  Star,
  Hexagon,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import {Link} from "react-router-dom";

// Robot 3D avec CSS pur
function CSSRobot({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const targetX = (mousePosition.y - 0.5) * 20
    const targetY = (mousePosition.x - 0.5) * 20
    
    setRotation({ x: targetX, y: targetY })
  }, [mousePosition])

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.3s ease-out'
      }}
    >
      {/* Corps central */}
      <div className="relative">
        {/* Noyau principal */}
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-2xl animate-pulse border-4 border-white/20 backdrop-blur-sm">
          <div className="absolute inset-2 bg-gradient-to-tr from-white/30 to-transparent rounded-full"></div>
        </div>
        
        {/* Anneaux orbitaux */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-pink-400/60 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-lg"></div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-green-400/60 rounded-full animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-green-400 rounded-full shadow-lg"></div>
        </div>
        
        {/* Particules énergétiques */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 60}deg) translateY(-16px) translate(-50%, -50%)`,
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Modal d'histoire redesignée
function StoryModal({ career, onClose }: { career: any; onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])
  
  const stories = {
    graphiste: {
      title: "L'Odyssée Créative",
      steps: [
        {
          title: "L'Éveil Artistique",
          content: "Découvrez comment transformer des idées abstraites en visuels captivants qui parlent à l'âme. Chaque pixel devient une émotion, chaque couleur un langage universel.",
          visual: "🎨",
          icon: <Palette className="w-16 h-16 mx-auto text-white" />
        },
        {
          title: "La Révolution Numérique",
          content: "Maîtrisez les outils modernes qui redéfinissent les frontières de la création. Photoshop, Illustrator et les IA génératives deviennent vos pinceaux numériques.",
          visual: "🖌️",
          icon: <Monitor className="w-16 h-16 mx-auto text-white" />
        },
        {
          title: "L'Impact Visuel",
          content: "Vos créations influencent les marques, inspirent les communautés et façonnent les tendances. Devenez un architecte de l'émotion visuelle à l'ère digitale.",
          visual: "✨",
          icon: <Sparkles className="w-16 h-16 mx-auto text-white" />
        }
      ],
    },
    "web-designer": {
      title: "L'Aventure Interactive",
      steps: [
        {
          title: "L'Art de l'Interface",
          content: "Apprenez à sculpter des expériences utilisateur intuitives où chaque interaction raconte une histoire et guide naturellement le visiteur.",
          visual: "🖱️",
          icon: <Hexagon className="w-16 h-16 mx-auto text-white" />
        },
        {
          title: "Le Langage du Web",
          content: "Maîtrisez HTML, CSS et JavaScript comme un poète maîtrise les mots. Transformez le code en œuvres d'art interactives qui vivent dans le navigateur.",
          visual: "💻",
          icon: <Code className="w-16 h-16 mx-auto text-white" />
        },
        {
          title: "Le Futur Responsive",
          content: "Créez des designs qui s'adaptent magiquement à tous les écrans, des montres connectées aux écrans géants, en conservant leur âme et leur élégance.",
          visual: "📱",
          icon: <Gamepad2 className="w-16 h-16 mx-auto text-white" />
        }
      ],
    },
    "jeux-video": {
      title: "La Saga Ludique",
      steps: [
        {
          title: "L'Alchimie du Jeu",
          content: "Découvrez comment combiner narration, gameplay et esthétique pour créer des expériences immersives qui captivent les joueurs pendant des heures.",
          visual: "🎮",
          icon: <Gamepad2 className="w-16 h-16 mx-auto text-white" />
        },
        {
          title: "Les Moteurs de Rêve",
          content: "Plongez dans Unity et Unreal Engine, ces outils puissants qui donnent vie à vos mondes imaginaires et les peuplent d'interactions magiques.",
          visual: "⚙️",
          icon: <Zap className="w-16 h-16 mx-auto text-white" />
        },
        {
          title: "La Communauté Globale",
          content: "Rejoignez une communauté internationale de créateurs passionnés, partagez vos œuvres et inspirez la prochaine génération de développeurs.",
          visual: "🌍",
          icon: <User className="w-16 h-16 mx-auto text-white" />
        }
      ],
    }
  }
  
  const currentStory = stories[career.id as keyof typeof stories]
  const currentStoryStep = currentStory?.steps[currentStep]
  
  if (!currentStory) return null
  
  return (
    <div className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`relative bg-gradient-to-br ${career.color} rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl transition-all duration-700 ${isVisible ? 'scale-100' : 'scale-90'}`}>
        {/* Bouton de fermeture */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
        >
          <X className="w-6 h-6 text-white" />
        </button>
  
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          {/* Colonne visuelle */}
          <div className="relative h-64 md:h-auto bg-black/20 flex items-center justify-center p-8">
            <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')]"></div>
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <div className="text-8xl mb-6 animate-float">
                {currentStoryStep.visual}
              </div>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                  Étape {currentStep + 1}/{currentStory.steps.length}
                </span>
              </div>
            </div>
          </div>
  
          {/* Colonne texte */}
          <div className="bg-white p-8 md:p-12 flex flex-col">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentStory.title}</h2>
              <div className="flex items-center mb-6 space-x-2">
                {currentStory.steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full flex-1 transition-all ${i <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{currentStoryStep.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{currentStoryStep.content}</p>
            </div>
  
            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${currentStep === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Précédent</span>
              </button>
  
              {currentStep < currentStory.steps.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                  <Link to="/collegien">
                    <button
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      <Star className="w-5 h-5" />
                      <span>Commencer l'aventure</span>
                    </button>
                  </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  }
  
  export default function TechnologiaCareerExplorer() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)
    const [selectedCareer, setSelectedCareer] = useState<any>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
    const [isLoading, setIsLoading] = useState(true)
  
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        })
      }
  
      window.addEventListener('mousemove', handleMouseMove)
  
      // Simuler un chargement
      const timer = setTimeout(() => setIsLoading(false), 1500)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        clearTimeout(timer)
      }
    }, [])
  
    const careers = [
      {
        id: "graphiste",
        name: "Design Visuel",
        description: "Créez des identités visuelles mémorables",
        color: "from-pink-500 to-rose-500",
        icon: Palette,
        position: { x: 20, y: 15 }
      },
      {
        id: "web-designer",
        name: "Design Web",
        description: "Concevez des expériences utilisateur exceptionnelles",
        color: "from-indigo-500 to-purple-500",
        icon: Monitor,
        position: { x: 50, y: 15 }
      },
      {
        id: "jeux-video",
        name: "Création de Jeux",
        description: "Donnez vie à des mondes interactifs",
        color: "from-blue-500 to-cyan-500",
        icon: Gamepad2,
        position: { x: 80, y: 15 }
      },
      {
        id: "developpeur",
        name: "Développement",
        description: "Codez les solutions de demain",
        color: "from-green-500 to-emerald-500",
        icon: Code,
        position: { x: 30, y: 50 }
      },
      {
        id: "cybersecurite",
        name: "Cybersécurité",
        description: "Protégez l'écosystème numérique",
        color: "from-yellow-500 to-amber-500",
        icon: Shield,
        position: { x: 70, y: 50 }
      },
      {
        id: "musique",
        name: "Production Musicale",
        description: "Composez les sons du futur",
        color: "from-purple-500 to-fuchsia-500",
        icon: Music,
        position: { x: 20, y: 85 }
      },
      {
        id: "photographie",
        name: "Photographie",
        description: "Capturez l'instant parfait",
        color: "from-gray-500 to-slate-500",
        icon: Camera,
        position: { x: 50, y: 85 }
      },
      {
        id: "management",
        name: "Management Tech",
        description: "Dirigez l'innovation digitale",
        color: "from-red-500 to-orange-500",
        icon: Briefcase,
        position: { x: 80, y: 85 }
      }
    ]
  
    if (isLoading) {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-t-transparent border-indigo-500 rounded-full animate-spin"></div>
              <Zap className="w-10 h-10 mx-auto text-indigo-400 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Technologia</h1>
            <p className="text-slate-400">Chargement des carrières du futur...</p>
          </div>
        </div>
      )
    }
  
    return (
      <div className="relative min-h-screen landing-layout overflow-hidden">
        {/* Effets d'arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-rose-50/50 to-transparent"></div>
          
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
  
        {/* En-tête */}
        <header className="relative z-10 pt-12 pb-16 px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Explorez les <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500">Carrières Tech</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez les métiers qui façonneront l'avenir numérique et trouvez votre voie
          </p>
        </header>
  
        
  
        {/* Grille des carrières */}
        <div className="relative z-10 container mx-auto px-6 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {careers.map((career) => (
              <div
                key={career.id}
                className={`relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-2 border border-transparent hover:border-white/20 ${hoveredCard === career.id ? 'ring-2 ring-indigo-400/30' : ''}`}
                onMouseEnter={() => setHoveredCard(career.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => ['graphiste', 'web-designer', 'jeux-video'].includes(career.id) ? setSelectedCareer(career) : null}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${career.color}`}></div>
                
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${career.color} text-white`}>
                    <career.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{career.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{career.description}</p>
                  
                  {['graphiste', 'web-designer', 'jeux-video'].includes(career.id) && (
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                      Découvrir l'histoire
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Modal d'histoire */}
        {selectedCareer && (
          <StoryModal career={selectedCareer} onClose={() => setSelectedCareer(null)} />
        )}
  
        {/* Animations CSS */}
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin { animation: spin 8s linear infinite; }
          .animate-float { animation: float 6s ease-in-out infinite; }
        `}</style>
      </div>
    )
  }