import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function KpiCard({ title, value, subtitle }) {
  const styles = {
    card: {
      borderRadius: 16,
      padding: 18,
      background: "linear-gradient(135deg, #2d4cff 0%, #1f2fb0 100%)",
      boxShadow: "0 10px 24px rgba(0,0,0,.35)",
      color: "#fff",
      minHeight: 92,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: { fontSize: 12, letterSpacing: 0.6, fontWeight: 700, opacity: 0.9, textTransform: "uppercase" },
    value: { marginTop: 6, fontSize: 34, fontWeight: 800, lineHeight: 1.05 },
    subtitle: { marginTop: 6, fontSize: 12, opacity: 0.85 },
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>{title}</div>
      <div style={styles.value}>{value}</div>
      {subtitle ? <div style={styles.subtitle}>{subtitle}</div> : null}
    </div>
  );
}

export default App;
