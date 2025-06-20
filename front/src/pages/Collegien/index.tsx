"use client"

import { useState, useCallback, useRef } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Header } from "../components/header"
import { Sidebar } from "../components/sidebar"
import { CodeArea } from "../components/code-area"
import { PreviewArea } from "../components/preview-area"
import { Tabs } from "../components/tabs"
import { WorkspaceTools } from "../components/workspace-tools"

export interface Block {
    id: string
    type: string
    category: string
    text: string
    color: string
    value?: number
    x: number
    y: number
    parentId?: string
}

export interface SpriteState {
    x: number
    y: number
    rotation: number
    visible: boolean
    size: number
}

const path = [
    { x: 100, y: 100 },
    { x: 100, y: 180 },
]

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
    const [selectedTool, setSelectedTool] = useState("select")
    const animationRef = useRef<number>()

    const connectBlocks = useCallback((draggedBlockId: string, targetBlockId: string, position: "above" | "below") => {
        setBlocks((prev) => {
            const newBlocks = [...prev]
            const dragged = newBlocks.find((b) => b.id === draggedBlockId)
            const target = newBlocks.find((b) => b.id === targetBlockId)
            if (!dragged || !target) return prev
            dragged.parentId = undefined
            if (position === "below") {
                dragged.parentId = targetBlockId
                dragged.x = target.x
                dragged.y = target.y + 60
            } else {
                target.parentId = draggedBlockId
                dragged.x = target.x
                dragged.y = target.y - 60
            }
            return newBlocks
        })
    }, [])

    const handleToolSelect = useCallback((tool: string) => {
        setSelectedTool(tool)
        if (tool === "organize") {
            setBlocks((prev) => {
                const root = prev.filter((b) => !b.parentId)
                let x = 50, y = 50
                return prev.map((b) => {
                    if (!b.parentId) {
                        const nb = { ...b, x, y }
                        x += 300
                        if (x > 800) { x = 50; y += 150 }
                        return nb
                    }
                    return b
                })
            })
        }
        if (tool === "validate") {
            const root = blocks.filter((b) => !b.parentId)
            const connected = blocks.filter((b) => b.parentId)
            alert(`Programme validé !\n- ${root.length} séquences\n- ${connected.length} connexions`)
        }
    }, [blocks])

    const animateSprite = useCallback((from: SpriteState, to: SpriteState, duration = 500) => {
        return new Promise<void>((resolve) => {
            const start = Date.now()
            const dx = to.x - from.x
            const dy = to.y - from.y
            const dr = to.rotation - from.rotation

            const step = () => {
                const now = Date.now()
                const t = Math.min((now - start) / duration, 1)
                setSpriteState({
                    x: from.x + dx * t,
                    y: from.y + dy * t,
                    rotation: from.rotation + dr * t,
                    size: to.size,
                    visible: to.visible,
                })
                if (t < 1) animationRef.current = requestAnimationFrame(step)
                else resolve()
            }
            step()
        })
    }, [])

    function verifyPathFollowed(path: { x: number; y: number }[], current: SpriteState) {
        const last = path[path.length - 1]
        const d = Math.sqrt((current.x - last.x) ** 2 + (current.y - last.y) ** 2)
        return d < 30
    }

    const executeProgram = useCallback(async () => {
        if (!blocks.length) return
        setIsRunning(true)
        setIsPaused(false)

        const root = blocks.filter((b) => !b.parentId)

        for (const b of root) {
            const cs = { ...spriteState }
            const ns = { ...cs }
            if (b.type === "move") {
                ns.x = cs.x + (b.value || 10)
                await animateSprite(cs, ns, 500)
            } else if (b.type === "turn_right") {
                ns.rotation = cs.rotation + (b.value || 15)
                await animateSprite(cs, ns, 300)
            } else if (b.type === "turn_left") {
                ns.rotation = cs.rotation - (b.value || 15)
                await animateSprite(cs, ns, 300)
            }

            const children = blocks.filter((c) => c.parentId === b.id)
            for (const c of children) {
                const cs2 = { ...spriteState }
                const ns2 = { ...cs2 }
                if (c.type === "move") {
                    ns2.x = cs2.x + (c.value || 10)
                    await animateSprite(cs2, ns2, 500)
                } else if (c.type === "turn_right") {
                    ns2.rotation = cs2.rotation + (c.value || 15)
                    await animateSprite(cs2, ns2, 300)
                } else if (c.type === "turn_left") {
                    ns2.rotation = cs2.rotation - (c.value || 15)
                    await animateSprite(cs2, ns2, 300)
                }
            }
        }

        if (verifyPathFollowed(path, spriteState)) {
            alert("✅ Chemin réussi !")
        } else {
            alert("❌ Chemin incorrect.")
        }
        setIsRunning(false)
    }, [blocks, spriteState, animateSprite])

    const stopProgram = () => {
        setIsRunning(false)
        setIsPaused(false)
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        setSpriteState({ x: 200, y: 200, rotation: 0, visible: true, size: 100 })
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
            <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
                <Header />
                <div className="flex-1 flex overflow-hidden">
                    <Sidebar />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="bg-white border-b flex-shrink-0">
                            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            {activeTab === "code" && (
                                <div className="h-full flex">
                                    <div className="flex-1 flex flex-col">
                                        <CodeArea blocks={blocks} setBlocks={setBlocks} onConnect={connectBlocks} />
                                    </div>
                                    <div className="w-96 flex flex-col border-l bg-gray-50 overflow-hidden">
                                        <div className="flex-1 overflow-y-auto">
                                            <div className="flex-shrink-0">
                                                <PreviewArea
                                                    spriteState={spriteState}
                                                    isRunning={isRunning}
                                                    isPaused={isPaused}
                                                    onPlay={executeProgram}
                                                    onPause={pauseProgram}
                                                    onStop={stopProgram}
                                                    path={path}
                                                />
                                            </div>
                                            <div className="flex-shrink-0 p-4 bg-white border-t">
                                                <WorkspaceTools onToolSelect={handleToolSelect} blocks={blocks} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === "costumes" && (
                                <div className="h-full flex items-center justify-center text-center text-gray-500">
                                    <div>
                                        <div className="text-6xl mb-4">🎭</div>
                                        <h3 className="text-xl font-semibold mb-2">Costumes</h3>
                                        <p>Fonctionnalité des costumes à venir...</p>
                                    </div>
                                </div>
                            )}
                            {activeTab === "sounds" && (
                                <div className="h-full flex items-center justify-center text-center text-gray-500">
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
