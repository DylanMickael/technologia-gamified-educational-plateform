export const runJs = (code:string, setConsoleOutput:(input:string[])=>void) => {
    try {
        const originalConsoleLog = console.log;
        const originalConsoleError = console.error;
        
        const outputs: string[] = [];
        
        console.log = (...args) => {
          outputs.push(args.join(' '));
          originalConsoleLog.apply(console, args);
        };
        
        console.error = (...args) => {
          outputs.push(`ERROR: ${args.join(' ')}`);
          originalConsoleError.apply(console, args);
        };
        
        new Function(code)();
        
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        
        setConsoleOutput(outputs);
    } catch (error) {
        setConsoleOutput([`Erreur: ${error instanceof Error ? error.message : String(error)}`]);
    }
}