export function LoadingSpinner() {
    return (
      <div style={{
        position: "fixed", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 16, pointerEvents: "none",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          border: "3px solid #4b5563",
          borderTopColor: "#7c3aed",
          animation: "spin 0.8s linear infinite",
        }} />
        <p style={{ color: "#9ca3af", fontSize: 14 }}>Extracting keywords…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }