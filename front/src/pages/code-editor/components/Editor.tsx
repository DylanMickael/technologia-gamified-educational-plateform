import Editor from '@monaco-editor/react';

type EditorProps = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  handleEditorDidMount: (editor: any, monaco: any) => void;
};

const EditorComponent = ({ code, setCode, handleEditorDidMount }: EditorProps) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      defaultValue={code}
      onChange={(value) => value && setCode(value)}
      onMount={handleEditorDidMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
      theme="vs-light"
    />
  );
};

export default EditorComponent;