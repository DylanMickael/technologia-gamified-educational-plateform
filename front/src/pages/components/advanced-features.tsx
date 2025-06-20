"use client"

import { useState } from "react"

interface AdvancedFeaturesProps {
    onFeatureToggle: (feature: string, enabled: boolean) => void
}

export function AdvancedFeatures({ onFeatureToggle }: AdvancedFeaturesProps) {
    const [features, setFeatures] = useState({
        magneticGrid: true,
        animatedConnections: true,
        soundEffects: false,
        autoSave: true,
        blockComments: false,
        miniMap: false,
        codeExport: false,
        blockSearch: false,
    })

    const toggleFeature = (feature: string) => {
        const newState = !features[feature as keyof typeof features]
        setFeatures((prev) => ({ ...prev, [feature]: newState }))
        onFeatureToggle(feature, newState)
    }

    const featureList = [
        { key: "magneticGrid", label: "🧲 Grille magnétique", desc: "Alignement automatique des blocs" },
        { key: "animatedConnections", label: "✨ Connexions animées", desc: "Effets visuels sur les liaisons" },
        { key: "soundEffects", label: "🔊 Effets sonores", desc: "Sons lors des connexions" },
        { key: "autoSave", label: "💾 Sauvegarde auto", desc: "Sauvegarde automatique du projet" },
        { key: "blockComments", label: "💬 Commentaires", desc: "Ajouter des notes aux blocs" },
        { key: "miniMap", label: "🗺️ Mini-carte", desc: "Vue d'ensemble du workspace" },
        { key: "codeExport", label: "📤 Export code", desc: "Exporter en JavaScript/Python" },
        { key: "blockSearch", label: "🔍 Recherche blocs", desc: "Rechercher dans la palette" },
    ]

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Fonctionnalités Avancées</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {featureList.map((feature) => (
                    <div
                        key={feature.key}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                            features[feature.key as keyof typeof features]
                                ? "border-green-400 bg-green-50 shadow-md"
                                : "border-gray-200 bg-gray-50 hover:border-gray-300"
                        }`}
                        onClick={() => toggleFeature(feature.key)}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-800">{feature.label}</span>
                            <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                                    features[feature.key as keyof typeof features]
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-300 text-gray-600"
                                }`}
                            >
                                {features[feature.key as keyof typeof features] ? "✓" : "○"}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600 font-semibold">💡 Suggestion :</span>
                </div>
                <p className="text-sm text-blue-700">
                    Activez la "Grille magnétique" et les "Connexions animées" pour une expérience optimale !
                </p>
            </div>
        </div>
    )
}
