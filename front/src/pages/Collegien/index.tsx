"use client"

import { useState, useCallback, useRef } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Header } from "../components/header.tsx"
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

    // Debug: Log des changements de blocs
    const handleSetBlocks = useCallback((newBlocks: Block[] | ((prev: Block[]) => Block[])) => {
        if (typeof newBlocks === "function") {
            setBlocks((prev) => {
                const result = newBlocks(prev)
                console.log("Blocks updated:", result.length, "blocs")
                return result
            })
        } else {
            console.log("Blocks set:", newBlocks.length, "blocs")
            setBlocks(newBlocks)
        }
    }, [])

    // Fonction améliorée pour connecter des blocs
    const connectBlocks = useCallback(
        (draggedBlockId: string, targetBlockId: string, position: "above" | "below") => {
            handleSetBlocks((prevBlocks) => {
                const newBlocks = [...prevBlocks]
                const draggedBlock = newBlocks.find((b) => b.id === draggedBlockId)
                const targetBlock = newBlocks.find((b) => b.id === targetBlockId)

                if (!draggedBlock || !targetBlock) return prevBlocks

                // Déconnecter le bloc dragué de son parent actuel
                if (draggedBlock.parentId) {
                    draggedBlock.parentId = undefined
                }

                if (position === "below") {
                    // Connecter en dessous du bloc cible
                    draggedBlock.parentId = targetBlockId
                    draggedBlock.x = targetBlock.x
                    draggedBlock.y = targetBlock.y + 70

                    // Réorganiser les autres enfants du bloc cible
                    const siblings = newBlocks.filter((b) => b.parentId === targetBlockId && b.id !== draggedBlockId)
                    siblings.forEach((sibling, index) => {
                        sibling.y = targetBlock.y + 70 + (index + 1) * 70
                    })
                } else {
                    // Connecter au-dessus du bloc cible
                    const currentParent = newBlocks.find((b) => b.id === targetBlock.parentId)

                    if (currentParent) {
                        // Le bloc cible a un parent, insérer entre eux
                        draggedBlock.parentId = currentParent.id
                        targetBlock.parentId = draggedBlockId
                        draggedBlock.x = targetBlock.x
                        draggedBlock.y = targetBlock.y - 70
                    } else {
                        // Le bloc cible n'a pas de parent, devenir son parent
                        targetBlock.parentId = draggedBlockId
                        draggedBlock.x = targetBlock.x
                        draggedBlock.y = targetBlock.y - 70
                    }
                }

                return newBlocks
            })
        },
        [handleSetBlocks],
    )

    // Fonction pour obtenir la séquence de blocs connectés
    const getBlockSequence = useCallback(
        (startBlockId: string): Block[] => {
            const sequence: Block[] = []
            const visited = new Set<string>()

            const addBlockAndChildren = (blockId: string) => {
                if (visited.has(blockId)) return
                visited.add(blockId)

                const block = blocks.find((b) => b.id === blockId)
                if (block) {
                    sequence.push(block)
                    // Trouver les blocs enfants et les trier par position Y
                    const children = blocks.filter((b) => b.parentId === blockId).sort((a, b) => a.y - b.y)
                    children.forEach((child) => addBlockAndChildren(child.id))
                }
            }

            addBlockAndChildren(startBlockId)
            return sequence
        },
        [blocks],
    )

    const executeProgram = useCallback(async () => {
        if (blocks.length === 0) return

        setIsRunning(true)
        setIsPaused(false)

        // Trouver tous les blocs racines (sans parent)
        const rootBlocks = blocks.filter((block) => !block.parentId)

        // Exécuter chaque séquence de blocs connectés
        const executeSequence = async (sequence: Block[]) => {
            for (const block of sequence) {
                if (isPaused) break

                setSpriteState((prev) => {
                    const newState = { ...prev }

                    switch (block.type) {
                        case "move":
                            const moveDistance = block.value || 10
                            newState.x = prev.x + moveDistance * Math.cos((prev.rotation * Math.PI) / 180)
                            newState.y = prev.y + moveDistance * Math.sin((prev.rotation * Math.PI) / 180)
                            break

                        case "move_back":
                            const backDistance = block.value || 10
                            newState.x = prev.x - backDistance * Math.cos((prev.rotation * Math.PI) / 180)
                            newState.y = prev.y - backDistance * Math.sin((prev.rotation * Math.PI) / 180)
                            break

                        case "turn_right":
                            newState.rotation = prev.rotation + (block.value || 15)
                            break

                        case "turn_left":
                            newState.rotation = prev.rotation - (block.value || 15)
                            break

                        case "goto_xy":
                            newState.x = block.value || 0
                            newState.y = block.value2 || 0
                            break

                        case "goto_random":
                            newState.x = Math.random() * 300 + 50
                            newState.y = Math.random() * 200 + 50
                            break

                        case "point_direction":
                            newState.rotation = block.value || 90
                            break

                        case "change_x":
                            newState.x = prev.x + (block.value || 10)
                            break

                        case "set_x":
                            newState.x = block.value || 0
                            break

                        case "change_y":
                            newState.y = prev.y + (block.value || 10)
                            break

                        case "set_y":
                            newState.y = block.value || 0
                            break

                        case "show":
                            newState.visible = true
                            break

                        case "hide":
                            newState.visible = false
                            break

                        case "size":
                            newState.size = block.value || 100
                            break

                        case "change_size":
                            newState.size = prev.size + (block.value || 10)
                            break
                    }

                    // Garder le sprite dans les limites
                    newState.x = Math.max(25, Math.min(375, newState.x))
                    newState.y = Math.max(25, Math.min(275, newState.y))
                    newState.size = Math.max(10, Math.min(300, newState.size))

                    return newState
                })

                // Attendre entre chaque bloc
                if (!["wait"].includes(block.type)) {
                    await new Promise((resolve) => setTimeout(resolve, 300))
                } else {
                    await new Promise((resolve) => setTimeout(resolve, (block.value || 1) * 1000))
                }
            }
        }

        // Exécuter toutes les séquences en parallèle
        const sequencePromises = rootBlocks.map((rootBlock) => {
            const sequence = getBlockSequence(rootBlock.id)
            return executeSequence(sequence)
        })

        await Promise.all(sequencePromises)
        setIsRunning(false)
    }, [blocks, isPaused, getBlockSequence])

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
                                    <CodeArea blocks={blocks} setBlocks={handleSetBlocks} onConnect={connectBlocks} />
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
                                        <h3 className="text-xl font-semibeld mb-2">Sons</h3>
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
