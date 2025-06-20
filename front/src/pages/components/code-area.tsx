"use client"

import { useCallback, useMemo } from "react"
import { useDrop } from "react-dnd"
import type { Block } from "../Collegien"
import { CodeBlock } from "./code-block"

interface CodeAreaProps {
    blocks: Block[]
    setBlocks: (blocks: Block[]) => void
    onConnect: (draggedBlockId: string, targetBlockId: string, position: "above" | "below") => void
}

export function CodeArea({ blocks, setBlocks, onConnect }: CodeAreaProps) {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ["block", "placed-block"],
        drop: (item: any, monitor) => {
            // Vérifier si c'est un nouveau bloc depuis la sidebar
            if (item.type !== "move-block") {
                const offset = monitor.getClientOffset()
                const containerRect = document.getElementById("code-area")?.getBoundingClientRect()

                if (offset && containerRect) {
                    // Créer un ID vraiment unique
                    const timestamp = Date.now()
                    const random = Math.random().toString(36).substr(2, 9)
                    const uniqueId = `${item.type}-${timestamp}-${random}`

                    const baseX = Math.max(20, offset.x - containerRect.left - 100)
                    const baseY = Math.max(20, offset.y - containerRect.top - 25)

                    // Éviter les collisions avec placement intelligent
                    let finalX = baseX
                    let finalY = baseY
                    let attempts = 0
                    const maxAttempts = 30

                    while (attempts < maxAttempts) {
                        const hasCollision = blocks.some((existingBlock) => {
                            const distance = Math.sqrt(Math.pow(existingBlock.x - finalX, 2) + Math.pow(existingBlock.y - finalY, 2))
                            return distance < 120 // Distance minimale entre blocs
                        })

                        if (!hasCollision) break

                        // Placement en grille pour éviter les collisions
                        const gridSize = 150
                        const col = attempts % 4
                        const row = Math.floor(attempts / 4)
                        finalX = baseX + col * gridSize
                        finalY = baseY + row * 80
                        attempts++
                    }

                    const newBlock: Block = {
                        id: uniqueId,
                        type: item.type,
                        category: item.category || "movement",
                        text: item.text,
                        color: item.color,
                        value: item.value,
                        value2: item.value2,
                        value3: item.value3,
                        unit: item.unit,
                        editable: item.editable,
                        x: finalX,
                        y: finalY,
                        parentId: undefined,
                    }

                    setBlocks((prevBlocks) => {
                        const newBlocks = [...prevBlocks, newBlock]
                        return newBlocks
                    })
                }
            }
            return { dropped: true }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
        }),
    }))

    const moveBlock = useCallback(
        (id: string, x: number, y: number) => {
            setBlocks((prevBlocks) => {
                const block = prevBlocks.find((b) => b.id === id)
                if (!block) return prevBlocks

                const deltaX = x - block.x
                const deltaY = y - block.y

                // Fonction récursive pour obtenir tous les descendants
                const getDescendants = (blockId: string, blocks: Block[]): string[] => {
                    const descendants = [blockId]
                    const children = blocks.filter((b) => b.parentId === blockId)
                    children.forEach((child) => {
                        descendants.push(...getDescendants(child.id, blocks))
                    })
                    return descendants
                }

                const blocksToMove = getDescendants(id, prevBlocks)
                return prevBlocks.map((block) => {
                    if (blocksToMove.includes(block.id)) {
                        return { ...block, x: block.x + deltaX, y: block.y + deltaY }
                    }
                    return block
                })
            })
        },
        [setBlocks],
    )

    const removeBlock = useCallback(
        (id: string) => {
            setBlocks((prevBlocks) => {
                // Fonction récursive pour obtenir tous les descendants
                const getDescendants = (blockId: string, blocks: Block[]): string[] => {
                    const descendants = [blockId]
                    const children = blocks.filter((b) => b.parentId === blockId)
                    children.forEach((child) => {
                        descendants.push(...getDescendants(child.id, blocks))
                    })
                    return descendants
                }

                const blocksToRemove = new Set(getDescendants(id, prevBlocks))
                return prevBlocks
                    .filter((block) => !blocksToRemove.has(block.id))
                    .map((block) => {
                        // Nettoyer les références parentId orphelines
                        if (block.parentId && blocksToRemove.has(block.parentId)) {
                            return { ...block, parentId: undefined }
                        }
                        return block
                    })
            })
        },
        [setBlocks],
    )

    // Nouvelle fonction pour déconnecter un bloc
    const disconnectBlock = useCallback(
        (blockId: string) => {
            setBlocks((prevBlocks) => {
                return prevBlocks.map((block) => {
                    if (block.id === blockId) {
                        return { ...block, parentId: undefined }
                    }
                    return block
                })
            })
        },
        [setBlocks],
    )

    const updateBlockValue = useCallback(
        (id: string, field: string, value: number) => {
            setBlocks((prevBlocks) => prevBlocks.map((block) => (block.id === id ? { ...block, [field]: value } : block)))
        },
        [setBlocks],
    )

    const clearAllBlocks = useCallback(() => {
        setBlocks([])
    }, [setBlocks])

    // Ajouter cette fonction après les autres useCallback
    const validateBlockPositions = useCallback(() => {
        setBlocks((prevBlocks) => {
            return prevBlocks.map((block) => ({
                ...block,
                x: Math.max(20, Math.min(block.x, window.innerWidth - 300)), // Limites horizontales
                y: Math.max(20, block.y), // Éviter les positions négatives
            }))
        })
    }, [setBlocks])

    // Appeler cette fonction après chaque connexion
    const handleConnect = useCallback(
        (draggedBlockId: string, targetBlockId: string, position: "above" | "below") => {
            onConnect(draggedBlockId, targetBlockId, position)
            // Valider les positions après connexion
            setTimeout(validateBlockPositions, 100)
        },
        [onConnect, validateBlockPositions],
    )

    // Statistiques pour l'affichage
    const stats = useMemo(() => {
        const rootBlocks = blocks.filter((block) => !block.parentId)
        const connectedBlocks = blocks.filter((block) => block.parentId)
        const sequences = rootBlocks.filter((root) => {
            return blocks.some((b) => b.parentId === root.id)
        })

        // Calculer les connexions
        const connections = blocks.filter((block) => block.parentId).length

        return {
            sequences: sequences.length,
            totalBlocks: blocks.length,
            connectedBlocks: connectedBlocks.length,
            connections: connections,
            rootBlocks,
            isolatedBlocks: rootBlocks.length - sequences.length,
        }
    }, [blocks])

    return (
        <div
            id="code-area"
            ref={drop}
            className={`flex-1 relative bg-white border-r transition-all duration-300 overflow-hidden ${
                isOver ? "bg-blue-50 border-blue-300 border-2 border-dashed" : ""
            }`}
            style={{ minHeight: "500px" }}
        >
            {/* Zone de drop visuelle - simplifiée */}
            {isOver && (
                <div className="absolute inset-4 border-2 border-dashed border-blue-400 bg-blue-50/30 rounded-lg flex items-center justify-center z-10">
                    <div className="text-blue-600 font-medium text-lg">📦 Relâchez pour ajouter le bloc</div>
                </div>
            )}

            {/* Barre d'informations */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    📦 {stats.totalBlocks} bloc{stats.totalBlocks !== 1 ? "s" : ""}
                </div>
                {stats.sequences > 0 && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        🧩 {stats.sequences} séquence{stats.sequences !== 1 ? "s" : ""}
                    </div>
                )}
                {stats.connections > 0 && (
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        🔗 {stats.connections} connexion{stats.connections !== 1 ? "s" : ""}
                    </div>
                )}
                {blocks.length > 0 && (
                    <button
                        onClick={clearAllBlocks}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full text-sm font-medium transition-colors shadow-sm"
                    >
                        🗑️ Effacer tout
                    </button>
                )}
            </div>

            {/* Message d'aide */}
            {blocks.length === 0 && !isOver && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-400 max-w-md">
                        <div className="text-6xl mb-4">🧩</div>
                        <h3 className="text-xl font-semibold mb-2">Espace de travail vide</h3>
                        <p className="text-sm mb-4">Glissez des blocs depuis la barre latérale</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700 text-sm">
                            <p className="font-medium mb-2">💡 Instructions :</p>
                            <ul className="text-left space-y-1">
                                <li>• Glissez un bloc → il s'ajoute</li>
                                <li>• Déposez un bloc sur un autre → ils se connectent</li>
                                <li>• Cliquez sur ✂️ pour couper une connexion</li>
                                <li>• Cliquez sur les valeurs pour les modifier</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Rendu des blocs racines */}
            {stats.rootBlocks.map((block) => (
                <CodeBlock
                    key={block.id}
                    block={block}
                    onMove={moveBlock}
                    onRemove={removeBlock}
                    onUpdateValue={updateBlockValue}
                    onConnect={handleConnect} // Utiliser handleConnect au lieu de onConnect
                    onDisconnect={disconnectBlock}
                    connectedBlocks={blocks}
                />
            ))}
        </div>
    )
}
