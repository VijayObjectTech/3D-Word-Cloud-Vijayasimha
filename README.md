# ◈ 3D Word Cloud

> Paste any article URL — get a rotating 3D visualization of its most important topics.

Built with React Three Fiber on the frontend and FastAPI + TF-IDF on the backend.
The result is an interactive word cloud where word size and color reflect importance,
rendered on a Fibonacci sphere you can orbit, zoom, and explore.

---

## What It Does

1. You paste a URL into the input field
2. The backend fetches the article and strips all the noise
3. TF-IDF extracts the top 60 most meaningful keywords
4. Each keyword gets a weight score between 0 and 1
5. The frontend places them on a 3D sphere — bigger and warmer = more important
6. The cloud auto-rotates, you can drag to orbit and scroll to zoom

---

## Tech Stack

### Frontend
- **React 18** + **TypeScript** — component architecture
- **Vite** — fast dev server and build tool
- **React Three Fiber** — React renderer for Three.js
- **@react-three/drei** — helpers like OrbitControls and Text

### Backend
- **FastAPI** — modern Python web framework
- **Uvicorn** — ASGI server
- **BeautifulSoup4 + lxml** — HTML scraping and cleaning
- **scikit-learn** — TF-IDF vectorizer for keyword extraction

---

## Project Structure
```
3D-Word-Cloud-Vijayasimha/
├── setup.sh                  # One command to install and run everything
├── backend/
│   ├── main.py               # FastAPI app and /analyze endpoint
│   ├── requirements.txt      # Python dependencies
│   └── services/
│       ├── scraper.py        # Fetches and cleans article HTML
│       └── analyzer.py       # TF-IDF keyword extraction
└── frontend/
    ├── index.html
    ├── vite.config.ts
    └── src/
        ├── App.tsx           # Root component and state management
        ├── types.ts          # TypeScript interfaces
        ├── api/
        │   └── analyze.ts    # API client for backend
        └── components/
            ├── URLInput.tsx       # URL input bar with sample links
            ├── LoadingSpinner.tsx # Loading state UI
            └── WordCloud3D.tsx    # 3D visualization engine
```

---

## Quick Start (macOS)

### Option 1 — One command setup
```bash
git clone https://github.com/VijayObjectTech/3D-Word-Cloud-Vijayasimha.git
cd 3D-Word-Cloud-Vijayasimha
chmod +x setup.sh
./setup.sh
```

### Option 2 — Manual setup
```bash
# Backend
cd backend
pip3 install -r requirements.txt
python3 -m uvicorn main:app --reload --port 8000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## API Reference

### GET /health
Check if the server is running.
```json
{ "status": "ok", "service": "3D Word Cloud API" }
```

### POST /analyze
Extract keywords from an article URL.

**Request**
```json
{ "url": "https://en.wikipedia.org/wiki/Artificial_intelligence" }
```

**Response**
```json
{
  "words": [
    { "word": "artificial intelligence", "weight": 1.0 },
    { "word": "machine learning", "weight": 0.87 },
    { "word": "neural networks", "weight": 0.76 }
  ],
  "word_count": 60
}
```

---

## Sample Articles to Try

| Topic | URL |
|-------|-----|
| Artificial Intelligence | https://en.wikipedia.org/wiki/Artificial_intelligence |
| Climate Change | https://en.wikipedia.org/wiki/Climate_change |
| Quantum Computing | https://en.wikipedia.org/wiki/Quantum_computing |

---

## Author

**Vijayasimha Kanukuntla**  
Software Engineer transitioning into AI Engineering  
[GitHub](https://github.com/VijayObjectTech) · [LinkedIn](https://linkedin.com/in/vijayasimhak)