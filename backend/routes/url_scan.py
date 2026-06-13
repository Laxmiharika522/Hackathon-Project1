from fastapi import APIRouter
from pydantic import BaseModel
from services.safe_browsing import scan_url

router = APIRouter()

class URLRequest(BaseModel):
    url: str

@router.post("/scan-url")
def scan(request: URLRequest):
    return scan_url(request.url)