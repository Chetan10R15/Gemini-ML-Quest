import { CodeAssignment } from '../types';

export const CODE_ASSIGNMENTS: CodeAssignment[] = [
  {
    id: "1_3",
    zoneId: 1,
    missionId: 3,
    title: "The Line of Truth",
    storyContext: "The underfitter slug refuses to acknowledge the trend. Hit it with a perfectly fitted line constraint.",
    difficulty: "intermediate",
    guidedTemplate: `def fit_line(x, y):\n    # Calculate slope (m) and intercept (b)\n    m = ___\n    b = ___\n    return m, b`,
    freePrompt: `Write a function fit_line(x, y) that returns the slope (m) and intercept (b) of a simple linear regression using numpy.`,
    solutionCode: `def fit_line(x, y):\n    m, b = np.polyfit(x, y, 1)\n    return m, b`,
    testCases: [{ input: "fit_line([1,2,3], [1,2,3])", expected: "(1.0, 0.0)" }],
    visualization: "scatter_line",
    xpGuided: 50,
    xpFree: 100,
    damageGuided: 80,
    damageFree: 160
  }
];
