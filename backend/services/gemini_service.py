import json

import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "models/gemini-2.5-flash"
)

SYSTEM_PROMPT = """
Act as an expert cybersecurity analyst.

Return ONLY valid JSON:

{
  "risk_score": int,
  "scam_type": string,
  "red_flags": [string],
  "recommended_action": string
}
"""

def analyze_text(text):
    response = model.generate_content(
        SYSTEM_PROMPT + "\n\nMessage:\n" + text
    )

    cleaned = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

"""  print("CLEANED RESPONSE:")
    print(cleaned)

    try:
        return json.loads(cleaned)
    except Exception as e:
        return {
            "error": str(e),
            "raw_response": cleaned
        }"""