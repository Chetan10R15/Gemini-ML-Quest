import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function OracleChat({ onClose }: { onClose: () => void }) {
  const { oracleMessages, addOracleMessage, currentZoneId, currentMonsterId, playerStats } = useGameStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    addOracleMessage({ text: input, sender: 'user' });
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/oracleChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerQuestion: input,
          currentZone: currentZoneId || 'Unknown',
          currentMonster: currentMonsterId || 'None',
          playerLevel: playerStats.level,
          recentMistakes: []
        })
      });
      const data = await res.json();
      if (data.response) {
        addOracleMessage({ text: data.response, sender: 'oracle' });
      }
    } catch (e) {
      console.error(e);
      addOracleMessage({ text: "My connection to the API is faltering... Please try again later.", sender: 'oracle' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="fixed right-0 top-0 h-full w-96 bg-[var(--bg-panel)] backdrop-blur-xl border-l-[3px] border-[var(--oracle)] shadow-[-20px_0_40px_rgba(192,132,252,0.15)] flex flex-col z-50 overflow-hidden text-[var(--text-primary)] font-sans"
    >
      <div className="p-6 border-b border-[var(--oracle)]/50 bg-[var(--oracle)]/10 flex justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--oracle)]/20 to-transparent"></div>
        <div className="flex items-center space-x-2 text-[var(--oracle)] font-display uppercase tracking-widest font-bold text-shadow relative z-10">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>Oracle Interface</span>
        </div>
        <button onClick={onClose} className="text-[var(--oracle)] hover:text-white transition-colors hover:scale-110 font-bold text-xl relative z-10">&times;</button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm bg-[var(--bg-deep)]/80 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMEg0MFY0MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzA4NGZjIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-30"></div>
        <AnimatePresence>
          {oracleMessages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`p-4 rounded border relative z-10 ${msg.sender === 'oracle' ? 'bg-[var(--bg-panel)] border-[var(--oracle)] text-[var(--oracle)] shadow-[0_0_15px_rgba(192,132,252,0.1)] ml-2' : 'bg-[var(--primary)]/10 border-[var(--primary)] text-[var(--primary)] shadow-[0_0_15px_rgba(34,211,238,0.1)] self-end ml-auto mr-2'} max-w-[85%]`}
              style={{ paddingLeft: '1rem', borderLeftWidth: '3px' }}
            >
              {msg.text}
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="p-4 rounded border-l-[3px] border-[var(--oracle)] text-[var(--oracle)] max-w-[85%] bg-[var(--bg-panel)] flex items-center space-x-3 shadow-[0_0_15px_rgba(192,132,252,0.2)] ml-2 z-10 relative"
            >
              <Sparkles className="w-5 h-5 animate-spin" />
              <span className="animate-pulse">Accessing neural net...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 border-t border-[var(--oracle)]/50 bg-[var(--bg-panel)] z-10">
        <div className="flex bg-black/50 rounded border border-[var(--bg-border)]/50 hover:border-[var(--oracle)] focus-within:border-[var(--oracle)] focus-within:shadow-[0_0_15px_rgba(192,132,252,0.3)] transition-all overflow-hidden group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query system..."
            className="flex-1 bg-transparent px-4 py-3 outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-mono text-xs tracking-wider uppercase"
          />
          <button onClick={handleSend} disabled={isLoading} className="px-5 border-l border-[var(--bg-border)]/50 group-focus-within:border-[var(--oracle)] bg-[var(--oracle)]/10 hover:bg-[var(--oracle)]/30 text-[var(--oracle)] transition-colors flex items-center justify-center">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
