import google.generativeai as genai
import os
import json
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-flash-latest")

languages = [
    "Assamese", "Bengali", "Bodo", "Dogri", "Gujarati", "Hindi", "Kannada", "Kashmiri",
    "Konkani", "Maithili", "Malayalam", "Manipuri", "Marathi", "Nepali", "Odia", "Punjabi",
    "Sanskrit", "Santali", "Sindhi", "Tamil", "Telugu", "Urdu"
]

important_words = ["Justice", "Liberty", "Equality", "Fraternity", "Sovereign", "Socialist", "Secular", "Democratic", "Republic"]

prompt = f"""
Generate a JSON object containing the Preamble of the Indian Constitution in the following 22 scheduled languages:
{', '.join(languages)}

For each language, provide:
1. The full text of the Preamble in that language.
2. Explanations for these important words IN THAT SAME LANGUAGE: {', '.join(important_words)}.

The JSON structure should be:
{{
  "languages": {{
    "LanguageName": {{
      "preamble": "full text...",
      "words": {{
        "WordInEnglish": {{
           "translation": "Translated Word",
           "meaning": "Explanation of the word in that language"
        }},
        ...
      }}
    }},
    ...
  }}
}}

Ensure the translations are accurate and official where possible. Use the respective scripts (e.g., Devanagari for Hindi, Bengali script for Bengali, etc.).
"""

response = model.generate_content(prompt)

try:
    # Extract JSON between ```json and ```
    content = response.text.strip()
    if "```json" in content:
        content = content.split("```json")[1].split("```")[0].strip()
    elif "```" in content:
         content = content.split("```")[1].split("```")[0].strip()

    data = json.loads(content)
    output_path = "backend/static/preamble_data.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Data saved to {output_path}")
except Exception as e:
    print(f"Error processing response: {e}")
    print("Full response text:")
    print(response.text)
