import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Sparkles } from 'lucide-react';

interface CodeArenaProps {
  initialCode: string;
  challengeTitle: string;
  expectedBehavior: string;
  onRunTest: (code: string) => Promise<{ passed: boolean; damage: number; narration: string }>;
}

export default function CodeArena({ initialCode, challengeTitle, expectedBehavior, onRunTest }: CodeArenaProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ passed: boolean; damage: number; narration: string } | null>(null);

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);
    try {
      const res = await onRunTest(code);
      setResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-t border-bg-border relative">
      <div className="flex items-center justify-between px-4 py-2 bg-black/40 border-b border-bg-border">
        <h3 className="text-oracle font-mono text-sm tracking-wide">CHALLENGE: {challengeTitle}</h3>
        <button 
          onClick={handleRun} 
          disabled={isRunning}
          className="flex items-center space-x-2 bg-primary hover:bg-primary/80 text-bg-deep px-4 py-1.5 rounded-sm font-semibold tracking-wider font-mono transition-colors disabled:opacity-50"
        >
          {isRunning ? <Sparkles className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          <span>EXECUTE</span>
        </button>
      </div>
      <div className="flex-1 min-h-[300px]">
        <Editor
          height="100%"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'Fira Code',
            padding: { top: 16 }
          }}
        />
      </div>
      {result && (
        <div className={`p-4 font-mono text-sm ${result.passed ? 'bg-primary/20 text-primary' : 'bg-danger/20 text-danger'}`}>
          <div className="font-bold mb-1">
            {result.passed ? 'SUCCESS - TEST PASSED' : 'EXECUTION FAILED'}
          </div>
          <div className="opacity-90">{result.narration}</div>
          {result.damage > 0 && (
            <div className="mt-2 text-gold animate-bounce">
              Dealt {result.damage} DAMAGE!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
