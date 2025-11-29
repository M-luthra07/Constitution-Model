
import os
import pathlib
from flask import Flask, render_template, request, jsonify, send_from_directory
from dotenv import load_dotenv
import google.generativeai as genai
import markdown

# Load API key
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in .env file.")

# Configure GenAI
genai.configure(api_key=api_key)

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

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "").strip()
    state = data.get("state", "India")

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

if __name__ == "__main__":
    app.run(debug=True)

