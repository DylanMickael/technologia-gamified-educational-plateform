import { useDrag } from "react-dnd"

const blockCategories = [
    {
        name: "Mouvement",
        color: "bg-blue-500",
        blocks: [
            { type: "move", text: "avancer de", value: 10, unit: "pas", editable: true },
            { type: "move_back", text: "reculer de", value: 10, unit: "pas", editable: true },
            { type: "turn_right", text: "tourner ↻ de", value: 15, unit: "degrés", editable: true },
            { type: "turn_left", text: "tourner ↺ de", value: 15, unit: "degrés", editable: true },
            { type: "goto_xy", text: "aller à x:", value: 0, value2: 0, unit: "y:", editable: true },
            { type: "goto_random", text: "aller à position aléatoire", editable: false },
            { type: "glide", text: "glisser en", value: 1, unit: "secondes à position aléatoire", editable: true },
            { type: "glide_xy", text: "glisser en", value: 1, value2: 0, value3: 0, unit: "sec à x: y:", editable: true },
            { type: "point_direction", text: "s'orienter à", value: 90, unit: "degrés", editable: true },
            { type: "point_towards", text: "s'orienter vers pointeur de souris", editable: false },
            { type: "change_x", text: "ajouter", value: 10, unit: "à x", editable: true },
            { type: "set_x", text: "mettre x à", value: 0, editable: true },
            { type: "change_y", text: "ajouter", value: 10, unit: "à y", editable: true },
            { type: "set_y", text: "mettre y à", value: 0, editable: true },
            { type: "bounce", text: "rebondir si le bord est atteint", editable: false },
            { type: "step_forward", text: "faire un pas en avant", editable: false },
            { type: "step_back", text: "faire un pas en arrière", editable: false },
        ],
    },
    {
        name: "Apparence",
        color: "bg-purple-500",
        blocks: [
            { type: "show", text: "montrer", editable: false },
            { type: "hide", text: "cacher", editable: false },
            { type: "size", text: "mettre la taille à", value: 100, unit: "%", editable: true },
            { type: "change_size", text: "ajouter", value: 10, unit: "à la taille", editable: true },
        ],
    },
    {
        name: "Événements",
        color: "bg-orange-500",
        blocks: [
            { type: "when_clicked", text: "quand le drapeau vert pressé", editable: false },
            { type: "when_key", text: "quand la touche espace pressée", editable: false },
            { type: "when_sprite_clicked", text: "quand ce lutin est cliqué", editable: false },
        ],
    },
    {
        name: "Contrôle",
        color: "bg-cyan-500",
        blocks: [
            { type: "wait", text: "attendre", value: 1, unit: "secondes", editable: true },
            { type: "repeat", text: "répéter", value: 10, unit: "fois", editable: true },
            { type: "forever", text: "répéter indéfiniment", editable: false },
        ],
    },
]

interface DraggableBlockProps {
    type: string
    text: string
    color: string
    value?: number
    value2?: number
    value3?: number
    unit?: string
    editable?: boolean
}

function DraggableBlock({ type, text, color, value, value2, value3, unit, editable }: DraggableBlockProps) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "block",
        item: { type, text, color, value, value2, value3, unit, editable },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    return (
        <div
            ref={drag}
            className={`${color} text-white p-2 rounded-lg cursor-move mb-2 text-sm font-medium transition-all duration-200 relative ${
                isDragging ? "opacity-50 scale-95" : "hover:opacity-90 hover:scale-105"
            } shadow-sm hover:shadow-md group`}
        >
            {text}
            {/* Indicateur de copie multiple */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs">
                ∞
            </div>
        </div>
    )
}

export function Sidebar() {
    return (
        <div className="w-80 bg-gray-100 border-r flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-blue-500 scrollbar-thumb-rounded-full scrollbar-w-3 hover:scrollbar-thumb-blue-600">
                <div className="p-4 space-y-6">
                    {blockCategories.map((category) => (
                        <div key={category.name} className="relative">
                            <div className="sticky top-0 bg-gray-100 py-3 z-10 border-b border-gray-300 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-5 h-5 rounded-full ${category.color} shadow-md`}></div>
                                        <span className="font-bold text-gray-800 text-base">{category.name}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full font-medium">
                    {category.blocks.length}
                  </span>
                                </div>
                            </div>

                            <div className="ml-6 space-y-2 pb-4">
                                {category.blocks.map((block, i) => (
                                    <DraggableBlock
                                        key={`${category.name}-${i}`}
                                        type={block.type}
                                        text={block.text}
                                        color={category.color}
                                        value={block.value}
                                        value2={block.value2}
                                        value3={block.value3}
                                        unit={block.unit}
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
