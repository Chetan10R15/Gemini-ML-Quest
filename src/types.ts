export interface PlayerStats {
  level: number;
  xp: number;
  gold: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
}

export interface TestCase {
  input: string;
  expected: string;
}

export interface CodeAssignment {
  id: string;
  zoneId: number;
  missionId: number;
  title: string;
  storyContext: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'boss';
  guidedTemplate: string;
  freePrompt: string;
  solutionCode: string;
  testCases: TestCase[];
  visualization: 'scatter_line' | 'scatter' | 'bar' | 'heatmap' | 'loss_curve' | 'network' | 'tree' | 'none';
  xpGuided: number;
  xpFree: number;
  damageGuided: number;
  damageFree: number;
}

export interface Monster {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  topic: string;
  spriteUrl?: string;
}

export interface Mission {
  id: string;
  name: string;
  type: 'mcq' | 'boss';
  description: string;
  x: number;
  y: number;
  icon: string;
}

export interface Zone {
  id: number;
  name: string;
  description: string;
  monsters: Monster[];
  boss: Monster;
  missions?: Mission[];
}


