
import json
import os
import google.generativeai as genai
from dotenv import load_dotenv
import time

def internet_sync():
    print("🌐 [AI INTERNET SYNC] Starting automated scheme update...")
    load_dotenv()
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        print("❌ Sync failed: GOOGLE_API_KEY not found.")
        return

    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-flash-latest')

    # Define the core database paths
    schemes_json_path = r'c:\Users\luthr\Downloads\Constitution-Model-main\backend\static\schemes.json'
    master_json_path = r'c:\Users\luthr\Downloads\Constitution-Model-main\National_Welfare_Master.json'

    # Research Prompt for Gemini (leveraging its built-in knowledge of 2024-2025 news)
    prompt = """
    ACT AS A SENIOR RESEARCH ANALYST for the Indian Government.
    Your task is to identify the 3-5 ABSOLUTE LATEST (announced in late 2024 or 2025) 
    government schemes from India (both Central and State) that are highly impactful but potentially new to the database.
    
    RESEARCH TARGETS:
    - Schemes launched/announced after Oct 2024.
    - Focus on Employment, Digital India, Healthcare (Ayushman updates), and Women empowerment (Ladli Behna, etc updates).
    
    FOR EACH SCHEME, PROVIDE A VALID JSON OBJECT WITH:
    - id: Unique ID (e.g. "AI_NEW_2025_01")
    - name: Official English Name
    - hindi_name: Precise Hindi Translation
    - state: "All" or State Name
    - sector: [Agriculture, Health, Education, Marriage & Wedding, Financial Services, Housing, Women Empowerment, Pensions & Seniors, Employment, Differently Abled, Energy, Food Security, Social Welfare]
    - ministry: Official Ministry name
    - launchYear: 2024 or 2025
    - gender: [Male, Female, All]
    - ageGroup: [0-18, 18+, 21-60, 60+, All]
    - category: [All, Farmers, SHG, Youth, etc]
    - status: "Latest"
    - description: One detailed English sentence.
    - hindi_description: Precise Hindi translation of description.
    - eligibility: Short English summary.
    - hindi_eligibility: Precise Hindi translation.
    - helpline: Number or 1800-11-0001
    - website: Official .gov.in link if known.

    RETURN ONLY A RAW JSON ARRAY. NO MARKDOWN. NO INTRO.
    """

    try:
        response = model.generate_content(prompt)
        ai_output = response.text.strip()
        
        # Cleanup
        if "```json" in ai_output:
            ai_output = ai_output.split("```json")[1].split("```")[0].strip()
        elif "```" in ai_output:
            ai_output = ai_output.split("```")[1].split("```")[0].strip()
            
        new_schemes = json.loads(ai_output)
        
        # Merge logic
        if os.path.exists(schemes_json_path):
            with open(schemes_json_path, 'r', encoding='utf-8') as f:
                db = json.load(f)
        else:
            db = []

        existing_ids = {s.get('id') for s in db}
        new_count = 0
        for s in new_schemes:
            if s.get('id') not in existing_ids:
                db.insert(0, s) # Latest on top
                new_count += 1
                existing_ids.add(s.get('id'))

        if new_count > 0:
            with open(schemes_json_path, 'w', encoding='utf-8') as f:
                json.dump(db, f, indent=2, ensure_ascii=False)
            with open(master_json_path, 'w', encoding='utf-8') as f:
                json.dump(db, f, indent=2, ensure_ascii=False)
            print(f"✅ Sync Successful: {new_count} new schemes added to the encyclopedia.")
        else:
            print("ℹ️ Database is already up to date with the latest 2025 schemes.")

    except Exception as e:
        print(f"❌ Sync Error: {e}")

if __name__ == "__main__":
    internet_sync()
