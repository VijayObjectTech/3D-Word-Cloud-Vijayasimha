from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl

from services.scraper import fetch_article
from services.analyzer import extract_keywords

app = FastAPI(title="3D Word Cloud API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    url: HttpUrl


class WordEntry(BaseModel):
    word: str
    weight: float


class AnalyzeResponse(BaseModel):
    words: list[WordEntry]
    word_count: int


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "3D Word Cloud API"}


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest):
    try:
        text = fetch_article(str(req.url))
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to fetch article: {exc}")

    words = extract_keywords(text)

    if not words:
        raise HTTPException(status_code=422, detail="No keywords could be extracted.")

    return AnalyzeResponse(words=words, word_count=len(words))