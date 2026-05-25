import { Monster } from '../types';

export const MONSTERS: Record<string, Monster> = {
  'bias_gremlin': { id: 'bias_gremlin', name: 'The Bias Gremlin', maxHp: 100, hp: 100, topic: 'Descriptive Stats' },
  'variance_phantom': { id: 'variance_phantom', name: 'The Variance Phantom', maxHp: 120, hp: 120, topic: 'Pearson Correlation' },
  'underfitter_slug': { id: 'underfitter_slug', name: 'The Underfitter Slug', maxHp: 150, hp: 150, topic: 'Linear Regression' },
  'overfitting_beast': { id: 'overfitting_beast', name: 'The Overfitting Beast', maxHp: 300, hp: 300, topic: 'Regression Pipeline' },
};
