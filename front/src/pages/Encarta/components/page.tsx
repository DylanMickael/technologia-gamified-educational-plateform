import { ChevronDown, Sparkles, Star, Heart, Zap, Circle } from "lucide-react"
import { useState, useEffect } from "react"
import robot from "../../../assets/img/arbre.png"

export default function Encarta() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        const handleScroll = () => setScrollY(window.scrollY)
        
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="relative min-h-screen landing-layout overflow-hidden">
            
            {/* Animated mesh background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-orange-200/30 to-yellow-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute bottom-20 left-40 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
                </div>
            </div>

            {/* Geometric grid pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, rgba(103, 27, 66, 0.3) 2px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Floating orbs with parallax */}
            <div className="absolute inset-0">
                <div 
                    className="absolute top-32 left-16 w-8 h-8 bg-gradient-to-br from-purple-400/60 to-pink-400/60 rounded-full animate-float"
                    style={{
                        transform: `translateY(${scrollY * 0.2}px)`,
                        animationDuration: '6s'
                    }}
                ></div>
                <div 
                    className="absolute top-64 right-24 w-12 h-12 bg-gradient-to-br from-orange-400/50 to-red-400/50 rounded-full animate-float"
                    style={{
                        transform: `translateY(${scrollY * -0.3}px)`,
                        animationDuration: '8s',
                        animationDelay: '2s'
                    }}
                ></div>
                <div 
                    className="absolute bottom-48 left-32 w-6 h-6 bg-gradient-to-br from-blue-400/70 to-purple-400/70 rounded-full animate-float"
                    style={{
                        transform: `translateY(${scrollY * 0.1}px)`,
                        animationDuration: '7s',
                        animationDelay: '1s'
                    }}
                ></div>
            </div>

            {/* Interactive cursor effect */}
            <div 
                className="fixed w-8 h-8 border-2 border-purple-400/40 rounded-full pointer-events-none z-50 transition-all duration-500 mix-blend-difference"
                style={{
                    left: mousePosition.x - 16,
                    top: mousePosition.y - 16,
                    transform: `scale(${isHovered ? 1.5 : 1})`,
                    borderColor: isHovered ? '#671B42' : 'rgba(147, 51, 234, 0.4)'
                }}
            ></div>

            {/* Main content with new layout */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full">
                    
                    {/* Header section with centered layout */}
                    <div className="text-center mb-16">
                        <div className="relative inline-block">
                            {/* Title with enhanced styling */}
                            <h1 
                                className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-black leading-tight bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6"
                                style={{ fontFamily: "Monument, sans-serif" }}
                            >
                                Qu'est-ce que tu aimerais
                            </h1>
                            <h1 
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-tight bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600  bg-clip-text text-transparent"
                                style={{ fontFamily: "Monument, sans-serif" }}
                            >
                                faire quand tu seras grand(e)
                            </h1>
                            
                            {/* Decorative elements around title */}
                            <Sparkles className="absolute -top-4 -left-8 w-8 h-8 text-yellow-400 animate-spin" style={{animationDuration: '3s'}} />
                            <Star className="absolute -top-2 -right-12 w-6 h-6 text-purple-400 animate-pulse" />
                            <Zap className="absolute -bottom-4 left-4 w-7 h-7 text-orange-400 animate-bounce" />
                        </div>

                        {/* Subtitle with better spacing */}
                        <div className="mt-12 space-y-4">
                            <p 
                                className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium leading-relaxed"
                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                            >
                                Rêve grand, travaille avec ton cœur,
                            </p>
                            <p 
                                className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium"
                                style={{ fontFamily: "Space Grotesk, sans-serif" }}
                            >
                                et tu iras très loin ! 
                            </p>
                        </div>
                    </div>

                    {/* Central visual element */}
                    <div className="flex justify-center mb-16">
                        <div className="relative group">
                            {/* Enhanced glow effects */}
                            <div className="absolute -inset-8 bg-gradient-to-r from-purple-300/30 via-pink-300/30 to-orange-300/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse"></div>
                            <div className="absolute -inset-4 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-xl group-hover:scale-110 transition-all duration-500"></div>
                            
                            {/* Main visual container */}
                            <div className="relative bg-white/80 backdrop-blur-lg rounded-full p-12 shadow-2xl border border-white/60 group-hover:shadow-3xl transition-all duration-500">
                                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    <div className="text-xl sm:text-6xl md:text-xl animate-bounce" style={{animationDuration: '2s'}}>
                                        <img src={robot} alt="" />
                                    </div>
                                </div>
                                
                                {/* Orbiting icons */}
                                <div className="absolute inset-0 animate-spin" style={{animationDuration: '20s'}}>
                                    <Heart className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-6 text-pink-500" />
                                    <Circle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                                    <Star className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 text-yellow-500" />
                                    <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action button with new styling */}
                    <div className="flex justify-center">
                        <a href="/arbre"
                            className="group relative px-12 py-2 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                            style={{ 
                                fontFamily: "Space Grotesk, sans-serif",
                                backgroundColor: '#671B42'
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Suivant
                                <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform duration-300" />
                            </span>
                            
                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Click ripple effect */}
                            <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 rounded-2xl transition-opacity duration-150"></div>
                            
                            {/* Subtle shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Additional floating elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-32 right-32 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-70" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-20 w-4 h-4 bg-orange-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-40" style={{animationDelay: '3s'}}></div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}