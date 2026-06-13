from fastapi import APIRouter, UploadFile, File
from google import genai
from google.genai import types
import json, re, os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

VISION_PROMPT = """
You are an expert cybersecurity analyst specializing in Indian digital scams.
Analyze this screenshot carefully for any signs of scam, fraud, or phishing.

Return ONLY a valid JSON object — no extra text, no markdown:
{
  "risk_score": <integer 0-100>,
  "scam_type": "<string>",
  "red_flags": ["<flag 1>", "<flag 2>"],
  "recommended_action": "<clear advice>"
}
"""

@router.post("/api/analyze-image")
async def analyze_image(file: UploadFile = File(...), lang: str = "en"):
    image_bytes = await file.read()
    prompt = VISION_PROMPT
    if lang == "hi":
        prompt += "\nTranslate your entire JSON response values into conversational Hindi."

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
            prompt,
            types.Part.from_bytes(data=image_bytes, mime_type=file.content_type),
        ],
    )
    raw = re.sub(r"```json|```", "", response.text.strip()).strip()
    return json.loads(raw)