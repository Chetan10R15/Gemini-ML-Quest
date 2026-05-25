import React, { useState } from 'react';
import { ZONES } from '../../data/zones';
import { Mission } from '../../types';
import { Map, MapPin, Lock, Database, Cpu, Activity, Shield, Settings, Terminal } from 'lucide-react';

export default function WorldMap({ onSelectMission }: { onSelectMission: (mission: Mission) => void }) {
  const currentZone = ZONES[0];
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'database': return <Database className="w-8 h-8 text-[var(--primary)] text-shadow" />;
      case 'cpu': return <Cpu className="w-8 h-8 text-[var(--primary)] text-shadow" />;
      case 'activity': return <Activity className="w-8 h-8 text-[var(--primary)] text-shadow" />;
      case 'shield': return <Shield className="w-8 h-8 text-[var(--primary)] text-shadow" />;
      case 'settings': return <Settings className="w-8 h-8 text-[var(--primary)] text-shadow" />;
      case 'terminal': return <Terminal className="w-8 h-8 text-[var(--danger)] text-shadow" />;
      default: return <MapPin className="w-8 h-8 text-[var(--primary)] text-shadow" />;
    }
  }

  return (
    <div className="flex-1 flex overflow-hidden panel-rpg p-0">
      {/* Map Area */}
      <div className="flex-1 relative bg-[length:60px_60px] bg-[var(--bg-deep)]"
           style={{
             backgroundImage: 'linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)'
           }}>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
           {/* Grid lines connecting nodes */}
           <path d="M 15% 35% L 40% 25% L 50% 60% L 75% 40%" stroke="var(--bg-border)" strokeWidth="2" strokeDasharray="5 5" fill="none" />
           <path d="M 15% 35% L 25% 70%" stroke="var(--bg-border)" strokeWidth="2" strokeDasharray="5 5" fill="none" />
           <path d="M 50% 60% L 70% 75%" stroke="var(--bg-border)" strokeWidth="2" strokeDasharray="5 5" fill="none" />
           
           {/* Pulse rings at nodes */}
           {currentZone.missions?.map(m => (
             <circle key={`pulse-${m.id}`} cx={`${m.x}%`} cy={`${m.y}%`} r="30" stroke="var(--primary)" strokeWidth="1" fill="none" opacity="0.3" className="animate-ping" />
           ))}
        </svg>

        {currentZone.missions?.map((m) => (
          <button 
            key={m.id}
            onClick={() => setSelectedMission(m)}
            className={`absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform ${selectedMission?.id === m.id ? 'scale-125 z-30' : 'z-10'} group`}
            style={{ left: `${m.x}%`, top: `${m.y}%`, perspective: '1000px' }}
          >
            <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform-style-3d group-hover:rotate-y-12 ${
              selectedMission?.id === m.id 
                ? 'bg-[var(--primary)]/20 border-[var(--primary)] shadow-[0_0_30px_var(--primary)] rotate-x-12' 
                : 'bg-[var(--bg-panel)] border-[var(--bg-border)] shadow-[0_0_15px_rgba(14,165,233,0.3)]'
            }`}>
               <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--primary)] animate-spin-slow opacity-50"></div>
               {getIcon(m.icon)}
            </div>
            <span className="mt-3 font-display font-bold text-[10px] bg-[var(--bg-deep)]/90 px-3 py-1 rounded border border-[var(--bg-border)] uppercase tracking-wider shadow-[0_0_10px_rgba(14,165,233,0.5)] text-[var(--primary)] whitespace-nowrap">
              {m.name}
            </span>
          </button>
        ))}
      </div>

      {/* Right Sidebar for Selected Mission */}
      {selectedMission && (
        <div className="w-80 border-l border-[var(--bg-border)] bg-[var(--bg-panel)] flex flex-col shadow-[-15px_0_30px_-5px_rgba(14,165,233,0.2)] z-20 relative backdrop-blur-xl animate-in slide-in-from-right-8 duration-300">
          <div className="p-6 flex-1 flex flex-col items-center">
            <h2 className="text-xl font-display font-bold uppercase text-[var(--primary)] text-center mb-6 drop-shadow-[0_0_8px_var(--primary)]">{selectedMission.name}</h2>
            
            <div className="h-40 w-full rounded border border-[var(--bg-border)] bg-[var(--bg-deep)]/50 mb-6 flex items-center justify-center relative shadow-inner overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/10 to-transparent"></div>
               {/* Hexagon pattern overlay */}
               <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSI0OSIKICB2aWV3Qm94PSIwIDAgMjggNDkiPgogIDxwYXRoIGQ9Ik0xMy45OTggMTQuODc2TDI3LjUzIDdWMTQuODc2TDEzLjk5OCAyMmwtMTMuNTMyLTcuMTI0Vjd6bTEzLjUzMiAxNy4xMjRMMTMuOTk4IDQwVjQ5bDEzLjUzMi03eSBNMTMuOTk4IDQwTDAuNDY2IDMyVjM5LjEyNEwxMy45OTggNDl6IiBmaWxsPSIjMGVhNWU5IiBmaWxsLW9wYWNpdHk9IjAuMSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')]"></div>
               <div className="transform scale-150 group-hover:scale-125 transition-transform duration-700 ease-out">
                 {getIcon(selectedMission.icon)}
               </div>
            </div>
            
            <div className="text-[13px] font-mono text-[var(--text-muted)] mb-6 leading-relaxed text-center px-2">
               {selectedMission.description}
            </div>
            
            <div className="w-full bg-[var(--bg-deep)] p-4 border border-[var(--bg-border)]/50 rounded mb-auto flex justify-between items-center text-xs font-mono uppercase text-shadow">
               <span className="text-[var(--text-muted)]">SYSTEM STATUS</span>
               <span className="text-[var(--primary)] font-bold animate-pulse">ONLINE</span>
            </div>
            
            <button onClick={() => onSelectMission(selectedMission)} className="mt-8 btn-rpg w-full py-4 text-sm flex items-center justify-center space-x-3 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Terminal className="w-4 h-4"/>
              <span>INITIALIZE PROTOCOL</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
