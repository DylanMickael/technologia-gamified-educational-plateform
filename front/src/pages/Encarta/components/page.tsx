import { ChevronDown } from "lucide-react"
import trano from "../../../assets/img/trano.png"
import astronaute1 from "../../../assets/img/astronaute 1.png"
import astronaute2 from "../../../assets/img/astronaute 2.png"

export default function Encarta() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Gradient Background */}
            <div
                className="absolute inset-0 bg-gradient-to-r"
                style={{
                    background: "linear-gradient(135deg, #e97329 0%, #fda5d2 50%, #b678e6 100%)",
                }}
            />

            {/* Stars/decorative elements - using image tags as requested */}
            <div className="absolute inset-0 flex items-center justify-center">
                <img
                    src={trano}
                    className="w-auto h-auto max-w-full max-h-full -translate-y-40"
                    alt="Trano"
                />
            </div>

            {/* Left Astronaut - Agrandi avec z-index élevé */}
            <div className="absolute left-8 md:left-16 lg:left-20 xl:left-32 z-30 mt-16 md:mt-20 lg:mt-24 xl:mt-32" style={{ bottom: '22%' }}>
                <img src={astronaute2} alt="Floating astronaut" className="w-32 h-48 md:w-40 md:h-60 lg:w-52 lg:h-78 xl:w-96 xl:h-96 object-contain" />
            </div>

            {/* Right Astronaut - Agrandi avec z-index élevé */}
            <div className="absolute right-8 md:right-16 lg:right-20 xl:right-32 z-30 mt-16 md:mt-20 lg:mt-24 xl:mt-32" style={{ bottom: '18%' }}>
                <img
                    src={astronaute1}
                    alt="Astronaut"
                    className="w-28 h-42 md:w-36 md:h-54 lg:w-48 lg:h-72 xl:w-80 xl:h-90 object-contain"
                />
            </div>
            {/* White curved section */}
            <div className="absolute bottom-0 left-0 right-0">
                {/* Curved white background */}
                <svg viewBox="0 0 1400 400" className="w-full h-auto" preserveAspectRatio="xMidYEnd slice">
                    <path d="M0 200 Q350 100 700 150 Q1050 200 1400 120 L1400 400 L0 400 Z" fill="white" />
                </svg>

                {/* City Silhouette on the curve */}
                <svg
                    viewBox="0 0 1400 300"
                    className="absolute bottom-0 w-full h-auto text-white"
                    preserveAspectRatio="xMidYEnd slice"
                >
                    <defs>
                        <pattern id="windows" patternUnits="userSpaceOnUse" width="8" height="8">
                            <rect width="8" height="8" fill="currentColor" />
                            <rect x="1" y="1" width="2" height="2" fill="rgba(255,255,255,0.8)" />
                            <rect x="5" y="1" width="2" height="2" fill="rgba(255,255,255,0.6)" />
                            <rect x="1" y="5" width="2" height="2" fill="rgba(255,255,255,0.7)" />
                            <rect x="5" y="5" width="2" height="2" fill="rgba(255,255,255,0.5)" />
                        </pattern>
                    </defs>

                    {/* City buildings following the curve */}
                    <rect x="200" y="180" width="40" height="120" fill="url(#windows)" />
                    <rect x="260" y="160" width="35" height="140" fill="url(#windows)" />
                    <rect x="310" y="170" width="30" height="130" fill="url(#windows)" />
                    <rect x="360" y="140" width="45" height="160" fill="url(#windows)" />
                    <rect x="420" y="120" width="35" height="180" fill="url(#windows)" />
                    <rect x="470" y="110" width="40" height="190" fill="url(#windows)" />
                    <rect x="530" y="100" width="50" height="200" fill="url(#windows)" />
                    <rect x="600" y="90" width="45" height="210" fill="url(#windows)" />
                    <rect x="660" y="85" width="35" height="215" fill="url(#windows)" />
                    <rect x="710" y="80" width="40" height="220" fill="url(#windows)" />
                    <rect x="770" y="85" width="35" height="215" fill="url(#windows)" />
                    <rect x="820" y="95" width="40" height="205" fill="url(#windows)" />
                    <rect x="880" y="105" width="35" height="195" fill="url(#windows)" />
                    <rect x="930" y="115" width="30" height="185" fill="url(#windows)" />
                    <rect x="980" y="125" width="35" height="175" fill="url(#windows)" />
                    <rect x="1030" y="135" width="40" height="165" fill="url(#windows)" />
                    <rect x="1090" y="145" width="35" height="155" fill="url(#windows)" />
                    <rect x="1140" y="155" width="30" height="145" fill="url(#windows)" />
                </svg>
            </div>

            {/* Main Content - positioned at the bottom of the curve */}
            <div className="absolute bottom-32 md:bottom-40 left-0 right-0 z-20 px-4 md:px-8 text-center">
                <div className="max-w-9xl mx-auto">
                    <h1
                        className="text-2xl md:text-4xl lg:text-5xl xl:text-4xl font-normal mb-4 md:mb-6 leading-tight px-4"
                        style={{
                            color: "#c95792",
                            fontFamily: "Monument, sans-serif",
                        }}
                    >
                        qu'est-ce que tu aimerais faire quand tu seras grand(e) ?
                    </h1>

                    <p
                        className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium"
                        style={{
                            color: "#000000",
                            fontFamily: "Space Grotesk, sans-serif",
                        }}
                    >
                        Rêve grand, travaille avec ton cœur, et tu iras très loin !
                    </p>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <ChevronDown className="w-20 h-20 md:w-20 md:h-20 animate-bounce" style={{ color: "#c95792" }} />
            </div>
        </div>
    )
}