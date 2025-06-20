"use client"

import type React from "react"
import { useRef, useState, useCallback } from "react"
import { useDrag, useDrop } from "react-dnd"
import type { Block } from "../Collegien"

interface CodeBlockProps {
    block: Block
    onMove: (id: string, x: number, y: number) => void
    onRemove: (id: string) => void
    onUpdateValue: (id: string, field: string, value: number) => void
    onConnect: (draggedBlockId: string, targetBlockId: string, position: "above" | "below") => void
    onDisconnect: (blockId: string) => void
    connectedBlocks: Block[]
    isChild?: boolean
}

export function CodeBlock({
                              block,
                              onMove,
                              onRemove,
                              onUpdateValue,
                              onConnect,
                              onDisconnect,
                              connectedBlocks,
                              isChild = false,
                          }: CodeBlockProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isEditing, setIsEditing] = useState<string | null>(null)

    const getChildren = useCallback(
        (blockId: string): Block[] => {
            return connectedBlocks.filter((b) => b.parentId === blockId)
        },
        [connectedBlocks],
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
        canDrop: (item: any) => item.id !== block.id,
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

    const handleDisconnect = (e: React.MouseEvent) => {
        e.stopPropagation()
        onDisconnect(block.id)
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
                className="w-8 h-8 bg-white text-blue-500 rounded-full text-center text-sm font-bold border-none outline-none"
            />
        ) : (
            <span
                className="w-8 h-8 bg-white text-blue-500 rounded-full cursor-pointer hover:bg-gray-100 transition-colors text-sm font-bold flex items-center justify-center"
                onClick={() => setIsEditing(field)}
                title="Cliquez pour modifier"
            >
        {value}
      </span>
        )

    const renderBlockContent = () => {
        switch (block.type) {
            case "move":
                return (
                    <>
                        <span className="mr-2">avancer de</span>
                        {renderEditableValue(block.value || 10, "value")}
                        <span className="ml-2">pas</span>
                    </>
                )
            case "turn_right":
                return (
                    <>
                        <span className="mr-2">tourner ↻ de</span>
                        {renderEditableValue(block.value || 15, "value")}
                        <span className="ml-2">degrés</span>
                    </>
                )
            case "turn_left":
                return (
                    <>
                        <span className="mr-2">tourner ↺ de</span>
                        {renderEditableValue(block.value || 15, "value")}
                        <span className="ml-2">degrés</span>
                    </>
                )
            default:
                return <span>{block.text}</span>
        }
    }

    const children = getChildren(block.id)
    const hasChildren = children.length > 0
    const hasParent = !!block.parentId

    return (
        <div className="relative">
            {/* Indicateurs de connexion simples */}
            {canDrop && isOverTop && (
                <div className="absolute -top-4 left-0 right-0 z-30">
                    <div className="bg-green-500 text-white rounded px-2 py-1 text-xs text-center">Connecter au-dessus</div>
                </div>
            )}

            {canDrop && isOverBottom && (
                <div className="absolute -bottom-4 left-0 right-0 z-30">
                    <div className="bg-blue-500 text-white rounded px-2 py-1 text-xs text-center">Connecter en-dessous</div>
                </div>
            )}

            <div
                ref={ref}
                className={`absolute cursor-move group transition-all duration-200 ${isDragging ? "opacity-50 scale-95" : ""}`}
                style={{
                    left: block.x,
                    top: block.y,
                    zIndex: isDragging ? 1000 : isChild ? 15 : 10,
                }}
            >
                {/* Bloc simple */}
                <div className={`inline-flex items-center px-4 py-2 ${block.color} text-white rounded-lg shadow-md relative`}>
                    {renderBlockContent()}

                    {/* Boutons d'action */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                        {hasParent && (
                            <button
                                onClick={handleDisconnect}
                                className="w-5 h-5 flex items-center justify-center text-white bg-red-500 hover:bg-red-600 rounded-full text-xs"
                                title="Déconnecter"
                            >
                                ✂️
                            </button>
                        )}
                        <button
                            className="w-5 h-5 flex items-center justify-center text-white bg-gray-600 hover:bg-gray-700 rounded-full text-xs"
                            onClick={(e) => {
                                e.stopPropagation()
                                onRemove(block.id)
                            }}
                            title="Supprimer"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Badge de connexion */}
                {(hasParent || hasChildren) && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">
                        🔗
                    </div>
                )}
            </div>

            {/* Rendu des enfants */}
            {children.map((child) => (
                <CodeBlock
                    key={child.id}
                    block={child}
                    onMove={onMove}
                    onRemove={onRemove}
                    onUpdateValue={onUpdateValue}
                    onConnect={onConnect}
                    onDisconnect={onDisconnect}
                    connectedBlocks={connectedBlocks}
                    isChild={true}
                />
            ))}
        </div>
    )
}
