import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  app.post('/api/oracleChat', async (req, res) => {
    try {
      const { playerQuestion, currentZone, currentMonster, playerLevel, recentMistakes } = req.body;
      const systemContext = `
        You are the Oracle — an ancient, wise, and encouraging AI tutor inside a fantasy RPG game called GeminiQuest.
        The player is currently in Zone: ${currentZone}, battling: ${currentMonster}.
        Player level: ${playerLevel}. Recent mistakes: ${(recentMistakes || []).join(', ')}.
        Speak in character — wise, warm, slightly mystical — but ALWAYS explain the ML concept clearly.
        Keep responses to 3-4 sentences maximum. Use simple analogies. Never use jargon without explaining it.
        If the player is struggling, be extra encouraging and break the concept into a smaller piece.
      `;
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [systemContext, playerQuestion]
      });
      res.json({ response: response.text });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: String(e) });
    }
  });

  app.post('/api/evaluateCode', async (req, res) => {
    try {
      const { playerCode, challengeDescription, expectedBehavior } = req.body;
      const prompt = `
        You are evaluating a student's Python code submission inside an educational RPG game.
        
        Challenge: ${challengeDescription}
        Expected behavior: ${expectedBehavior}
        
        Student's code:
        \`\`\`python
        ${playerCode}
        \`\`\`
        
        Respond ONLY with a JSON object (no markdown, no backticks) with this exact structure:
        {
          "passed": true,
          "damage": 100,
          "battleNarration": "<2-sentence RPG description>",
          "feedbackMessage": "<1-2 sentences feedback>",
          "conceptReinforcement": "<1 sentence connecting to ML concept>"
        }
      `;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      let text = response.text || "{}";
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(text));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: String(e) });
    }
  });

  app.post('/api/generateBattleTurn', async (req, res) => {
    try {
      const { action, isCorrect, monsterName, zone, algorithmTopic, playerAnswer, correctAnswer } = req.body;
      const prompt = `
        Generate a 2-sentence battle narration for a turn in an AI/ML learning RPG.
        
        Monster: ${monsterName} (Zone: ${zone}, Topic: ${algorithmTopic})
        Player action: ${action}
        Was the player correct? ${isCorrect}
        Player answered: "${playerAnswer}"
        Correct answer was: "${correctAnswer}"
        
        Rules:
        - If correct: heroic, exciting, mention the ML concept used correctly
        - If wrong: the monster counterattacks, gently hint at why the answer was wrong
        - Always weave the ML concept naturally into the fantasy narrative
        - Max 2 sentences. Vivid, game-like language.
        
        Return ONLY the narration text, nothing else.
      `;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      res.json({ narration: response.text });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: String(e) });
    }
  });

  app.post('/api/generateMCQ', async (req, res) => {
    try {
      const { topic, difficulty, playerLevel } = req.body;
      const prompt = `
        Generate a multiple choice question about ${topic || "Machine Learning Core Concepts"}.
        The difficulty should be appropriate for a level ${playerLevel || 1} player, difficulty setting: ${difficulty || "normal"}.
        
        Respond ONLY with a JSON object (no markdown, no backticks) with this exact structure:
        {
          "question": "The question text, themed slightly algorithmically or conceptually",
          "options": ["wrong", "wrong", "correct", "wrong"], // 4 options total, randomize correct position
          "correctIndex": 2 // 0-3 index of the correct option
        }
      `;
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });
      let text = response.text || "{}";
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      res.json(JSON.parse(text));
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: String(e) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
