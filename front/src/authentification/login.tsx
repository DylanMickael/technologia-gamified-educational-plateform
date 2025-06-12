import { Apple, Sun } from "lucide-react"
import Faciale from './faciale.js'
export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Background stars/dots pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-40 left-60 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-60 left-40 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-80 left-80 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-32 right-40 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-52 right-60 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-72 right-20 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute bottom-40 left-32 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute bottom-60 right-32 w-1 h-1 bg-white rounded-full"></div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Apple className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">EcoCity</h1>
            <p className="text-green-400 text-sm">Renewable Energy</p>
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Go back
        </button>
      </header>

      {/* Main content */}
      <div className="flex items-center justify-between px-6 py-12 relative z-10">
        {/* Left side - Login form */}
        <div className="w-1/2 max-w-md">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-white leading-tight">Welcome to EcoCity</h2>
              <div className="space-y-2">
                <p className="text-green-400 text-lg font-medium">Shape your World with the Force of Renewables.</p>
                <p className="text-gray-300 text-base">
                  Design your sustainable city, powered by clean and renewable energy.
                </p>
              </div>
            </div>

            {/* Login form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email adress"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" className="text-gray-400 text-sm hover:text-green-400 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors">
                Connexion
              </button>
              <Faciale/>
            </div>
          </div>
        </div>

        {/* Right side - City illustration */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="relative">
            <img src="/city-illustration.png" alt="Sustainable city illustration" className="w-full max-w-2xl h-auto" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 right-6 flex items-center space-x-2 text-yellow-400">
        <Sun className="w-5 h-5" />
        <span className="text-sm underline cursor-pointer hover:text-yellow-300 transition-colors">Mode sombre</span>
      </div>
    </div>
  )
}
