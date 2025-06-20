"use client"

import React, { useRef, useState, useEffect } from "react"
import { Play, Cpu, Zap, BookOpen, ChevronRight, CheckCircle, Sparkles, Star, Heart, Circle } from "lucide-react"
import etapes from "./data/steps.json"
import CodeEditor from "./components/CodeEditor"
import { TwAnimatedDiv } from '../../components/AnimationComponents'
import arbre from "../../assets/img/arbre.png"

const RobotiqueFormation = () => {
  const [etapeActuelle, setEtapeActuelle] = useState(0)
  const [aventureCommencee, setAventureCommencee] = useState(false)
  const aventureRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const aventureRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleStartAdventure = () => {
    setEtapeActuelle(0)
    setTimeout(() => {
      aventureRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
    setTimeout(() => {
      setAventureCommencee(true)
    }, 500);
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {
        !aventureCommencee&&
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 text-white min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <TwAnimatedDiv className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <Cpu className="w-20 h-20 mx-auto mb-4 animate-pulse" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">L'Aventure Robotique</h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8">
                Embarquez dans un voyage fascinant à travers l'univers de la robotique, où la science-fiction devient
                réalité
              </p>
              <button
                onClick={handleStartAdventure}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Play className="w-6 h-6 inline mr-2" />
                Commencer l'Aventure
              </button>
            </TwAnimatedDiv>
          </div>
        </div>
      }

        {/* Animated mesh background */}
        <div className="fixed inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-orange-200/30 to-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-40 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Geometric grid pattern */}
        <div className="fixed inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(103, 27, 66, 0.3) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Interactive cursor effect */}
        <div
            className="fixed w-8 h-8 border-2 border-purple-400/40 rounded-full pointer-events-none z-50 transition-all duration-500 mix-blend-difference"
            style={{
              left: mousePosition.x - 16,
              top: mousePosition.y - 16,
              transform: `scale(${isHovered ? 1.5 : 1})`,
              borderColor: isHovered ? '#671B42' : 'rgba(147, 51, 234, 0.4)'
            }}
        ></div>

        {/* Floating orbs with parallax */}
        <div className="fixed inset-0 pointer-events-none">
          <div
              className="absolute top-32 left-16 w-8 h-8 bg-gradient-to-br from-purple-400/60 to-pink-400/60 rounded-full animate-float"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
                animationDuration: '6s'
              }}
          ></div>
          <div
              className="absolute top-64 right-24 w-12 h-12 bg-gradient-to-br from-orange-400/50 to-red-400/50 rounded-full animate-float"
              style={{
                transform: `translateY(${scrollY * -0.3}px)`,
                animationDuration: '8s',
                animationDelay: '2s'
              }}
          ></div>
          <div
              className="absolute bottom-48 left-32 w-6 h-6 bg-gradient-to-br from-blue-400/70 to-purple-400/70 rounded-full animate-float"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                animationDuration: '7s',
                animationDelay: '1s'
              }}
          ></div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <TwAnimatedDiv className="max-w-4xl mx-auto text-center">
              <div className="relative inline-block mb-8">
                <img src={arbre} className="w-50 h-72 mx-auto animate-pulse text-purple-600" />
                <Sparkles className="absolute -top-4 -left-8 w-8 h-8 text-yellow-400 animate-spin" style={{animationDuration: '3s'}} />
                <Star className="absolute -top-2 -right-12 w-6 h-6 text-purple-400 animate-pulse" />
              </div>

              <h1
                  className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent leading-tight"
                  style={{ fontFamily: "Monument, sans-serif" }}
              >
                L'Aventure Robotique
              </h1>

              <p
                  className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-medium"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Embarquez dans un voyage fascinant à travers l'univers de la robotique,
                où la science-fiction devient réalité
              </p>

              <button
                  onClick={handleStartAdventure}
                  className="group relative px-12 py-4 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                  style={{ backgroundColor: '#671B42' }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
              >
              <span className="relative z-10 flex items-center gap-3" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                <Play className="w-6 h-6" />
                Commencer l'Aventure
              </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </TwAnimatedDiv>
          </div>
        </div>

        {/* Formation Content */}
        <div ref={aventureRef} className="relative z-10 container mx-auto px-4 py-12 min-h-screen">
          {/* Navigation des étapes */}
          <TwAnimatedDiv className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {etapes.map((etape, index) => (
                  <button
                      key={index}
                      onClick={() => setEtapeActuelle(index)}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center backdrop-blur-lg ${
                          etapeActuelle === index
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                              : "bg-white/60 text-gray-700 hover:bg-white/80 border border-white/40"
                      }`}
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {etapeActuelle > index && <CheckCircle className="w-4 h-4 mr-2" />}
                    <span className="mr-2">{index + 1}.</span>
                    {etape.titre}
                  </button>
              ))}
            </div>
          </TwAnimatedDiv>

          {/* Contenu de l'étape */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-12 items-center">
              {/* Contenu narratif */}
              <TwAnimatedDiv delay={100}>
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
                      {etapeActuelle + 1}
                    </div>
                    <div>
                      <h2
                          className="text-3xl font-black text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {etapes[etapeActuelle].titre}
                      </h2>
                      <p
                          className="text-gray-600 font-medium"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {etapes[etapeActuelle].description}
                      </p>
                    </div>
                  </div>

                  <div className="prose prose-lg text-gray-700">
                    <p
                        className="text-lg leading-relaxed font-medium"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {etapes[etapeActuelle].contenu}
                    </p>
                  </div>

                  {etapeActuelle === 0 && (
                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 shadow-lg border border-white/60">
                          <div className="text-purple-600 font-black text-3xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>1940s</div>
                          <div className="text-sm text-gray-600 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Naissance du concept</div>
                          <Star className="w-6 h-6 text-purple-400 mt-2" />
                        </div>
                        <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 shadow-lg border border-white/60">
                          <div className="text-orange-600 font-black text-3xl" style={{ fontFamily: "Space Grotesk, sans-serif" }}>2024</div>
                          <div className="text-sm text-gray-600 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Robots partout</div>
                          <Sparkles className="w-6 h-6 text-orange-400 mt-2" />
                        </div>
                      </div>
                  )}

                  {etapeActuelle === 1 && (
                      <div className="mt-8">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 shadow-lg text-center border border-white/60">
                            <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                            <div className="font-bold text-gray-800" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Capteurs</div>
                          </div>
                          <ChevronRight className="text-gray-400 animate-pulse" />
                          <div className="flex-1 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-6 shadow-lg text-center border border-white/60">
                            <Cpu className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                            <div className="font-bold text-gray-800" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Traitement</div>
                          </div>
                          <ChevronRight className="text-gray-400 animate-pulse" />
                          <div className="flex-1 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl p-6 shadow-lg text-center border border-white/60">
                            <Play className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <div className="font-bold text-gray-800" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Action</div>
                          </div>
                        </div>
                      </div>
                  )}
                </div>
              </TwAnimatedDiv>

              {/* Éditeur de code / Visualisation */}
              <TwAnimatedDiv delay={200}>
                {etapeActuelle === 3 ? (
                    <CodeEditor/>
                ) : etapeActuelle === 5 && (
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/60">
                      <div className="text-center">
                        <div className="relative group">
                          <div className="absolute -inset-4 bg-gradient-to-r from-purple-300/40 to-pink-300/40 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                          <div className="relative w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                            <Cpu className="w-16 h-16 text-white" />
                            <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
                              <Heart className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-white/80" />
                              <Circle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/80" />
                              <Star className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 text-white/80" />
                              <Sparkles className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/80" />
                            </div>
                          </div>
                        </div>

                        <h3
                            className="text-2xl font-black text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          Visualisation Interactive
                        </h3>
                        <p
                            className="text-gray-600 mb-6 font-medium"
                            style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          Explorez les concepts de manière visuelle et interactive
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 shadow-lg border border-white/60">
                            <BookOpen className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                            <div className="text-sm font-bold text-gray-800" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Théorie</div>
                          </div>
                          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 shadow-lg border border-white/60">
                            <Play className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                            <div className="text-sm font-bold text-gray-800" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Pratique</div>
                          </div>
                        </div>
                      </div>
                    </div>
                )}
              </TwAnimatedDiv>
            </div>

            {/* Navigation */}
            <TwAnimatedDiv delay={300} className="flex justify-between items-center mt-12">
              <button
                  onClick={() => setEtapeActuelle(Math.max(0, etapeActuelle - 1))}
                  disabled={etapeActuelle === 0}
                  className="px-8 py-3 bg-white/60 backdrop-blur-lg text-gray-700 rounded-2xl font-bold hover:bg-white/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/40 shadow-lg"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Étape Précédente
              </button>

              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2 font-medium" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Progression</div>
                <div className="w-64 bg-white/40 backdrop-blur-lg rounded-full h-3 border border-white/60 shadow-inner">
                  <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${((etapeActuelle + 1) / etapes.length) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {etapeActuelle + 1} / {etapes.length}
                </div>
              </div>

              <button
                  onClick={() => setEtapeActuelle(Math.min(etapes.length - 1, etapeActuelle + 1))}
                  disabled={etapeActuelle === etapes.length - 1}
                  className="group px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg relative overflow-hidden"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                <span className="relative z-10">Étape Suivante</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
            </TwAnimatedDiv>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </div>
  )
}

export default RobotiqueFormation