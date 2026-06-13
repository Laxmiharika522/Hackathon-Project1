def scan_url(url):

    risk_score = 0
    warnings = []

    if url.startswith("http://"):
        risk_score += 50
        warnings.append("Uses insecure HTTP connection")

    suspicious_domains = [
        "bit.ly",
        "tinyurl",
        "shorturl",
        "t.ly"
    ]

    if any(domain in url.lower() for domain in suspicious_domains):
        risk_score += 30
        warnings.append("Uses shortened URL")

    if "@" in url:
        risk_score += 20
        warnings.append("Contains @ symbol in URL")

    return {
        "url": url,
        "risk_score": risk_score,
        "warnings": warnings,
        "safe": risk_score < 50
    }