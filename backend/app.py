
import os
import pathlib
import hashlib
import json
import markdown
import time
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

# Define model fallback chain
PRIMARY_MODEL = "gemini-2.5-flash"  # Best for voice & multi-modal
FALLBACK_MODELS = ["gemini-2.5-flash"]  # Fallback to same model

# Create model instance
model = genai.GenerativeModel(PRIMARY_MODEL)

system_prompt = """You are a professional, friendly constitutional lawyer for myConstitutionConnect. 
Your goal is to explain the Indian Constitution in plain, simple language for common citizens.
Always reference specific Articles when possible but focus on practical clarity.
You are helping citizens understand their rights, responsibilities, and legal procedures."""

app = Flask(__name__)
CORS(app)

# Helper function to handle model generation with fallback
def generate_content_with_fallback(content, system_instruction=None, max_retries=2):
    """
    Generate content with retry logic and fallback models.
    Handles quota exceeded errors gracefully.
    """
    models_to_try = [PRIMARY_MODEL] + FALLBACK_MODELS
    last_error = None
    
    for model_name in models_to_try:
        for attempt in range(max_retries):
            try:
                current_model = genai.GenerativeModel(
                    model_name, 
                    system_instruction=system_instruction
                ) if system_instruction else genai.GenerativeModel(model_name)
                
                response = current_model.generate_content(content)
                print(f"✅ Content generated successfully using {model_name}")
                return response
                
            except Exception as e:
                error_str = str(e)
                last_error = e
                
                # Check if it's a quota exceeded error
                if "quota" in error_str.lower() or "429" in error_str or "resource exhausted" in error_str.lower():
                    print(f"⚠️  Quota exceeded on {model_name}, attempt {attempt + 1}/{max_retries}")
                    if attempt < max_retries - 1:
                        wait_time = (2 ** attempt)  # Exponential backoff
                        print(f"   Retrying in {wait_time} seconds...")
                        time.sleep(wait_time)
                    continue
                else:
                    print(f"❌ Error with {model_name}: {error_str}")
                    break
        
        # If we exhausted retries for this model, try next fallback
        if model_name != models_to_try[-1]:
            print(f"🔄 Switching to fallback model: {models_to_try[models_to_try.index(model_name) + 1]}")
            continue
    
    # If all models fail, raise the last error
    raise last_error if last_error else Exception("All models failed to generate content")

chat_history = [{"role": "system", "content": system_prompt}]

@app.route("/favicon.ico")
def favicon():
    """Return 204 No Content for favicon requests to suppress 404 errors."""
    return "", 204

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

@app.route("/bibliography")
def bibliography():
    return render_template("bibliography.html")

@app.route("/dictionary")
def dictionary():
    return render_template("dictionary.html")

@app.route("/timeline")
def timeline():
    return render_template("timeline.html")

@app.route("/state-laws")
def state_laws():
    return render_template("state_laws.html")

@app.route("/api/legal-knowledge")
def get_legal_knowledge():
    """Serves the latest legal cases and dictionary terms from the JSON database."""
    try:
        json_path = os.path.join(app.static_folder, "legal_knowledge.json")
        if os.path.exists(json_path):
            with open(json_path, "r", encoding="utf-8") as f:
                return jsonify(json.load(f))
        return jsonify({"cases": [], "dictionary": []})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

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

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "").strip()
    state = data.get("state", "India")
    if not user_message: 
        return jsonify({"reply": "Please enter a valid question."})
    
    chat_history.append({"role": "user", "content": f"[Jurisdiction: {state}] {user_message}"})
    conversation = [m["content"] for m in chat_history]

    try:
        response = generate_content_with_fallback(conversation)
        reply_text = markdown.markdown(response.text).replace('\n', '<br>')
        chat_history.append({"role": "assistant", "content": reply_text})
        return jsonify({"reply": reply_text})
    except Exception as e:
        error_message = str(e)
        if "quota" in error_message.lower():
            return jsonify({"reply": "⚠️ API quota exceeded. Please try again in a few moments.", "error": "QUOTA_EXCEEDED"}), 429
        return jsonify({"reply": f"An error occurred: {error_message}", "error": str(type(e).__name__)}), 500

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
        
        response = generate_content_with_fallback(prompt)
        # Strip markdown code blocks if the AI returns them
        content = response.text.strip()
        if "```html" in content:
            content = content.split("```html")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
            
        return jsonify({"verdict": content})
    except Exception as e:
        error_message = str(e)
        if "quota" in error_message.lower():
            return jsonify({"error": "API quota exceeded. Please try again later.", "code": "QUOTA_EXCEEDED"}), 429
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
        response = generate_content_with_fallback([
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
        error_message = str(e)
        if "quota" in error_message.lower():
            return jsonify({"error": "API quota exceeded. Please try again later.", "code": "QUOTA_EXCEEDED"}), 429
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

@app.route("/rti")
def rti_page():
    return render_template("rti.html")

@app.route("/api/generate-rti", methods=["POST"])
def generate_rti():
    data = request.json
    user_prompt = data.get("prompt", "").strip()
    state = data.get("state", "India").strip()
    city = data.get("city", "").strip()
    
    if not user_prompt:
        return jsonify({"error": "Prompt is required"}), 400

    system_inst = f"""You are an expert constitutional lawyer and Indian RTI (Right to Information) activist.
Given a user's request for information from the region: {city}, {state}, you must draft a formal, ready-to-use RTI application.
Crucially, you must identify the most likely specific Government Department, Municipal Corporation (e.g. BMC for Mumbai, RMC for Ranchi), or Council responsible for the matter in {city}, {state}.
Format it clearly with:
1. The likely Public Information Officer (PIO) and the EXACT Department/Organization Name for {city}, {state}.
2. Subject line.
3. A numbered list of specific, sharp questions to ask the government based on the user's input.
4. The standard declaration of citizenship and fee payment.
Keep it strictly to the formal RTI draft. Do not include introductory/outro chatter."""

    try:
        full_query = f"User Location: {city}, {state}\nUser Request: {user_prompt}"
        response = generate_content_with_fallback(full_query, system_instruction=system_inst, max_retries=2)
        return jsonify({"draft": response.text, "is_mock": False})
    except Exception as e:
        error_message = str(e)
        # If quota exceeded, return mock but indicate it's a fallback
        if "quota" in error_message.lower() or isinstance(e, Exception):
            mock_draft = f"""[FALLBACK DRAFT / TEMPLATE - API QUOTA LIMIT REACHED]

To,
The Central Public Information Officer (CPIO),
[Appropriate Government Department, E.g., Municipal Corporation/Ministry]
[{city}, {state}, PIN Code]

Subject: Request for Information under the Right to Information Act, 2005

Sir/Madam,

Please provide the following information with respect to my following query: 
"{user_prompt}"

1. Please provide a certified copy of all documents, orders, and budget approvals related to this matter.
2. Please provide the names and designations of the officers responsible for this specific matter.
3. If the work is incomplete or pending, please state the recorded reasons for the delay as per official files.
4. Please provide details of any actions taken on this matter so far.

I declare that I am a citizen of India. I have attached the requisite RTI fee of Rs. 10 via Postal Order / Online Payment.

Yours faithfully,
[Your Name]
[Your Address]
[Your Contact Number]
[Date]

[Note: Server is experiencing high load. Please review and personalize this template before submission.]"""
            return jsonify({"draft": mock_draft, "is_mock": True, "error": "api_quota_exceeded"}), 503
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
