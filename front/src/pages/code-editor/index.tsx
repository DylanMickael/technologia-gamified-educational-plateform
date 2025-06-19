import useEditor from '../../hooks/useEditor';
import Editor from './components/Editor';
import Console from './components/Console';
import Actions from './components/Actions';
import Sidebar from './components/Sidebar';
import PageHeader from './components/PageHeader';

const CodeEditor = () => {
  const {code, setCode, consoleOutput, handleEditorDidMount, runCode, clearConsole} = useEditor();

  return (
    <div className='relative px-10'>
      <PageHeader/>
      <div className='grid grid-cols-1 md:grid-cols-12'>
        <div className="p-2 md:p-5 col-span-12 md:col-span-9">
          <Editor code={code} setCode={setCode} handleEditorDidMount={handleEditorDidMount}/>
          <Actions runCode={runCode} clearConsole={clearConsole}/>
          <Console consoleOutput={consoleOutput}/>
        </div>
        <div className='col-span-12 md:col-span-3 mt-4 md:mt-0 flex justify-center'>
          <Sidebar/>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;