import os
import asyncio
import logging
import base64
import io
import time
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv
from gtts import gTTS

# --- Configuration ---
root_env = os.path.join(os.path.dirname(__file__), "..", "..", ".env")
load_dotenv(root_env)
api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

if not api_key:
    logging.error("❌ CRITICAL: No API key found in .env file!")
    logging.error("Please add GEMINI_API_KEY or GOOGLE_API_KEY to the .env file")
    logging.error("Get your key from: https://makersuite.google.com/app/apikey")
else:
    api_key = api_key.strip()  # Remove whitespace
    genai.configure(api_key=api_key)
    logging.info("✅ Gemini SDK configured successfully")

# --- Model Configuration ---
PRIMARY_MODEL = "gemini-2.5-flash"  # Best for voice & audio processing
FALLBACK_MODELS = ["gemini-2.5-flash"]  # Fallback to same model

# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO, 
    format="%(asctime)s - %(levelname)s - %(message)s"
)
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_model_with_fallback(system_instruction=None, max_retries=2):
    """Initialize model with fallback chain."""
    models_to_try = [PRIMARY_MODEL] + FALLBACK_MODELS
    last_error = None
    
    for model_name in models_to_try:
        for attempt in range(max_retries):
            try:
                model = genai.GenerativeModel(
                    model_name,
                    system_instruction=system_instruction if system_instruction else "You are a professional, friendly INDIAN lawyer and legal assistant. Keep responses very concise and accurate."
                )
                logging.info(f"✅ Model initialized: {model_name}")
                return model
            except Exception as e:
                last_error = e
                error_str = str(e)
                
                if "quota" in error_str.lower() or "429" in error_str:
                    logging.warning(f"⚠️  Quota on {model_name}, attempt {attempt + 1}/{max_retries}")
                    if attempt < max_retries - 1:
                        time.sleep(2 ** attempt)
                    continue
                else:
                    logging.warning(f"⚠️  Error initializing {model_name}: {error_str}")
                    break
    
    if model_name != models_to_try[-1]:
        logging.info(f"🔄 Trying fallback model: {models_to_try[models_to_try.index(model_name) + 1]}")
    
    raise last_error if last_error else Exception("All models failed to initialize")

# Using the Gemini model with fallback
try:
    model = get_model_with_fallback("You are a professional, friendly INDIAN lawyer and legal assistant. Keep responses very concise and accurate.")
    logging.info("✅ Primary model ready with fallback chain")
except Exception as e:
    logging.error(f"❌ Failed to initialize any model: {e}")
    model = None

def transcribe_audio(audio_bytes: bytes) -> str:
    """Convert audio bytes to text using Gemini API with fallback."""
    try:
        if not model:
            return "Error: Model not initialized"
        
        models_to_try = [PRIMARY_MODEL] + FALLBACK_MODELS
        last_error = None
        
        for model_name in models_to_try:
            try:
                temp_model = genai.GenerativeModel(model_name)
                audio_part = {"mime_type": "audio/webm", "data": audio_bytes}
                
                response = temp_model.generate_content([
                    "Transcribe exactly what is said and nothing else. If you cannot understand anything, respond with 'EMPTY'.",
                    audio_part
                ])
                
                text = response.text.strip()
                
                if text.upper() == "EMPTY" or not text:
                    logging.warning("Audio transcription returned empty")
                    return ""
                
                logging.info(f"✅ Transcribed using {model_name}: {text[:100]}...")
                return text
                
            except Exception as e:
                last_error = e
                error_msg = str(e)
                
                if "quota" in error_msg.lower() or "429" in error_msg:
                    logging.warning(f"⚠️  Quota on {model_name}, trying fallback...")
                    continue
                elif "404" in error_msg or "not found" in error_msg:
                    logging.warning(f"⚠️  {model_name} not found, trying fallback...")
                    continue
                else:
                    logging.error(f"❌ Transcription error on {model_name}: {error_msg}")
                    break
        
        logging.error(f"❌ All transcription models failed: {last_error}")
        return ""
        
    except Exception as e:
        error_msg = str(e)
        logging.error(f"❌ Transcription error: {error_msg}")
        
        # Provide helpful error messages
        if "404" in error_msg or "not found" in error_msg:
            logging.error("⚠️  Model not found. Check your API key and available models.")
        elif "quota" in error_msg.lower():
            logging.error("⚠️  API quota exceeded. Please wait and try again later.")
        elif "authentication" in error_msg.lower():
            logging.error("⚠️  Authentication failed. Check your API key.")
        
        return ""

def generate_tts_audio(text: str) -> str:
    """Generate TTS audio using gTTS."""
    try:
        if not text or len(text) == 0:
            logging.warning("Empty text provided to TTS")
            return ""
        
        tts = gTTS(text=text, lang='en', tld='co.in', slow=False)
        mp3_buffer = io.BytesIO()
        tts.write_to_fp(mp3_buffer)
        mp3_buffer.seek(0)
        
        audio_b64 = base64.b64encode(mp3_buffer.read()).decode('utf-8')
        logging.info(f"✅ Generated TTS audio ({len(audio_b64)} bytes)")
        return audio_b64
        
    except Exception as e:
        logging.error(f"❌ TTS error: {e}")
        return ""

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    logging.info("🔗 WebSocket connection initiated")
    
    try:
        await websocket.accept()
        logging.info("✅ WebSocket client connected and accepted")
        
        if not model:
            logging.error("❌ Model not initialized!")
            await websocket.send_json({
                "type": "error", 
                "text": "Model initialization failed. Check logs for details."
            })
            await websocket.close()
            return
        
        logging.info("🤖 Creating chat session...")
        try:
            chat = model.start_chat(history=[])
            logging.info("✅ Chat session created")
        except Exception as e:
            logging.error(f"❌ Failed to create chat session: {e}")
            await websocket.send_json({
                "type": "error",
                "text": f"Chat session error: {str(e)}"
            })
            await websocket.close()
            return
        
        # Send greeting
        greet = "Hello! I am your Indian legal assistant. Ask me anything about Indian law, constitutional rights, or legal processes. How can I help you?"
        logging.info("📢 Sending greeting...")
        
        try:
            greet_audio = await asyncio.to_thread(generate_tts_audio, greet)
            await websocket.send_json({
                "type": "greeting", 
                "text": greet, 
                "audio": greet_audio if greet_audio else ""
            })
            logging.info("✅ Greeting sent successfully")
        except Exception as e:
            logging.error(f"❌ Error sending greeting: {e}")
            try:
                await websocket.send_json({
                    "type": "greeting", 
                    "text": greet
                })
            except:
                pass

        # Main chat loop
        logging.info("🔄 Entering main chat loop...")
        while True:
            try:
                logging.info("⏳ Waiting for message from client...")
                message = await websocket.receive()
                logging.info(f"📨 Message received: {list(message.keys())}")
                
                # Handle bytes (audio)
                if "bytes" in message:
                    audio_data = message["bytes"]
                    logging.info(f"🎤 Audio received: {len(audio_data)} bytes")
                    
                    # Transcribe
                    logging.info("🔄 Transcribing audio...")
                    user_text = await asyncio.to_thread(transcribe_audio, audio_data)
                    logging.info(f"📝 Transcribed: '{user_text}'")
                    
                    if not user_text:
                        logging.warning("⚠️ Transcription empty")
                        await websocket.send_json({
                            "type": "error", 
                            "text": "I didn't catch that. Please speak again."
                        })
                        continue
                    
                    # Send transcription
                    await websocket.send_json({
                        "type": "transcription", 
                        "text": user_text
                    })
                    logging.info("✅ Transcription sent")
                
                # Handle text
                elif "text" in message:
                    user_text = message["text"]
                    logging.info(f"📝 Text received: '{user_text}'")
                
                else:
                    logging.warning(f"⚠️ Unknown message type: {list(message.keys())}")
                    continue
                
                # Generate response
                try:
                    logging.info(f"🤖 Generating AI response...")
                    response = chat.send_message(user_text)
                    ai_text = response.text
                    logging.info(f"✅ Response ready: {ai_text[:100]}...")
                    
                    # Generate audio
                    logging.info(f"🔊 Generating TTS audio...")
                    tts_audio = await asyncio.to_thread(generate_tts_audio, ai_text)
                    logging.info(f"✅ Audio ready: {len(tts_audio) if tts_audio else 0} bytes")
                    
                    # Send response
                    logging.info(f"📤 Sending response...")
                    await websocket.send_json({
                        "type": "ai_response",
                        "text": ai_text,
                        "audio": tts_audio if tts_audio else ""
                    })
                    logging.info(f"✅ Response sent successfully!")
                    
                except asyncio.TimeoutError:
                    logging.error("⏱️ Response generation timed out")
                    await websocket.send_json({
                        "type": "error",
                        "text": "Response generation timed out. Please try again."
                    })
                except Exception as e:
                    logging.error(f"❌ Response generation error: {e}", exc_info=True)
                    try:
                        await websocket.send_json({
                            "type": "error",
                            "text": f"Error: {str(e)[:100]}"
                        })
                    except:
                        logging.error("❌ Failed to send error message")
                    
            except WebSocketDisconnect:
                logging.info("👋 WebSocket client disconnected normally")
                break
            except asyncio.CancelledError:
                logging.info("⛔ WebSocket task cancelled")
                break
            except Exception as e:
                logging.error(f"❌ Message loop error: {e}", exc_info=True)
                try:
                    await websocket.send_json({
                        "type": "error",
                        "text": f"Connection error: {str(e)[:100]}"
                    })
                except:
                    break
                    
    except Exception as e:
        logging.error(f"❌ WebSocket connection error: {e}", exc_info=True)
        try:
            await websocket.close()
        except:
            pass

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "model_initialized": model is not None,
        "api_key_present": bool(api_key)
    }

@app.post("/test-transcribe")
async def test_transcribe(file: bytes = None):
    """Test transcription endpoint - for debugging"""
    if not file:
        return {
            "status": "error",
            "message": "No audio file provided",
            "example": "Send audio bytes in request body"
        }
    
    logging.info(f"🧪 Test transcription: {len(file)} bytes received")
    
    try:
        text = await asyncio.to_thread(transcribe_audio, file)
        return {
            "status": "success",
            "transcription": text,
            "bytes_received": len(file)
        }
    except Exception as e:
        logging.error(f"Test transcribe error: {e}")
        return {
            "status": "error",
            "message": str(e)
        }

@app.post("/test-response")
async def test_response(query: str = None):
    """Test response generation - for debugging"""
    if not query:
        return {
            "status": "error",
            "message": "No query provided",
            "example": "POST with ?query=your+question"
        }
    
    logging.info(f"🧪 Test response: {query}")
    
    try:
        if not model:
            return {"status": "error", "message": "Model not initialized"}
        
        chat = model.start_chat()
        response = chat.send_message(query)
        
        # Generate audio
        audio = await asyncio.to_thread(generate_tts_audio, response.text)
        
        return {
            "status": "success",
            "response": response.text,
            "audio_generated": bool(audio),
            "audio_bytes": len(audio) if audio else 0
        }
    except Exception as e:
        logging.error(f"Test response error: {e}")
        return {
            "status": "error",
            "message": str(e)
        }

@app.get("/")
async def root():
    """Root endpoint - API documentation"""
    return {
        "name": "Constitutional Voice Bot API",
        "version": "1.0.0",
        "description": "AI-powered legal assistant with voice capabilities",
        "endpoints": {
            "websocket": "ws://localhost:8000/ws (for voice chat)",
            "health": "GET /health (check server status)",
            "docs": "Visit http://localhost:8001 for the web interface"
        },
        "status": "✅ Backend is running successfully",
        "model": "Gemini-2.5-Flash",
        "model_initialized": model is not None,
        "api_key_configured": bool(api_key),
        "message": "Use the frontend at http://localhost:8001 to interact with the voice bot"
    }

if __name__ == "__main__":
    import uvicorn
    logging.info("🚀 Starting Voice Bot Backend...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
