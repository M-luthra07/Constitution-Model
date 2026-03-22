import os
import asyncio
import logging
import base64
import io
import tempfile
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from dotenv import load_dotenv
import google.generativeai as genai
import speech_recognition as sr
from gtts import gTTS
from pydub import AudioSegment

# --- Configuration ---
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("backend.log"),
        logging.StreamHandler()
    ]
)

# Gemini model setup
model = genai.GenerativeModel(
    "gemini-flash-latest",
    system_instruction='''You are a professional, friendly INDIAN lawyer and legal assistant who helps people with legal knowledge.,
    you are receiving the commands throgh speach to text so some words maybe caught wrong try to decipher the correct meaning from context.
    Your responses must be concise and to the point.
    After the first message, ask only one clear, relevant follow-up question at a time Only if necessary , based on what the user shared. Do not overwhelm them with multiple questions.

Format your replies for clarity
If the user is unsure, gently suggest what kind of information would help, but keep it conversational and encouraging.
Always use plain, simple language—avoid legal jargon.
Give practical, actionable advice tailored to the user's specific situation.

If the user's question is out of context (not related to legal/illegal issues, law, or justice in India), reply clearly and politely:
Sorry, I can only provide legal support. Please ask a question related to law, legal rights, or justice in India.
Do not attempt to answer unrelated questions.

you cannot do any task that is other than providing legal information and advice.

Keep the conversation natural, step-by-step, and supportive. Only ask for more details only if truly needed to help the user or any other contact details. 

'''

    
)

# Speech recognizer instance
recognizer = sr.Recognizer()

app = FastAPI()


def transcribe_audio(audio_bytes: bytes) -> str:
    """Convert audio bytes (WebM/Opus) to text using Google Speech Recognition."""
    try:
        # Convert WebM/Opus to WAV using pydub + ffmpeg
        audio_segment = AudioSegment.from_file(io.BytesIO(audio_bytes), format="webm")
        
        # Export as WAV to a buffer
        wav_buffer = io.BytesIO()
        audio_segment.export(wav_buffer, format="wav")
        wav_buffer.seek(0)
        
        # Use speech_recognition to transcribe
        with sr.AudioFile(wav_buffer) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data, language="en-IN")
            return text
    except sr.UnknownValueError:
        logging.warning("Speech recognition could not understand the audio.")
        return ""
    except sr.RequestError as e:
        logging.error(f"Google Speech Recognition service error: {e}")
        return ""
    except Exception as e:
        logging.error(f"Audio transcription error: {e}", exc_info=True)
        return ""


def generate_tts_audio(text: str) -> str:
    """Generate TTS audio from text and return as base64-encoded MP3."""
    try:
        tts = gTTS(text=text, lang='en', tld='co.in')  # Indian English accent
        mp3_buffer = io.BytesIO()
        tts.write_to_fp(mp3_buffer)
        mp3_buffer.seek(0)
        return base64.b64encode(mp3_buffer.read()).decode('utf-8')
    except Exception as e:
        logging.error(f"TTS generation error: {e}", exc_info=True)
        return ""


# --- WebSocket Endpoint ---
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logging.info("Client connected.")
    
    chat = model.start_chat(history=[])

    try:
        logging.info("Ready to receive messages.")

        # Send initial greeting with TTS audio
        greeting_text = "Hello, how can I help you?"
        greeting_audio = await asyncio.to_thread(generate_tts_audio, greeting_text)
        await websocket.send_json({
            "type": "greeting",
            "text": greeting_text,
            "audio": greeting_audio
        })
        logging.info("Greeting sent.")

        while True:
            # Receive message from client - can be text or binary (audio)
            message = await websocket.receive()
            
            if "text" in message:
                # Legacy text message support
                user_text = message["text"]
                logging.info(f"Received text from client: {user_text}")
            elif "bytes" in message:
                # Binary audio data from MediaRecorder
                audio_bytes = message["bytes"]
                logging.info(f"Received audio from client: {len(audio_bytes)} bytes")
                
                # Transcribe audio to text
                user_text = await asyncio.to_thread(transcribe_audio, audio_bytes)
                
                if not user_text:
                    await websocket.send_json({
                        "type": "error",
                        "text": "Sorry, I couldn't understand the audio. Please try again."
                    })
                    continue
                
                # Send transcription back to client so they can see what was recognized
                await websocket.send_json({
                    "type": "transcription",
                    "text": user_text
                })
                logging.info(f"Transcribed: {user_text}")
            else:
                continue

            # Get the full response from Gemini
            logging.info("Sending text to Gemini...")
            response = await chat.send_message_async(user_text)
            ai_text = response.text
            cleaned_text = ai_text.replace('*', '').replace('_', '').replace('#', '')
            logging.info(f"AI Response: {cleaned_text}")

            # Generate TTS audio for the response
            tts_audio = await asyncio.to_thread(generate_tts_audio, cleaned_text)

            # Send the AI's text response + audio back to the client
            await websocket.send_json({
                "type": "ai_response",
                "text": cleaned_text,
                "audio": tts_audio
            })
            logging.info("AI response with audio sent.")

    except WebSocketDisconnect:
        logging.info("Client disconnected.")
    except Exception as e:
        logging.error(f"An error occurred in websocket_endpoint: {e}", exc_info=True)
    finally:
        # Final cleanup for this connection if needed
        pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)