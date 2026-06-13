from fastapi import APIRouter
from models.request_models import URLRequest
from services.safe_browsing import scan_url

router = APIRouter()

@router.post("/scan-url")
def scan(data: URLRequest):
    return scan_url(data.url)