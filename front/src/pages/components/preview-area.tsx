"use client"

import { Play, Pause, Square } from "lucide-react"
import { Button } from "./button.tsx"

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

                    {/* Sprite */}
                    {spriteState.visible && (
                        <div
                            className="absolute transition-all duration-500 ease-in-out"
                            style={{
                                left: `${spriteState.x}px`,
                                top: `${spriteState.y}px`,
                                transform: `translate(-50%, -50%) rotate(${spriteState.rotation}deg) scale(${spriteState.size / 100})`,
                            }}
                        >
                            <div className="w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Informations du sprite */}
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs text-gray-600">
                    x: {Math.round(spriteState.x)} | y: {Math.round(spriteState.y)} | ↻: {Math.round(spriteState.rotation)}°
                </div>

                {/* Indicateur d'état */}
                <div className="absolute top-2 right-2">
                    {isRunning && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                            ▶ En cours
                        </div>
                    )}
                    {isPaused && (
                        <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">⏸ Pause</div>
                    )}
                </div>
            </div>
        </div>
    )
}
