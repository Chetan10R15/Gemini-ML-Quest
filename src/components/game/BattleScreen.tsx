import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Monster } from '../../types';
import { Code, Sword, Brain, Activity, ShieldAlert, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import CodeArena from '../codelab/CodeArena';
import { MCQ_QUESTIONS } from '../../data/mcq';
import { CODE_ASSIGNMENTS } from '../../data/codeAssignments';

interface BattleScreenProps {
  mission: any; // using any for quick proto or import Mission
  onFlee: () => void;
}

export default function BattleScreen({ mission, onFlee }: BattleScreenProps) {
  const { playerStats, takeDamage, gainXp, heal } = useGameStore();
  const [monsterHp, setMonsterHp] = useState(100);
  const [maxMonsterHp, setMaxMonsterHp] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>(["You encountered " + mission.name + "! Prepare for combat."]);
  
  const [currentQuestion, setCurrentQuestion] = useState(MCQ_QUESTIONS[0]);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isGeneratingNext, setIsGeneratingNext] = useState(false);

  const fetchNextQuestion = async () => {
    setIsGeneratingNext(true);
    try {
      const res = await fetch('/api/generateMCQ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: mission.description,
          playerLevel: playerStats.level
        })
      });
      const data = await res.json();
      if (data && data.options) {
        setCurrentQuestion(data);
      } else {
        // Fallback to local
        setCurrentQuestion(MCQ_QUESTIONS[Math.floor(Math.random() * MCQ_QUESTIONS.length)]);
      }
    } catch (e) {
       setCurrentQuestion(MCQ_QUESTIONS[Math.floor(Math.random() * MCQ_QUESTIONS.length)]);
    } finally {
       setIsGeneratingNext(false);
       setIsAnswering(false);
    }
  };

  React.useEffect(() => {
    if (mission.type === 'mcq') {
       fetchNextQuestion();
    }
  }, [mission]);

  const logMessage = (msg: string) => {
    setBattleLog(prev => [...prev, msg].slice(-4));
  };

  const handleMCQAnswer = async (selectedIndex: number) => {
    setIsAnswering(true);
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    
    try {
      const res = await fetch('/api/generateBattleTurn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "MCQ Attack",
          isCorrect,
          monsterName: "Rogue Process",
          zone: "Cyber Node",
          algorithmTopic: mission.name,
          playerAnswer: currentQuestion.options[selectedIndex],
          correctAnswer: currentQuestion.options[currentQuestion.correctIndex]
        })
      });
      const data = await res.json();
      if (data.narration) {
        logMessage(data.narration);
      }
    } catch (e) {
      logMessage(isCorrect ? "Correct parameter. Shield compromised." : "Invalid syntax! Connection reset.");
    }

    if (isCorrect) {
      setMonsterHp(prev => Math.max(0, prev - 25)); // Deal damage
      gainXp(10);
    } else {
      takeDamage(15);
    }
    
    // Fetch next after delay
    setTimeout(() => {
      fetchNextQuestion();
    }, 2000);
  };

  const handleCodeSuccess = (damage: number, narration: string) => {
    logMessage(narration);
    setMonsterHp(prev => Math.max(0, prev - damage));
    gainXp(50);
  };

  if (monsterHp <= 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[var(--bg-deep)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMEg0MFY0MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-20 [transform:perspective(500px)_rotateX(40deg)] origin-bottom"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse"></div>
        <motion.h2 
           initial={{ opacity: 0, scale: 0.8, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
           className="text-5xl font-display font-bold text-[var(--primary)] mb-4 relative z-10 tracking-[0.2em] uppercase animate-holo-pulse"
        >
           SYSTEM SECURED
        </motion.h2>
        <p className="text-sm font-mono mb-8 text-[var(--text-muted)] uppercase tracking-widest relative z-10">Threat neutralized at node: {mission.name}</p>
        <button onClick={onFlee} className="btn-rpg px-8 py-3 rounded relative z-10">DISCONNECT</button>
      </div>
    );
  }

  if (playerStats.hp <= 0) {
     return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[var(--bg-deep)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMEg0MFY0MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-20 [transform:perspective(500px)_rotateX(40deg)] origin-bottom"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--danger)]/10 rounded-full blur-3xl animate-pulse"></div>
        <motion.h2 
           initial={{ opacity: 0, scale: 0.8, y: -20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
           className="text-5xl font-display font-bold text-[var(--danger)] mb-4 drop-shadow-[0_0_15px_var(--danger)] relative z-10 tracking-[0.2em] uppercase"
        >
           SYSTEM FAILURE
        </motion.h2>
        <p className="text-sm font-mono mb-8 text-[var(--text-muted)] uppercase tracking-widest relative z-10">Critical damage sustained. Reboot required.</p>
        <button onClick={() => { heal(playerStats.maxHp); onFlee(); }} className="btn-rpg px-8 py-3 rounded border border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)]/20 hover:shadow-[0_0_20px_var(--danger)] relative z-10">INITIATE REBOOT</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-deep)]">
      {/* Header / Health Bars */}
      <div className="p-4 flex justify-between items-center bg-[var(--bg-panel)] text-white shadow-[0_0_30px_rgba(14,165,233,0.2)] z-10 border-b border-[var(--bg-border)] shrink-0">
        <div className="w-[40%] flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="font-bold text-sm font-display tracking-widest text-[var(--primary)] text-shadow uppercase">User Node</span>
            <span className="text-xs font-mono text-[var(--hp-bar)]">{playerStats.hp}/{playerStats.maxHp} HP</span>
          </div>
          <div className="h-3 bg-black/80 rounded border border-[var(--bg-border)]/50 p-0.5">
            <div className="h-full bg-[var(--hp-bar)] shadow-[0_0_10px_var(--hp-bar)] transition-all duration-300 rounded-sm" style={{ width: `${(playerStats.hp / playerStats.maxHp) * 100}%` }} />
          </div>
        </div>
        
        <div className="font-display text-2xl text-[var(--bg-border)] font-black tracking-widest mx-4 relative">
          <div className="absolute inset-0 blur-md opacity-50 bg-[var(--bg-border)] rounded-full"></div>
          VS
        </div>

        <div className="w-[40%] flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-xs font-mono text-[var(--danger)]">{monsterHp}/{maxMonsterHp} HP</span>
            <span className="font-bold text-sm font-display tracking-widest text-[var(--danger)] text-shadow uppercase">Rogue Process</span>
          </div>
          <div className="h-3 bg-black/80 rounded border border-[var(--danger)]/50 p-0.5 flex justify-end">
            <div className="h-full bg-[var(--danger)] shadow-[0_0_10px_var(--danger)] transition-all duration-300 transform origin-right rounded-sm" style={{ width: `${(monsterHp / maxMonsterHp) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Main Arena */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Visuals & Log */}
        <div className={`flex flex-col p-6 space-y-6 ${mission.type === 'boss' ? 'w-1/2' : 'w-full max-w-4xl mx-auto'}`}>
          
          <div className="flex-1 panel-rpg p-6 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Holographic grid background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMEg0MFY0MEgwWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGVhNWU5IiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIvPgo8L3N2Zz4=')] opacity-30 [transform:perspective(500px)_rotateX(60deg)] origin-bottom"></div>

            {/* Sprites placeholder */}
            <div className="flex justify-between w-full px-16 items-end mt-12 pb-12 z-10">
               <div className="relative group">
                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-8 bg-[var(--primary)]/20 rounded-[50%] blur-xl animate-pulse"></div>
                 <Activity className="w-28 h-28 text-[var(--primary)] opacity-90 drop-shadow-[0_0_20px_var(--primary)] animate-[bounce_3s_ease-in-out_infinite]" />
               </div>
               <div className="relative">
                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-8 bg-[var(--danger)]/20 rounded-[50%] blur-xl animate-pulse"></div>
                 <ShieldAlert className="w-36 h-36 text-[var(--danger)] opacity-90 drop-shadow-[0_0_25px_var(--danger)] animate-[pulse_2s_infinite]" />
               </div>
            </div>

            {/* Battle Log Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur text-[var(--primary)] p-4 border border-[var(--primary)]/30 font-mono text-sm rounded h-32 overflow-hidden flex flex-col justify-end shadow-[inset_0_0_20px_rgba(14,165,233,0.1)] z-10">
              {battleLog.map((log, i) => (
                <div key={i} className={`${i === battleLog.length - 1 ? 'opacity-100 font-bold' : 'opacity-50'} transition-opacity`}>
                  <span className="text-[var(--danger)] mr-2">&gt;</span>{log}
                </div>
              ))}
            </div>
          </div>

          {/* Action Menu (For MCQ) */}
          {mission.type === 'mcq' && (
            <div className="panel-rpg p-6 flex flex-col border border-[var(--bg-border)]/50">
              <h3 className="font-display text-sm uppercase tracking-widest text-[var(--primary)] font-bold mb-4 flex items-center gap-2 border-b border-[var(--bg-border)]/30 pb-3"><Activity className="w-4 h-4"/> AWAITING INPUT...</h3>
              
              {isGeneratingNext ? (
                 <div className="flex-1 flex flex-col items-center justify-center py-12">
                   <Activity className="w-12 h-12 text-[var(--primary)] animate-pulse mb-4" />
                   <div className="font-mono text-sm text-[var(--primary)] tracking-widest animate-pulse uppercase">Compiling next algorithmic threat...</div>
                 </div>
              ) : (
                <>
                  <div className="font-mono text-[var(--text-primary)] mb-6 text-sm leading-relaxed">
                     {currentQuestion.question}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options?.map((opt, i) => (
                      <button 
                        key={i}
                        disabled={isAnswering}
                        onClick={() => handleMCQAnswer(i)}
                        className="btn-rpg p-4 text-left text-xs font-mono rounded flex items-center justify-between group disabled:opacity-50 overflow-hidden relative"
                      >
                        <div className="absolute inset-0 bg-[var(--primary)]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10">{opt}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--primary)] relative z-10" />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

        </div>

        {/* Right Side - Code Arena (For Boss) */}
        {mission.type === 'boss' && (
          <div className="w-1/2 flex flex-col h-full border-l border-[var(--bg-border)]/50 bg-[var(--bg-panel)] relative">
             <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent opacity-50"></div>
            <CodeArena 
              initialCode={CODE_ASSIGNMENTS[0].guidedTemplate}
              challengeTitle={CODE_ASSIGNMENTS[0].title}
              expectedBehavior={CODE_ASSIGNMENTS[0].storyContext}
              onRunTest={async (code) => {
                const isCorrect = code.includes('np.polyfit');
                if(isCorrect) {
                  handleCodeSuccess(CODE_ASSIGNMENTS[0].damageGuided, "SYSTEM OVERRIDE COMPLETE. Core defenses neutralized.");
                  return { passed: true, damage: CODE_ASSIGNMENTS[0].damageGuided, narration: "Success!" };
                } else {
                  takeDamage(20);
                  logMessage("SYNTAX ERROR. Target retaliation imminent!");
                  return { passed: false, damage: 0, narration: "Execution failed." };
                }
              }}
            />
          </div>
        )}
      </div>

       <button onClick={onFlee} className="absolute top-24 left-6 px-4 py-2 text-[10px] font-mono tracking-widest uppercase border border-[var(--bg-border)] bg-black/80 text-[var(--text-primary)] hover:bg-[var(--danger)]/20 hover:border-[var(--danger)] hover:text-[var(--danger)] transition-all rounded shadow-sm opacity-80 hover:opacity-100 z-10 backdrop-blur flex items-center gap-2">
         Abort Sequence
       </button>
    </div>
  );
}
