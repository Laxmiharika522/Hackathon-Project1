from fastapi import APIRouter, UploadFile, File, HTTPException
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
If a name is saved in an image it is likely not a scam.
In text messages and links, identify using your knowledge whether it is a scam or not.
Consider: urgency language, impersonation, suspicious links, requests for money/OTP/credentials, lottery/prize claims, KYC fraud, job scams, etc.

Return ONLY a valid JSON object — no extra text, no markdown:
{
  "risk_score": <integer 0-100>,
  "scam_type": "<string, e.g. KYC Phishing / OTP Fraud / Lottery Scam / Safe Message>",
  "confidence": <integer 0-100>,
  "severity": "<Critical | Suspicious | Safe>",
  "red_flags": ["<flag 1>", "<flag 2>"],
  "indicators": ["<indicator 1>", "<indicator 2>"],
  "recommended_action": "<clear actionable advice>",
  "ai_explanation": "<2-3 sentence explanation of why this is or is not a scam>"
}
"""

@router.post("/api/analyze-image")
async def analyze_image(file: UploadFile = File(...), lang: str = "en"):
    image_bytes = await file.read()
    prompt = VISION_PROMPT
    if lang == "hi":
        prompt += "\nTranslate your entire JSON response values into conversational Hindi."

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                prompt,
                types.Part.from_bytes(data=image_bytes, mime_type=file.content_type),
            ],
        )
        raw = re.sub(r"```json|```", "", response.text.strip()).strip()
        result = json.loads(raw)
        result["ai_powered"] = True
        return result
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=502, detail=f"Gemini returned invalid JSON: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Gemini AI unavailable: {str(e)}")
