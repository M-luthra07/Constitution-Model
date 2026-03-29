# 🇮🇳 Constitution Model Suite

A comprehensive legal-tech application blending a **Flask** backend (legal consulting), a **Next.js** frontend (interactive state-by-state laws), and an AI **Voice Bot**.

## 🚀 Full Suite Setup

To launch all components simultaneously:
```bash
python start_app.py
```
This script automatically starts:
- **Port 4000**: React/Next.js (Main UI)
- **Port 5000**: Flask (Legal API/Schemes)
- **Port 8000/8001**: Voice Bot Assistant

---

## 🛠️ Individual Component Setup

### 1. Python Environment (Flask & Voice Bot)
```bash
# Setup virtual environment
python -m venv .venv
.venv\Scripts\activate  # Windows

# Install backend dependencies
pip install -r requirements.txt
pip install -r "voice bot/requirements.txt"
```

### 2. Node.js Environment (Next.js Frontend)
If you see **"Missing script: 'dev'"** or if the frontend fails to start:
```bash
# Step 1: Ensure package.json has the correct scripts and dependencies
# Step 2: Install dependencies
npm install

# Step 3: Run development server
npm run dev
```

---

## 🔧 Troubleshooting "Missing Script" Errors
If your `package.json` gets reset and `npm run dev` doesn't work:
1. Ensure your `package.json` in the root directory contains:
   ```json
   "scripts": {
     "dev": "next dev -p 4000",
     "build": "next build",
     "start": "next start"
   }
   ```
2. Re-install using `npm install`.

---

## 📂 Project Navigation
- **/src/app**: Main React interface (Next.js)
- **/backend**: Flask application logic & API
- **/voice bot**: AI Voice assistant components
- **/flashcards-project**: Gamified legal learning tool

## 🔑 Environment Secrets
Create a `.env` in the root directory:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
```
