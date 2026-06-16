import { createRoot } from "react-dom/client";

const styles = `
  * { box-sizing: border-box; }
  html, body, #root {
    width: 100%;
    min-height: 100%;
    margin: 0;
  }
  body {
    font-family: Inter, Arial, sans-serif;
    background: #f7f6f0;
    color: #1f1f1f;
  }
  .smoke-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px;
  }
  .smoke-card {
    width: min(720px, 100%);
    background: #ffffff;
    border: 1px solid #ded8cf;
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.12);
    padding: 32px;
  }
  .red-square {
    width: 160px;
    height: 160px;
    background: #ff2d2d;
    border-radius: 12px;
    margin-bottom: 24px;
    box-shadow: 0 12px 32px rgba(255, 45, 45, 0.35);
  }
  h1 {
    margin: 0 0 12px;
    font-size: 32px;
    line-height: 1.15;
  }
  p {
    margin: 0 0 10px;
    font-size: 16px;
    line-height: 1.5;
  }
  code {
    background: #f0ece5;
    padding: 2px 6px;
    border-radius: 6px;
  }
`;

function App() {
  return (
    <>
      <style>{styles}</style>
      <main className="smoke-page">
        <section className="smoke-card">
          <div className="red-square" />
          <h1>Vercel deploy is connected ✅</h1>
          <p>If you see this red square, GitHub → Vercel → browser works.</p>
          <p>Repository: <code>root3453/hb_diagram</code></p>
          <p>Branch: <code>main</code></p>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
