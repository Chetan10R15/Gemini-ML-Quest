import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerStats } from '../types';

interface GameState {
  playerStats: PlayerStats;
  currentZoneId: number | null;
  currentMonsterId: string | null;
  oracleMessages: { text: string; sender: 'user' | 'oracle' }[];
  addOracleMessage: (msg: { text: string; sender: 'user' | 'oracle' }) => void;
  gainXp: (xp: number) => void;
  takeDamage: (damage: number) => void;
  heal: (amount: number) => void;
}

const INITIAL_STATS: PlayerStats = {
  level: 1,
  xp: 0,
  gold: 0,
  hp: 100,
  maxHp: 100,
  mp: 50,
  maxMp: 50,
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      playerStats: INITIAL_STATS,
      currentZoneId: null,
      currentMonsterId: null,
      oracleMessages: [{ text: "Greetings, Analyst. I am the Oracle. Ask me anything about the Algorithm Realm.", sender: 'oracle' }],
      addOracleMessage: (msg) => set((state) => ({ oracleMessages: [...state.oracleMessages, msg] })),
      gainXp: (xp) => set((state) => {
        let newXp = state.playerStats.xp + xp;
        let newLevel = state.playerStats.level;
        if (newXp >= newLevel * 100) {
          newXp -= newLevel * 100;
          newLevel++;
        }
        return {
          playerStats: {
            ...state.playerStats,
            xp: newXp,
            level: newLevel,
          }
        };
      }),
      takeDamage: (damage) => set((state) => ({
        playerStats: {
          ...state.playerStats,
          hp: Math.max(0, state.playerStats.hp - damage)
        }
      })),
      heal: (amount) => set((state) => ({
        playerStats: {
          ...state.playerStats,
          hp: Math.min(state.playerStats.maxHp, state.playerStats.hp + amount)
        }
      })),
    }),
    {
      name: 'geminiquest-storage',
    }
  )
);
