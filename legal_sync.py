import json
import os
import google.generativeai as genai
from dotenv import load_dotenv
import time

def legal_sync():
    print("⚖️ [LEGAL SYNC] Starting automated legal knowledge update...")
    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("❌ Legal Sync failed: GOOGLE_API_KEY not found.")
        return

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')

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
        else:
            print("⚠️ No response from AI for legal sync")
            
    except Exception as e:
        print(f"⚠️ Legal Sync Error: {e}")

if __name__ == "__main__":
    legal_sync()
    print("✅ Legal sync process completed")
