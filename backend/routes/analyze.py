from fastapi import APIRouter
from models.request_models import TextRequest
from services.gemini_service import analyze_text

router = APIRouter()

@router.post("/analyze-text")
def analyze(request: TextRequest, lang: str = "en"):
    result = analyze_text(request.text, lang)
    return result