import subprocess
import os
import signal
import time
import sys
import platform
import webbrowser

def clear_port_windows(port):
    """Clear port on Windows"""
    try:
        command = f"netstat -ano | findstr :{port}"
        result = subprocess.run(command, capture_output=True, text=True, shell=True)
        if result.stdout:
            for line in result.stdout.strip().split('\n'):
                parts = line.strip().split()
                if len(parts) >= 5:
                    pid = parts[-1]
                    if pid.isdigit():
                        subprocess.run(f"taskkill /F /PID {pid}", shell=True, capture_output=True)
    except Exception as e:
        pass

def clear_port_linux(port):
    """Clear port on Linux"""
    try:
        subprocess.run(["fuser", "-k", "-s", "-n", "tcp", str(port)], check=False, capture_output=True)
    except:
        pass

def start_server(command, cwd, name):
    """Start a server process"""
    print(f"\n▶️  Starting {name}...")
    print(f"   Working directory: {cwd}")
    print(f"   Command: {' '.join(command)}")
    
    try:
        if platform.system() == "Windows":
            process = subprocess.Popen(command, cwd=cwd, creationflags=subprocess.CREATE_NEW_PROCESS_GROUP)
        else:
            process = subprocess.Popen(command, cwd=cwd, preexec_fn=os.setsid)
        
        print(f"✅ {name} started (PID: {process.pid})")
        return process
    except Exception as e:
        print(f"❌ Failed to start {name}: {e}")
        return None

def main():
    print("\n" + "="*60)
    print("🎤 Constitutional Voice Bot - Launcher")
    print("="*60)
    
    # Get the voice bot directory
    voice_bot_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(voice_bot_dir, "backend")
    frontend_dir = os.path.join(voice_bot_dir, "frontend")
    
    print(f"\n📁 Voice Bot Directory: {voice_bot_dir}")
    print(f"📁 Backend Directory: {backend_dir}")
    print(f"📁 Frontend Directory: {frontend_dir}")
    
    # Check if directories exist
    if not os.path.exists(backend_dir):
        print(f"\n❌ ERROR: Backend directory not found at {backend_dir}")
        sys.exit(1)
    
    if not os.path.exists(frontend_dir):
        print(f"\n❌ ERROR: Frontend directory not found at {frontend_dir}")
        sys.exit(1)
    
    print("\n🔧 Clearing ports...")
    if platform.system() == "Windows":
        clear_port_windows(8000)
        clear_port_windows(8001)
    else:
        clear_port_linux(8000)
        clear_port_linux(8001)
    
    time.sleep(1)

    # Backend command
    backend_command = [sys.executable, "-m", "uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]
    # Frontend command
    frontend_command = [sys.executable, "-m", "http.server", "8001", "--directory", "."]

    backend_process = None
    frontend_process = None

    try:
        # Start backend
        backend_process = start_server(backend_command, backend_dir, "Backend (FastAPI)")
        time.sleep(3)
        
        # Start frontend
        frontend_process = start_server(frontend_command, frontend_dir, "Frontend (Web Server)")
        time.sleep(2)

        print("\n" + "="*60)
        print("✅ VOICE BOT IS RUNNING!")
        print("="*60)
        print("\n📱 Access Points:")
        print("   🌐 Frontend:  http://localhost:8001")
        print("   🔌 Backend:   http://localhost:8000")
        print("   📊 Health:    http://localhost:8000/health")
        print("\n💬 Steps:")
        print("   1. Open http://localhost:8001 in your browser")
        print("   2. Click the microphone button")
        print("   3. Ask your legal question")
        print("   4. Listen to the AI response")
        print("\n⏹️  Press Ctrl+C to stop the application")
        print("="*60 + "\n")

        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print("\n\n⏹️  Shutting down...")
    except Exception as e:
        print(f"❌ An error occurred: {e}")
    finally:
        # Terminate processes
        if backend_process:
            print(f"\n🛑 Terminating Backend (PID: {backend_process.pid})...")
            try:
                if platform.system() == "Windows":
                    os.kill(backend_process.pid, signal.CTRL_C_EVENT)
                else:
                    os.killpg(os.getpgid(backend_process.pid), signal.SIGTERM)
                backend_process.wait(timeout=5)
            except:
                pass
            print("✅ Backend terminated")
        
        if frontend_process:
            print(f"🛑 Terminating Frontend (PID: {frontend_process.pid})...")
            try:
                if platform.system() == "Windows":
                    os.kill(frontend_process.pid, signal.CTRL_C_EVENT)
                else:
                    os.killpg(os.getpgid(frontend_process.pid), signal.SIGTERM)
                frontend_process.wait(timeout=5)
            except:
                pass
            print("✅ Frontend terminated")
        
        print("\n✅ Application stopped successfully\n")

if __name__ == "__main__":
    main()

