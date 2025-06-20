import useEditor from '../../../hooks/useEditor';
import Editor from './Editor';
import Console from './Console';
import Actions from './Actions';

const CodeEditor = () => {
  const {code, setCode, consoleOutput, handleEditorDidMount, runCode, clearConsole} = useEditor();

  return (
    <div className='relative px-10 w-full'>
        <Editor code={code} setCode={setCode} handleEditorDidMount={handleEditorDidMount}/>
        <Actions runCode={runCode} clearConsole={clearConsole}/>
        <Console consoleOutput={consoleOutput}/>
    </div>
  );
};

export default CodeEditor;