import { useState, useEffect } from "react";
import { objects } from "../../../src/data/pre_enfant/info_object";
import { Sparkles, Star } from "lucide-react";
import Username from "../../components/Username";
import NavbarLogo from "../../components/Navbar/Logo";
import type { ObjectType } from "../../types/ObjectType";

export default function StorageObject() {
  const [currentTarget, setCurrentTarget] = useState<ObjectType | null>(null);
  const [foundItems, setFoundItems] = useState<ObjectType[]>([]);
  const [remainingItems, setRemainingItems] = useState<ObjectType[]>(objects);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    correct: boolean;
    itemId?: number;
  }>({
    show: false,
    correct: false,
  });
  const [gameComplete, setGameComplete] = useState(false);

  // Sélectionner un nouvel objet à trouver
  useEffect(() => {
    if (remainingItems.length > 0 && !currentTarget) {
      const randomIndex = Math.floor(Math.random() * remainingItems.length);
      setCurrentTarget(remainingItems[randomIndex]);
    } else if (remainingItems.length === 0) {
      setGameComplete(true);
    }
  }, [remainingItems, currentTarget]);

  const completeItem = (item: ObjectType) => {
    setFoundItems((prev) => [...prev, item]);
    setRemainingItems((prev) => prev.filter((i) => i.id !== item.id));
    setCurrentTarget(null);
  };

  const handleItemClick = (clickedItem: ObjectType) => {
    if (!currentTarget) return;

    const isCorrect = clickedItem.id === currentTarget.id;

    // Afficher le feedback
    setFeedback({ show: true, correct: isCorrect, itemId: clickedItem.id });

    if (isCorrect) {
      completeItem(clickedItem);
    }

    // Masquer le feedback après 1.5 secondes
    setTimeout(() => {
      setFeedback({ show: false, correct: false });
    }, 1500);
  };

  const resetGame = () => {
    setFoundItems([]);
    setRemainingItems(objects);
    setCurrentTarget(null);
    setGameComplete(false);
    setFeedback({ show: false, correct: false });
  };

  if (gameComplete) {
    return (
      <div className="landing-layout  h-screen overflow-hidden p-10 ">
        <div className="hero-section">
          <div className="flex justify-between items-center w-full">
            <NavbarLogo></NavbarLogo>
            <Username></Username>
          </div>
          <div className="w-full flex items-center justify-center p-4 mt-12">
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-pink-600 mb-4">Bravo !</h1>
              <p className="text-lg text-gray-700 mb-6">
                Tu as trouvé tous les objets ! Tu es formidable !
              </p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg"
              >
                Rejouer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h1
          data-aos="fade-right"
          data-aos-delay="400"
          className="font-monument text-2xl md:text-4xl font-bold mb-6"
        >
          Trouve les Objets !
        </h1>
        <div className="backdrop-blur-sm rounded-full px-4 py-2 inline-block">
          <span className="text-black font-bold font-semibold">
            Objets trouvés: {foundItems.length} / {objects.length}
          </span>
        </div>
      </div>

      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Zone de jeu principale */}
        <div className="flex-1 relative">
          {/* Images dispersées */}

          <div className="relative h-[350px] bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden rounded-3xl shadow-xl border-4 border-pink-300 hover:shadow-2xl transition-all duration-300  cursor-pointer group ">
            {remainingItems.map((item, index) => {
              const positions = [
                { top: "10%", left: "15%" },
                { top: "20%", left: "70%" },
                { top: "40%", left: "25%" },
                { top: "60%", left: "80%" },
                { top: "70%", left: "10%" },
                { top: "30%", left: "50%" },
                { top: "80%", left: "60%" },
                { top: "15%", left: "45%" },
              ];
              const position = positions[index % positions.length];

              return (
                <div
                  key={item.id}
                  className={`absolute cursor-pointer transform transition-all duration-300 hover:scale-110 ${
                    feedback.show && feedback.itemId === item.id
                      ? feedback.correct
                        ? "bg-green-400 rounded-full p-2"
                        : "bg-red-400 rounded-full p-2"
                      : ""
                  }`}
                  style={position}
                  onClick={() => handleItemClick(item)}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-40 h-40 object-contain drop-shadow-lg"
                  />
                </div>
              );
            })}
          </div>
          {/* Question en bas */}
          {currentTarget && (
            <div className="mt-6 text-center">
              <div className="p-6 inline-block">
                <p className="text-4xl font-bold text-gray-800 mb-2">
                  Où est :{" "}
                  <span className=" text-pink-600"> {currentTarget.name}</span>{" "}
                  ?
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Panneau des objets trouvés */}
        <div className="w-80">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 h-full">
            <h2 className="text-2xl font-bold text-white mb-4 text-center flex justify-center items-center gap-2">
              <Sparkles className="text-yellow-300" />
              <span className=" text-pink-700"> Objets Trouvés</span>
              <Sparkles className="text-yellow-300" />
            </h2>
            <div className="space-y-3">
              {foundItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-lg transform animate-bounce"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span className="font-semibold text-gray-800">
                    {item.name}
                  </span>
                  <div className="ml-auto text-green-500">✅</div>
                </div>
              ))}
            </div>
            {foundItems.length === 0 && (
              <div className="text-center mt-8">
                <p className="text-lg">
                  {" "}
                  Hélas tu n'as pas encore trouvé d'objet !
                </p>
                <div className="text-4xl mt-2">🎯</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feedback overlay */}
      {feedback.show && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div
            className={`text-6xl font-bold animate-bounce ${
              feedback.correct ? "text-green-500" : "text-red-500"
            }`}
          >
            {feedback.correct ? " Bravo !" : "Essaie encore !"}
          </div>
        </div>
      )}
    </div>
  );
}
