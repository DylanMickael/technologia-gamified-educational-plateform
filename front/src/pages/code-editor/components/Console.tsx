import React from 'react';

interface ConsoleProps {
  consoleOutput: string[];
}

const Console: React.FC<ConsoleProps> = ({ consoleOutput }) => {
  return (
    <div className="h-[30%] bg-white dark:bg-gray-900 text-gray-300 p-2.5 overflow-auto font-mono whitespace-pre-wrap">
      <div className="mb-1.5 text-blue-400 dark:text-blue-300">Console:</div>
      {consoleOutput.length > 0 ? (
        consoleOutput.map((line, index) => (
          <div className="text-black dark:text-gray-200" key={index}>{line}</div>
        ))
      ) : (
        <div className="text-gray-400 dark:text-gray-500">// La sortie de la console s'affichera ici</div>
      )}
    </div>
  );
};

export default Console;