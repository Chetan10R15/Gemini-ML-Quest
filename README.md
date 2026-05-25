# 🎮 GeminiQuest — AI/ML Learning Action RPG

> **Learn Machine Learning by defeating monsters. Code spells. Consult the Oracle.**

## 📌 Table of Contents

- [What is GeminiQuest?](#-what-is-geminiquest)
- [The Problem It Solves](#-the-problem-it-solves)
- [Built With Google AI Studio](#-built-with-google-ai-studio)
- [How Gemini Powers the Game](#-how-gemini-powers-the-game)
- [Game Mechanics](#️-game-mechanics)
- [Tech Stack](#️-tech-stack)
- [Screenshots](#-screenshots)
- [Local Development Setup](#-local-development-setup)
- [Project Structure](#️-project-structure)
- [Firebase Setup](#-firebase-setup)
- [Deployment](#-deployment)
- [Hackathon Submission Info](#-hackathon-submission-info)
- [License](#-license)

---

## 🧠 What is GeminiQuest?

GeminiQuest is a **browser-based Action RPG** that teaches **Machine Learning and Deep Learning** to absolute beginners — no prior math, coding, or ML experience required.

Instead of reading a textbook or watching a passive video, players:

- ⚔️ **Battle AI Monsters** that represent corrupted ML algorithms — defeat them by answering questions correctly
- 🔮 **Consult the Oracle** — a live Gemini AI tutor that answers questions mid-battle, narrates every turn, and adapts its teaching style to each player in real time
- 💻 **Code Spells** — write real Python algorithms inside the game to deal critical hits on enemies
- 🗺️ **Explore 6 Zones** — each zone is a complete ML topic, from Linear Regression to Attention Mechanisms
- 🏆 **Compete on the Leaderboard** — real-time Firebase-powered global rankings updated as you play

---

## 🎯 The Problem It Solves

**AI/ML education has a massive engagement problem.**

- 80%+ of students who start ML courses quit within the first 2 weeks
- The core reasons: concepts feel abstract, feedback is slow, and there's no sense of momentum or reward
- Existing platforms (Coursera, fast.ai, Kaggle) assume background knowledge and offer zero real-time personalised support

**GeminiQuest fixes this with:**
- Gemini-powered explanations that adapt in real time to where the player is stuck
- Instant code feedback — Gemini evaluates submissions and explains errors in the Oracle's voice
- A game loop that turns every concept into a battle won and every algorithm into a power unlocked
- Zero setup — runs entirely in the browser, one Google login away

---

## 🤖 Built With Google AI Studio

GeminiQuest was **designed and prototyped entirely using Google AI Studio** before integration into the web app.

### How Google AI Studio was used:

**1. Prompt Engineering & Iteration**
All Gemini prompts — the Oracle's system instruction, the code evaluator, the battle narration generator, and the adaptive hint system — were written, tested, and refined inside AI Studio's prompt playground before being placed into production code.

**2. System Instruction Design**
AI Studio's system instructions feature defined the Oracle's personality: wise, warm, character-appropriate, and always accurate. The final system prompt was exported directly into the app's Cloud Function.

**3. Multi-Turn Conversation Testing**
The Oracle's chat flow (which retains the player's zone, level, and recent mistakes across a session) was prototyped in AI Studio's chat mode to verify that context is properly maintained before wiring it into the frontend.

**4. Structured JSON Output Validation**
The code evaluation endpoint must return a strict JSON object (damage, narration, feedback, pass/fail). AI Studio was used to stress-test that Gemini 1.5 Pro reliably returns parseable JSON matching the exact schema the app expects — with no extra text or markdown wrapping.

**5. API Key Generation**
The Gemini API key used in production was generated directly from **Google AI Studio → Get API Key**, then stored securely as a Firebase Cloud Function secret.

---

## 🔮 How Gemini Powers the Game

Gemini 1.5 Pro is the **core engine** of GeminiQuest — not a chatbot sidebar bolted on afterwards. Every major interaction in the game runs through a Gemini API call.

### 1. The Oracle — Live AI Tutor
Players open the Oracle panel mid-battle and type any question. Gemini responds in character — aware of the player's current zone, level, and recent mistakes — and explains the concept in plain English with an analogy.

```
Player:  "Why does gradient descent need a learning rate?"

Oracle:  "Imagine rolling a boulder downhill blindfolded.
          The learning rate decides the size of each step.
          Too large — you overshoot the valley and bounce around forever.
          Too small — you inch forward and never reach the bottom.
          The algorithm needs this balance to converge on the
          lowest point of error without spiralling out of control."
```

### 2. Battle Narration Generator
Every battle turn calls Gemini to produce a **unique, story-rich description** — weaving the ML concept naturally into the fantasy narrative. The same battle never reads the same way twice.

### 3. Code Evaluator
When a player submits Python code from the Code Lab, Gemini:
- Judges conceptual correctness — not just whether it runs, but whether it's algorithmically sound
- Returns specific feedback referencing line numbers, in the Oracle's voice
- Generates an RPG narration of the "spell" being cast
- Assigns monster damage proportional to code quality and elegance

### 4. Adaptive Hints
When a player taps the hint button on a specific code blank, Gemini generates a hint calibrated to that exact blank — not a generic tip recycled from a tooltip file.

---

## ⚔️ Game Mechanics

### The 5-Step Mission Flow

Every mission follows this exact sequence:

| Step | Name | What Happens |
|------|------|-------------|
| 1 | 📜 Story Intro | 3–4 comic-strip panels. Pip the Oracle Owl narrates the real-world problem before naming the algorithm. |
| 2 | 🃏 Flashcard Battle | Swipeable deck of 6–8 cards. Front = plain-English question. Back = explanation + analogy. No timer — paced for beginners. |
| 3 | ⚔️ Battle Round | Monster appears. Answer 5 MCQs to deal damage. Wrong answers = monster counterattacks. Gemini narrates every turn. |
| 4 | 💻 Code Lab | Solve a Python coding challenge mid-battle for a critical hit. Guided Mode first, Free Mode unlocks after. |
| 5 | 🏆 Victory Screen | XP breakdown, stars earned, coins, new Algorithm Scroll added to your Tome. |

### Combat Actions

| Action | Description |
|--------|-------------|
| ⚔️ **Attack** | Answer an MCQ — correct = damage dealt, wrong = monster counterattacks + Oracle explains why |
| 🧙 **Skill** | Cast a mastered algorithm as a spell — costs MP, deals heavy damage |
| 💻 **Code** | Open Code Arena — solve a Python challenge for a massive critical hit |
| 🔮 **Oracle** | Open live Gemini chat mid-battle — personalised help (costs 10 gold per use) |

### Zones & Learning Curriculum

| Zone | Region | Algorithms & Concepts |
|------|--------|----------------------|
| 1 | 🌾 Prediction Fields | Mean/Stats, Correlation, Linear Regression, MSE/R², Gradient Descent |
| 2 | 🌲 Classification Forest | Sigmoid, Logistic Regression, KNN, Confusion Matrix, Train-Test Split |
| 3 | 🏔️ Decision Mountains | Gini Impurity, Best Split, Decision Trees, Random Forest, Feature Importance |
| 4 | 🌊 Probability Sea | Bayes Theorem, Naive Bayes, K-Means, Elbow Method |
| 5 | ⚡ Neural Caverns | Perceptron, Forward Pass, Backpropagation, Activations, Dropout |
| 6 | 🌌 Deep Sky | 2D Convolution, Pooling, RNN, LSTM, Self-Attention |

### Code Lab — Two Modes

Every mission has one coding challenge, always starting in Guided Mode:

- **Guided Mode** — Python code pre-filled with `___` blanks at key logic points. Each blank has a 💡 Gemini-generated hint on demand.
- **Free Mode** — Blank editor, docstring only. Optional — but awards 2× XP and a "Spell Master" badge for that algorithm.

Code runs **entirely in the browser** via [Pyodide](https://pyodide.org/) — Python compiled to WebAssembly. No backend, no waiting, no setup.

### Progression & Gamification

| Feature | Details |
|---------|---------|
| XP & Levels | 50 levels — Data Apprentice → Algorithm Scout → Model Crafter → Neural Knight → Deep Learning Sage |
| Stars per mission | ⭐ Completed · ⭐⭐ Won battle + guided code · ⭐⭐⭐ All above + Free Mode |
| Coins | Earned per action, spent in the Oracle (10 gold/hint) |
| Badges | 9 achievement badges — First Steps, Battle Ready, Spell Caster, 7-Day Streak, Chapter Master, Code Sage, and more |
| Daily Streak | Login + complete 1 mission = streak maintained 🔥 |
| Algorithm Tome | Unlockable reference library — each scroll has plain-English definition, analogy, diagram, and code template |
| Leaderboard | Global XP ranking — real-time via Firebase Firestore |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **AI / LLM** | Gemini 1.5 Pro API |
| **Prompt Design** | Google AI Studio (system instructions, multi-turn testing, JSON schema validation) |
| **Frontend** | React 18 + TypeScript + Vite |
| **Styling** | Tailwind CSS + Framer Motion (animations) |
| **Auth** | Firebase Authentication — Google Sign-In |
| **Database** | Firebase Firestore (player progress, leaderboard, badges) |
| **File Storage** | Firebase Storage (avatars) |
| **Backend / API** | Firebase Cloud Functions (Node.js 20) — Gemini API calls secured server-side |
| **Hosting** | Firebase Hosting |
| **Analytics** | Google Analytics 4 via Firebase |
| **CI/CD** | GitHub Actions → Firebase auto-deploy on push to `main` |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) — VS Code in the browser |
| **Python Runtime** | Pyodide — Python WebAssembly, runs in the browser |
| **Charts / Viz** | Plotly.js — auto-renders after code runs (scatter, loss curve, heatmap, etc.) |
| **State Management** | Zustand |
| **Fonts** | Cinzel (headings), Exo 2 (UI), IM Fell English (story), Fira Code (code) |

---

## 📸 Screenshots

> *(Add after building — place images in `/docs/screenshots/`)*

| Screen | File | Description |
|--------|------|-------------|
| Landing | `01_landing.png` | Animated neural-network background, Google Sign-In |
| World Map | `02_worldmap.png` | 6 illustrated zones with lock/unlock states |
| Battle | `03_battle.png` | Monster sprite, HP bars, 4-action menu, Gemini battle log |
| Oracle | `04_oracle.png` | Side panel — typewriter Gemini response mid-battle |
| Code Lab | `05_codelab.png` | Monaco editor split-screen with Plotly visualization |
| Victory | `06_victory.png` | XP breakdown, stars, Algorithm Scroll unlock animation |
| Leaderboard | `07_leaderboard.png` | Real-time Firebase global ranking |
| Profile | `08_profile.png` | Stats panel, badge wall, activity calendar |

---

## 💻 Local Development Setup

### Prerequisites

- **Node.js 20+** — [nodejs.org](https://nodejs.org/)
- **Firebase CLI** — `npm install -g firebase-tools`
- A **Google account** for Firebase + Gemini
- A **Gemini API key** from [Google AI Studio](https://aistudio.google.com/app/apikey)
- A **Firebase project** — see [Firebase Setup](#-firebase-setup)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/geminiquest.git
cd geminiquest

# 2. Install frontend dependencies
npm install

# 3. Install Cloud Functions dependencies
cd functions && npm install && cd ..

# 4. Copy the environment template and fill in your values
cp .env.example .env.local
# Open .env.local and paste your Firebase config values

# 5. Store your Gemini API key as a Firebase secret (never goes to the client)
firebase functions:secrets:set GEMINI_API_KEY
# Paste your key from AI Studio when prompted

# 6. Start Firebase emulators (auth + firestore + functions)
firebase emulators:start --only auth,firestore,functions

# 7. In a new terminal, start the Vite dev server
npm run dev

# 8. Open http://localhost:5173 in your browser
```

### `.env.example`

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

> ⚠️ `.env.local` is in `.gitignore`. Never commit it. The Gemini API key lives only in Firebase Secrets — it is never sent to the browser.

---

## 🏗️ Project Structure

```
geminiquest/
├── .github/
│   └── workflows/
│       └── firebase-deploy.yml     ← Auto-deploy to Firebase on push to main
├── functions/                      ← Firebase Cloud Functions (Gemini API is here)
│   └── src/
│       ├── index.ts                ← Functions entry point
│       ├── geminiOracle.ts         ← Oracle live chat endpoint
│       ├── evaluateCode.ts         ← Code submission → Gemini evaluation
│       └── generateBattle.ts       ← Battle turn narration generator
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── firebase.ts                 ← Firebase SDK initialisation
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx          ← XP bar, level, HP, coins, streak
│   │   │   └── WorldMap.tsx        ← Illustrated zone map
│   │   ├── game/
│   │   │   ├── BattleScreen.tsx    ← Full battle UI orchestrator
│   │   │   ├── MonsterSprite.tsx   ← Animated SVG monster
│   │   │   ├── ActionMenu.tsx      ← Attack / Skill / Code / Oracle buttons
│   │   │   ├── BattleLog.tsx       ← Scrolling Gemini-narrated battle log
│   │   │   └── VictoryScreen.tsx   ← Post-battle results + scroll unlock
│   │   ├── oracle/
│   │   │   ├── OracleChat.tsx      ← Gemini live chat drawer
│   │   │   └── OracleTyping.tsx    ← Typewriter animation component
│   │   ├── codelab/
│   │   │   ├── CodeArena.tsx       ← Monaco editor wrapper
│   │   │   ├── GuidedChallenge.tsx ← Blanks + per-blank hint system
│   │   │   ├── FreeChallenge.tsx   ← Open editor + docstring prompt
│   │   │   ├── TestResults.tsx     ← Pass / fail test case display
│   │   │   └── VizOutput.tsx       ← Plotly auto-visualization panel
│   │   ├── story/
│   │   │   ├── StoryPanel.tsx      ← Comic-strip mission intro panels
│   │   │   └── FlashcardDeck.tsx   ← Swipeable flashcard component
│   │   └── progression/
│   │       ├── LevelUpModal.tsx
│   │       ├── BadgePopup.tsx
│   │       └── XPBar.tsx
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx           ← World map + daily quests
│   │   ├── Mission.tsx             ← 5-step mission flow orchestrator
│   │   ├── Leaderboard.tsx
│   │   └── Profile.tsx
│   ├── hooks/
│   │   ├── useGemini.ts            ← Gemini Cloud Function caller
│   │   ├── useAuth.ts              ← Firebase auth state
│   │   ├── usePlayerStats.ts       ← Firestore real-time listener
│   │   ├── useBattle.ts            ← Battle state machine
│   │   └── useCodeRunner.ts        ← Pyodide execution hook
│   ├── store/
│   │   ├── gameStore.ts            ← Zustand — global game state
│   │   ├── battleStore.ts          ← Battle state
│   │   └── playerStore.ts          ← Player data
│   └── data/
│       ├── zones.ts                ← 6 zone definitions
│       ├── monsters.ts             ← Monster catalog
│       ├── quests.ts               ← All quest content
│       ├── codeAssignments.ts      ← All 36 coding challenges
│       └── flashcards.ts           ← Flashcard content per zone
├── public/
├── firebase.json                   ← Hosting + Functions config
├── firestore.rules                 ← Security rules
├── .env.example
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) → **Add project** → name it `geminiquest`
2. Enable **Google Analytics** when prompted during setup
3. **Authentication** → Sign-in Method → Enable **Google**
4. **Firestore Database** → Create database → choose **Production mode** → select your region
5. **Storage** → Get started (default rules are fine to start)
6. **Project Settings** → Your Apps → **Add app** → choose Web (`</>`) → register app → copy the config object into your `.env.local`
7. Enable **Blaze plan** (pay-as-you-go) — required to deploy Cloud Functions. The free usage tier covers all normal development and demo traffic.

### Deploy security rules

```bash
firebase deploy --only firestore:rules,storage
```

---

## 🚀 Deployment

### Manual deploy

```bash
# Build the React app
npm run build

# Deploy everything — hosting + functions + rules
firebase deploy
```

Your live URL will be:
```
https://geminiquest.web.app
https://geminiquest.firebaseapp.com
```

### Auto-deploy via GitHub Actions

Every push to `main` automatically builds and deploys via `.github/workflows/firebase-deploy.yml`.

**Add these secrets to your GitHub repo** (`Settings → Secrets and variables → Actions`):

| Secret | Where to get it |
|--------|----------------|
| `FIREBASE_SERVICE_ACCOUNT` | Firebase Console → Project Settings → Service Accounts → Generate new private key |
| `FIREBASE_PROJECT_ID` | Firebase Console → Project Settings → General |
| `VITE_FIREBASE_API_KEY` | Firebase Console → Project Settings → Your Apps → Config |
| `VITE_FIREBASE_AUTH_DOMAIN` | Same config object |
| `VITE_FIREBASE_PROJECT_ID` | Same config object |
| `VITE_FIREBASE_STORAGE_BUCKET` | Same config object |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Same config object |
| `VITE_FIREBASE_APP_ID` | Same config object |
| `VITE_FIREBASE_MEASUREMENT_ID` | Same config object |

Push to `main` → GitHub Actions builds → Firebase Hosting deploys → live URL updates automatically.

---

## 🏆 Hackathon Submission Info

**Event:** Build With Gemini AI — 15 Day Build Sprint
**Organizer:** GDG on Campus, IIT Bhilai
**Submission Date:** 25 May 2026
**Participation:** Solo

### How GeminiQuest meets every judging criterion:

| Criterion | Evidence |
|-----------|----------|
| ✅ **Gemini API** | Oracle tutor chat, battle turn narration, Python code evaluation, per-blank adaptive hints — all powered by Gemini 1.5 Pro via Cloud Functions |
| ✅ **Google AI Studio** | All prompts designed, iterated, and validated in AI Studio before production integration; API key from AI Studio |
| ✅ **Firebase** | Auth (Google Sign-In), Firestore (progress + leaderboard), Storage (avatars), Hosting (live URL), Cloud Functions (secure Gemini calls), Analytics |
| ✅ **Real-World Problem** | ML education drop-off — 80%+ quit rate in existing courses |
| ✅ **Functional Prototype** | Complete game loop: sign in → world map → story → flashcards → battle → code → XP → leaderboard |
| ✅ **Live Deployment Link** | [geminiquest.web.app](https://geminiquest.web.app) — accessible instantly, no install needed |
| ✅ **Innovation** | First browser RPG where Gemini simultaneously acts as game master, live tutor, and code evaluator |
| ✅ **Beginner Friendly** | Zero ML background required — Gemini adapts to each player's level in real time |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👤 Author

Built solo for the GDG on Campus IIT Bhilai — Build With Gemini AI Sprint 2026.

---

*"In The Algorithm Realm, knowledge is power. The Oracle awaits."* 🔮
