"use client"

import { useDrag } from "react-dnd"

const blockCategories = [
    {
        name: "Mouvement",
        color: "bg-blue-500",
        blocks: [
            { type: "move", text: "avancer de 10 pas", value: 10, editable: true },
            { type: "turn_right", text: "tourner ↻ de 15 degrés", value: 15, editable: true },
            { type: "turn_left", text: "tourner ↺ de 15 degrés", value: 15, editable: true },
        ],
    },
    {
        name: "Apparence",
        color: "bg-purple-500",
        blocks: [
            { type: "show", text: "montrer", editable: false },
            { type: "hide", text: "cacher", editable: false },
        ],
    },
    {
        name: "Contrôle",
        color: "bg-orange-500",
        blocks: [
            { type: "wait", text: "attendre 1 seconde", value: 1, editable: true },
            { type: "repeat", text: "répéter 10 fois", value: 10, editable: true },
        ],
    },
]

interface DraggableBlockProps {
    type: string
    text: string
    color: string
    value?: number
    editable?: boolean
}

function DraggableBlock({ type, text, color, value, editable }: DraggableBlockProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "block",
        item: { type, text, color, value, editable },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={drag}
            className={`${color} text-white rounded-lg cursor-move mb-2 px-3 py-2 transition-all duration-200 ${
                isDragging ? "opacity-50 scale-95" : "hover:scale-105"
            } shadow-md`}
        >
            <span className="text-sm font-medium">{text}</span>
        </div>
    )
}

export function Sidebar() {
    return (
        <div className="w-80 bg-gray-100 border-r flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-6">
                    {blockCategories.map((category) => (
                        <div key={category.name}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                                <span className="font-bold text-gray-800">{category.name}</span>
                            </div>

                            <div className="ml-6 space-y-2">
                                {category.blocks.map((block, i) => (
                                    <DraggableBlock
                                        key={`${category.name}-${i}`}
                                        type={block.type}
                                        text={block.text}
                                        color={category.color}
                                        value={block.value}
                                        editable={block.editable}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
