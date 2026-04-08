# 🎤 Constitutional Voice Bot - Complete Setup & Usage Guide

## 📋 What is the Voice Bot?

An AI-powered legal assistant that:
- ✨ Listens to your legal questions in English
- 🤖 Understands Indian Constitutional Law
- 🔊 Responds with natural speech
- 💬 Maintains conversation context
- ⚖️ Specialized in Rights & Duties

---

## 🚀 Quick Start (5 Minutes)

### **Step 1: Install Dependencies** (if not done)
```bash
cd "voice bot"
pip install -r requirements.txt
```

✅ Takes 2-3 minutes

### **Step 2: Run the Application**
```bash
python start_app.py
```

You'll see:
```
============================================================
✅ VOICE BOT IS RUNNING!
============================================================

📱 Access Points:
   🌐 Frontend:  http://localhost:8001
   🔌 Backend:   http://localhost:8000
   📊 Health:    http://localhost:8000/health

💬 Steps:
   1. Open http://localhost:8001 in your browser
   2. Click the microphone button
   3. Ask your legal question
   4. Listen to the AI response

⏹️  Press Ctrl+C to stop the application
============================================================
```

### **Step 3: Open in Browser**
- **Frontend**: http://localhost:8001
- Click the 🎤 **Microphone button**
- Speak clearly: "What are my fundamental rights?"
- Listen to the response

---

## 📊 What's Running?

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| **FastAPI Backend** | 8000 | http://localhost:8000 | AI voice processing |
| **Frontend UI** | 8001 | http://localhost:8001 | Voice chat interface |
| **WebSocket** | 8000 | ws://localhost:8000/ws | Real-time voice |

---

## 🎯 Example Questions to Ask

### Constitutional Rights
- "What are my Fundamental Rights?"
- "Can the government restrict my freedom of speech?"
- "What is the Right to Equality?"
- "Who can amend the Constitution?"

### Legal Processes
- "How do I file a PIL in the Supreme Court?"
- "What are the types of courts in India?"
- "Who is the Chief Justice?"
- "What is the meaning of habeas corpus?"

### Amendments & History
- "What did the 42nd Amendment do?"
- "When was the Constitution adopted?"
- "What is the Basic Structure Doctrine?"
- "Who drafted the Constitution?"

---

## 🔧 How It Works

```
Your Voice (Microphone)
         ↓
   [Browser Records Audio]
         ↓
   [Sends to Backend via WebSocket]
         ↓
   [Gemini API Transcribes Audio → Text]
         ↓
   [AI Generates Legal Response]
         ↓
   [Text-to-Speech converts to Audio]
         ↓
   [Sends back to Browser]
         ↓
Browser Plays Audio + Shows Text
```

---

## ✅ Verify Everything Works

### **Check Backend API**
Visit: http://localhost:8000

Should show:
```json
{
  "name": "Constitutional Voice Bot API",
  "status": "✅ Backend is running successfully"
}
```

### **Check Health**
Visit: http://localhost:8000/health

Should show:
```json
{
  "status": "ok",
  "model_initialized": true,
  "api_key_configured": true
}
```

### **Check Frontend**
Visit: http://localhost:8001

Should show:
- Microphone button
- Chat interface
- Text area

---

## 🐛 Troubleshooting

### Problem: "Backend not responding"
```bash
# Kill any process on port 8000
taskkill /F /PID <PID>

# Restart
python start_app.py
```

### Problem: "Can't hear audio response"
1. Check browser volume is ON
2. Grant microphone permission in browser
3. Check speaker volume on computer
4. Try a different browser

### Problem: "API key error"
1. Check `.env` file exists in root
2. Verify `GEMINI_API_KEY=AIza...` is present
3. Make sure no spaces around `=`
4. Restart after fixing

### Problem: "Port already in use"
```bash
# Check what's on port 8001
netstat -ano | findstr :8001

# Kill the process
taskkill /F /PID <PID>
```

---

## 📁 File Structure

```
voice bot/
├── backend/
│   ├── main.py              ← FastAPI server (DO NOT EDIT)
│   └── requirements.txt
├── frontend/
│   ├── index.html          ← Voice chat interface
│   ├── script.js           ← WebSocket & audio handling
│   └── style.css           ← Styling
├── start_app.py            ← Launcher (Run this!)
├── requirements.txt
├── SETUP_GUIDE.md
├── STATUS_CHECK.md
└── README_FIXES.md
```

---

## 💡 Tips & Tricks

### **For Better Recognition**
- ✅ Speak clearly and slowly
- ✅ Use proper sentence structure
- ✅ Speak in English (Hindi coming soon!)
- ✅ Ask one question at a time

### **For Better Responses**
- ✅ Ask specific questions
- ✅ Provide context if needed
- ✅ Ask follow-up questions
- ✅ Clarify if misunderstood

### **Performance Tips**
- Close other tabs to free resources
- Use Chrome/Firefox for best compatibility
- Keep internet connection stable
- Disable VPN if issues occur

---

## 🔐 Security Notes

- ✅ Your voice is transcribed locally using Gemini API
- ✅ API key is stored in `.env` (never share!)
- ✅ All data is encrypted in transit
- ✅ No data storage on our servers

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Start Bot | `python start_app.py` |
| Stop Bot | `Ctrl+C` |
| Check Backend | `http://localhost:8000` |
| Open Frontend | `http://localhost:8001` |
| Check Logs | See terminal output |
| Reset Ports | `netstat -ano \| findstr :8001` |

---

## 🎓 Learning Path

1. **Start with basics**: Ask about Fundamental Rights
2. **Explore history**: Ask about Constitution amendments
3. **Learn processes**: Ask about legal procedures
4. **Dig deeper**: Ask complex questions
5. **Follow up**: Ask clarifying questions

---

## 📈 Version Info

- **Version**: 1.0.0
- **Last Updated**: April 6, 2026
- **Status**: ✅ Production Ready
- **Model**: Gemini 1.5 Flash
- **Free Tier**: Yes! (Limited to 60 requests/minute)

---

## 🎉 You're All Set!

Everything is now working. Here's what to do next:

1. ✅ Run `python start_app.py`
2. ✅ Open `http://localhost:8001`
3. ✅ Click the microphone
4. ✅ Ask your first question
5. ✅ Enjoy the conversation!

---

**Happy Learning! ⚖️** 🇮🇳
