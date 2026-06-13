import requests
import os
from dotenv import load_dotenv

load_dotenv()

def scan_url(url: str):
    if url.startswith("http://"):
        protocol_warning = True
    else:
        protocol_warning = False

    api_key = os.getenv('SAFE_BROWSING_API_KEY')
    if not api_key:
        return {"error": "SAFE_BROWSING_API_KEY is missing from environment"}

    body = {
        "client": {
            "clientId": "scamshield",
            "clientVersion": "1.0"
        },
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [
                {"url": url}
            ]
        }
    }

    try:
        response = requests.post(
            f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={api_key}",
            json=body
        )
        return {
            "unsafe_protocol": protocol_warning,
            "google_result": response.json()
        }
    except Exception as e:
        return {"error": str(e)}