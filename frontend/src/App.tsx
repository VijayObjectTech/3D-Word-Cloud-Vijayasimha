import { useState } from "react";
import { URLInput } from "./components/URLInput";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { WordCloud3D } from "./components/WordCloud3D";
import { analyzeUrl } from "./api/analyze";
import type { WordData } from "./types";

export default function App() {
  const [words, setWords] = useState<WordData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(url: string) {
    if (!url) return;
    setLoading(true);
    setError(null);
    setWords([]);
    try {
      const data = await analyzeUrl(url);
      setWords(data.words);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <URLInput onSubmit={handleSubmit} loading={loading} />

      {loading && <LoadingSpinner />}

      {error && (
        <div style={{
          position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
          background: "#450a0a", border: "1px solid #991b1b",
          color: "#fca5a5", padding: "12px 20px", borderRadius: 8,
          maxWidth: 420, textAlign: "center", fontSize: 14, zIndex: 20,
        }}>
          ⚠ {error}
        </div>
      )}

      {words.length === 0 && !loading && !error && (
        <div style={{
          position: "fixed", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 8, pointerEvents: "none",
        }}>
          <p style={{ color: "#4b5563", fontSize: 16 }}>
            Enter a URL above to generate a 3D word cloud
          </p>
        </div>
      )}

      {words.length > 0 && <WordCloud3D words={words} />}
    </div>
  );
}