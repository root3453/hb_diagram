import * as React from "react";
import { createRoot } from "react-dom/client";

const { useMemo } = React;

const ICONS = {
  menu: "/MenuOpenFilled.svg",
  people: "https://www.figma.com/api/mcp/asset/8e06817f-50bd-4adb-be11-4a9d3506180c",
  filter: "https://www.figma.com/api/mcp/asset/1fa82386-54c6-4d2d-bd1f-02aae1ca955e",
  thumb: "https://www.figma.com/api/mcp/asset/ddb064aa-c2c4-4065-be3f-893a2556accd",
  verified: "https://www.figma.com/api/mcp/asset/b80090eb-643a-40a8-bc2a-eb6d5a77a06e",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{--good:#c1ca85;--bad:#fa7d88;--neut:#bb93c2;--yellow:#ede280}
html,body,#root{width:100%;height:100%;min-height:100%}
body{font-family:Poppins,Arial,sans-serif;background:#f7f6f0;color:#282828;overflow:hidden}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
.page{width:100vw;height:100vh;display:flex;align-items:stretch;background:#f7f6f0;overflow:hidden}
.sidebar{width:259px;min-width:259px;flex:0 0 259px;height:100vh;background:#fff}
.main{flex:1 1 auto;min-width:0;height:100vh;display:flex;flex-direction:column;gap:8px}
.topbar{height:56px;flex:0 0 56px;width:100%;display:flex;align-items:center;justify-content:space-between;padding:0 8px}
.menu{width:30px;height:30px}
.menu img{width:30px;height:30px;display:block}
.avatar-wrap{height:56px;padding:8px 16px;display:flex;align-items:center}
.avatar{width:40px;height:40px;border-radius:200px;background:#aba698;color:#e9e8e0;display:grid;place-items:center;font-size:25px;font-weight:400;line-height:1}
.content{flex:1 1 auto;min-height:0;width:100%;padding:8px 32px 24px 24px;overflow:hidden}
.stack{height:100%;min-height:0;width:100%;display:flex;flex-direction:column;gap:16px}
.title-row{height:50px;flex:0 0 50px;display:flex;align-items:center;gap:16px}
.back{width:40px;height:40px;flex:0 0 40px}
.back img{width:40px;height:40px;display:block}
.title{font-size:40px;font-weight:400;line-height:50px;white-space:nowrap;color:#282828}
.panel{flex:1 1 auto;min-height:0;width:100%;background:#fff;border-radius:8px 8px 0 0;padding:24px 0 16px;display:flex;flex-direction:column;gap:50px;overflow:hidden}
.tabs-wrap{padding-left:16px;flex:0 0 auto}
.tabs{height:48px;width:556px;display:flex;gap:16px;align-items:center}
.tab{height:48px;position:relative;padding:0 8px;font-size:15px;font-weight:500;line-height:26px;letter-spacing:.46px;text-transform:uppercase;opacity:.7}
.tab.active{opacity:1}
.tab.active:after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:#282828}
.body{flex:1 1 auto;min-height:0;width:100%;display:flex;flex-direction:column;gap:40px}
.stats{display:flex;gap:54px;align-items:center;padding:0 40px;flex:0 0 auto;overflow:hidden}
.stat{display:flex;gap:16px;align-items:flex-start;flex:0 0 auto;overflow:hidden}
.stat-icon{width:30px;height:30px;flex:0 0 30px;overflow:hidden}
.stat-icon img{width:30px;height:30px;display:block}
.stat-copy{display:flex;gap:16px;align-items:flex-end;color:#282828}
.stat-value{font-size:50px;font-weight:400;line-height:.8;letter-spacing:-1px;white-space:nowrap}
.stat-label{width:109px;font-size:16px;font-weight:400;line-height:1.3;color:#282828}
.grid{flex:1 1 auto;min-height:0;width:100%;padding:0 16px;display:flex;gap:16px;align-items:stretch;overflow:hidden}
.flow-card{width:870px;flex:0 0 870px;background:#fbfaf9;border-radius:4px;padding:24px 0 24px 24px;display:flex;flex-direction:column;gap:24px;overflow:hidden}
.kits{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:16px;justify-content:flex-start}
.kit-card{height:340px;flex:0 0 340px;min-width:0;background:#fafaf9;border-radius:4px;padding:24px 24px 24px 0;display:flex;flex-direction:column;gap:24px;overflow:hidden}
.card-title{height:50px;flex:0 0 50px;font-size:32px;font-weight:400;line-height:50px;color:#282828;white-space:nowrap}
.kit-card .card-title{padding-left:40px}
.chart{flex:1 1 auto;min-width:0;min-height:0;overflow:hidden;position:relative;background-image:radial-gradient(rgba(40,40,40,.08) 1px,transparent 1px);background-size:16px 16px}
.stage{position:relative;width:100%;height:100%;overflow:hidden}
.inner{position:relative;height:100%;min-width:var(--w)}
.svg{position:absolute;inset:0;width:var(--w);height:var(--h);overflow:visible;pointer-events:none}
.node{position:absolute;border-radius:0;outline:1px solid rgba(0,0,0,.04)}
.node.good{background:#c1ca85}.node.bad{background:#fa7d88}.node.neut{background:#bb93c2}.node.yellow{background:#ede280}
.label{position:absolute;top:50%;transform:translateY(-50%);font-size:12px;line-height:1.2;color:#111827;white-space:nowrap;text-decoration:underline;text-underline-offset:2px}
.label.left{right:calc(100% + 10px);text-align:right}.label.right{left:calc(100% + 10px);text-align:left}
.label b{font-weight:700}
.step{position:absolute;top:0;transform:translateX(-50%);font-size:14px;font-weight:500;line-height:1.2;color:#111827;white-space:nowrap;text-align:center;z-index:2}
`;

const P = {
  w: 844,
  h: 678,
  scale: 16.9,
  stepGap: 146,
  left: 0,
  top: 30,
  nodeW: 16,
  gap: 18,
  steps: ["Registered", "El. Quiz", "El. Filter", "Confirm", "E-Signature", "Shipping Det."],
  nodes: [
    ["registered", 0, "Registered", 38, "good", "right", true],
    ["quiz_completed", 1, "Completed", 27, "good"],
    ["quiz_pending", 1, "Pending", 2, "neut"],
    ["quiz_abandoned", 1, "Abandoned", 3, "bad"],
    ["filter_in", 2, "Filtered In", 24, "good"],
    ["filter_out", 2, "Filtered Out", 3, "bad"],
    ["confirmed", 3, "Confirmed", 21, "good"],
    ["confirm_pending", 3, "Pending", 2, "neut"],
    ["rejected", 3, "Rejected", 1, "bad"],
    ["signed", 4, "Signed", 15, "good"],
    ["esign_pending", 4, "Pending", 1, "neut"],
    ["declined", 4, "Declined", 1, "bad"],
    ["esign_abandoned", 4, "Abandoned", 2, "bad"],
    ["provided", 5, "Provided", 14, "good"],
    ["ship_abandoned", 5, "Abandoned", 1, "bad"],
  ],
  links: [
    ["registered", "quiz_completed", 27, "good"],
    ["registered", "quiz_pending", 2, "neut"],
    ["registered", "quiz_abandoned", 3, "bad"],
    ["quiz_completed", "filter_in", 24, "good"],
    ["quiz_completed", "filter_out", 3, "bad"],
    ["filter_in", "confirmed", 21, "good"],
    ["filter_in", "confirm_pending", 2, "neut"],
    ["filter_in", "rejected", 1, "bad"],
    ["confirmed", "signed", 15, "good"],
    ["confirmed", "esign_pending", 1, "neut"],
    ["confirmed", "declined", 1, "bad"],
    ["confirmed", "esign_abandoned", 2, "bad"],
    ["signed", "provided", 14, "good"],
    ["signed", "ship_abandoned", 1, "bad"],
  ],
};

const KIT_STEPS = [
  "Kit activated",
  "Quiz completed",
  "Data arrived",
  "Report generated",
  "Report approved",
  "Report released",
  "Report seen",
];

const KIT_SCALE = 15.7;

const K1 = {
  w: 1022,
  h: 221,
  scale: KIT_SCALE,
  stepGap: 136.5,
  left: 120,
  top: 32.5,
  nodeW: 17,
  gap: 14,
  steps: KIT_STEPS,
  nodes: [
    ["activated", 0, "Activated", 12, "good", "left"],
    ["completed", 1, "Completed", 10, "good"],
    ["both", 2, "Both", 8, "good"],
    ["bacteria", 2, "Only bacteria", 1, "neut"],
    ["fungi", 2, "Only fungi", 1, "neut"],
    ["generated", 3, "Generated", 4, "yellow"],
    ["approved", 4, "Approved", 3, "yellow"],
    ["released", 5, "Released", 2, "yellow"],
    ["seen", 6, "Seen", 2, "yellow"],
  ],
  links: [
    ["activated", "completed", 10, "good"],
    ["completed", "both", 8, "good"],
    ["completed", "bacteria", 1, "neut"],
    ["completed", "fungi", 1, "neut"],
    ["both", "generated", 4, "yellow"],
    ["generated", "approved", 3, "yellow"],
    ["approved", "released", 2, "yellow"],
    ["released", "seen", 2, "yellow"],
  ],
};

const K2 = {
  ...K1,
  nodes: [
    ["activated", 0, "Activated", 7, "good", "left"],
    ["completed", 1, "Completed", 5, "good"],
    ["both", 2, "Both", 4, "good"],
    ["bacteria", 2, "Only bacteria", 1, "neut"],
    ["fungi", 2, "Only fungi", 0, "neut"],
    ["generated", 3, "Generated", 4, "yellow"],
    ["approved", 4, "Approved", 3, "yellow"],
    ["released", 5, "Released", 2, "yellow"],
    ["seen", 6, "Seen", 2, "yellow"],
  ],
  links: [
    ["activated", "completed", 5, "good"],
    ["completed", "both", 4, "good"],
    ["completed", "bacteria", 1, "neut"],
    ["completed", "fungi", 0, "neut"],
    ["both", "generated", 4, "yellow"],
    ["generated", "approved", 3, "yellow"],
    ["approved", "released", 2, "yellow"],
    ["released", "seen", 2, "yellow"],
  ],
};

function build(cfg) {
  const map = {};
  const visibleNodes = cfg.nodes.filter((node) => node[3] > 0);

  cfg.steps.forEach((_, step) => {
    let y = cfg.top;

    visibleNodes
      .filter((node) => node[1] === step)
      .forEach((node) => {
        const [id, nodeStep, label, value, type, side, hideLabel = false] = node;
        const h = value * cfg.scale;

        map[id] = {
          id,
          step: nodeStep,
          label,
          value,
          type,
          side,
          hideLabel,
          x: cfg.left + step * cfg.stepGap,
          y,
          w: cfg.nodeW,
          h,
        };

        y += h + cfg.gap;
      });
  });

  const out = {};
  const incoming = {};
  const paths = cfg.links
    .filter(([from, to, value]) => value > 0 && map[from] && map[to])
    .map(([from, to, value, type]) => {
      const source = map[from];
      const target = map[to];
      const sw = value * cfg.scale;
      const sourceOffset = out[from] || 0;
      const targetOffset = incoming[to] || 0;

      out[from] = sourceOffset + sw;
      incoming[to] = targetOffset + sw;

      const x1 = source.x + source.w;
      const y1 = source.y + sourceOffset + sw / 2;
      const x2 = target.x;
      const y2 = target.y + targetOffset + sw / 2;
      const mx = (x1 + x2) / 2;

      return {
        d: `M${x1} ${y1} C${mx} ${y1},${mx} ${y2},${x2} ${y2}`,
        sw,
        type,
      };
    });

  return { nodes: Object.values(map), paths };
}

function Sankey({ cfg }) {
  const data = useMemo(() => build(cfg), [cfg]);

  return (
    <div className="stage" style={{ "--w": `${cfg.w}px`, "--h": `${cfg.h}px` }}>
      <div className="inner">
        <svg className="svg" width={cfg.w} height={cfg.h} viewBox={`0 0 ${cfg.w} ${cfg.h}`}>
          {data.paths.map((path, index) => (
            <path
              key={index}
              d={path.d}
              fill="none"
              stroke={`var(--${path.type})`}
              strokeWidth={path.sw}
              strokeLinecap="butt"
              opacity="0.62"
            />
          ))}
        </svg>

        {cfg.steps.map((step, index) => (
          <div
            className="step"
            key={step}
            style={{ left: cfg.left + index * cfg.stepGap + cfg.nodeW / 2 }}
          >
            {step}
          </div>
        ))}

        {data.nodes.map((node) => (
          <div
            className={`node ${node.type}`}
            key={node.id}
            style={{ left: node.x, top: node.y, width: node.w, height: node.h }}
          >
            {!node.hideLabel && (
              <div className={`label ${node.side || "left"}`}>
                {node.label} (<b>{node.value}</b>)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ src, value, lines }) {
  return (
    <div className="stat">
      <div className="stat-icon"><img src={src} alt="" /></div>
      <div className="stat-copy">
        <div className="stat-value">{value}</div>
        <div className="stat-label">
          {lines.map((line) => (
            <React.Fragment key={line}>{line}<br /></React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <style>{css}</style>
      <div className="page">
        <aside className="sidebar" />
        <main className="main">
          <header className="topbar">
            <button className="menu"><img src={ICONS.menu} alt="" /></button>
            <div className="avatar-wrap"><div className="avatar">A</div></div>
          </header>

          <section className="content">
            <div className="stack">
              <div className="title-row">
                <button className="back"><img src="/NavigateBeforeFilled.svg" alt="Back" /></button>
                <h1 className="title">Arbonne Main Study</h1>
              </div>

              <div className="panel">
                <div className="tabs-wrap">
                  <nav className="tabs">
                    <button className="tab active">Dashboard</button>
                    <button className="tab">Participants</button>
                    <button className="tab">Settings</button>
                  </nav>
                </div>

                <div className="body">
                  <div className="stats">
                    <Stat src={ICONS.people} value="38" lines={["Total", "Participants"]} />
                    <Stat src={ICONS.filter} value="24" lines={["Filtered In", "Participants"]} />
                    <Stat src={ICONS.thumb} value="21" lines={["Confirmed", "Participants"]} />
                    <Stat src={ICONS.verified} value="3" lines={["Completed", "Tests"]} />
                  </div>

                  <div className="grid">
                    <section className="flow-card">
                      <h2 className="card-title">Participant flow</h2>
                      <div className="chart"><Sankey cfg={P} /></div>
                    </section>

                    <div className="kits">
                      <section className="kit-card">
                        <h2 className="card-title">Kit #1</h2>
                        <div className="chart"><Sankey cfg={K1} /></div>
                      </section>

                      <section className="kit-card">
                        <h2 className="card-title">Kit #2</h2>
                        <div className="chart"><Sankey cfg={K2} /></div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
