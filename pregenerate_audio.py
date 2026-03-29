import json
import hashlib
import os
from gtts import gTTS
import time

def generate_preamble_audio():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(root_dir, 'backend', 'static', 'preamble_data.json')
    cache_dir = os.path.join(root_dir, 'backend', 'static', 'audio_cache')
    
    if not os.path.exists(cache_dir):
        os.makedirs(cache_dir)
        
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    langs = data['languages']
    
    # Supported gTTS mapping from app.py
    lang_map = {
        "Assamese": "as", "Bengali": "bn", "Bodo": "hi", "Dogri": "hi", 
        "Gujarati": "gu", "Hindi": "hi", "Kannada": "kn", "Kashmiri": "hi",
        "Konkani": "hi", "Maithili": "hi", "Malayalam": "ml", "Manipuri": "hi",
        "Marathi": "mr", "Nepali": "ne", "Odia": "or", "Punjabi": "pa",
        "Sanskrit": "hi", "Santali": "hi", "Sindhi": "hi", "Tamil": "ta",
        "Telugu": "te", "Urdu": "ur"
    }
    
    total_generated = 0
    
    for lang_name, content in langs.items():
        print(f"Generating for {lang_name}...")
        
        # 1. Generate Preamble
        preamble_text = content['preamble']
        hash_preamble = hashlib.md5(f"{preamble_text}_{lang_name}".encode()).hexdigest()
        cache_path = os.path.join(cache_dir, f"{hash_preamble}.mp3")
        
        if not os.path.exists(cache_path):
            try:
                tts = gTTS(text=preamble_text, lang=lang_map.get(lang_name, 'hi'))
                tts.save(cache_path)
                total_generated += 1
                time.sleep(0.5) # Avoid rate limiting
            except Exception as e:
                print(f"Error for {lang_name} Preamble: {e}")
        
        # 2. Generate Meanings
        for word, word_data in content['words'].items():
            meaning_text = word_data['meaning']
            hash_meaning = hashlib.md5(f"{meaning_text}_{lang_name}".encode()).hexdigest()
            cache_path = os.path.join(cache_dir, f"{hash_meaning}.mp3")
            
            if not os.path.exists(cache_path):
                try:
                    tts = gTTS(text=meaning_text, lang=lang_map.get(lang_name, 'hi'))
                    tts.save(cache_path)
                    total_generated += 1
                    time.sleep(0.5)
                except Exception as e:
                    print(f"Error for {lang_name} Word {word}: {e}")
                    
    print(f"✅ Success! Generated {total_generated} new audio files.")

if __name__ == "__main__":
    generate_preamble_audio()
