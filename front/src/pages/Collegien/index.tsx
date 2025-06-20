"use client"

import { useState, useCallback, useRef } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Header } from "../components/header"
import { Sidebar } from "../components/sidebar"
import { CodeArea } from "../components/code-area"
import { PreviewArea } from "../components/preview-area"
import { Tabs } from "../components/tabs"

export interface Block {
    id: string
    type: string
    category: string
    text: string
    color: string
    value?: number
    value2?: number
    value3?: number
    unit?: string
    editable?: boolean
    x: number
    y: number
    parentId?: string
    order?: number
}

export interface SpriteState {
    x: number
    y: number
    rotation: number
    visible: boolean
    size: number
}

export default function ScratchClone() {
    const [blocks, setBlocks] = useState<Block[]>([])
    const [spriteState, setSpriteState] = useState<SpriteState>({
        x: 200,
        y: 200,
        rotation: 0,
        visible: true,
        size: 100,
    })
    const [isRunning, setIsRunning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [activeTab, setActiveTab] = useState("code")
    const animationRef = useRef<number>()

    // Fonction simple pour connecter des blocs
    const connectBlocks = useCallback((draggedBlockId: string, targetBlockId: string, position: "above" | "below") => {
        setBlocks((prevBlocks) => {
            const newBlocks = [...prevBlocks]
            const draggedBlock = newBlocks.find((b) => b.id === draggedBlockId)
            const targetBlock = newBlocks.find((b) => b.id === targetBlockId)

            if (!draggedBlock || !targetBlock) return prevBlocks

            // Déconnecter le bloc dragué
            draggedBlock.parentId = undefined

            if (position === "below") {
                // Simple connexion en dessous
                draggedBlock.parentId = targetBlockId
                draggedBlock.x = targetBlock.x
                draggedBlock.y = targetBlock.y + 60
            } else {
                // Simple connexion au-dessus
                targetBlock.parentId = draggedBlockId
                draggedBlock.x = targetBlock.x
                draggedBlock.y = targetBlock.y - 60
            }

            return newBlocks
        })
    }, [])

    // Animation simple du sprite
    const animateSprite = useCallback((fromState: SpriteState, toState: SpriteState, duration = 500) => {
        return new Promise<void>((resolve) => {
            const startTime = Date.now()
            const deltaX = toState.x - fromState.x
            const deltaY = toState.y - fromState.y
            const deltaRotation = toState.rotation - fromState.rotation

            const animate = () => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(elapsed / duration, 1)

                setSpriteState({
                    x: fromState.x + deltaX * progress,
                    y: fromState.y + deltaY * progress,
                    rotation: fromState.rotation + deltaRotation * progress,
                    size: toState.size,
                    visible: toState.visible,
                })

                if (progress < 1) {
                    animationRef.current = requestAnimationFrame(animate)
                } else {
                    resolve()
                }
            }

            animate()
        })
    }, [])

    const executeProgram = useCallback(async () => {
        if (blocks.length === 0) return

        setIsRunning(true)
        setIsPaused(false)

        // Trouver les blocs racines
        const rootBlocks = blocks.filter((block) => !block.parentId)

        for (const rootBlock of rootBlocks) {
            const currentState = { ...spriteState }
            const newState = { ...currentState }

            // Exécuter le bloc racine
            switch (rootBlock.type) {
                case "move":
                    newState.x = currentState.x + (rootBlock.value || 10)
                    await animateSprite(currentState, newState, 500)
                    break
                case "turn_right":
                    newState.rotation = currentState.rotation + (rootBlock.value || 15)
                    await animateSprite(currentState, newState, 300)
                    break
                case "turn_left":
                    newState.rotation = currentState.rotation - (rootBlock.value || 15)
                    await animateSprite(currentState, newState, 300)
                    break
                default:
                    await new Promise((resolve) => setTimeout(resolve, 200))
                    break
            }

            // Exécuter les blocs enfants
            const children = blocks.filter((b) => b.parentId === rootBlock.id)
            for (const child of children) {
                const childState = { ...spriteState }
                const childNewState = { ...childState }

                switch (child.type) {
                    case "move":
                        childNewState.x = childState.x + (child.value || 10)
                        await animateSprite(childState, childNewState, 500)
                        break
                    case "turn_right":
                        childNewState.rotation = childState.rotation + (child.value || 15)
                        await animateSprite(childState, childNewState, 300)
                        break
                    case "turn_left":
                        childNewState.rotation = childState.rotation - (child.value || 15)
                        await animateSprite(childState, childNewState, 300)
                        break
                    default:
                        await new Promise((resolve) => setTimeout(resolve, 200))
                        break
                }
            }
        }

        setIsRunning(false)
    }, [blocks, spriteState, animateSprite])

    const stopProgram = () => {
        setIsRunning(false)
        setIsPaused(false)
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
        }
        setSpriteState({
            x: 200,
            y: 200,
            rotation: 0,
            visible: true,
            size: 100,
        })
    }

    const pauseProgram = () => {
        setIsPaused(true)
        setIsRunning(false)
    }

    const tabs = [
        { id: "code", label: "Code", icon: "</>" },
        { id: "costumes", label: "Costumes", icon: "🎭" },
        { id: "sounds", label: "Sons", icon: "🔊" },
    ]

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="h-screen flex flex-col bg-gray-50">
                <Header />

                <div className="flex-1 flex">
                    <Sidebar />

                    <div className="flex-1 flex flex-col">
                        <div className="bg-white border-b">
                            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                            {activeTab === "code" && (
                                <div className="flex h-[calc(100vh-140px)]">
                                    <CodeArea blocks={blocks} setBlocks={setBlocks} onConnect={connectBlocks} />
                                    <PreviewArea
                                        spriteState={spriteState}
                                        isRunning={isRunning}
                                        isPaused={isPaused}
                                        onPlay={executeProgram}
                                        onPause={pauseProgram}
                                        onStop={stopProgram}
                                    />
                                </div>
                            )}

                            {activeTab === "costumes" && (
                                <div className="p-8 text-center text-gray-500 h-[calc(100vh-140px)] flex items-center justify-center">
                                    <div>
                                        <div className="text-6xl mb-4">🎭</div>
                                        <h3 className="text-xl font-semibold mb-2">Costumes</h3>
                                        <p>Fonctionnalité des costumes à venir...</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === "sounds" && (
                                <div className="p-8 text-center text-gray-500 h-[calc(100vh-140px)] flex items-center justify-center">
                                    <div>
                                        <div className="text-6xl mb-4">🔊</div>
                                        <h3 className="text-xl font-semibold mb-2">Sons</h3>
                                        <p>Fonctionnalité des sons à venir...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DndProvider>
    )
}
