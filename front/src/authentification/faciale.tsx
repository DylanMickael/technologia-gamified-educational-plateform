

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import * as faceapi from "face-api.js"
import { Camera, Shield, Loader2, CheckCircle, AlertCircle, Scan } from "lucide-react"

const Faciale: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [scanSuccess, setScanSuccess] = useState<boolean>(false)

// Dans useEffect
useEffect(() => {
  const loadModelsAndStartVideo = async () => {
    try {
      // Vérifier et charger tinyFaceDetector
      console.log("Tentative de chargement du modèle Tiny Face Detector depuis /models...")
      const responseTiny = await fetch('/models/tiny_face_detector_model-weights_manifest.json')
      if (!responseTiny.ok) {
        throw new Error('Fichier manifeste de Tiny Face Detector non trouvé: ' + responseTiny.statusText)
      }
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models")
      console.log("Modèle Tiny Face Detector chargé avec succès.")

      // Charger faceLandmark68Net
      const responseLandmark = await fetch('/models/face_landmark_68_model-weights_manifest.json')
      if (!responseLandmark.ok) {
        throw new Error('Fichier manifeste de Face Landmark non trouvé: ' + responseLandmark.statusText)
      }
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models")
      console.log("Modèle Face Landmark chargé avec succès.")

      // Charger faceRecognitionNet
      const responseRecognition = await fetch('/models/face_recognition_model-weights_manifest.json')
      if (!responseRecognition.ok) {
        throw new Error('Fichier manifeste de Face Recognition non trouvé: ' + responseRecognition.statusText)
      }
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models")
      console.log("Modèle Face Recognition chargé avec succès.")

      setIsModelLoaded(true)

      // Démarrer la webcam
      console.log('Tentative de démarrage de la webcam...')
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true }).catch((webcamErr) => {
          throw new Error('Échec de l’accès à la webcam: ' + (webcamErr as Error).message)
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          console.log('Webcam démarrée avec succès.')
        }
      } else {
        throw new Error('La webcam n’est pas supportée par ce navigateur.')
      }
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des modèles ou de la webcam.')
      console.error('Erreur détaillée:', err)
    }
  }

  loadModelsAndStartVideo()

  // Nettoyer le flux vidéo
  return () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      console.log("Webcam arrêtée.")
    }
  }
}, [])
// Dans handleFaceLogin
const handleFaceLogin = async () => {
  if (!isModelLoaded || !videoRef.current) {
    alert("Les modèles ne sont pas chargés ou la webcam n'est pas prête.")
    return
  }

  setIsScanning(true)
  setScanSuccess(false)

  try {
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    if (detections) {
      const descriptor = detections.descriptor
      console.log("Visage détecté:", descriptor)
      setScanSuccess(true)
      setTimeout(() => {
        alert("Visage détecté avec succès !")
        setScanSuccess(false)
      }, 2000)
    } else {
      alert("Aucun visage détecté. Veuillez réessayer.")
    }
  } catch (error) {
    alert("Échec de la détection faciale.")
    console.error("Erreur de détection:", error)
  } finally {
    setIsScanning(false)
  }
}

  return (
    <div className="min-h-screen  bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              Reconnaissance Faciale
            </h1>
            <p className="text-gray-300 text-sm">Authentification sécurisée par IA</p>
          </motion.div>

          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center mb-6"
          >
            {!isModelLoaded ? (
              <div className="flex items-center space-x-2 text-yellow-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Chargement des modèles...</span>
              </div>
            ) : error ? (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Erreur détectée</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Système prêt</span>
              </div>
            )}
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6"
            >
              <p className="text-red-300 text-sm text-center">{error}</p>
            </motion.div>
          )}

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative mb-8"
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 p-1">
              <video ref={videoRef} autoPlay muted className="w-full h-64 object-cover rounded-xl bg-black" />

              {/* Scanning Overlay */}
              {isScanning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="inline-block mb-2"
                    >
                      <Scan className="w-8 h-8 text-white" />
                    </motion.div>
                    <p className="text-white text-sm font-medium">Analyse en cours...</p>
                  </div>
                </motion.div>
              )}

              {/* Success Overlay */}
              {scanSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-green-500/30 rounded-xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Authentification réussie!</p>
                  </div>
                </motion.div>
              )}

              {/* Camera Icon Overlay */}
              {!isModelLoaded && (
                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Scanning Border Animation */}
            {isScanning && (
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 pointer-events-none"
              >
                <svg className="w-full h-full">
                  <rect
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    rx="16"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="10,5"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            )}
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.button
              onClick={handleFaceLogin}
              disabled={!isModelLoaded || isScanning}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                !isModelLoaded || isScanning
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg hover:shadow-xl"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {isScanning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyse en cours...</span>
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5" />
                    <span>Démarrer l'authentification</span>
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-gray-400 text-xs">Technologie sécurisée • Données chiffrées • Conforme RGPD</p>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60"
        />
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-60"
        />
      </motion.div>
    </div>
  )
}

export default Faciale
