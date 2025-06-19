import React from 'react';
import { TerminalSquare } from 'lucide-react';

interface ConsoleProps {
  consoleOutput: string[];
}

const Console: React.FC<ConsoleProps> = ({ consoleOutput }) => {
    return (
      <div className="shadow-[0_4px_24px_0_rgba(78,78,78,0.15)] rounded-2xl min-h-32 md:min-h-52 bg-background-orange dark:from-gray-900 dark:via-gray-50 dark:to-gray-900 text-gray-300 p-2 md:p-4 border border-blue-100 dark:border-gray-700 overflow-auto font-mono whitespace-pre-wrap mt-4 md:mt-6">
        <div className="flex items-center gap-2 mb-1 md:mb-2 text-white dark:text-white font-bold text-base md:text-lg">
          <TerminalSquare className="w-5 h-5 md:w-6 md:h-6" />
          Console
        </div>
        {consoleOutput.length > 0 ? (
          consoleOutput.map((line, index) => (
            <div className="text-white dark:text-gray-200 text-base md:text-lg" key={index}>{line}</div>
          ))
        ) : (
          <div className="text-white dark:text-gray-500 italic text-base md:text-lg">// Tes directives de console s'executeront ici</div>
        )}
      </div>
    )
};

export default Console;