"use client"

import { useRef, useState, useCallback } from "react"
import { useDrag, useDrop } from "react-dnd"
import type { Block } from "../scratch-clone"

interface CodeBlockProps {
    block: Block
    onMove: (id: string, x: number, y: number) => void
    onRemove: (id: string) => void
    onUpdateValue: (id: string, field: string, value: number) => void
    onConnect: (draggedBlockId: string, targetBlockId: string, position: "above" | "below") => void
    connectedBlocks: Block[]
    isChild?: boolean
}

export function CodeBlock({
                              block,
                              onMove,
                              onRemove,
                              onUpdateValue,
                              onConnect,
                              connectedBlocks,
                              isChild = false,
                          }: CodeBlockProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isEditing, setIsEditing] = useState<string | null>(null)

    // Fonction pour obtenir tous les enfants d'un bloc
    const getChildren = useCallback(
        (blockId: string): Block[] => {
            return connectedBlocks.filter((b) => b.parentId === blockId).sort((a, b) => a.y - b.y)
        },
        [connectedBlocks],
    )

    // Fonction pour obtenir tous les descendants (enfants + petits-enfants, etc.)
    const getDescendants = useCallback(
        (blockId: string): string[] => {
            const descendants = [blockId]
            const children = getChildren(blockId)
            children.forEach((child) => {
                descendants.push(...getDescendants(child.id))
            })
            return descendants
        },
        [getChildren],
    )

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "placed-block",
        item: { id: block.id, type: "move-block" },
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (!dropResult || !dropResult.connected) {
                const offset = monitor.getClientOffset()
                const containerRect = document.getElementById("code-area")?.getBoundingClientRect()
                if (offset && containerRect) {
                    const newX = offset.x - containerRect.left - 100
                    const newY = offset.y - containerRect.top - 25
                    onMove(block.id, newX, newY)
                }
            }
        },
    }))

    const [{ isOverTop, isOverBottom, canDrop }, drop] = useDrop(() => ({
        accept: "placed-block",
        canDrop: (item: any) => {
            if (item.id === block.id) return false
            if (item.type === "move-block") {
                // Vérifier qu'on ne crée pas de connexion circulaire
                const descendants = getDescendants(item.id)
                return !descendants.includes(block.id)
            }
            return true
        },
        drop: (item: any, monitor) => {
            if (item.id !== block.id && item.type === "move-block") {
                const hoverBoundingRect = ref.current?.getBoundingClientRect()
                const clientOffset = monitor.getClientOffset()
                if (!hoverBoundingRect || !clientOffset) return { connected: false }

                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                const hoverClientY = clientOffset.y - hoverBoundingRect.top
                const position = hoverClientY < hoverMiddleY ? "above" : "below"

                onConnect(item.id, block.id, position)
                return { connected: true }
            }
            return { connected: false }
        },
        collect: (monitor) => {
            if (!monitor.isOver() || !monitor.canDrop()) {
                return { isOverTop: false, isOverBottom: false, canDrop: monitor.canDrop() }
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const clientOffset = monitor.getClientOffset()
            const item = monitor.getItem()

            if (!hoverBoundingRect || !clientOffset || item?.id === block.id) {
                return { isOverTop: false, isOverBottom: false, canDrop: monitor.canDrop() }
            }

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            return {
                isOverTop: hoverClientY < hoverMiddleY,
                isOverBottom: hoverClientY >= hoverMiddleY,
                canDrop: monitor.canDrop(),
            }
        },
    }))

    drag(drop(ref))

    const handleValueChange = (field: string, newValue: string) => {
        const numValue = Number.parseInt(newValue, 10) || 0
        onUpdateValue(block.id, field, numValue)
        setIsEditing(null)
    }

    const renderEditableValue = (value: number, field: string) =>
        isEditing === field ? (
            <input
                type="number"
                defaultValue={value}
                onBlur={(e) => handleValueChange(field, e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleValueChange(field, e.currentTarget.value)
                    if (e.key === "Escape") setIsEditing(null)
                }}
                autoFocus
                onFocus={(e) => e.target.select()}
                className="bg-white/20 text-white rounded px-1 w-16 text-center text-sm border-none outline-none focus:bg-white/40"
            />
        ) : (
            <span
                className="bg-white/20 rounded px-2 py-1 cursor-pointer hover:bg-white/30 transition-colors min-w-[24px] inline-block text-center"
                onClick={() => setIsEditing(field)}
                title="Cliquez pour modifier"
            >
        {value}
      </span>
        )

    const renderBlockContent = () => {
        switch (block.type) {
            case "move":
                return <>avancer de {renderEditableValue(block.value || 10, "value")} pas</>
            case "move_back":
                return <>reculer de {renderEditableValue(block.value || 10, "value")} pas</>
            case "turn_right":
                return <>tourner ↻ de {renderEditableValue(block.value || 15, "value")} degrés</>
            case "turn_left":
                return <>tourner ↺ de {renderEditableValue(block.value || 15, "value")} degrés</>
            case "goto_xy":
                return (
                    <>
                        aller à x: {renderEditableValue(block.value || 0, "value")} y:{" "}
                        {renderEditableValue(block.value2 || 0, "value2")}
                    </>
                )
            case "point_direction":
                return <>s'orienter à {renderEditableValue(block.value || 90, "value")} degrés</>
            case "change_x":
                return <>ajouter {renderEditableValue(block.value || 10, "value")} à x</>
            case "set_x":
                return <>mettre x à {renderEditableValue(block.value || 0, "value")}</>
            case "change_y":
                return <>ajouter {renderEditableValue(block.value || 10, "value")} à y</>
            case "set_y":
                return <>mettre y à {renderEditableValue(block.value || 0, "value")}</>
            case "wait":
                return <>attendre {renderEditableValue(block.value || 1, "value")} secondes</>
            case "repeat":
                return <>répéter {renderEditableValue(block.value || 10, "value")} fois</>
            case "size":
                return <>mettre la taille à {renderEditableValue(block.value || 100, "value")} %</>
            case "change_size":
                return <>ajouter {renderEditableValue(block.value || 10, "value")} à la taille</>
            case "glide":
                return <>glisser en {renderEditableValue(block.value || 1, "value")} secondes à position aléatoire</>
            case "glide_xy":
                return (
                    <>
                        glisser en {renderEditableValue(block.value || 1, "value")} sec à x:{" "}
                        {renderEditableValue(block.value2 || 0, "value2")} y: {renderEditableValue(block.value3 || 0, "value3")}
                    </>
                )
            case "point_towards":
                return <>s'orienter vers pointeur de souris</>
            case "bounce":
                return <>rebondir si le bord est atteint</>
            case "step_forward":
                return <>faire un pas en avant</>
            case "step_back":
                return <>faire un pas en arrière</>
            default:
                return block.text
        }
    }

    const children = getChildren(block.id)
    const hasChildren = children.length > 0

    return (
        <div className="relative">
            {/* Indicateurs de connexion */}
            {canDrop && isOverTop && (
                <div className="absolute -top-1 left-0 right-0 h-2 bg-green-400 rounded-full opacity-75 z-30" />
            )}
            {canDrop && isOverBottom && (
                <div className="absolute -bottom-1 left-0 right-0 h-2 bg-green-400 rounded-full opacity-75 z-30" />
            )}

            <div
                ref={ref}
                className={`absolute ${block.color} text-white p-3 rounded-lg cursor-move shadow-lg group transition-all duration-200 select-none ${
                    isDragging ? "opacity-50 scale-95 rotate-2 z-50" : ""
                } ${canDrop ? "ring-2 ring-green-400 ring-offset-2" : ""} ${isChild ? "border-l-4 border-white/30" : ""}`}
                style={{
                    left: block.x,
                    top: block.y,
                    minWidth: "220px",
                    zIndex: isDragging ? 1000 : isChild ? 15 : 10,
                }}
            >
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-1 flex-1 pr-2">{renderBlockContent()}</span>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {hasChildren && <div className="text-xs bg-white/20 px-2 py-1 rounded-full">{children.length}</div>}
                        <button
                            className="w-6 h-6 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors"
                            onClick={(e) => {
                                e.stopPropagation()
                                onRemove(block.id)
                            }}
                            title="Supprimer ce bloc et ses enfants"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Connecteur visuel vers les enfants */}
                {!isDragging && hasChildren && (
                    <div className="absolute left-1/2 top-full w-0.5 h-4 bg-white/40 transform -translate-x-1/2" />
                )}
            </div>

            {/* Rendu récursif des blocs enfants */}
            {children.map((child) => (
                <CodeBlock
                    key={child.id}
                    block={child}
                    onMove={onMove}
                    onRemove={onRemove}
                    onUpdateValue={onUpdateValue}
                    onConnect={onConnect}
                    connectedBlocks={connectedBlocks}
                    isChild={true}
                />
            ))}
        </div>
    )
}
