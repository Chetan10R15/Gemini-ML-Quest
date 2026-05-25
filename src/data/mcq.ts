export const MCQ_QUESTIONS = [
  {
    id: 1,
    question: "What does MSE stand for in regression?",
    options: ["Mean Squared Error", "Median Standard Error", "Multiple Simple Equations", "Model Structured Entity"],
    correctIndex: 0,
    explanation: "MSE measures the average of the squares of the errors between estimated and actual values."
  },
  {
    id: 2,
    question: "Which algorithm finds the line of best fit?",
    options: ["K-Means", "Linear Regression", "Decision Tree", "Naive Bayes"],
    correctIndex: 1,
    explanation: "Linear Regression fits a straight line that minimizes the distance to the data points."
  },
  {
    id: 3,
    question: "What happens when a model is 'overfitting'?",
    options: ["It performs poorly on training data", "It learns the training data too well, failing on unseen data", "It learns too fast and skips important features", "It becomes too simple"],
    correctIndex: 1,
    explanation: "Overfitting means the model memorized the noise in the training data, losing its ability to generalize to new, unseen data."
  },
  {
    id: 4,
    question: "What is the role of a loss function?",
    options: ["To increase accuracy", "To measure how wrong the model is", "To speed up training", "To add more layers to a neural network"],
    correctIndex: 1,
    explanation: "A loss function calculates the error between the model's predictions and the actual true values."
  }
];
