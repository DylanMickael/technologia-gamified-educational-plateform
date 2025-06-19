import { useState } from "react";
import { ChevronDown, ChevronRight, Bot, CheckCircle, Circle } from "lucide-react";
import program from "../data/program.json";

// Composant pour une sous-partie
const SubStep = ({
  sous,
  isCurrentSous,
  isDone,
  onClick,
}: {
  sous: string;
  isCurrentSous: boolean;
  isDone: boolean;
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}) => (
  <li
    className={`flex items-center gap-2 px-2 py-1 rounded transition ${
      isCurrentSous
        ? "bg-pink-100 dark:bg-pink-900 font-bold text-pink-700 dark:text-pink-200"
        : isDone
        ? "text-pink-400"
        : "hover:bg-pink-50 dark:hover:bg-gray-700"
    }`}
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    {isCurrentSous ? (
      <Circle className="w-4 h-4 text-pink-500" />
    ) : isDone ? (
      <CheckCircle className="w-4 h-4 text-pink-400" />
    ) : (
      <Circle className="w-3 h-3 text-pink-200" />
    )}
    {sous}
    {isCurrentSous && (
      <span className="ml-2 text-xs bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-2 py-0.5 rounded-full">
        En cours
      </span>
    )}
  </li>
);

// Composant pour une partie
const Step = ({
  partie,
  idx,
  setOpenIndex,
  isCurrent,
  isOpen,
  currentStep,
  setCurrentStep,
}: {
  partie: any;
  idx: number;
  setOpenIndex: (idx: number | null) => void;
  isCurrent: boolean;
  isOpen: boolean;
  currentStep: { partie: number; sousPartie: number };
  setCurrentStep: (step: { partie: number; sousPartie: number }) => void;
}) => (
  <li
    className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-md border border-pink-100 dark:border-pink-700 p-4 transition hover:scale-[1.01] hover:shadow-xl cursor-pointer group ${
      isCurrent ? "ring-2 ring-pink-400" : ""
    }`}
  >
    <div className="flex items-center mb-2 select-none" onClick={() => setOpenIndex(isOpen ? null : idx)}>
      <span className="mr-3">
        <Bot className={`w-5 h-5 ${isCurrent ? "text-pink-500" : "text-gray-400 group-hover:text-gray-600"}`} />
      </span>
      <span className={`font-semibold text-lg ${isCurrent ? "text-pink-700 dark:text-pink-200" : "text-gray-400 dark:text-white"}`}>{partie.titre}</span>
      <span className="ml-auto text-pink-400 group-hover:text-pink-600 text-xl transition">
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </span>
    </div>
    {isOpen && (
      <ul className="ml-6 mt-2 list-none text-gray-700 dark:text-gray-300 text-sm space-y-2">
        {partie.sousParties.map((sous: string, i: number) => {
          const isDone = idx < currentStep.partie || (idx === currentStep.partie && i < currentStep.sousPartie);
          const isCurrentSous = idx === currentStep.partie && i === currentStep.sousPartie;
          return (
            <SubStep
              key={i}
              sous={sous}
              isCurrentSous={isCurrentSous}
              isDone={isDone}
              onClick={e => {
                e.stopPropagation();
                setCurrentStep({ partie: idx, sousPartie: i });
                setOpenIndex(idx);
              }}
            />
          );
        })}
      </ul>
    )}
  </li>
);

const ProgramList = () => {
  const [currentStep, setCurrentStep] = useState<{ partie: number; sousPartie: number }>({ partie: 0, sousPartie: 0 });
  const [openIndex, setOpenIndex] = useState<number | null>(currentStep.partie);

  return (
    <ul className="w-full space-y-4">
      {program.map((partie, idx) => {
        const isOpen = openIndex === idx;
        const isCurrent = currentStep.partie === idx;
        return (
          <Step
            key={idx}
            partie={partie}
            idx={idx}
            setOpenIndex={setOpenIndex}
            isCurrent={isCurrent}
            isOpen={isOpen}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        );
      })}
    </ul>
  );
};

export default ProgramList;