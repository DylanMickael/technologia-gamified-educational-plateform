import Editor from './components/Editor';
import Console from './components/Console';
import Actions from './components/Actions';
import useEditor from '../../hooks/useEditor';

const CodeEditor = () => {
  const {code, setCode, consoleOutput, handleEditorDidMount, runCode, clearConsole} = useEditor();

  return (
    <div className="flex flex-col h-screen">
      <Editor code={code} setCode={setCode} handleEditorDidMount={handleEditorDidMount}/>
      <Actions runCode={runCode} clearConsole={clearConsole}/>
      <Console consoleOutput={consoleOutput}/>
    </div>
  );
};

export default CodeEditor;