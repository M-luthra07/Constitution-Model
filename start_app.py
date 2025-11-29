#!/usr/bin/env python3
import subprocess
import os
import signal
import sys
import time
import platform

processes = []

def clear_port_windows(port):
    try:
        command = f"netstat -ano | findstr :{port}"
        result = subprocess.run(command, capture_output=True, text=True, shell=True)
        if result.stdout:
            for line in result.stdout.strip().split('\n'):
                parts = line.strip().split()
                if len(parts) >= 5:
                    pid = parts[-1]
                    if pid.isdigit():
                        print(f"   Killing process {pid} on port {port}")
                        subprocess.run(f"taskkill /F /PID {pid}", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass

def clear_port_linux(port):
    try:
        # fuser -k -n tcp <port> kills processes on that port
        subprocess.run(["fuser", "-k", "-s", "-n", "tcp", str(port)], check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        pass

def start_process(command, cwd=None, name="Process"):
    print(f"🚀 Starting {name}...")
    try:
        # Use setsid to create a new process group so we can kill the whole tree later
        if platform.system() != "Windows":
            p = subprocess.Popen(command, cwd=cwd, preexec_fn=os.setsid)
        else:
            # Windows doesn't support preexec_fn=os.setsid
            p = subprocess.Popen(command, cwd=cwd)
            
        processes.append((p, name))
        print(f"✅ {name} started (PID {p.pid})")
        return p
    except Exception as e:
        print(f"❌ Failed to start {name}: {e}")
        return None

def get_venv_python(dir_path):
    """Returns the path to the python executable in the .venv directory if it exists."""
    linux_path = os.path.join(dir_path, ".venv", "bin", "python")
    windows_path = os.path.join(dir_path, ".venv", "Scripts", "python.exe")
    
    if os.path.exists(linux_path):
        return linux_path
    if os.path.exists(windows_path):
        return windows_path
    
    # Fallback to current executable if specific venv not found
    print(f"⚠️  No .venv found in {dir_path}, using default python: {sys.executable}")
    return sys.executable

def cleanup(signum, frame):
    print("\n\n🛑 Stopping all services...")
    for p, name in processes:
        try:
            print(f"Terminating {name} (PID {p.pid})...")
            if platform.system() != "Windows":
                os.killpg(os.getpgid(p.pid), signal.SIGTERM)
            else:
                p.terminate()
        except Exception as e:
            print(f"Error stopping {name}: {e}")
    print("👋 Goodbye!")
    sys.exit(0)

def main():
    # Register signal handlers
    signal.signal(signal.SIGINT, cleanup)
    signal.signal(signal.SIGTERM, cleanup)

    # Get directories
    root_dir = os.path.dirname(os.path.abspath(__file__))
    voice_bot_dir = os.path.join(root_dir, "voice bot")

    print("=== Constitution Model Suite Launcher ===")
    print(f"Root Directory: {root_dir}")

    # Clear ports first
    ports_to_clear = [3000, 5000, 8000, 8001]
    print(f"🧹 Clearing ports: {ports_to_clear}...")
    if platform.system() == "Windows":
        for port in ports_to_clear:
            clear_port_windows(port)
    else:
        for port in ports_to_clear:
            clear_port_linux(port)
    time.sleep(2) # Wait for ports to free up

    # 0. Generate TOC for PDF
    print("📚 Generating Table of Contents...")
    flask_python = get_venv_python(root_dir)
    backend_dir = os.path.join(root_dir, "backend")
    try:
        subprocess.run([flask_python, "analyze_pdf.py"], cwd=backend_dir, check=True)
        print("✅ TOC Generated.")
    except Exception as e:
        print(f"⚠️  Failed to generate TOC: {e}")

    # 1. Start Flask App (Main Backend/Flashcards)
    flask_python = get_venv_python(root_dir)
    start_process([flask_python, "app.py"], cwd=backend_dir, name="Flask App (Port 5000)")
    time.sleep(2) # Give Flask a moment

    # 2. Start Voice Bot
    voice_bot_python = get_venv_python(voice_bot_dir)
    start_process([voice_bot_python, "start_app.py"], cwd=voice_bot_dir, name="Voice Bot (Ports 8000/8001)")
    time.sleep(2)

    # 3. Start Next.js App (React Frontend)
    # npm command depends on OS
    npm_cmd = "npm.cmd" if platform.system() == "Windows" else "npm"
    start_process([npm_cmd, "run", "dev"], cwd=root_dir, name="Next.js App (Port 3000)")

    print("\n✨ All services are running!")
    print("------------------------------------------------")
    print("📱 React App (Main):   http://localhost:3000")
    print("⚖️  Flask App:          http://localhost:5000")
    print("🎤 Voice Bot Frontend: http://localhost:8001")
    print("------------------------------------------------")
    print("Press Ctrl+C to stop all services.\n")

    # Keep main process alive
    while True:
        time.sleep(1)

if __name__ == "__main__":
    main()
