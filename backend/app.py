
import os
import pathlib
import hashlib
import json
import markdown
from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
from dotenv import load_dotenv
import google.generativeai as genai
from flask_cors import CORS

# Load API key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in .env file.")

# Configure GenAI
genai.configure(api_key=api_key)

# Load Indian Constitution PDF (for direct serving)
pdf_path = pathlib.Path("20240716890312078.pdf")
if not pdf_path.exists():
    pdf_path = pathlib.Path("../20240716890312078.pdf")

# Create model instance
model = genai.GenerativeModel("gemini-flash-latest")

system_prompt = """You are a professional, friendly constitutional lawyer for myConstitutionConnect. 
Your goal is to explain the Indian Constitution in plain, simple language for common citizens.
Always reference specific Articles when possible but focus on practical clarity.
You are helping citizens understand their rights, responsibilities, and legal procedures."""

app = Flask(__name__)
CORS(app)

chat_history = [{"role": "system", "content": system_prompt}]

# --- Navigation Routes ---

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/preamble")
def preamble():
    return render_template("preamble.html")

@app.route("/virtual-court")
def virtual_court():
    return render_template("virtual_court.html")

@app.route("/ocr")
def ocr():
    return render_template("ocr.html")

@app.route("/read")
def read():
    return render_template("constitution.html")

@app.route("/flashcards/")
@app.route("/flashcards/<path:path>")
def flashcards(path="index.html"):
    if not path or path == "": path = "index.html"
    return send_from_directory("flashcards-project", path)

@app.route("/constitution-pdf")
def serve_pdf():
    if not pdf_path.exists():
        return "PDF not found", 404
    return send_file(pdf_path)

# --- AI & Tool Endpoints ---

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "").strip()
    state = data.get("state", "India")
    if not user_message: return jsonify({"reply": "Please enter a valid question."})
    
    chat_history.append({"role": "user", "content": f"[Jurisdiction: {state}] {user_message}"})
    conversation = [m["content"] for m in chat_history]

    response = model.generate_content(conversation)
    reply_text = markdown.markdown(response.text).replace('\n', '<br>')
    chat_history.append({"role": "assistant", "content": reply_text})
    return jsonify({"reply": reply_text})

@app.route("/api/court/judge", methods=["POST"])
def court_judge():
    try:
        data = request.json
        scenario = data.get("scenario")
        chosen_right = data.get("chosen_right")
        argument = data.get("argument", "")
        
        prompt = f"""You are a Supreme Court Judge of India. 
        Case: {scenario}
        Chosen Right: {chosen_right}
        Argument: {argument}
        
        Verdict:
        1. Correctness of chosen right application.
        2. Legal explanation with Constitution Articles.
        3. Clear final verdict label (Rights Upheld / Dismissed).
        Keep it formal and authoritative. Return in HTML."""
        
        response = model.generate_content(prompt)
        # Strip markdown code blocks if the AI returns them
        content = response.text.strip()
        if "```html" in content:
            content = content.split("```html")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
            
        return jsonify({"verdict": content}) # Return directly since it's already HTML
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/analyze-doc", methods=["POST"])
def analyze_doc():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file"}), 400
        file = request.files['file']
        mode = request.form.get("mode", "explain")
        
        # Determine mime type (simplified)
        mime_type = "application/pdf" if file.filename.lower().endswith('.pdf') else "image/jpeg"
        # Read file data
        file_data = file.read()
        
        prompt = f"Analyze this legal document. Mode: {mode}. Explain clearly in HTML format, structured with standard legal headers."
        
        # For Gemini flash, we can pass parts as a list.
        # But for simpler multi-modal handling if it expects it:
        response = model.generate_content([
            prompt,
            {"mime_type": mime_type, "data": file_data}
        ])
        
        content = response.text.strip()
        if "```html" in content:
            content = content.split("```html")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
            
        return jsonify({"result": content})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/tts")
def tts():
    try:
        from gtts import gTTS
        text = request.args.get("text", "")
        lang_name = request.args.get("lang", "English")
        
        lang_map = {
            "Assamese": "as", "Bengali": "bn", "Bodo": "hi", "Dogri": "hi", 
            "Gujarati": "gu", "Hindi": "hi", "Kannada": "kn", "Kashmiri": "hi",
            "Konkani": "hi", "Maithili": "hi", "Malayalam": "ml", "Manipuri": "hi",
            "Marathi": "mr", "Nepali": "ne", "Odia": "or", "Punjabi": "pa",
            "Sanskrit": "hi", "Santali": "hi", "Sindhi": "hi", "Tamil": "ta",
            "Telugu": "te", "Urdu": "ur", "English": "en"
        }
        
        cache_dir = os.path.join(app.root_path, 'static', 'audio_cache')
        if not os.path.exists(cache_dir): os.makedirs(cache_dir)
        
        hash_id = hashlib.md5(f"{text}_{lang_name}".encode()).hexdigest()
        cache_path = os.path.join(cache_dir, f"{hash_id}.mp3")
        
        if not os.path.exists(cache_path):
            tts_obj = gTTS(text=text, lang=lang_map.get(lang_name, 'hi'))
            tts_obj.save(cache_path)
            
        return send_file(cache_path)
    except Exception as e:
        return str(e), 500

# --- Schemes API ---

@app.route('/api/schemes')
def get_schemes():
    try:
        json_path = os.path.join(app.root_path, 'static', 'schemes.json')
        if not os.path.exists(json_path):
            json_path = os.path.join(os.path.dirname(app.root_path), 'backend', 'static', 'schemes.json')
            
        with open(json_path, 'r', encoding='utf-8') as f:
            schemes = json.load(f)
        
        state = request.args.get('state', '')
        sector = request.args.get('sector', '')
        
        filtered = schemes
        if state and state != 'All':
            filtered = [s for s in filtered if s.get('state') == state or s.get('state') == 'All']
        if sector and sector != 'All':
            filtered = [s for s in filtered if s.get('sector') == sector]
            
        return jsonify(filtered)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/sync-schemes', methods=['POST'])
def sync_schemes():
    try:
        import subprocess
        import sys
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        result = subprocess.run([sys.executable, "internet_sync.py"], cwd=root_dir, check=True, capture_output=True, text=True)
        
        added_count = 0
        if "Sync Successful:" in result.stdout:
            parts = result.stdout.split("Sync Successful:")[1].split()
            if parts and parts[0].isdigit(): added_count = int(parts[0])
            
        return jsonify({'status': 'success', 'added': added_count, 'message': result.stdout})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
