"use client"

interface ConnectionEffectsProps {
    isConnecting: boolean
    connectionType: "above" | "below" | null
}

export function ConnectionEffects({ isConnecting, connectionType }: ConnectionEffectsProps) {
    if (!isConnecting) return null

    return (
        <div className="absolute inset-0 pointer-events-none z-50">
            {/* Effet de particules */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: connectionType === "above" ? "20%" : "80%",
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: "1s",
                        }}
                    />
                ))}
            </div>

            {/* Effet de vague */}
            <div
                className={`absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse ${
                    connectionType === "above" ? "top-0" : "bottom-0"
                }`}
            />
        </div>
    )
}
