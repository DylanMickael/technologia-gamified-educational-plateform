"use client"

import { useState } from "react"
import { Button } from "./button"

interface WorkspaceToolsProps {
    onToolSelect: (tool: string) => void
    blocks: any[]
}

export function WorkspaceTools({ onToolSelect, blocks }: WorkspaceToolsProps) {
    const [selectedTool, setSelectedTool] = useState("select")

    const tools = [
        { id: "select", icon: "👆", label: "Sélection", desc: "Sélectionner et déplacer" },
        { id: "connect", icon: "🔗", label: "Connexion", desc: "Connecter automatiquement" },
        { id: "duplicate", icon: "📋", label: "Dupliquer", desc: "Copier des blocs" },
        { id: "delete", icon: "🗑️", label: "Supprimer", desc: "Effacer des éléments" },
        { id: "comment", icon: "💬", label: "Commenter", desc: "Ajouter des notes" },
        { id: "zoom", icon: "🔍", label: "Zoom", desc: "Agrandir/réduire" },
    ]

    const handleToolSelect = (toolId: string) => {
        setSelectedTool(toolId)
        onToolSelect(toolId)
    }

    const exportToCode = () => {
        const codeLines = blocks.map((block) => {
            switch (block.type) {
                case "move":
                    return `sprite.move(${block.value || 10})`
                case "turn_right":
                    return `sprite.turn_right(${block.value || 15})`
                case "turn_left":
                    return `sprite.turn_left(${block.value || 15})`
                default:
                    return `// ${block.text}`
            }
        })

        const fullCode = `// Code généré automatiquement
class Sprite {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
  }
  
  move(steps) {
    this.x += steps * Math.cos(this.rotation * Math.PI / 180);
    this.y += steps * Math.sin(this.rotation * Math.PI / 180);
  }
  
  turn_right(degrees) {
    this.rotation += degrees;
  }
  
  turn_left(degrees) {
    this.rotation -= degrees;
  }
}

const sprite = new Sprite();

// Votre programme :
${codeLines.join("\n")}
`

        navigator.clipboard.writeText(fullCode)
        alert("Code copié dans le presse-papiers ! 📋")
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🛠️</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Outils Workspace</h3>
            </div>

            {/* Outils principaux */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        onClick={() => handleToolSelect(tool.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            selectedTool === tool.id
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        title={tool.desc}
                    >
                        <div className="text-2xl mb-1">{tool.icon}</div>
                        <div className="text-xs font-medium text-gray-700">{tool.label}</div>
                    </button>
                ))}
            </div>

            {/* Actions rapides */}
            <div className="space-y-2">
                <Button
                    onClick={exportToCode}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                    disabled={blocks.length === 0}
                >
                    📤 Exporter en JavaScript
                </Button>

                <Button
                    onClick={() => onToolSelect("organize")}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                    🎯 Organiser automatiquement
                </Button>

                <Button
                    onClick={() => onToolSelect("validate")}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                    ✅ Valider le programme
                </Button>
            </div>

            {/* Statistiques */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700 mb-2">📊 Statistiques :</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                        Blocs: <span className="font-bold">{blocks.length}</span>
                    </div>
                    <div>
                        Connexions: <span className="font-bold">{blocks.filter((b) => b.parentId).length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
