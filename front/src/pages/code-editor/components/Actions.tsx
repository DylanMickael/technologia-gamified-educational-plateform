import { Play, Send, Trash2 } from 'lucide-react';
import { PrimaryButton } from '../../../components/Buttons';
  
type ActionsProps = {
  runCode: () => void;
  clearConsole: () => void;
};
  
const Actions = ({ runCode, clearConsole }: ActionsProps) => {
  return (
    <div className="rounded-b-2xl flex flex-col md:flex-row justify-between p-4 md:p-6 bg-gradient-to-br from-pink-50 via-white to-purple-50 shadow-lg border border-blue-100 dark:border-gray-700 gap-4 md:gap-0">
        <div className='flex gap-2'>
            <button 
                onClick={runCode}
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-lg shadow-md font-bold text-base md:text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
                <Play className="w-5 h-5" />
            </button>
            <button 
                onClick={clearConsole}
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-lg shadow-md font-bold text-base md:text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
        <PrimaryButton 
            type='button'
            onClick={clearConsole}
        >
            <span className='flex gap-2 items-center'>
                <Send className="w-5 h-5" />
                <p className='font-monument text-xs md:text-sm'>Sommettre</p>
            </span>
        </PrimaryButton>
    </div>
  );
}

export default Actions;