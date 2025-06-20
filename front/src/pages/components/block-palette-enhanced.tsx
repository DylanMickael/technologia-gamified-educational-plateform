"use client"

import { useState } from "react"
import { useDrag } from "react-dnd"

interface EnhancedPaletteProps {
    searchEnabled: boolean
}

export function EnhancedBlockPalette({ searchEnabled }: EnhancedPaletteProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    const advancedBlocks = [
        {
            category: "Mathématiques",
            color: "bg-green-600",
            icon: "🔢",
            blocks: [
                { type: "add", text: "addition", symbol: "+", editable: true },
                { type: "subtract", text: "soustraction", symbol: "-", editable: true },
                { type: "multiply", text: "multiplication", symbol: "×", editable: true },
                { type: "divide", text: "division", symbol: "÷", editable: true },
                { type: "random", text: "nombre aléatoire entre", value: 1, value2: 10, editable: true },
                { type: "round", text: "arrondir", editable: true },
                { type: "abs", text: "valeur absolue de", editable: true },
                { type: "sqrt", text: "racine carrée de", editable: true },
            ],
        },
        {
            category: "Capteurs",
            color: "bg-teal-600",
            icon: "📡",
            blocks: [
                { type: "mouse_x", text: "position x de la souris", editable: false },
                { type: "mouse_y", text: "position y de la souris", editable: false },
                { type: "mouse_down", text: "souris pressée ?", editable: false },
                { type: "key_pressed", text: "touche pressée ?", value: "espace", editable: true },
                { type: "timer", text: "chronomètre", editable: false },
                { type: "loudness", text: "volume sonore", editable: false },
            ],
        },
        {
            category: "Variables",
            color: "bg-red-600",
            icon: "📊",
            blocks: [
                { type: "set_var", text: "mettre variable à", value: 0, editable: true },
                { type: "change_var", text: "ajouter à variable", value: 1, editable: true },
                { type: "show_var", text: "montrer variable", editable: false },
                { type: "hide_var", text: "cacher variable", editable: false },
            ],
        },
        {
            category: "Listes",
            color: "bg-yellow-600",
            icon: "📋",
            blocks: [
                { type: "add_to_list", text: "ajouter à la liste", editable: true },
                { type: "delete_from_list", text: "supprimer de la liste", value: 1, editable: true },
                { type: "insert_in_list", text: "insérer dans la liste", value: 1, editable: true },
                { type: "item_of_list", text: "élément de la liste", value: 1, editable: true },
                { type: "length_of_list", text: "longueur de la liste", editable: false },
                { type: "list_contains", text: "la liste contient ?", editable: true },
            ],
        },
    ]

    const categories = ["all", ...advancedBlocks.map((cat) => cat.category)]

    const filteredBlocks = advancedBlocks.filter((category) => {
        if (selectedCategory !== "all" && category.category !== selectedCategory) return false
        if (searchTerm) {
            return category.blocks.some((block) => block.text.toLowerCase().includes(searchTerm.toLowerCase()))
        }
        return true
    })

    return (
        <div className="bg-gradient-to-b from-indigo-50 to-purple-50 p-4 rounded-lg border-2 border-indigo-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🧩</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Palette Avancée</h3>
            </div>

            {/* Barre de recherche */}
            {searchEnabled && (
                <div className="mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="🔍 Rechercher un bloc..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-10 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
                    </div>
                </div>
            )}

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedCategory === category
                                ? "bg-indigo-500 text-white shadow-md"
                                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                        }`}
                    >
                        {category === "all" ? "🌟 Tous" : category}
                    </button>
                ))}
            </div>

            {/* Blocs avancés */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredBlocks.map((category) => (
                    <div key={category.category} className="bg-white rounded-lg p-3 shadow-sm border">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">{category.icon}</span>
                            <span className="font-bold text-gray-800">{category.category}</span>
                            <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {category.blocks
                                .filter((block) => !searchTerm || block.text.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((block, i) => (
                                    <AdvancedDraggableBlock
                                        key={`${category.category}-${i}`}
                                        type={block.type}
                                        text={block.text}
                                        color={category.color}
                                        symbol={block.symbol}
                                        value={block.value}
                                        value2={block.value2}
                                        editable={block.editable}
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

interface AdvancedDraggableBlockProps {
    type: string
    text: string
    color: string
    symbol?: string
    value?: number | string
    value2?: number
    editable?: boolean
}

function AdvancedDraggableBlock({ type, text, color, symbol, value, value2, editable }: AdvancedDraggableBlockProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "block",
        item: { type, text, color, value, value2, editable },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={drag}
            className={`${color} text-white rounded-lg p-2 cursor-move transition-all duration-200 ${
                isDragging ? "opacity-50 scale-95" : "hover:scale-105 hover:shadow-lg"
            } flex items-center gap-2`}
        >
            {symbol && <span className="font-bold text-lg">{symbol}</span>}
            <span className="text-sm font-medium flex-1">{text}</span>
            {editable && <span className="text-xs opacity-75">✏️</span>}
        </div>
    )
}
