"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import AIVoiceAssistant from "./aiVoiceAssistant"
import CelebrationPage from "./celebrationPage"
import { Link } from "react-router-dom"
import  index from "../assets/index.png"
import ordinateur from "../assets/ordinateur.png"
import robotIA from "../assets/robotIA.png"
import troisPoint from "../assets/troisPoint.png"

type Tool = "brush" | "eraser" | "rectangle" | "circle" | "line" | "text" | "select" | "stamp"

interface DrawingState {
  tool: Tool
  color: string
  brushSize: number
  opacity: number
  isDrawing: boolean
  startX: number
  startY: number
  isAddingText: boolean
  textInput: string
}

interface ValidationResult {
  similarity: number
  colorMatch: number
  shapeMatch: number
  positionMatch: number
  overallScore: number
  passed: boolean
  feedback: string
}

// Messages de l'IA selon le contexte
const aiMessages = {
  welcome: [
    "Coucou ! Je suis Technolog'IA, ton assistant créatif ! Essaie de reproduire le modèle !",
    "Salut petit artiste ! Regarde bien le modèle et dessine la même chose !",
    "Bonjour ! Ton défi : reproduire exactement ce que tu vois dans le modèle !",
  ],
  colorChange: [
    "Excellente couleur ! Assure-toi qu'elle correspond au modèle !",
    "Bonne couleur ! Vérifie si c'est la même que dans l'exemple !",
    "Super choix ! Cette couleur ressemble bien au modèle !",
  ],
  drawing: [
    "Très bien ! Tu reproduis bien le modèle ! Continue !",
    "Parfait ! Ton dessin ressemble de plus en plus au modèle !",
    "Excellent ! Tu suis bien l'exemple donné !",
  ],
  toolChange: [
    "Bon outil ! Utilise-le pour reproduire les formes du modèle !",
    "Parfait ! Cet outil t'aidera à copier le modèle !",
    "Super ! Avec ça, tu vas pouvoir bien imiter l'exemple !",
  ],
  validation: [
    "Maintenant, clique sur Valider pour voir si ton dessin correspond !",
    "C'est le moment de vérifier ! Appuie sur le bouton Valider !",
    "Prêt pour la vérification ? Clique sur Valider !",
  ],
  almostThere: [
    "Presque ! Regarde bien le modèle et ajuste quelques détails !",
    "Tu y es presque ! Compare ton dessin avec l'exemple !",
    "Encore un petit effort ! Vérifie les couleurs et les formes !",
  ],
  needsWork: [
    "Il faut encore travailler ! Regarde bien les formes du modèle !",
    "Pas encore ! Observe attentivement les couleurs et les positions !",
    "Continue tes efforts ! Compare chaque détail avec l'exemple !",
  ],
  success: [
    "🎉 BRAVO ! Ton dessin correspond parfaitement au modèle !",
    "✨ FANTASTIQUE ! Tu as réussi à reproduire le modèle !",
    "🌟 EXCELLENT ! Tu es un vrai champion du dessin !",
  ],
}

const colors = [
  "#EFC622", // Jaune
  "#E97329", // Orange
  "#000000", // Noir
  "#ED7272", // Rouge clair
  "#40A1A1", // Turquoise
  "#C95792", // Rose
  "#ffffff", // Blanc
  "#3C3CD8", // Bleu
  "#635931", // Marron
  "#7A25BC", // Violet
  "#EF2222", // Rouge
  "#8B1A76", // Magenta
  "#201A058A", // Gris foncé
  "#358435", // Vert
]

const backgroundColors = ["#FFF8E1", "#E8F5E8", "#E3F2FD", "#FCE4EC", "#F3E5F5", "#FFFFFF"]

const stamps = ["⭐", "❤️", "🌈", "🦄", "🌸", "🎈", "🎨", "🌞", "🦋", "🍭", "🎪", "🎯"]

// Composants Button et Slider (identiques au code précédent)
const KidsButton: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "fun" | "ghost" | "violet"
  size?: "sm" | "md" | "lg"
  className?: string
  active?: boolean
}> = ({ children, onClick, disabled = false, variant = "fun", size = "md", className = "", active = false }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-bold transition-all duration-200 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none shadow-lg hover:shadow-xl"

  const variantClasses = {
    primary: `bg-[#C95991] focus:ring-red-300 text-white ${active ? "ring-4 ring-red-300" : ""}`,
    secondary: `bg-[#E55050] focus:ring-red-300 ${active ? "ring-4 ring-red-300" : ""}`,
    fun: `bg-[#5EA95E] focus:ring-pink-300 ${active ? "ring-4 ring-pink-300 scale-110" : ""}`,
    ghost: `bg-white/20 text-gray-700 hover:bg-white/30 focus:ring-gray-300 backdrop-blur-sm ${active ? "bg-white/40 ring-4 ring-gray-300" : ""}`,
    violet: "bg-[#6C3C74]",
  }

  const sizeClasses = {
    sm: "h-10 w-10 text-sm",
    md: "h-12 w-12 text-base",
    lg: "h-16 w-16 text-lg",
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const FunSlider: React.FC<{
  value: number[]
  onValueChange: (value: number[]) => void
  min: number
  max: number
  step: number
  className?: string
  label: string
}> = ({ value, onValueChange, min, max, step, className = "", label }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onValueChange([Number.parseInt(e.target.value)])}
          className="w-full h-3 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #DE5D9F 0%, #E3B798 ${((value[0] - min) / (max - min)) * 100}%, #E5E7EB ${((value[0] - min) / (max - min)) * 100}%, #E5E7EB 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{min}</span>
          <span className="font-bold text-[#C95792]">{value[0]}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  )
}

// Icônes SVG (identiques au code précédent)
const FunIcons = {
  Brush: ({ active }: { active?: boolean }) => (
    <svg className={`w-6 h-6 ${active ? "text-yellow-300" : "text-white"}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" />
    </svg>
  ),
  Eraser: ({ active }: { active?: boolean }) => (
    <svg className={`w-6 h-6 ${active ? "text-yellow-300" : "text-white"}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.008 4.008 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53-6.36-6.36-3.54 3.36z" />
    </svg>
  ),
  Square: ({ active }: { active?: boolean }) => (
    <svg
      className={`w-6 h-6 ${active ? "text-yellow-300" : "text-white"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" ry="4" strokeWidth={3} />
    </svg>
  ),
  Circle: ({ active }: { active?: boolean }) => (
    <svg
      className={`w-6 h-6 ${active ? "text-yellow-300" : "text-white"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" strokeWidth={3} />
    </svg>
  ),
  Line: ({ active }: { active?: boolean }) => (
    <svg
      className={`w-6 h-6 ${active ? "text-yellow-300" : "text-white"}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <line x1="5" y1="12" x2="19" y2="12" strokeWidth={3} />
    </svg>
  ),
  Text: ({ active }: { active?: boolean }) => (
    <svg className={`w-6 h-6 ${active ? "text-yellow-300" : "text-white"}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 4v3h5.5v12h3V7H19V4z" />
    </svg>
  ),
  Undo: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
    </svg>
  ),
  Redo: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
      />
    </svg>
  ),
  Download: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  ),
  Clear: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  ),
  Check: () => (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
}

export default function PaintKids() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const referenceCanvasRef = useRef<HTMLCanvasElement>(null)

  const [drawingState, setDrawingState] = useState<DrawingState>({
    tool: "brush",
    color: "#C95792",
    brushSize: 8,
    opacity: 100,
    isDrawing: false,
    startX: 0,
    startY: 0,
    isAddingText: false,
    textInput: "",
  })

  const [backgroundColor, setBackgroundColor] = useState("#FFF8E1")
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [selectedStamp, setSelectedStamp] = useState("⭐")
  const [currentAIMessage, setCurrentAIMessage] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentDrawingImage, setCurrentDrawingImage] = useState("")
  const [validationAttempts, setValidationAttempts] = useState(0)
  const [isValidating, setIsValidating] = useState(false)
  const [lastValidationResult, setLastValidationResult] = useState<ValidationResult | null>(null)

  // Fonction pour obtenir un message aléatoire d'une catégorie
  const getRandomMessage = (category: keyof typeof aiMessages) => {
    const messages = aiMessages[category]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  // Changer le message de l'IA selon les actions
  const updateAIMessage = (action: string) => {
    let newMessage = ""

    switch (action) {
      case "welcome":
        newMessage = getRandomMessage("welcome")
        break
      case "colorChange":
        newMessage = getRandomMessage("colorChange")
        break
      case "drawing":
        newMessage = getRandomMessage("drawing")
        break
      case "toolChange":
        newMessage = getRandomMessage("toolChange")
        break
      case "validation":
        newMessage = getRandomMessage("validation")
        break
      case "almostThere":
        newMessage = getRandomMessage("almostThere")
        break
      case "needsWork":
        newMessage = getRandomMessage("needsWork")
        break
      case "success":
        newMessage = getRandomMessage("success")
        break
      default:
        newMessage = getRandomMessage("welcome")
    }

    setCurrentAIMessage(newMessage)
    setMessageCount((prev) => prev + 1)
  }

  // Message de bienvenue au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      updateAIMessage("welcome")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Charger l'image de référence dans le canvas caché
  useEffect(() => {
    const canvas = referenceCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    // Créer une image de référence plus complexe et détaillée
    ctx.fillStyle = "#FFF8E1"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dessiner un ordinateur plus détaillé
    // Écran principal
    ctx.fillStyle = "#000000"
    ctx.fillRect(250, 150, 300, 200) // Écran noir

    // Écran intérieur (zone d'affichage)
    ctx.fillStyle = "#3C3CD8" // Bleu
    ctx.fillRect(270, 170, 260, 140)

    // Détails de l'écran
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(280, 180, 80, 60) // Fenêtre 1
    ctx.fillStyle = "#EFC622"
    ctx.fillRect(380, 180, 80, 60) // Fenêtre 2
    ctx.fillStyle = "#ED7272"
    ctx.fillRect(480, 180, 40, 60) // Barre latérale

    // Base de l'ordinateur
    ctx.fillStyle = "#635931" // Marron
    ctx.fillRect(300, 350, 200, 30)

    // Pied de l'ordinateur
    ctx.fillStyle = "#000000"
    ctx.fillRect(380, 380, 40, 50)

    // Clavier
    ctx.fillStyle = "#C0C0C0"
    ctx.fillRect(200, 450, 400, 80)

    // Touches du clavier
    ctx.fillStyle = "#ffffff"
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.fillRect(220 + i * 35, 460 + j * 20, 30, 15)
      }
    }

    console.log("🖼️ Image de référence créée avec succès")
  }, [])

  // SYSTÈME DE VALIDATION AVANCÉ

  // 1. Analyse des couleurs dominantes
  const analyzeColors = (imageData: ImageData): Map<string, number> => {
    const colorMap = new Map<string, number>()
    const data = imageData.data

    // Échantillonnage pour optimiser les performances
    for (let i = 0; i < data.length; i += 16) {
      // 1 pixel sur 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const a = data[i + 3]

      if (a > 128) {
        // Ignorer les pixels transparents
        // Quantifier les couleurs pour réduire la variabilité
        const quantizedR = Math.floor(r / 32) * 32
        const quantizedG = Math.floor(g / 32) * 32
        const quantizedB = Math.floor(b / 32) * 32

        const colorKey = `${quantizedR},${quantizedG},${quantizedB}`
        colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1)
      }
    }

    return colorMap
  }

  // 2. Détection des formes et contours
  const detectShapes = (imageData: ImageData): number => {
    const data = imageData.data
    const width = imageData.width
    const height = imageData.height
    let edgeCount = 0

    // Détection de contours simple (Sobel)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x += 4) {
        // Échantillonnage
        const idx = (y * width + x) * 4

        // Calculer la luminosité du pixel central
        const centerLum = (data[idx] + data[idx + 1] + data[idx + 2]) / 3

        // Calculer les gradients horizontaux et verticaux
        const leftLum = (data[idx - 4] + data[idx - 3] + data[idx - 2]) / 3
        const rightLum = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3
        const topLum = (data[idx - width * 4] + data[idx - width * 4 + 1] + data[idx - width * 4 + 2]) / 3
        const bottomLum = (data[idx + width * 4] + data[idx + width * 4 + 1] + data[idx + width * 4 + 2]) / 3

        const gradX = Math.abs(rightLum - leftLum)
        const gradY = Math.abs(bottomLum - topLum)
        const gradient = Math.sqrt(gradX * gradX + gradY * gradY)

        if (gradient > 50) {
          // Seuil de détection de contour
          edgeCount++
        }
      }
    }

    return edgeCount
  }

  // 3. Analyse de la distribution spatiale
  const analyzeSpatialDistribution = (imageData: ImageData): number[] => {
    const data = imageData.data
    const width = imageData.width
    const height = imageData.height
    const regions = [0, 0, 0, 0] // Top-left, Top-right, Bottom-left, Bottom-right

    for (let y = 0; y < height; y += 8) {
      for (let x = 0; x < width; x += 8) {
        const idx = (y * width + x) * 4
        const lum = (data[idx] + data[idx + 1] + data[idx + 2]) / 3

        if (lum < 200) {
          // Pixel non-blanc (contenu)
          const regionX = x < width / 2 ? 0 : 1
          const regionY = y < height / 2 ? 0 : 1
          const regionIndex = regionY * 2 + regionX
          regions[regionIndex]++
        }
      }
    }

    return regions
  }

  // 4. Fonction de validation principale
  const validateDrawingAdvanced = async (): Promise<ValidationResult> => {
    const userCanvas = canvasRef.current
    const refCanvas = referenceCanvasRef.current

    if (!userCanvas || !refCanvas) {
      throw new Error("Canvas non disponibles")
    }

    const userCtx = userCanvas.getContext("2d")
    const refCtx = refCanvas.getContext("2d")

    if (!userCtx || !refCtx) {
      throw new Error("Contextes de canvas non disponibles")
    }

    // Obtenir les données des images
    const userImageData = userCtx.getImageData(0, 0, userCanvas.width, userCanvas.height)
    const refImageData = refCtx.getImageData(0, 0, refCanvas.width, refCanvas.height)

    console.log("🔍 Analyse des couleurs...")
    // Analyse des couleurs
    const userColors = analyzeColors(userImageData)
    const refColors = analyzeColors(refImageData)

    let colorMatch = 0
    let totalRefColors = 0

    for (const [color, count] of refColors) {
      totalRefColors += count
      const userCount = userColors.get(color) || 0
      const similarity = Math.min(userCount, count) / count
      colorMatch += similarity * count
    }

    colorMatch = totalRefColors > 0 ? (colorMatch / totalRefColors) * 100 : 0

    console.log("🔍 Détection des formes...")
    // Analyse des formes
    const userShapes = detectShapes(userImageData)
    const refShapes = detectShapes(refImageData)

    const shapeMatch = refShapes > 0 ? Math.min(userShapes / refShapes, 1) * 100 : 0

    console.log("🔍 Analyse de la position...")
    // Analyse de la distribution spatiale
    const userDistribution = analyzeSpatialDistribution(userImageData)
    const refDistribution = analyzeSpatialDistribution(refImageData)

    let positionMatch = 0
    const totalRefDistribution = refDistribution.reduce((a, b) => a + b, 0)

    if (totalRefDistribution > 0) {
      for (let i = 0; i < 4; i++) {
        const refRatio = refDistribution[i] / totalRefDistribution
        const userRatio = userDistribution[i] / (userDistribution.reduce((a, b) => a + b, 0) || 1)
        positionMatch += (1 - Math.abs(refRatio - userRatio)) * 25 // 25% par région
      }
    }

    // Calcul du score global avec pondération
    const weights = {
      color: 0.3, // 30% pour les couleurs
      shape: 0.4, // 40% pour les formes
      position: 0.3, // 30% pour la position
    }

    const overallScore = colorMatch * weights.color + shapeMatch * weights.shape + positionMatch * weights.position

    // Seuils de validation stricts
    const minColorMatch = 40 // Au moins 40% de correspondance des couleurs
    const minShapeMatch = 35 // Au moins 35% de correspondance des formes
    const minPositionMatch = 30 // Au moins 30% de correspondance de position
    const minOverallScore = 50 // Score global minimum de 50%

    const passed =
      colorMatch >= minColorMatch &&
      shapeMatch >= minShapeMatch &&
      positionMatch >= minPositionMatch &&
      overallScore >= minOverallScore

    // Génération du feedback
    let feedback = ""
    if (!passed) {
      if (colorMatch < minColorMatch) {
        feedback += "Vérifie les couleurs utilisées. "
      }
      if (shapeMatch < minShapeMatch) {
        feedback += "Attention aux formes et aux contours. "
      }
      if (positionMatch < minPositionMatch) {
        feedback += "Regarde bien où placer les éléments. "
      }
    } else {
      feedback = "Excellent travail ! Toutes les conditions sont remplies !"
    }

    const result: ValidationResult = {
      similarity: Math.round((colorMatch + shapeMatch + positionMatch) / 3),
      colorMatch: Math.round(colorMatch),
      shapeMatch: Math.round(shapeMatch),
      positionMatch: Math.round(positionMatch),
      overallScore: Math.round(overallScore),
      passed,
      feedback,
    }

    console.log("📊 Résultats de validation:", result)
    return result
  }

  // Fonction de validation principale
  const validateDrawing = async () => {
    console.log("🔍 Début de la validation avancée...")
    setIsValidating(true)

    try {
      // Sauvegarder l'image du dessin
      const canvas = canvasRef.current
      if (canvas) {
        const dataURL = canvas.toDataURL()
        setCurrentDrawingImage(dataURL)
      }

      // Attendre un peu pour l'effet visuel
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Effectuer la validation avancée
      const result = await validateDrawingAdvanced()
      setLastValidationResult(result)

      if (result.passed) {
        console.log("🎉 VALIDATION RÉUSSIE !")
        updateAIMessage("success")
        setTimeout(() => {
          setShowCelebration(true)
        }, 1000)
      } else {
        console.log(`❌ Validation échouée - Score: ${result.overallScore}%`)
        setValidationAttempts((prev) => prev + 1)

        // Message adapté selon le score
        if (result.overallScore >= 35) {
          updateAIMessage("almostThere")
        } else {
          updateAIMessage("needsWork")
        }
      }
    } catch (error) {
      console.error("❌ Erreur lors de la validation:", error)
      updateAIMessage("needsWork")
    }

    setIsValidating(false)
  }

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const undo = () => {
    if (historyIndex > 0) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (!canvas || !ctx) return

      setHistoryIndex(historyIndex - 1)
      ctx.putImageData(history[historyIndex - 1], 0, 0)
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (!canvas || !ctx) return

      setHistoryIndex(historyIndex + 1)
      ctx.putImageData(history[historyIndex + 1], 0, 0)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveToHistory()
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "mon-dessin.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    canvas.width = 800
    canvas.height = 600
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    setHistory([imageData])
    setHistoryIndex(0)
  }, [backgroundColor])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (drawingState.tool === "text") {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (!canvas || !ctx) return

      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (canvas.width / rect.width)
      const y = (e.clientY - rect.top) * (canvas.height / rect.height)

      setDrawingState((prev) => ({
        ...prev,
        isAddingText: true,
        startX: x,
        startY: y,
      }))
    } else if (drawingState.tool === "stamp") {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (!canvas || !ctx) return

      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (canvas.width / rect.width)
      const y = (e.clientY - rect.top) * (canvas.height / rect.height)

      ctx.font = "48px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(selectedStamp, x, y)
      saveToHistory()
    } else {
      startDrawing(e)
    }
  }

  const addText = () => {
    if (!drawingState.textInput.trim()) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    ctx.font = "bold 24px Comic Sans MS, cursive"
    ctx.fillStyle = drawingState.color
    ctx.textAlign = "left"
    ctx.textBaseline = "top"
    ctx.fillText(drawingState.textInput, drawingState.startX, drawingState.startY)

    setDrawingState((prev) => ({
      ...prev,
      isAddingText: false,
      textInput: "",
    }))
    saveToHistory()
  
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    setDrawingState((prev) => ({
      ...prev,
      isDrawing: true,
      startX: x,
      startY: y,
    }))

    ctx.globalAlpha = drawingState.opacity / 100
    ctx.strokeStyle = drawingState.color
    ctx.lineWidth = drawingState.brushSize

    if (drawingState.tool === "brush") {
      ctx.globalCompositeOperation = "source-over"
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else if (drawingState.tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.beginPath()
      ctx.moveTo(x, y)
    }

  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingState.isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    if (drawingState.tool === "brush" || drawingState.tool === "eraser") {
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingState.isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (canvas.width / rect.width)
    const y = (e.clientY - rect.top) * (canvas.height / rect.height)

    if (drawingState.tool === "rectangle") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeRect(drawingState.startX, drawingState.startY, x - drawingState.startX, y - drawingState.startY)
    } else if (drawingState.tool === "circle") {
      ctx.globalCompositeOperation = "source-over"
      const radius = Math.sqrt(Math.pow(x - drawingState.startX, 2) + Math.pow(y - drawingState.startY, 2))
      ctx.beginPath()
      ctx.arc(drawingState.startX, drawingState.startY, radius, 0, 2 * Math.PI)
      ctx.stroke()
    } else if (drawingState.tool === "line") {
      ctx.globalCompositeOperation = "source-over"
      ctx.beginPath()
      ctx.moveTo(drawingState.startX, drawingState.startY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    setDrawingState((prev) => ({ ...prev, isDrawing: false }))
    saveToHistory()
  }

  if (showCelebration) {
    return (
      <CelebrationPage
        onClose={() => setShowCelebration(false)}
        onNewDrawing={() => {
          setShowCelebration(false)
          clearCanvas()
          setValidationAttempts(0)
          setLastValidationResult(null)
          updateAIMessage("welcome")
        }}
        drawingImage={currentDrawingImage}
        childName="Champion"
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100">
      {/* Canvas de référence caché */}
      <canvas ref={referenceCanvasRef} style={{ display: "none" }} />

      {/* Header */}
      <div className="bg-gradient-to-r from-[#B55285] to-[#CD8136] p-4 shadow-lg">
        <h1 className="text-center text-4xl font-bold text-white drop-shadow-lg animate-pulse">Mon Atelier Magique</h1>
      </div>

      {/* Top Toolbar */}
      <div className="bg-white/80 backdrop-blur-sm flex flex-row items-center justify-evenly p-3 shadow-lg">
        <Link to="/acceuilEnfant">
          <button className="bg-[#671B42] flex flex-row items-center gap-4 px-4 py-2 rounded-xl">
            <FunIcons.Undo />
            <span className="text-2xl text-white">Retour</span>
          </button>
        </Link>

        <div className="flex items-center justify-center gap-10 flex-wrap">
          {/* Actions */}
          <div className="flex items-center gap-2">
            <KidsButton onClick={undo} variant="primary" size="lg">
              <FunIcons.Undo />
            </KidsButton>
            <KidsButton onClick={redo} variant="primary" size="lg">
              <FunIcons.Redo />
            </KidsButton>
          </div>

          {/* Tools */}
          <div className="flex items-center gap-2 bg-white/50 rounded-full p-2">
            <KidsButton
              variant="violet"
              size="lg"
              active={drawingState.tool === "brush"}
              onClick={() => {
                setDrawingState((prev) => ({ ...prev, tool: "brush" }))
                updateAIMessage("toolChange")
              }}
            >
              <FunIcons.Brush active={drawingState.tool === "brush"} />
            </KidsButton>
            <KidsButton
              variant="violet"
              size="lg"
              active={drawingState.tool === "eraser"}
              onClick={() => {
                setDrawingState((prev) => ({ ...prev, tool: "eraser" }))
                updateAIMessage("toolChange")
              }}
            >
              <FunIcons.Eraser active={drawingState.tool === "eraser"} />
            </KidsButton>
            <KidsButton
              variant="violet"
              size="lg"
              active={drawingState.tool === "rectangle"}
              onClick={() => {
                setDrawingState((prev) => ({ ...prev, tool: "rectangle" }))
                updateAIMessage("toolChange")
              }}
            >
              <FunIcons.Square active={drawingState.tool === "rectangle"} />
            </KidsButton>
            <KidsButton
              variant="violet"
              size="lg"
              active={drawingState.tool === "circle"}
              onClick={() => {
                setDrawingState((prev) => ({ ...prev, tool: "circle" }))
                updateAIMessage("toolChange")
              }}
            >
              <FunIcons.Circle active={drawingState.tool === "circle"} />
            </KidsButton>
            <KidsButton
              variant="violet"
              size="lg"
              active={drawingState.tool === "line"}
              onClick={() => {
                setDrawingState((prev) => ({ ...prev, tool: "line" }))
                updateAIMessage("toolChange")
              }}
            >
              <FunIcons.Line active={drawingState.tool === "line"} />
            </KidsButton>
            <KidsButton
              variant="violet"
              size="lg"
              active={drawingState.tool === "text"}
              onClick={() => {
                setDrawingState((prev) => ({ ...prev, tool: "text" }))
                updateAIMessage("toolChange")
              }}
            >
              <FunIcons.Text active={drawingState.tool === "text"} />
            </KidsButton>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <KidsButton onClick={clearCanvas} variant="secondary" size="lg">
              <FunIcons.Clear />
            </KidsButton>
            <KidsButton onClick={downloadCanvas} variant="fun" size="lg">
              <FunIcons.Download />
            </KidsButton>
          </div>
        </div>

        <button
          onClick={() => {
            console.log("🎯 Bouton Valider cliqué !")
            updateAIMessage("validation")
            validateDrawing()
          }}
          disabled={isValidating}
          className={`bg-[#671B42] flex flex-row items-center gap-4 px-4 py-2 rounded-xl hover:bg-[#7A1F4A] transition-colors ${
            isValidating ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isValidating ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FunIcons.Check />
          )}
          <span className="text-2xl text-white">{isValidating ? "Analyse..." : "Valider"}</span>
        </button>
      </div>

      <div className="flex bg-gray-100 h-[calc(100vh-140px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-white/90 backdrop-blur-sm p-6 overflow-y-auto shadow-lg">
          {/* Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-700 flex items-center gap-2">🌈 Couleurs de mon dessin</h3>
            <div className="grid grid-cols-4 gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-full border-4 transition-all duration-200 transform hover:scale-125 active:scale-110 shadow-lg ${
                    drawingState.color === color
                      ? "border-white ring-4 ring-pink-400 scale-110 animate-pulse"
                      : "border-white hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setDrawingState((prev) => ({ ...prev, color }))
                    updateAIMessage("colorChange")
                  }}
                />
              ))}
            </div>
          </div>

          {/* Background Colors */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-gray-700 flex items-center gap-2">🎪 Arrière plan du dessin</h3>
            <div className="grid grid-cols-3 gap-3">
              {backgroundColors.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-full border-4 transition-all duration-200 transform hover:scale-125 active:scale-110 shadow-lg ${
                    backgroundColor === color
                      ? "border-white ring-4 ring-yellow-400 scale-110 animate-pulse"
                      : "border-white hover:border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBackgroundColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Stamps */}
          {drawingState.tool === "stamp" && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-gray-700 flex items-center gap-2">⭐ Mes Autocollants</h3>
              <div className="grid grid-cols-4 gap-2">
                {stamps.map((stamp) => (
                  <button
                    key={stamp}
                    className={`w-12 h-12 rounded-full border-4 transition-all duration-200 transform hover:scale-125 active:scale-110 shadow-lg text-2xl ${
                      selectedStamp === stamp
                        ? "border-pink-400 bg-pink-100 scale-110 animate-bounce"
                        : "border-gray-300 bg-white hover:border-pink-300"
                    }`}
                    onClick={() => setSelectedStamp(stamp)}
                  >
                    {stamp}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brush Size */}
          <div className="mb-8">
            <FunSlider
              value={[drawingState.brushSize]}
              onValueChange={(value) => setDrawingState((prev) => ({ ...prev, brushSize: value[0] }))}
              max={30}
              min={2}
              step={1}
              label="🖌️ Taille de mon Pinceau"
            />
          </div>

          {/* Opacity */}
          <div className="mb-8">
            <FunSlider
              value={[drawingState.opacity]}
              onValueChange={(value) => setDrawingState((prev) => ({ ...prev, opacity: value[0] }))}
              max={100}
              min={10}
              step={10}
              label="✨ Transparence"
            />
          </div>

          {/* Résultats de validation */}
          {lastValidationResult && (
            <div className="mb-8 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <h3 className="text-sm font-bold text-blue-800 mb-2">📊 Dernière Analyse</h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Couleurs:</span>
                  <span
                    className={`font-bold ${lastValidationResult.colorMatch >= 40 ? "text-green-600" : "text-red-600"}`}
                  >
                    {lastValidationResult.colorMatch}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Formes:</span>
                  <span
                    className={`font-bold ${lastValidationResult.shapeMatch >= 35 ? "text-green-600" : "text-red-600"}`}
                  >
                    {lastValidationResult.shapeMatch}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Position:</span>
                  <span
                    className={`font-bold ${lastValidationResult.positionMatch >= 30 ? "text-green-600" : "text-red-600"}`}
                  >
                    {lastValidationResult.positionMatch}%
                  </span>
                </div>
                <div className="flex justify-between border-t pt-1">
                  <span>Score:</span>
                  <span className={`font-bold ${lastValidationResult.passed ? "text-green-600" : "text-red-600"}`}>
                    {lastValidationResult.overallScore}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-2">{lastValidationResult.feedback}</p>
            </div>
          )}

          {/* Tentatives de validation */}
          {validationAttempts > 0 && (
            <div className="mb-8 p-4 bg-yellow-100 rounded-xl border-2 border-yellow-300">
              <h3 className="text-sm font-bold text-yellow-800 mb-2">💪 Tentatives</h3>
              <p className="text-yellow-700">Essai n°{validationAttempts}</p>
              <p className="text-xs text-yellow-600 mt-1">Continue, tu peux y arriver !</p>
            </div>
          )}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-6">
              <canvas
                ref={canvasRef}
                className="border-4 rounded-2xl cursor-crosshair shadow-inner"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  cursor:
                    drawingState.tool === "text" ? "text" : drawingState.tool === "stamp" ? "pointer" : "crosshair",
                }}
                onMouseDown={handleCanvasClick}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar with AI */}
        <div className="relative w-100 bg-white/90 backdrop-blur-sm overflow-hidden p-6 shadow-lg">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="font-bold text-4xl text-black">Modèle à dessiner</p>
            <motion.img
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-[50px] h-[50px]"
              src={index}/>
      
            
            <div className="bg-gray-100 rounded-xl p-4">
              <img src={ordinateur} alt="ordianteur" />
            </div>
          </div>

          {/* Bulle de dialogue de l'IA */}
          <div className="bg-gradient-to-r w-[250px] absolute bottom-58 right-25 rounded-full from-[#AE3146] to-[#651627] p-4 max-w-lg">
            <p className="text-white text-center text-md break-words leading-relaxed">{currentAIMessage}</p>
          </div>

          <div className="absolute bottom-0 flex flex-row justify-around w-full">
            <div className="flex items-center absolute bottom-0 left-0">
              <AIVoiceAssistant
                text={currentAIMessage}
                onSpeechStart={() => setIsSpeaking(true)}
                onSpeechEnd={() => setIsSpeaking(false)}
                autoSpeak={true}
              />
            </div>

            <div className="absolute bottom-45 right-20 text-2xl">
               <img src={troisPoint} alt="troisPoint" />
            </div>
            <div className="w-[100px] h-[200px] absolute bottom-0 right-6 text-8xl flex items-end justify-center">
              <img src={robotIA} alt="robotIA"  className="w-[100px] h-[200px]"/>
            </div>
          </div>
        </div>
      </div>

      {/* Text Input Modal */}
      {drawingState.isAddingText && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-pink-300 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-700 mb-4 text-center">✏️ Écris ton Texte Magique !</h3>
            <input
              type="text"
              value={drawingState.textInput}
              onChange={(e) => setDrawingState((prev) => ({ ...prev, textInput: e.target.value }))}
              className="w-full p-4 border-4 border-pink-200 rounded-2xl text-lg font-bold text-center focus:border-pink-400 focus:outline-none"
              placeholder="Tape ton texte ici..."
              autoFocus
              onKeyPress={(e) => e.key === "Enter" && addText()}
            />
            <div className="flex gap-4 mt-6">
              <KidsButton onClick={addText} variant="primary" className="flex-1 h-14 text-lg">
                ✨ Ajouter !
              </KidsButton>
              <KidsButton
                onClick={() => setDrawingState((prev) => ({ ...prev, isAddingText: false, textInput: "" }))}
                variant="ghost"
                className="flex-1 h-14 text-lg"
              >
                ❌ Annuler
              </KidsButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
