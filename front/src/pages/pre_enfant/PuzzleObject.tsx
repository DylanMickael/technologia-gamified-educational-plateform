// import { useState, useEffect } from "react";
// import ObjectStorage from "./StorageObject";
// import PuzzleGame from "./PuzzleObject";
// import type { ObjectType } from "../../types/ObjectType";
// import { objects } from "../../data/pre_enfant/info_object";

// function PagePreEnfant() {
//   const [currentTarget, setCurrentTarget] = useState<ObjectType | null>(null);
//   const [showPuzzle, setShowPuzzle] = useState(false);
//   const [puzzleTarget, setPuzzleTarget] = useState<string>("");
//   const [foundItems, setFoundItems] = useState<ObjectType[]>([]);
//   const [remainingItems, setRemainingItems] = useState<ObjectType[]>(objects);
//   const handlePuzzleComplete = () => {
//     const targetItem = remainingItems.find(
//       (item) => item.name === puzzleTarget
//     );
//     if (targetItem) {
//       completeItem(targetItem);
//     }
//     setShowPuzzle(false);
//     setPuzzleTarget("");
//   };

//   const completeItem = (item: ObjectType) => {
//     setFoundItems((prev) => [...prev, item]);
//     setRemainingItems((prev) => prev.filter((i) => i.id !== item.id));
//     setCurrentTarget(null);
//   };

//   const handlePuzzleClose = () => {
//     setShowPuzzle(false);
//     setPuzzleTarget("");
//   };
//   return (
//     <div>
//       {/* Puzzle Game */}
//       {/* {showPuzzle && ( */}
//       <PuzzleGame
//         targetObject={puzzleTarget}
//         onComplete={handlePuzzleComplete}
//         onClose={handlePuzzleClose}
//       />
//       {/* )} */}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";

interface PuzzlePiece {
  id: number;
  currentPosition: number;
  correctPosition: number;
  image: string;
}

interface PuzzleGameProps {
  targetObject: string;
  onComplete: () => void;
  onClose: () => void;
}

export default function PuzzleGame({
  targetObject,
  onComplete,
  onClose,
}: PuzzleGameProps) {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialiser le puzzle
  useEffect(() => {
    const initialPieces: PuzzlePiece[] = [
      {
        id: 1,
        currentPosition: 1,
        correctPosition: 1,
        image: "/placeholder.svg?height=100&width=100&text=1",
      },
      {
        id: 2,
        currentPosition: 2,
        correctPosition: 2,
        image: "/placeholder.svg?height=100&width=100&text=2",
      },
      {
        id: 3,
        currentPosition: 3,
        correctPosition: 3,
        image: "/placeholder.svg?height=100&width=100&text=3",
      },
      {
        id: 4,
        currentPosition: 4,
        correctPosition: 4,
        image: "/placeholder.svg?height=100&width=100&text=4",
      },
    ];

    // Mélanger les pièces
    shufflePieces(initialPieces);
  }, []);

  const shufflePieces = (piecesToShuffle: PuzzlePiece[]) => {
    const shuffled = [...piecesToShuffle];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i].currentPosition;
      shuffled[i].currentPosition = shuffled[j].currentPosition;
      shuffled[j].currentPosition = temp;
    }
    setPieces(shuffled);
  };

  const handlePieceClick = (clickedPiece: PuzzlePiece) => {
    // Trouver la pièce vide (position 4 dans ce cas simple)
    const emptyPosition = findEmptyPosition();

    if (canMovePiece(clickedPiece.currentPosition, emptyPosition)) {
      const newPieces = pieces.map((piece) => {
        if (piece.id === clickedPiece.id) {
          return { ...piece, currentPosition: emptyPosition };
        }
        if (piece.currentPosition === emptyPosition) {
          return { ...piece, currentPosition: clickedPiece.currentPosition };
        }
        return piece;
      });

      setPieces(newPieces);
      checkIfComplete(newPieces);
    }
  };

  const findEmptyPosition = () => {
    const occupiedPositions = pieces.map((p) => p.currentPosition);
    for (let i = 1; i <= 4; i++) {
      if (!occupiedPositions.includes(i)) {
        return i;
      }
    }
    return 4; // fallback
  };

  const canMovePiece = (piecePosition: number, emptyPosition: number) => {
    // Logique simple : les pièces adjacentes peuvent bouger
    const adjacentPositions: { [key: number]: number[] } = {
      1: [2, 3],
      2: [1, 4],
      3: [1, 4],
      4: [2, 3],
    };

    return adjacentPositions[piecePosition]?.includes(emptyPosition) || false;
  };

  const checkIfComplete = (currentPieces: PuzzlePiece[]) => {
    const isCompleted = currentPieces.every(
      (piece) => piece.currentPosition === piece.correctPosition
    );

    if (isCompleted && !isComplete) {
      setIsComplete(true);
      setShowSuccess(true);

      setTimeout(() => {
        onComplete();
      }, 3000);
    }
  };

  const resetPuzzle = () => {
    const resetPieces = pieces.map((piece) => ({
      ...piece,
      currentPosition: piece.id,
    }));
    shufflePieces(resetPieces);
    setIsComplete(false);
    setShowSuccess(false);
  };

  const getPieceAtPosition = (position: number) => {
    return pieces.find((piece) => piece.currentPosition === position);
  };

  return (
    <div className="  bg-black/50 flex items-center justify-center  p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            🧩 Mini Puzzle !
          </h2>
          <p className="text-gray-700">
            Reconstitue l'image du{" "}
            <span className="font-bold text-orange-500">{targetObject}</span>
          </p>
        </div>

        {/* Puzzle Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6 bg-gray-100 p-4 rounded-2xl">
          {[1, 2, 3, 4].map((position) => {
            const piece = getPieceAtPosition(position);
            return (
              <div
                key={position}
                className={`aspect-square rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-200 ${
                  piece
                    ? "bg-gradient-to-br from-pink-200 to-orange-200 hover:scale-105"
                    : "bg-gray-50"
                }`}
                onClick={() => piece && handlePieceClick(piece)}
              >
                {piece ? (
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <img
                      src={piece.image || "/placeholder.svg"}
                      alt={`Pièce ${piece.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-gray-400 text-2xl">?</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={resetPuzzle}
            className="flex-1 bg-gradient-to-r from-orange-400 to-pink-400 text-white py-2 px-4 rounded-full font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <Shuffle size={16} />
            Mélanger
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Fermer
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="text-center animate-bounce">
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-xl font-bold text-green-600">Fantastique !</p>
            <p className="text-gray-700">Tu as réussi le puzzle !</p>
          </div>
        )}

        {/* Progress */}
        <div className="text-center text-sm text-gray-500">
          {isComplete
            ? "Puzzle terminé ! 🏆"
            : "Clique sur les pièces pour les déplacer"}
        </div>
      </div>
    </div>
  );
}
