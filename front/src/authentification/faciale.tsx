

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import * as faceapi from "face-api.js"
import { Camera, Loader2, CheckCircle, AlertCircle, Scan, ScanFace } from "lucide-react"
import { ThemeTogglerButton } from "../components/ThemeToggler"
import LanguageSwitcher from "../components/LanguageSwitcher"
import { useTranslation } from "react-i18next"
import NavbarLogo from "../components/Navbar/logo"
import { Link } from "react-router-dom"

const Faciale: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState<boolean>(false)
  const [scanSuccess, setScanSuccess] = useState<boolean>(false)
  const { t } = useTranslation("Login")
  const [, setCodeFace] = useState<Float32Array>()

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
      setCodeFace(descriptor)
      setScanSuccess(true)
      setTimeout(() => {
        alert("Visage détecté avec succès !")
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
    <div  className="px-20 py-10   h-screen">
     
    <div className="hero-section flex flex-col justify-around  h-full">
      <div className="flex flex-row justify-between">
      <NavbarLogo/>
      <button
      className="
            font-space 
            text-md
            bg-green-700 
            text-white 
            px-4 
            py-2
            rounded-lg
            hover:bg-green-600 
            hover:text-white 
            transition-colors"
      >
       <Link to="/login">{t("back")}</Link>
      </button>
    </div>

      
  <div className="flex flex-row justify-evenly items-center">
        <div className="space-y-10">
          <div className="flex flex-col gap-5">
            <h1 data-aos="fade-right" data-aos-delay="100" className="font-monument text-3xl md:text-4xl leading-snug font-bold max-w-[700px]">
              {t("title")}
            </h1>
              <p data-aos="fade-right" data-aos-delay="200" className="font-space w-fit px-5 py-1 text-sm md:text-lg rounded-3xl bg-green-700 text-white dark:text-white ">
                    {t('slogan')}
              </p>
              <p data-aos="fade-right" data-aos-delay="500" className="font-space  text-sm md:text-lg">
                {t("subtext")}
              </p>
          </div>

           {
              scanSuccess && ( <form className="flex flex-col space-y-5">
              <input  className="bg-white broder border-1 border-gray-500 dark:border-0 dark:bg-gray-800 rounded-xl px-10 py-4 text-md text-black dark:text-white" placeholder={t("placeholder_password")}/>
              <button
              type="submit"
                className="
                      font-space 
                      text-md
                      bg-green-700 
                      text-white 
                      px-4 
                      py-2
                      rounded-lg
                      hover:bg-green-600 
                      hover:text-white 
                      transition-colors"
                >
                  {t("connexion")}
              </button>
            </form>)
            }
        </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Main Card */}
        <div >
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
                <span>Chargement des modèles...</span>
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
              {isScanning ? (
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
              ) :  (<motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gray-300 dark:bg-gray-900 rounded-xl flex items-center justify-center"
                >
                 <ScanFace size={100} />
                </motion.div>)}

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
              disabled={!isModelLoaded || isScanning ||scanSuccess}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                !isModelLoaded || isScanning
                  ? "bg-gray-600 cursor-not-allowed"
                  : "font-space text-md bg-green-700  text-white  px-4  py-2 rounded-lg hover:bg-green-600  hover:text-white  transition-colors"
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
                    <span>{t("scan")}</span>
                  </>
                )}
              </div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>

    <div className="flex justify-end">
          <div className="flex flex-row items-center gap-5 border-b-1  border-black">
          <ThemeTogglerButton/>
          <LanguageSwitcher/>
        </div>
      </div>

    </div>
    </div>
  )
}

export default Faciale
