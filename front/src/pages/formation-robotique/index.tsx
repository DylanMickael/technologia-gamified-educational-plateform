"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Play, Cpu, Zap, BookOpen, ChevronRight, CheckCircle } from "lucide-react"
import etapes from "./data/steps.json"
import CodeEditor from "./components/CodeEditor"
import {TwAnimatedDiv} from '../../components/AnimationComponents';

const RobotiqueFormation: React.FC = () => {
  const [etapeActuelle, setEtapeActuelle] = useState(0)
  const [aventureCommencee, setAventureCommencee] = useState(false)
  const aventureRef = useRef<HTMLDivElement>(null);

  const handleStartAdventure = () => {
    setEtapeActuelle(0);
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

      <div ref={aventureRef} className="container mx-auto px-4 py-12 min-h-screen">
        {/* Navigation des étapes */}
        <TwAnimatedDiv className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {etapes.map((etape, index) => (
              <button
                key={index}
                onClick={() => setEtapeActuelle(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center ${
                  etapeActuelle === index
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
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
              <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {etapeActuelle + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-black">{etapes[etapeActuelle].titre}</h2>
                    <p className="text-gray-600">{etapes[etapeActuelle].description}</p>
                  </div>
                </div>

                <div className="prose prose-lg text-gray-700">
                  <p className="text-lg leading-relaxed">{etapes[etapeActuelle].contenu}</p>
                </div>

                {etapeActuelle === 0 && (
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-md">
                      <div className="text-orange-600 font-bold text-2xl">1940s</div>
                      <div className="text-sm text-gray-600">Naissance du concept</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-md">
                      <div className="text-purple-600 font-bold text-2xl">2024</div>
                      <div className="text-sm text-gray-600">Robots partout</div>
                    </div>
                  </div>
                )}

                {etapeActuelle === 1 && (
                  <div className="mt-8">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 bg-white rounded-lg p-4 shadow-md text-center">
                        <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                        <div className="font-medium">Capteurs</div>
                      </div>
                      <ChevronRight className="text-gray-400" />
                      <div className="flex-1 bg-white rounded-lg p-4 shadow-md text-center">
                        <Cpu className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                        <div className="font-medium">Traitement</div>
                      </div>
                      <ChevronRight className="text-gray-400" />
                      <div className="flex-1 bg-white rounded-lg p-4 shadow-md text-center">
                        <Play className="w-8 h-8 text-green-500 mx-auto mb-2" />
                        <div className="font-medium">Action</div>
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
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-lg">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Cpu className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Visualisation Interactive</h3>
                    <p className="text-gray-600 mb-6">Explorez les concepts de manière visuelle et interactive</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 shadow-md">
                        <BookOpen className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                        <div className="text-sm font-medium">Théorie</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-md">
                        <Play className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                        <div className="text-sm font-medium">Pratique</div>
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
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Étape Précédente
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">Progression</div>
              <div className="w-64 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((etapeActuelle + 1) / etapes.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {etapeActuelle + 1} / {etapes.length}
              </div>
            </div>

            <button
              onClick={() => setEtapeActuelle(Math.min(etapes.length - 1, etapeActuelle + 1))}
              disabled={etapeActuelle === etapes.length - 1}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Étape Suivante
            </button>
          </TwAnimatedDiv>
        </div>
      </div>
    </div>
  )
}

export default RobotiqueFormation
