import requests
import os
from dotenv import load_dotenv

load_dotenv()

SAFE_BROWSING_API_KEY = os.getenv("SAFE_BROWSING_API_KEY")


def scan_url(url):

    protocol_warning = url.startswith("http://")

    body = {
        "client": {
            "clientId": "scamshield",
            "clientVersion": "1.0"
        },
        "threatInfo": {
            "threatTypes": [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE"
            ],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [
                {"url": url}
            ]
        }
    }

    try:
        response = requests.post(
            f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={SAFE_BROWSING_API_KEY}",
            json=body,
            timeout=10
        )

        data = response.json()

        return {
            "url": url,
            "unsafe_protocol": protocol_warning,
            "safe": "matches" not in data,
            "threats": data.get("matches", [])
        }
        

    except Exception as e:
        return {
            "url": url,
            "unsafe_protocol": protocol_warning,
            "error": str(e)
        }
    
print("SAFE BROWSING KEY =", SAFE_BROWSING_API_KEY)