import Editor from '@monaco-editor/react';
import Logo from '../../../assets/Logo.png';

type EditorProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  handleEditorDidMount: (editor: any, monaco: any) => void;
};

const EditorComponent = ({ code, setCode, handleEditorDidMount }: EditorProps) => {
  return (
    <div data-aos="fade-up" className='h-[40vh] md:h-[50vh] bg-white rounded-t-2xl shadow-[0_4px_24px_0_rgba(78,78,78,0.15)]'>
        <div className='relative w-full rounded-2xl flex justify-center text-lg md:text-2xl py-4 md:py-8 px-4 md:px-8 font-bold font-space'>
           <img className='w-[24px] md:w-[30px] mx-2' src={Logo} alt="" />Technolo Studio code
           <div className="absolute right-4 md:right-8 flex gap-2">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 inline-block border border-gray-300"></span>
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400 inline-block border border-gray-300"></span>
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 inline-block border border-gray-300"></span>
            </div>
        </div>
        <div className='h-70 md:h-90'>
            <Editor
            height="100%"
            defaultLanguage="typescript"
            defaultValue={code}
            onChange={(value) => value && setCode(value)}
            onMount={handleEditorDidMount}
            options={{
                minimap: { enabled: false },
                fontSize: 16,
                automaticLayout: true,
            }}
            theme="vs-light"
            />
        </div>
    </div>
  );
};

export default EditorComponent;