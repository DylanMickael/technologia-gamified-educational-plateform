"use client"

import Play from "../../assets/img/Play.png";
import Pause from "../../assets/img/Pause.png";
import Refresh from "../../assets/img/Refresh.png";

import { Button } from "./button"
import Personnage from "../../assets/img/Personnage.png"

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
    path?: { x: number; y: number }[]
}

const defaultPath: { x: number; y: number }[] = [
    { x: 200, y: 200 },
    { x: 210, y: 200 },
    { x: 210, y: 210 },
    { x: 200, y: 210 },
    { x: 200, y: 200 },

]


export function PreviewArea({ spriteState, isRunning, isPaused, onPlay, onPause, onStop, path = defaultPath }: PreviewAreaProps) {
    return (
        <div className="bg-gray-50">
            {/* Contrôles */}
            <div className="p-4 bg-white border-b">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎮</span>
                    Aperçu
                </h3>
                <div className="flex gap-4">
                    <Button onClick={onPlay} disabled={isRunning} size="sm">
                        <img src={Play} alt="Jouer" />
                    </Button>
                    <Button onClick={onPause} disabled={!isRunning} size="sm">
                        <img src={Pause} alt="Pause"/>
                    </Button>
                    <Button onClick={onStop} size="sm">
                        <img src={Refresh} alt="Stop"/>
                    </Button>
                </div>
            </div>

            {/* Zone de prévisualisation avec hauteur fixe */}
            <div
                className="relative bg-white m-4 rounded-lg border-2 border-gray-200 overflow-hidden"
                style={{ height: "500px" }}
            >
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

                    {/* Chemin à suivre */}
                    {path.map((point, index) => (
                        <div
                            key={index}
                            className="absolute w-3 h-3 bg-green-500 rounded-full opacity-90 border-2 border-white shadow"
                            style={{
                                left: `${point.x}px`,
                                top: `${point.y}px`,
                                transform: "translate(-50%, -50%)",
                            }}
                        ></div>
                    ))}

                    {/* Sprite */}
                    {spriteState.visible && (
                        <div
                            className="absolute transition-all duration-300 ease-out"
                            style={{
                                left: `${spriteState.x}px`,
                                top: `${spriteState.y}px`,
                                transform: `translate(-50%, -50%) rotate(${spriteState.rotation}deg) scale(${spriteState.size / 100})`,
                            }}
                        >
                            <div className="relative">
                                {/* Ombre */}
                                <div className="absolute top-2 left-0 w-10 h-6 bg-black/20 rounded-full blur-sm"></div>

                                {/* Image du personnage */}
                                <div className="relative">
                                    <img
                                        src={Personnage}
                                        alt="Personnage"
                                        className="w-16 h-16 object-contain drop-shadow-lg transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Indicateur d'état */}
                <div className="absolute top-2 right-2">
                    {isRunning && (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-pulse flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>▶ En cours
                        </div>
                    )}
                    {isPaused && (
                        <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>⏸ Pause
                        </div>
                    )}
                    {!isRunning && !isPaused && (
                        <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>⏹ Arrêté
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}