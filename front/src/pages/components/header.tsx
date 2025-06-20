export function Header() {
    return (
        <div>
            <header className="bg-gradient-to-r from-[#B55285] via-[#CD8136] to-[#E55050] text-white p-2">
                <div className="flex justify-between items-center">
                    <div className="pl-10">
                        <h1 className="text-2xl font-bold">Technologia</h1>
                        <p className="text-sm opacity-90">Le futur est entre vos mains</p>
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-colors mr-5">
                        ?
                    </button>
                </div>
            </header>
            <div className="bg-white py-2 text-center shadow-sm">
                <h2 className="text-4xl font-bold text-gray-800">Espace de travail</h2>
            </div>
        </div>
    )
}
