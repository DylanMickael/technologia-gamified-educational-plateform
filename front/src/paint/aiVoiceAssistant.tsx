

import { useState, useEffect, useRef } from "react"
import { Volume2, VolumeX, Pause } from "lucide-react"

interface AIVoiceAssistantProps {
  text: string
  onSpeechStart?: () => void
  onSpeechEnd?: () => void
  className?: string
  autoSpeak?: boolean // Nouvelle prop pour activer la parole automatique
}

export default function AIVoiceAssistant({
  text,
  onSpeechStart,
  onSpeechEnd,
  className = "",
  autoSpeak = true,
}: AIVoiceAssistantProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(35).fill(0))
  const [isEnabled, setIsEnabled] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)
  const animationRef = useRef<number>()
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Générer des niveaux audio réalistes pendant la parole
  const generateSpeechLevels = () => {
    return Array(35)
      .fill(0)
      .map((_, index) => {
        // Créer un pattern d'onde plus réaliste pour la parole
        const baseLevel = Math.sin(Date.now() * 0.01 + index * 0.5) * 30 + 50
        const randomVariation = Math.random() * 40
        return Math.max(10, Math.min(90, baseLevel + randomVariation))
      })
  }

  // Animation des barres pendant la parole
  const animateVoiceBars = () => {
    if (isSpeaking) {
      setAudioLevels(generateSpeechLevels())
      animationRef.current = requestAnimationFrame(animateVoiceBars)
    } else {
      setAudioLevels(Array(35).fill(0))
    }
  }

  // Fonction pour faire parler l'IA
  const speakText = () => {
    if (!text || !isEnabled) return

    // Arrêter toute parole en cours
    window.speechSynthesis.cancel()

    // Créer une nouvelle instance de synthèse vocale
    const utterance = new SpeechSynthesisUtterance(text)
    speechRef.current = utterance

    // Configuration de la voix
    utterance.lang = "fr-FR"
    utterance.rate = 0.9 // Vitesse de parole
    utterance.pitch = 1.1 // Ton plus aigu pour un effet IA
    utterance.volume = 0.8

    // Essayer de sélectionner une voix française
    const voices = window.speechSynthesis.getVoices()
    const frenchVoice = voices.find((voice) => voice.lang.includes("fr") || voice.name.includes("French"))
    if (frenchVoice) {
      utterance.voice = frenchVoice
    }

    // Événements de la synthèse vocale
    utterance.onstart = () => {
      setIsSpeaking(true)
      animateVoiceBars()
      onSpeechStart?.()
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      onSpeechEnd?.()
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    // Démarrer la synthèse vocale
    window.speechSynthesis.speak(utterance)
  }

  // Arrêter la parole
  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }

  // Gérer le clic sur le microphone
  const handleMicClick = () => {
    if (isSpeaking) {
      stopSpeaking()
    } else {
      speakText()
    }
  }

  // Effet pour parler automatiquement quand le texte change
  useEffect(() => {
    if (!autoSpeak || !isEnabled || !text) return

    // Attendre un peu pour s'assurer que les voix sont chargées
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      // Vérifier si les voix sont disponibles
      const voices = window.speechSynthesis.getVoices()
      if (voices.length === 0) {
        // Si les voix ne sont pas encore chargées, attendre l'événement
        const handleVoicesChanged = () => {
          speakText()
          window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged)
        }
        window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged)
      } else {
        speakText()
      }
      setIsInitialized(true)
    }, 500) // Délai de 500ms pour laisser le temps au composant de se monter

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [text, autoSpeak, isEnabled]) // Se déclenche à chaque changement de texte

  // Nettoyage lors du démontage
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Démarrer l'animation quand le texte change
  useEffect(() => {
    if (isSpeaking) {
      animateVoiceBars()
    }
  }, [isSpeaking])

  return (
    <div className={`flex items-center ${className}`}>
      {/* Bouton microphone/volume */}
      <button
        onClick={handleMicClick}
        disabled={!text || !isEnabled}
        className={`
          flex items-center justify-center p-3 rounded-full shadow-lg mr-2 transition-all duration-300 transform hover:scale-105 active:scale-95
          ${
            isSpeaking
              ? "bg-gradient-to-r from-red-500 to-red-600 animate-pulse"
              : "bg-gradient-to-r from-[#AE3146] to-[#651627] hover:from-[#BE3156] hover:to-[#751637]"
          }
          ${!text || !isEnabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
        title={isSpeaking ? "Arrêter la parole" : "Démarrer la parole"}
      >
        {isSpeaking ? (
          <Pause className="w-6 h-6 text-white animate-pulse" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Visualiseur audio */}
      <div className="flex items-center bg-gradient-to-r from-[#AE3146] to-[#651627] w-[210px] rounded-full px-4 py-3 shadow-lg">
        <div className="flex items-end space-x-1 w-full justify-center" style={{ height: "40px" }}>
          {audioLevels.map((height, index) => (
            <div
              key={index}
              className={`
                bg-white rounded-sm transition-all duration-150 ease-out
                ${isSpeaking ? "opacity-100" : "opacity-30"}
              `}
              style={{
                width: "3px",
                height: isSpeaking ? `${height}%` : "20%",
                minHeight: "8px",
                maxHeight: "36px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bouton pour activer/désactiver la parole automatique */}
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`
          ml-2 p-2 rounded-full transition-colors
          ${isEnabled ? "bg-green-200 hover:bg-green-300" : "bg-red-200 hover:bg-red-300"}
        `}
        title={isEnabled ? "Désactiver la voix automatique" : "Activer la voix automatique"}
      >
        {isEnabled ? <Volume2 className="w-4 h-4 text-green-600" /> : <VolumeX className="w-4 h-4 text-red-600" />}
      </button>

      {/* Indicateur de statut */}
      <div className="ml-2 flex flex-col items-center">
        {isSpeaking && (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping mr-1"></div>
            <span className="text-xs text-red-600 font-medium">Parle...</span>
          </div>
        )}

        {autoSpeak && isEnabled && !isSpeaking && isInitialized && (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            <span className="text-xs text-green-600 font-medium">Auto</span>
          </div>
        )}
      </div>
    </div>
  )
}
