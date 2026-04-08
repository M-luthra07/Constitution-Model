#!/usr/bin/env python3
"""
Voice Bot Debugger - Tests the WebSocket audio pipeline
Helps identify where voice input is failing
"""

import asyncio
import websockets
import json
import base64
import os
from pathlib import Path

async def test_voice_bot():
    """Test voice bot WebSocket connection and audio pipeline"""
    
    uri = "ws://localhost:8000/ws"
    
    print("=" * 60)
    print("🔧 VOICE BOT DEBUGGER")
    print("=" * 60)
    
    print(f"\n🔗 Connecting to: {uri}")
    
    try:
        async with websockets.connect(uri) as websocket:
            print("✅ WebSocket connected!")
            
            # Wait for greeting
            print("\n📩 Waiting for greeting from bot...")
            greeting = await websocket.recv()
            greeting_data = json.loads(greeting)
            print(f"✅ Greeting received: {greeting_data.get('type')}")
            if greeting_data.get('text'):
                print(f"   Message: {greeting_data['text'][:80]}...")
            
            # ================================
            # TEST 1: Send text input
            # ================================
            print("\n" + "=" * 60)
            print("TEST 1: TEXT INPUT (No Audio)")
            print("=" * 60)
            
            text_input = "What is Article 21?"
            print(f"\n📤 Sending: {text_input}")
            
            # Create empty audio for testing (web clients send bytes as JSON)
            test_message = {
                "type": "text_message",
                "data": text_input
            }
            
            try:
                await websocket.send(json.dumps(test_message))
                print("✅ Message sent to WebSocket")
            except Exception as e:
                print(f"❌ Failed to send: {e}")
            
            # Wait for response
            try:
                print("\n⏳ Waiting for response (30 sec timeout)...")
                response = await asyncio.wait_for(websocket.recv(), timeout=30)
                response_data = json.loads(response)
                print(f"✅ Response received: {response_data.get('type')}")
                if response_data.get('text'):
                    print(f"   {response_data['text'][:150]}...")
                if response_data.get('audio'):
                    print(f"   Audio: {len(response_data['audio'])} bytes")
            except asyncio.TimeoutError:
                print("❌ No response received (timeout)")
            except Exception as e:
                print(f"❌ Error receiving response: {e}")
            
            # ================================
            # TEST 2: Check connection health
            # ================================
            print("\n" + "=" * 60)
            print("TEST 2: CONNECTION HEALTH")
            print("=" * 60)
            
            try:
                health_msg = {"type": "ping"}
                await websocket.send(json.dumps(health_msg))
                print("✅ Health check message sent")
            except Exception as e:
                print(f"❌ Health check failed: {e}")
            
            print("\n✅ All tests completed!")
            
    except ConnectionRefusedError:
        print(f"❌ Connection refused! Is voice bot running on port 8000?")
        print("   Try: python 'voice bot/backend/main.py'")
    except Exception as e:
        print(f"❌ Error: {e}")

# ============================================
# AUDIO FILE TEST
# ============================================

def create_test_audio():
    """Create a simple test audio file (WAV format)"""
    import wave
    import struct
    
    filename = "test_audio.wav"
    
    # Create a simple sine wave (440 Hz for 1 second)
    sample_rate = 16000
    duration = 1
    frequency = 440
    
    num_samples = sample_rate * duration
    
    print(f"\n🎵 Creating test audio file: {filename}")
    
    try:
        with wave.open(filename, 'w') as wav_file:
            wav_file.setnchannels(1)  # Mono
            wav_file.setsampwidth(2)  # 16-bit
            wav_file.setframerate(sample_rate)
            
            for i in range(num_samples):
                sample = int(32767 * 0.5 * (2 ** 0.5) * (i / sample_rate))
                wav_file.writeframes(struct.pack('<h', sample))
        
        print(f"✅ Created {filename} ({os.path.getsize(filename)} bytes)")
        return filename
    except Exception as e:
        print(f"❌ Failed to create audio: {e}")
        return None

def check_voice_bot_running():
    """Check if voice bot is running on port 8000"""
    import socket
    
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('127.0.0.1', 8000))
    sock.close()
    
    return result == 0

# ============================================
# MAIN
# ============================================

if __name__ == "__main__":
    print("\n🚀 VOICE BOT DIAGNOSTIC TOOL\n")
    
    # Check if voice bot is running
    print("🔍 Checking if voice bot is running on port 8000...")
    if not check_voice_bot_running():
        print("❌ Voice bot is NOT running!")
        print("\n📝 Please start it with:")
        print("   cd 'voice bot/backend'")
        print("   python main.py")
        exit(1)
    
    print("✅ Voice bot is running!\n")
    
    # Run WebSocket tests
    try:
        asyncio.run(test_voice_bot())
    except KeyboardInterrupt:
        print("\n\n⏹️  Test interrupted by user")
    except Exception as e:
        print(f"\n❌ Fatal error: {e}")
    
    print("\n" + "=" * 60)
    print("📋 DIAGNOSTIC SUMMARY")
    print("=" * 60)
    print("""
If tests FAILED, check:
  1. ✅ Voice bot running: python 'voice bot/backend/main.py'
  2. ✅ .env has GOOGLE_API_KEY set
  3. ✅ Port 8000 is free: netstat -ano | findstr :8000
  4. ✅ Firewall allows localhost:8000

If AUDIO INPUT not working:
  1. Check browser microphone permissions
  2. Try with test_voice_assistant.py first (text mode)
  3. Check browser console for errors
  4. Verify WebSocket endpoint in frontend

Common Issues:
  ❌ "Connection refused" → Start voice bot backend
  ❌ "Timeout" → Gemini API quota or slow response
  ❌ "Empty response" → Audio format mismatch
  ❌ "No audio output" → gTTS library issue
""")
