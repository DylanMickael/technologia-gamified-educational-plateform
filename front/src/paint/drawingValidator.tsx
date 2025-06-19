
import { useRef, useEffect } from "react"

interface DrawingValidatorProps {
  userCanvas: HTMLCanvasElement | null
  referenceImage: string
  onMatch: () => void
  onNoMatch: () => void
  threshold?: number // Seuil de similarité (0-100)
}

export default function DrawingValidator({
  userCanvas,
  referenceImage,
  onMatch,
  onNoMatch,
  threshold = 70,
}: DrawingValidatorProps) {
  const referenceCanvasRef = useRef<HTMLCanvasElement>(null)

  // Fonction pour comparer deux images
  const compareImages = async () => {
    if (!userCanvas || !referenceCanvasRef.current) return

    const userCtx = userCanvas.getContext("2d")
    const refCtx = referenceCanvasRef.current.getContext("2d")

    if (!userCtx || !refCtx) return

    // Obtenir les données des pixels
    const userImageData = userCtx.getImageData(0, 0, userCanvas.width, userCanvas.height)
    const refImageData = refCtx.getImageData(0, 0, referenceCanvasRef.current.width, referenceCanvasRef.current.height)

    // Calculer la similarité
    const similarity = calculateSimilarity(userImageData, refImageData)

    console.log(`Similarité: ${similarity}%`)

    if (similarity >= threshold) {
      onMatch()
    } else {
      onNoMatch()
    }
  }

  // Calculer la similarité entre deux ImageData
  const calculateSimilarity = (imageData1: ImageData, imageData2: ImageData): number => {
    const data1 = imageData1.data
    const data2 = imageData2.data

    if (data1.length !== data2.length) return 0

    let totalDifference = 0
    const pixelCount = data1.length / 4 // 4 valeurs par pixel (RGBA)

    for (let i = 0; i < data1.length; i += 4) {
      // Calculer la différence pour chaque canal de couleur
      const rDiff = Math.abs(data1[i] - data2[i])
      const gDiff = Math.abs(data1[i + 1] - data2[i + 1])
      const bDiff = Math.abs(data1[i + 2] - data2[i + 2])

      // Moyenne des différences
      const pixelDifference = (rDiff + gDiff + bDiff) / 3
      totalDifference += pixelDifference
    }

    const averageDifference = totalDifference / pixelCount
    const similarity = Math.max(0, 100 - (averageDifference / 255) * 100)

    return Math.round(similarity)
  }

  // Charger l'image de référence
  useEffect(() => {
    if (!referenceImage || !referenceCanvasRef.current) return

    const canvas = referenceCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      canvas.width = 800
      canvas.height = 600
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    img.src = referenceImage
  }, [referenceImage])

  return (
    <div className="hidden">
      <canvas ref={referenceCanvasRef} style={{ display: "none" }} />
      <button onClick={compareImages} style={{ display: "none" }}>
        Comparer
      </button>
    </div>
  )
}
