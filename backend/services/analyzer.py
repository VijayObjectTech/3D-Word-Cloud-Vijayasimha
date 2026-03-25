import re
from sklearn.feature_extraction.text import TfidfVectorizer
from typing import TypedDict


class WordEntry(TypedDict):
    word: str
    weight: float


_EXTRA_STOP = {
    "said", "say", "says", "told", "tell", "also", "would", "could",
    "one", "two", "three", "new", "like", "get", "got", "go", "going",
    "make", "made", "mr", "ms", "mrs", "dr", "come", "came", "know",
    "think", "time", "year", "years", "day", "days", "week", "month",
    "people", "person", "way", "things", "thing", "need", "used",
    "including", "according", "many", "much", "may", "might", "well",
    "still", "back", "even", "first", "last", "nbsp", "https", "http",
    "www", "com", "html", "org", "net",
}


def extract_keywords(text: str, top_n: int = 60) -> list[WordEntry]:
    cleaned = re.sub(r"[^a-zA-Z\s]", " ", text.lower())
    cleaned = re.sub(r"\s+", " ", cleaned).strip()

    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
        max_features=300,
        min_df=1,
        sublinear_tf=True,
    )

    tfidf_matrix = vectorizer.fit_transform([cleaned])
    scores = tfidf_matrix.toarray()[0]
    feature_names = vectorizer.get_feature_names_out()

    ranked = [
        (name, float(score))
        for name, score in zip(feature_names, scores)
        if score > 0 and name not in _EXTRA_STOP
    ]

    ranked.sort(key=lambda x: x[1], reverse=True)
    ranked = ranked[:top_n]

    if not ranked:
        return []

    max_score = ranked[0][1]

    return [
        WordEntry(word=word, weight=round(score / max_score, 4))
        for word, score in ranked
    ]