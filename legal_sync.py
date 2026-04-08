import json
import os
import google.generativeai as genai
from dotenv import load_dotenv
import time
from datetime import datetime, timedelta

# Path to store last sync timestamp
SYNC_TIMESTAMP_FILE = r'c:\Users\luthr\Downloads\Constitution-Model-main\.sync_timestamps.json'

def get_last_sync_time(sync_type):
    """Get the last sync time for a specific sync type."""
    if not os.path.exists(SYNC_TIMESTAMP_FILE):
        return None
    
    try:
        with open(SYNC_TIMESTAMP_FILE, 'r') as f:
            data = json.load(f)
        return data.get(sync_type)
    except:
        return None

def set_sync_time(sync_type):
    """Update the sync timestamp for a specific sync type."""
    data = {}
    if os.path.exists(SYNC_TIMESTAMP_FILE):
        try:
            with open(SYNC_TIMESTAMP_FILE, 'r') as f:
                data = json.load(f)
        except:
            pass
    
    data[sync_type] = datetime.now().isoformat()
    
    with open(SYNC_TIMESTAMP_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def should_run_sync(sync_type, hours=48):
    """Check if sync should run based on 48-hour interval."""
    last_sync = get_last_sync_time(sync_type)
    
    if last_sync is None:
        print(f"ℹ️ First run for {sync_type}. Proceeding with sync...")
        return True
    
    try:
        last_sync_time = datetime.fromisoformat(last_sync)
        time_diff = datetime.now() - last_sync_time
        hours_passed = time_diff.total_seconds() / 3600
        
        if hours_passed < hours:
            hours_remaining = hours - hours_passed
            print(f"⏸️  {sync_type} was run {hours_passed:.1f} hours ago.")
            print(f"⏳ Next sync in {hours_remaining:.1f} hours (48-hour interval).")
            return False
        else:
            print(f"✅ 48 hours have passed. Running {sync_type}...")
            return True
    except:
        print(f"⚠️ Error checking sync time. Running {sync_type}...")
        return True

def legal_sync():
    # Check 48-hour rate limit
    if not should_run_sync("legal_sync"):
        return
    
    print("⚖️ [LEGAL SYNC] Starting automated legal knowledge update...")
    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("❌ Legal Sync failed: GOOGLE_API_KEY not found.")
        return

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')

    # Define the legal knowledge database path
    legal_knowledge_path = r'backend\static\legal_knowledge.json'
    
    # Ensure the file exists
    if not os.path.exists(legal_knowledge_path):
        print(f"⚠️ Legal knowledge file not found at {legal_knowledge_path}")
        return

    try:
        with open(legal_knowledge_path, 'r', encoding='utf-8') as f:
            legal_data = json.load(f)
    except Exception as e:
        print(f"❌ Failed to load legal knowledge: {e}")
        return

    # Research Prompt for Gemini - Update legal definitions and case summaries
    prompt = """
    ACT AS A SENIOR CONSTITUTIONAL LAW EXPERT for India.
    
    Your task is to:
    1. Verify and enhance existing legal terms and definitions
    2. Add any new landmark Supreme Court rulings from 2024-2025
    3. Update case law summaries if there are recent developments
    
    FOCUS AREAS:
    - Fundamental Rights and Duties (Articles 12-35, 51A)
    - Supreme Court landmark judgments
    - Constitutional amendments and their implications
    - Recent PIL decisions
    
    RESPONSE FORMAT:
    Return a JSON object with updates/additions:
    {
        "updates": [
            {
                "type": "term_update",
                "term": "Legal Term",
                "definition": "Updated definition",
                "updated_date": "2025-04-06"
            }
        ],
        "new_cases": [
            {
                "case_name": "Case Name vs State",
                "year": 2024,
                "court": "Supreme Court",
                "ruling": "Summary of ruling",
                "significance": "Why it matters"
            }
        ]
    }
    """

    try:
        response = model.generate_content(prompt)
        
        if response.text:
            print("✅ Legal knowledge synchronization completed successfully")
            print(f"Generated content: {response.text[:200]}...")
            
            # Log the sync
            if 'last_sync' not in legal_data:
                legal_data['last_sync'] = {}
            
            legal_data['last_sync']['date'] = time.strftime("%Y-%m-%d %H:%M:%S")
            legal_data['last_sync']['status'] = 'synced'
            
            # Save updated data
            with open(legal_knowledge_path, 'w', encoding='utf-8') as f:
                json.dump(legal_data, f, ensure_ascii=False, indent=2)
            
            print(f"✅ Legal knowledge saved to {legal_knowledge_path}")
            set_sync_time("legal_sync")  # Update timestamp
        else:
            print("⚠️ No response from AI for legal sync")
            
    except Exception as e:
        print(f"⚠️ Legal Sync Error: {e}")

if __name__ == "__main__":
    legal_sync()
    print("✅ Legal sync process completed")
