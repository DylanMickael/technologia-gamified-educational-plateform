"use client"

import { Play, Pause, Square } from "lucide-react"
import { Button } from "./button"

interface SpriteState {
    x: number
    y: number
    rotation: number
    visible: boolean
    size: number
}

interface PreviewAreaProps {
    spriteState: SpriteState
    isRunning: boolean
    isPaused: boolean
    onPlay: () => void
    onPause: () => void
    onStop: () => void
}

export function PreviewArea({ spriteState, isRunning, isPaused, onPlay, onPause, onStop }: PreviewAreaProps) {
    return (
        <div className="w-96 bg-gray-50 border-l flex flex-col">
            {/* Contrôles */}
            <div className="p-4 bg-white border-b">
                <div className="flex items-center gap-2">
                    <Button onClick={onPlay} disabled={isRunning} size="sm" className="bg-green-500 hover:bg-green-600">
                        <Play className="w-4 h-4" />
                        Jouer
                    </Button>
                    <Button onClick={onPause} disabled={!isRunning} size="sm" variant="outline">
                        <Pause className="w-4 h-4" />
                        Pause
                    </Button>
                    <Button onClick={onStop} size="sm" variant="outline" className="bg-red-50 hover:bg-red-100">
                        <Square className="w-4 h-4" />
                        Stop
                    </Button>
                </div>
            </div>

            {/* Zone de prévisualisation */}
            <div className="flex-1 relative bg-white m-4 rounded-lg border-2 border-gray-200 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50">
                    {/* Grille de fond */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                            `,
                            backgroundSize: "20px 20px",
                        }}
                    />

                    {/* Sprite amélioré avec animation réaliste */}
                    {spriteState.visible && (
                        <div
                            className="absolute transition-all duration-300 ease-out"
                            style={{
                                left: `${spriteState.x}px`,
                                top: `${spriteState.y}px`,
                                transform: `translate(-50%, -50%) rotate(${spriteState.rotation}deg) scale(${spriteState.size / 100})`,
                            }}
                        >
                            {/* Corps du sprite */}
                            <div className="relative">
                                {/* Ombre */}
                                <div className="absolute top-2 left-0 w-10 h-6 bg-black/20 rounded-full blur-sm"></div>

                                {/* Corps principal */}
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative">
                                    {/* Œil */}
                                    <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                    </div>

                                    {/* Direction indicator */}
                                    <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-1 bg-orange-700 rounded-full"></div>
                                </div>

                                {/* Traînée de mouvement quand en cours d'exécution */}
                                {isRunning && (
                                    <div className="absolute inset-0 w-10 h-10 bg-orange-400/30 rounded-full animate-ping"></div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Trajectoire visible pendant l'exécution */}
                    {isRunning && (
                        <div className="absolute inset-0 pointer-events-none">
                            <svg className="w-full h-full">
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>
                                {/* Ligne de trajectoire */}
                                <circle
                                    cx={spriteState.x}
                                    cy={spriteState.y}
                                    r="3"
                                    fill="rgba(59, 130, 246, 0.6)"
                                    filter="url(#glow)"
                                    className="animate-pulse"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Informations du sprite améliorées */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-600 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div>
                            📍 x: {Math.round(spriteState.x)} | y: {Math.round(spriteState.y)}
                        </div>
                        <div>🧭 {Math.round(spriteState.rotation)}°</div>
                        <div>📏 {spriteState.size}%</div>
                    </div>
                </div>

                {/* Indicateur d'état amélioré */}
                <div className="absolute top-2 right-2">
                    {isRunning && (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>▶ Exécution en cours
                        </div>
                    )}
                    {isPaused && (
                        <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>⏸ En pause
                        </div>
                    )}
                    {!isRunning && !isPaused && (
                        <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>⏹ Arrêté
                        </div>
                    )}
                </div>

                {/* Vitesse d'exécution */}
                {isRunning && (
                    <div className="absolute top-2 left-2 bg-blue-500/80 text-white px-2 py-1 rounded text-xs">
                        🚀 Vitesse normale
                    </div>
                )}
            </div>
        </div>
    )
}
