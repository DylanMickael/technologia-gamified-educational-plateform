type ActionsProps = {
    runCode: () => void;
    clearConsole: () => void;
  };
  
  const Actions = ({ runCode, clearConsole }: ActionsProps) => {
    return (
      <div className="p-2.5 bg-gray-100 dark:bg-gray-800 flex gap-2.5">
        <button 
          onClick={runCode}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer z-10 transition-colors"
        >
          Run
        </button>
        <button 
          onClick={clearConsole}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded cursor-pointer z-10 transition-colors"
        >
          Clear Console
        </button>
      </div>
    );
  };
  
  export default Actions;