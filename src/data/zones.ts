import { Zone, Mission } from '../types';
import { MONSTERS } from './monsters';

export const MISSIONS_ZONE_1: Mission[] = [
  { id: 'm1', name: 'Data Synchronization', type: 'mcq', description: 'Synchronize baseline data streams to compute descriptive stats.', x: 15, y: 35, icon: 'database' },
  { id: 'm2', name: 'Algorithm Benchmark', type: 'mcq', description: 'Evaluate linear alignment protocols against rogue variance signatures.', x: 40, y: 25, icon: 'cpu' },
  { id: 'm3', name: 'Stress Test Node', type: 'mcq', description: 'Subject the system to high-velocity theoretical queries.', x: 25, y: 70, icon: 'activity' },
  { id: 'm4', name: 'Security Protocol', type: 'mcq', description: 'Bypass the firewall intrusion countermeasures by predicting boundaries.', x: 50, y: 60, icon: 'shield' },
  { id: 'm5', name: 'Hyperparameter Tuning', type: 'mcq', description: 'Optimize network topology parameters for maximum processing throughput.', x: 70, y: 75, icon: 'settings' },
  { id: 'boss', name: 'Neural Core Override', type: 'boss', description: 'Override the central Overfitting Beast using raw code injection protocols.', x: 75, y: 40, icon: 'terminal' },
];

export const ZONES: Zone[] = [
  {
    id: 1,
    name: "The Prediction Fields",
    description: "A vast grassy plain where the fundamental laws of linear relationships were born.",
    monsters: [MONSTERS['bias_gremlin'], MONSTERS['variance_phantom'], MONSTERS['underfitter_slug']],
    boss: MONSTERS['overfitting_beast'],
    missions: MISSIONS_ZONE_1
  },
  {
    id: 2,
    name: "The Classification Forest",
    description: "Navigate the branching paths of logistic logic and decision boundaries.",
    monsters: [],
    boss: MONSTERS['overfitting_beast'] // Placeholder
  },
  {
    id: 3,
    name: "The Decision Mountains",
    description: "Scale the peaks of information gain, entropy, and optimal splits.",
    monsters: [],
    boss: MONSTERS['overfitting_beast'] // Placeholder
  },
  {
    id: 4,
    name: "The Probability Sea",
    description: "Sail the uncertain waters of Bayes' theorem and clustered archipelagos.",
    monsters: [],
    boss: MONSTERS['overfitting_beast'] // Placeholder
  },
  {
    id: 5,
    name: "The Neural Caverns",
    description: "Delve the deep, connected depths of activation functions and forward passes.",
    monsters: [],
    boss: MONSTERS['overfitting_beast'] // Placeholder
  },
  {
    id: 6,
    name: "The Deep Sky",
    description: "Reach the ultimate frontier of recurrent sequences and convolutional attention.",
    monsters: [],
    boss: MONSTERS['overfitting_beast'] // Placeholder
  }
];
