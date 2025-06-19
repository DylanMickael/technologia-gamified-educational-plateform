import type { editor } from 'monaco-editor';
import { useState, useRef } from 'react';
import { type Monaco } from '@monaco-editor/react';
import { runJs } from '../utils/codeRunner';

const  defaultCode = (
`function activerRobot() {
    alert("Robot activé!");
    console.log("Félicitation ! Vous avez activé votre robot.");
}

// Activer le robot en écrivant 'activerRobot();' pour appeler la fonction
`
);

const useEditor = () => {
  const [code, setCode] = useState<string>(defaultCode);
    const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  
    const handleEditorDidMount = (
      editor: editor.IStandaloneCodeEditor,
      monaco: Monaco
    ) => {
      editorRef.current = editor;
      
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.Latest,
        allowNonTsExtensions: true,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        jsx: monaco.languages.typescript.JsxEmit.React,
        allowJs: true,
      });
    };
  
    const runCode = () => {
        runJs(code, setConsoleOutput);
    };
  
    const clearConsole = () => {
      setConsoleOutput([]);
    };
  
    return {code, setCode, consoleOutput, setConsoleOutput, handleEditorDidMount, runCode, clearConsole}
}

export default useEditor;