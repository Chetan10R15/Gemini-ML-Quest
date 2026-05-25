/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGameStore } from './store/gameStore';
import OracleChat from './components/oracle/OracleChat';
import WorldMap from './components/layout/WorldMap';
import BattleScreen from './components/game/BattleScreen';
import { Sparkles, Play, Code, Sword, SearchCode, Map as MapIcon, Menu, Star, Zap, Gem } from 'lucide-react';
import { Mission } from './types';

import geminiQuestLogo from './assets/images/geminiquest_logo_1779720138281.png';

export default function App() {
  const { playerStats } = useGameStore();
  const [showOracle, setShowOracle] = useState(false);
  const [currentView, setCurrentView] = useState<'map' | 'battle'>('map');
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectMission = (mission: Mission) => {
    setCurrentMission(mission);
    setCurrentView('battle');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="h-screen w-full flex flex-col font-sans overflow-hidden bg-[var(--bg-deep)] text-[var(--text-primary)] relative">
      {toastMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-[var(--bg-panel)] border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded shadow-[0_0_15px_rgba(34,211,238,0.3)] z-50 animate-in fade-in slide-in-from-top-5">
           <span className="font-mono text-sm tracking-widest uppercase">{toastMessage}</span>
        </div>
      )}
      {/* RPG Style Top Header */}
      <header className="h-16 bg-[var(--bg-deep)] border-b border-[var(--bg-border)] text-[var(--text-primary)] flex items-center justify-between px-6 shrink-0 relative z-10 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
        <div className="flex items-center space-x-6">
          <button onClick={() => showToast("System Menu: V1.0 - Modules Offline")} className="text-[var(--primary)] border border-[var(--primary)] px-4 py-1.5 flex items-center gap-2 hover:bg-[var(--primary)]/10 transition-colors bg-[var(--primary)]/5 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            <Menu className="w-4 h-4"/>
            <span className="font-display uppercase tracking-widest font-bold text-xs">MENU</span>
          </button>
          <div className="flex items-center gap-2">
             <Star className="w-5 h-5 text-[var(--primary)] drop-shadow-[0_0_8px_var(--primary)]" />
             <span className="font-display font-medium tracking-wider text-sm">LVL {playerStats.level} MAX</span>
          </div>
          <div className="flex items-center gap-2 opacity-80 border-l border-white/10 pl-6">
             <Zap className="w-5 h-5 text-[var(--gold)] drop-shadow-[0_0_8px_var(--gold)]" />
             <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-4 h-1 bg-[var(--gold)] shadow-[0_0_4px_var(--gold)] skew-x-[-20deg]"></div>
                ))}
             </div>
          </div>
        </div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-20 pointer-events-none">
          <img src={geminiQuestLogo} alt="GeminiQuest Logo" className="h-full w-auto object-contain drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] mix-blend-screen" />
        </div>
        
        <div className="flex space-x-8 items-center font-mono font-medium text-sm tracking-wider">
          <div className="flex items-center gap-2 bg-[var(--bg-panel)] px-3 py-1.5 border border-[var(--bg-border)]/50">
            <div className="w-2 h-2 bg-[var(--hp-bar)] rounded-full shadow-[0_0_8px_var(--hp-bar)] animate-pulse"></div>
            <span className="text-[var(--text-muted)]">XP</span>
            <span className="text-[var(--hp-bar)] text-shadow">{playerStats.xp}</span>
          </div>
          <div className="flex items-center gap-2 bg-[var(--bg-panel)] px-3 py-1.5 border border-[var(--bg-border)]/50">
            <Gem className="w-4 h-4 text-[var(--danger)] drop-shadow-[0_0_8px_var(--danger)]"/>
            <span className="text-[var(--text-muted)]">CREDITS</span>
            <span className="text-[var(--danger)] text-shadow">{playerStats.gold}</span>
          </div>
          <button onClick={() => showToast("Credit Interface Offline")} className="w-8 h-8 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)] flex items-center justify-center font-bold text-xl hover:bg-[var(--primary)]/40 shadow-[0_0_10px_var(--primary)] text-[var(--primary)] transition-all">
             +
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex min-h-0 relative">
        {currentView === 'map' && (
          <WorldMap onSelectMission={handleSelectMission} />
        )}
        
        {currentView === 'battle' && currentMission && (
          <BattleScreen mission={currentMission} onFlee={() => setCurrentView('map')} />
        )}

        {/* Floating Oracle Button for Map View */}
        {currentView === 'map' && (
          <button 
             onClick={() => setShowOracle(true)} 
             className="absolute bottom-6 left-6 p-4 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(192,132,252,0.4)] border border-[var(--oracle)] bg-slate-900/80 hover:bg-[var(--oracle)]/20 transition-all hover:scale-110 group z-30"
          >
             <Sparkles className="w-7 h-7 text-[var(--oracle)] animate-pulse" />
          </button>
        )}
      </main>

      {/* Oracle Drawer */}
      {showOracle && <OracleChat onClose={() => setShowOracle(false)} />}
    </div>
  );
}
