from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from google import genai
import json, re, os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

TEXT_PROMPT = """
You are an expert cybersecurity analyst specializing in Indian digital scams.
Analyze the following message carefully for signs of scam, fraud, or phishing.
Consider: urgency language, impersonation, suspicious links, requests for money/OTP/credentials, lottery/prize claims, KYC fraud, job scams, etc.

Return ONLY a valid JSON object — no extra text, no markdown:
{
  "risk_score": <integer 0-100>,
  "scam_type": "<string, e.g. KYC Phishing / OTP Fraud / Lottery Scam / Safe Message>",
  "red_flags": ["<flag 1>", "<flag 2>"],
  "recommended_action": "<clear actionable advice>",
  "ai_explanation": "<2-3 sentence explanation of why this is or is not a scam>"
}
"""

URL_PROMPT = """
You are an expert cybersecurity analyst specializing in phishing and malicious URLs.
Analyze the following URL for signs of phishing, scam, or malicious activity.
Look for: lookalike domains, suspicious TLDs, URL shorteners hiding destinations, credential-harvesting paths, non-HTTPS, brand impersonation, etc.

Return ONLY a valid JSON object — no extra text, no markdown:
{
  "risk_score": <integer 0-100>,
  "scam_type": "<string, e.g. Phishing / Lookalike Domain / Malicious Redirect / Safe URL>",
  "red_flags": ["<flag 1>", "<flag 2>"],
  "recommended_action": "<clear actionable advice>",
  "ai_explanation": "<2-3 sentence explanation of the URL's risk factors>"
}
"""

class TextRequest(BaseModel):
    text: str
    lang: str = "en"

class URLRequest(BaseModel):
    url: str
    lang: str = "en"

@router.post("/api/analyze-text")
async def analyze_text(req: TextRequest):
    prompt = TEXT_PROMPT
    if req.lang == "hi":
        prompt += "\nTranslate your entire JSON response values into conversational Hindi."
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[prompt, f"\n\nMessage to analyze:\n{req.text}"],
        )
        raw = re.sub(r"```json|```", "", response.text.strip()).strip()
        result = json.loads(raw)
        result["ai_powered"] = True
        return result
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=502, detail=f"Gemini returned invalid JSON: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Gemini AI unavailable: {str(e)}")

@router.post("/api/analyze-url")
async def analyze_url(req: URLRequest):
    prompt = URL_PROMPT
    if req.lang == "hi":
        prompt += "\nTranslate your entire JSON response values into conversational Hindi."
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[prompt, f"\n\nURL to analyze:\n{req.url}"],
        )
        raw = re.sub(r"```json|```", "", response.text.strip()).strip()
        result = json.loads(raw)
        result["ai_powered"] = True
        return result
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=502, detail=f"Gemini returned invalid JSON: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Gemini AI unavailable: {str(e)}")
