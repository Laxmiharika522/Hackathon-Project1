import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """
Act as an expert cybersecurity analyst.
Analyze this message for scams.
Return ONLY valid JSON:
{
  "risk_score": int,
  "scam_type": string,
  "red_flags": [string],
  "recommended_action": string
}
"""

def analyze_text(text: str, lang: str = "en"):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {"error": "API Key is missing"}

    client = genai.Client(api_key=api_key)
    prompt = SYSTEM_PROMPT
    
    if lang == "hi":
        prompt += "\nTranslate entire response into conversational Hindi."
        
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt + "\n\nMessage:\n" + text,
            config=types.GenerateContentConfig(response_mime_type="application/json")
        )
        import json
        return json.loads(response.text)
    except Exception as e:
        return {"error": str(e)}