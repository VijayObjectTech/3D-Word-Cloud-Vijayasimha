import re
import requests
from bs4 import BeautifulSoup


_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    )
}

_NOISE_TAGS = [
    "script", "style", "nav", "header", "footer",
    "aside", "figure", "figcaption", "form", "button",
    "noscript", "iframe", "svg", "img",
]


def fetch_article(url: str) -> str:
    response = requests.get(url, headers=_HEADERS, timeout=15)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "lxml")

    for tag in soup(_NOISE_TAGS):
        tag.decompose()

    article = soup.find("article")
    container = article if article else soup

    paragraphs = container.find_all("p")
    text = " ".join(p.get_text(separator=" ", strip=True) for p in paragraphs)
    text = re.sub(r"\s+", " ", text).strip()

    if len(text) < 100:
        raise ValueError("Could not extract meaningful text from the provided URL.")

    return text