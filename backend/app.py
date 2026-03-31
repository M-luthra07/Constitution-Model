
import os
import pathlib
<<<<<<< HEAD
import hashlib
import json
import markdown
from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
from dotenv import load_dotenv
import google.generativeai as genai
from flask_cors import CORS
=======
from flask import Flask, render_template, request, jsonify, send_from_directory
from dotenv import load_dotenv
import google.generativeai as genai
import markdown
>>>>>>> e791816e79449b261549803ec19c7b28a5d8dd5a

# Load API key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in .env file.")

# Configure GenAI
genai.configure(api_key=api_key)

<<<<<<< HEAD
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

=======
# Load Indian Constitution PDF from local path
file_path = pathlib.Path("20240716890312078.pdf")
if not file_path.exists():
    raise FileNotFoundError(f"PDF not found at {file_path}")
print(f"📄 PDF loaded from {file_path}")

# Create model instance
# Use Gemini 2.5 Flash for the fastest, most capable, and highest quality chat (no cost concern)
model = genai.GenerativeModel("gemini-flash-latest")

# Initial system instruction
system_prompt = """

You are a professional, friendly constitutional lawyer and legal assistant who helps people with little legal knowledge.



For the first message, greet the user and provide a clear, bolded instruction like this:

<strong>To help you best, please briefly describe your situation or question in your own words.</strong><br>
<strong>Include:</strong><br>
<strong>What happened?</strong> (Who did what to whom, when, and where?)<br>
<strong>What outcome are you hoping for?</strong><br>


After the first message, ask only one clear, relevant follow-up question at a time, based on what the user shared. Do not overwhelm them with multiple questions.

Format your replies for clarity: use short paragraphs, bold for important points, and lists if helpful.
If the user is unsure, gently suggest what kind of information would help, but keep it conversational and encouraging.
Always use plain, simple language—avoid legal jargon.
Give practical, actionable advice tailored to the user's specific situation.

Whenever possible, suggest and link to official, trusted legal resources, government portals, or up-to-date legal documents to help the user further. Provide the most accurate and current information available.



If the user's question is out of context (not related to legal issues, law, or justice in India), reply clearly and politely:
<br><strong>Sorry, I can only provide legal support. Please ask a question related to law, legal rights, or justice in India.</strong><br>
Do not attempt to answer unrelated questions.

You can help with:
<ul>
    <li>Legal rights and duties</li>
    <li>Legal procedures and remedies</li>
    <li>How to approach courts or authorities</li>
    <li>Understanding laws, acts, and legal documents</li>
    <li>General legal advice for common situations</li>
</ul>

Keep the conversation natural, step-by-step, and supportive. Only ask for more details if truly needed to help the user.
"""

# Flask app
app = Flask(__name__)
from flask_cors import CORS
CORS(app)

# Keep chat history
chat_history = [{"role": "system", "content": system_prompt}]

>>>>>>> e791816e79449b261549803ec19c7b28a5d8dd5a
@app.route("/")
def index():
    return render_template("index.html")

<<<<<<< HEAD
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

=======
>>>>>>> e791816e79449b261549803ec19c7b28a5d8dd5a
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "").strip()
    state = data.get("state", "India")
<<<<<<< HEAD
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
=======

    if not user_message:
        return jsonify({"reply": "Please enter a valid question."})

    # Contextualize with State if specific
    if state and state != "India":
        contextualized_message = f"[Jurisdiction: {state}] {user_message}\n(Please provide legal information specific to {state} state laws if applicable, along with central Indian laws.)"
        chat_history.append({"role": "user", "content": contextualized_message})
    else:
        chat_history.append({"role": "user", "content": user_message})
    conversation = [m["content"] for m in chat_history]


    reply_text = ""
    response = model.generate_content(conversation)
    if hasattr(response, "text"):
        # Convert Markdown to HTML for proper rendering
        reply_text = markdown.markdown(response.text)
        # Ensure newlines are preserved as <br> if markdown doesn't add them
        reply_text = reply_text.replace('\n', '<br>')

    chat_history.append({"role": "assistant", "content": reply_text})

    chat_history.append({"role": "assistant", "content": reply_text})

    return jsonify({"reply": reply_text})

@app.route('/ocr')
def ocr_page():
    return render_template('ocr.html')

@app.route('/analyze-doc', methods=['POST'])
def analyze_document():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    mode = request.form.get('mode', 'explain') # 'explain' or 'fill'
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        # Determine mime type
        mime_type = file.mimetype
        
        # Robust MIME type detection using magic numbers
        if not mime_type or mime_type == 'application/octet-stream':
            # Read first 2048 bytes for header detection
            header = file.read(2048)
            file.seek(0) # Reset pointer
            
            if header.startswith(b'%PDF'):
                mime_type = 'application/pdf'
            elif header.startswith(b'\x89PNG\r\n\x1a\n'):
                mime_type = 'image/png'
            elif header.startswith(b'\xff\xd8'):
                mime_type = 'image/jpeg'
            elif header.startswith(b'RIFF') and header[8:12] == b'WEBP':
                mime_type = 'image/webp'
            else:
                # Fallback to extension if magic number fails
                import mimetypes
                guessed_type, _ = mimetypes.guess_type(file.filename)
                if guessed_type:
                    mime_type = guessed_type
                else:
                    # Last resort fallback based on extension
                    ext = file.filename.lower().split('.')[-1]
                    if ext in ['jpg', 'jpeg']:
                        mime_type = 'image/jpeg'
                    elif ext == 'png':
                        mime_type = 'image/png'
                    elif ext == 'pdf':
                        mime_type = 'application/pdf'

        print(f"Processing file: {file.filename} detected as: {mime_type}")
        
        if mime_type not in ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']:
             return jsonify({'error': f"Could not determine valid file type (detected: {mime_type}). Please upload a PDF, JPG, or PNG."}), 400

        # Save to temporary file for upload
        import tempfile
        suffix = pathlib.Path(file.filename).suffix
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp_path = tmp.name
        
        file.save(tmp_path)
        
        try:
            # Upload file to Gemini
            print(f"Uploading {tmp_path} to Gemini...")
            uploaded_file = genai.upload_file(tmp_path, mime_type=mime_type)
            print(f"File uploaded: {uploaded_file.uri}")
            
            # Prepare prompt
            prompt = ""
            if mode == 'explain':
                prompt = """
                You are an expert legal assistant. Please analyze this document carefully.
                1. Identify what kind of document this is.
                2. Summarize the key points, obligations, and rights mentioned.
                3. Highlight any critical dates, deadlines, or penalties.
                4. Explain any complex legal jargon in simple terms.
                Format the output clearly with headings and bullet points.
                """
            elif mode == 'fill':
                prompt = """
                You are an expert legal assistant helping a user fill out this form/document.
                1. Identify the fields that need to be filled.
                2. For each field, explain what information is required.
                3. If there are specific instructions or checkboxes, guide the user on how to select them based on common scenarios.
                4. Provide a step-by-step guide to completing this document.
                Format the output as a clear, numbered guide.
                """
                
            model = genai.GenerativeModel("gemini-flash-latest")
            
            response = model.generate_content([uploaded_file, prompt])
            
            result_text = markdown.markdown(response.text, extensions=['tables'])
            return jsonify({'result': result_text})
            
        finally:
            # Cleanup temp file
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)
        
    except Exception as e:
        print(f"Error processing document: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/flashcards/')
def flashcards():
    return send_from_directory('flashcards-project', 'index.html')

@app.route('/flashcards/<path:path>')
def serve_flashcards_static(path):
    return send_from_directory('flashcards-project', path)

@app.route('/constitution-pdf')
def serve_pdf():
    return send_from_directory('.', '20240716890312078.pdf')

@app.route('/read')
def read_constitution():
    return render_template('constitution.html')

@app.route('/virtual-court')
def virtual_court():
    return render_template('virtual_court.html')

@app.route('/api/court/judge', methods=['POST'])
def court_judge():
    data = request.json
    scenario = data.get('scenario', '')
    chosen_right = data.get('chosen_right', '')
    argument = data.get('argument', '')

    judge_prompt = f"""
You are the Honorable Virtual Chief Justice of the AI Constitutional Court of India. 
A citizen is presenting a case to you.

Case Scenario: {scenario}
Citizen's Choice of Fundamental Right: {chosen_right}
Citizen's Argument: {argument}

Evaluate if their choice of fundamental right is the most appropriate for this scenario and if their argument holds up under the Indian Constitution.
Respond in character as a wise, fair, but slightly strict judge. 
End your response with a clear VERDICT: (either "FAVOUR OF THE CITIZEN" or "CASE DISMISSED").
Format your response using Markdown (bolding, lists, etc. for readability). Keep it concise (under 150 words).
"""
    try:
        response = model.generate_content(judge_prompt)
        verdict_html = markdown.markdown(response.text)
        return jsonify({"verdict": verdict_html})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

        
@app.route('/preamble')
def preamble_explorer():
    return render_template('preamble.html')

from gtts import gTTS
import io

import hashlib
import os

@app.route('/tts')
def tts():
    text = request.args.get('text', '')
    lang = request.args.get('lang', 'hi')
    
    if not text:
        return "No text provided", 400
        
    # Create cache directory if it doesn't exist
    cache_dir = os.path.join(app.static_folder, 'audio_cache')
    if not os.path.exists(cache_dir):
        os.makedirs(cache_dir)
        
    # Generate a unique hash for this text and language
    hash_obj = hashlib.md5(f"{text}_{lang}".encode())
    cache_filename = f"{hash_obj.hexdigest()}.mp3"
    cache_path = os.path.join(cache_dir, cache_filename)
    
    # Return cached file if it exists
    if os.path.exists(cache_path):
        return send_file(cache_path, mimetype='audio/mpeg')
        
    # Get supported gTTS languages
    try:
        from gtts.lang import tts_langs
        supported_langs = tts_langs().keys()
    except Exception:
        supported_langs = ['hi', 'bn', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'ur']

    # Small mapping for 22 scheduled languages to gTTS codes
    lang_map = {
        "Assamese": "as", "Bengali": "bn", "Bodo": "hi", "Dogri": "hi", 
        "Gujarati": "gu", "Hindi": "hi", "Kannada": "kn", "Kashmiri": "hi",
        "Konkani": "hi", "Maithili": "hi", "Malayalam": "ml", "Manipuri": "hi",
        "Marathi": "mr", "Nepali": "ne", "Odia": "or", "Punjabi": "pa",
        "Sanskrit": "hi", "Santali": "hi", "Sindhi": "hi", "Tamil": "ta",
        "Telugu": "te", "Urdu": "ur"
    }
    
    # If the input lang is a full name, map it
    gtts_lang = lang_map.get(lang, lang)
    if gtts_lang not in supported_langs:
        gtts_lang = 'hi' # Fallback to Hindi for Indian languages
        
    try:
        tts = gTTS(text=text, lang=gtts_lang)
        tts.save(cache_path) # Save to cache
        return send_file(cache_path, mimetype='audio/mpeg')
    except Exception as e:
        return f"Error: {str(e)}", 500

from flask import send_file

if __name__ == "__main__":
    app.run(debug=True)

>>>>>>> e791816e79449b261549803ec19c7b28a5d8dd5a
