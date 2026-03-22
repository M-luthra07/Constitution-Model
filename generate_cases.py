import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

model = genai.GenerativeModel('gemini-flash-latest')

def generate_cases():
    print("Generating 50 Virtual Court Cases...")
    
    prompt = """
You are a constitutional law expert. Generate exactly 50 unique, engaging legal scenarios based on the Indian Constitution's Fundamental Rights. 
Mix different levels of difficulty. Some should be easy (e.g. freedom of speech), others tricky (e.g. minority educational rights, double jeopardy).

Return the result **ONLY as a valid JSON array** of objects, with no markdown formatting, no comments, and no extra text.

Each object MUST have the following keys:
"id": A unique string ID (e.g., "case_1")
"title": A catchy title (e.g., "The Midnight Arrest")
"desc": A 2-3 sentence description of the scenario.
"options": An array of exactly 4 strings representing Constitutional Rights options (e.g., "Article 14 - Right to Equality", etc.). One of them MUST be the correct choice to defend the citizen, while the others are plausible but incorrect.

DO NOT output anything except the JSON array.
"""

    try:
        response = model.generate_content(prompt)
        content = response.text.replace("```json", "").replace("```", "").strip()
        
        # Parse to ensure it is valid JSON
        cases = json.loads(content)
        
        # Save to file
        output_path = os.path.join("backend", "static", "court_cases.json")
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(cases, f, indent=4)
            
        print(f"✅ Successfully generated and saved {len(cases)} cases to {output_path}!")
    except Exception as e:
        print(f"Error generating cases: {e}")
        print("Raw response:")
        if 'response' in locals():
            print(response.text)

if __name__ == "__main__":
    generate_cases()
