import * as React from "react";
import { createRoot } from "react-dom/client";

const { useCallback, useEffect, useMemo, useRef, useState } = React;

const ICONS = {
  menu: "/MenuOpenFilled.svg",
  people: "https://www.figma.com/api/mcp/asset/8e06817f-50bd-4adb-be11-4a9d3506180c",
  filter: "https://www.figma.com/api/mcp/asset/1fa82386-54c6-4d2d-bd1f-02aae1ca955e",
  thumb: "https://www.figma.com/api/mcp/asset/ddb064aa-c2c4-4065-be3f-893a2556accd",
  verified: "https://www.figma.com/api/mcp/asset/b80090eb-643a-40a8-bc2a-eb6d5a77a06e",
};

const DATA = {
  registrations: { completed: 38 },
  eligibility_quiz: { completed: 32, pending: 2, abandoned: 3 },
  eligibility_filter: { filtered_in: 29, filtered_out: 3 },
  eligibility_confirmation: { confirmed: 26, pending: 1, rejected: 2 },
  esignature: { signed: 23, pending: 1, declined: 1, abandoned: 2 },
  delivery_info: { provided: 21, abandoned: 1 },
  kits: { t1: { activated: 19 }, t2: { activated: 12 } },
  quizzes: { t1: { completed: 15 }, t2: { completed: 10 } },
  microbiome_data: {
    t1: { only_bacteria_arrived: 1, only_fungi_arrived: 1, both_arrived: 13 },
    t2: { only_bacteria_arrived: 2, only_fungi_arrived: 1, both_arrived: 7 },
  },
  reports: {
    t1: { generated: 11, approved: 9, released: 8, seen: 5 },
    t2: { generated: 5, approved: 4, released: 2, seen: 1 },
  },
  total: 10,
  timestamp: 1781187981329,
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
.panel{height:1138px;flex:0 0 1138px;width:100%;background:#fff;border-radius:8px 8px 0 0;padding:24px 0 16px;display:flex;flex-direction:column;gap:50px;overflow:hidden}
.tabs-wrap{padding-left:16px;flex:0 0 auto}
.tabs{height:48px;width:556px;display:flex;gap:16px;align-items:center}
.tab{height:48px;position:relative;padding:0 8px;font-size:15px;font-weight:500;line-height:26px;letter-spacing:.46px;text-transform:uppercase;opacity:.7}
.tab.active{opacity:1}
.tab.active:after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:#282828}
.body{height:1000px;flex:0 0 1000px;width:100%;display:flex;flex-direction:column;gap:40px}
.stats{display:flex;gap:54px;align-items:center;padding:0 40px;flex:0 0 auto;overflow:hidden}
.stat{display:flex;gap:16px;align-items:flex-start;flex:0 0 auto;overflow:hidden}
.stat-icon{width:30px;height:30px;flex:0 0 30px;overflow:hidden;display:flex;align-items:center;justify-content:center}
.stat-icon img{width:100%;height:100%;display:block;object-fit:contain;object-position:center}
.stat-copy{display:flex;gap:16px;align-items:flex-end;color:#282828}
.stat-value{font-size:50px;font-weight:400;line-height:.8;letter-spacing:-1px;white-space:nowrap}
.stat-label{width:109px;font-size:16px;font-weight:400;line-height:1.3;color:#282828}
.diagram-viewport{height:918px;flex:0 0 918px;width:100%;position:relative;overflow:hidden;border-radius:4px;background-color:#fbfaf9;background-image:radial-gradient(rgba(40,40,40,.08) 1px,transparent 1px);background-size:16px 16px;cursor:grab;touch-action:none;user-select:none}
.diagram-viewport.dragging{cursor:grabbing}
.diagram-canvas{position:absolute;left:24px;top:24px;width:1893px;min-height:870px;height:auto;display:flex;align-items:flex-start;gap:56px;will-change:transform}
.flow-section{display:flex;flex-direction:column;align-items:flex-start;gap:24px;flex:0 0 auto}
.participant-section{width:815px}
.tests-column{width:1022px;flex:0 0 1022px;display:flex;flex-direction:column;align-items:flex-start;gap:24px}
.test-section{width:1022px}
.section-title{height:50px;flex:0 0 50px;display:flex;align-items:center;font-size:32px;font-weight:400;line-height:50px;color:#282828;white-space:nowrap;cursor:default}
.chart{position:relative;overflow:hidden;flex:0 0 auto}
.participant-chart{width:815px;height:796px}
.test-chart{width:1022px}
.stage{position:relative;width:100%;height:100%;overflow:hidden}
.inner{position:relative;height:100%;width:var(--w);min-width:var(--w)}
.svg{position:absolute;inset:0;width:var(--w);height:var(--h);overflow:visible;pointer-events:none}
.flow-path{transition:opacity .15s ease}
.node{position:absolute;border-radius:0;outline:1px solid rgba(0,0,0,.04);transition:opacity .15s ease;z-index:1;cursor:default}
.node.good{background:#c1ca85}.node.bad{background:#fa7d88}.node.neut{background:#bb93c2}.node.yellow{background:#ede280}
.label{position:absolute;font-size:12px;line-height:1.2;color:#111827;white-space:nowrap;text-decoration:underline;text-underline-offset:2px;transition:opacity .15s ease;z-index:3;cursor:pointer}
.label.left{transform:translate(-100%,-50%);text-align:right}
.label.right{transform:translateY(-50%);text-align:left}
.label b{font-weight:700}
.step{position:absolute;top:0;transform:translateX(-50%);font-size:14px;font-weight:500;line-height:1.2;color:#111827;white-space:nowrap;text-align:center;z-index:2;cursor:default}
`;

const P = {
  w: 844,
  h: 678,
  scale: 16.9,
  stepGap: 146,
  left: 31,
  top: 30,
  nodeW: 16,
  gap: 18,
  steps: ["Registered", "El. Quiz", "El. Filter", "Confirm", "E-Signature", "Shipping Det."],
  nodes: [
    ["registered", 0, "Registered", DATA.registrations.completed, "good", "right", true],
    ["quiz_completed", 1, "Completed", DATA.eligibility_quiz.completed, "good"],
    ["quiz_pending", 1, "Pending", DATA.eligibility_quiz.pending, "neut"],
    ["quiz_abandoned", 1, "Abandoned", DATA.eligibility_quiz.abandoned, "bad"],
    ["filter_in", 2, "Filtered In", DATA.eligibility_filter.filtered_in, "good"],
    ["filter_out", 2, "Filtered Out", DATA.eligibility_filter.filtered_out, "bad"],
    ["confirmed", 3, "Confirmed", DATA.eligibility_confirmation.confirmed, "good"],
    ["confirm_pending", 3, "Pending", DATA.eligibility_confirmation.pending, "neut"],
    ["rejected", 3, "Rejected", DATA.eligibility_confirmation.rejected, "bad"],
    ["signed", 4, "Signed", DATA.esignature.signed, "good"],
    ["esign_pending", 4, "Pending", DATA.esignature.pending, "neut"],
    ["declined", 4, "Declined", DATA.esignature.declined, "bad"],
    ["esign_abandoned", 4, "Abandoned", DATA.esignature.abandoned, "bad"],
    ["provided", 5, "Provided", DATA.delivery_info.provided, "good"],
    ["ship_abandoned", 5, "Abandoned", DATA.delivery_info.abandoned, "bad"],
  ],
  links: [
    ["registered", "quiz_completed", DATA.eligibility_quiz.completed, "good"],
    ["registered", "quiz_pending", DATA.eligibility_quiz.pending, "neut"],
    ["registered", "quiz_abandoned", DATA.eligibility_quiz.abandoned, "bad"],
    ["quiz_completed", "filter_in", DATA.eligibility_filter.filtered_in, "good"],
    ["quiz_completed", "filter_out", DATA.eligibility_filter.filtered_out, "bad"],
    ["filter_in", "confirmed", DATA.eligibility_confirmation.confirmed, "good"],
    ["filter_in", "confirm_pending", DATA.eligibility_confirmation.pending, "neut"],
    ["filter_in", "rejected", DATA.eligibility_confirmation.rejected, "bad"],
    ["confirmed", "signed", DATA.esignature.signed, "good"],
    ["confirmed", "esign_pending", DATA.esignature.pending, "neut"],
    ["confirmed", "declined", DATA.esignature.declined, "bad"],
    ["confirmed", "esign_abandoned", DATA.esignature.abandoned, "bad"],
    ["signed", "provided", DATA.delivery_info.provided, "good"],
    ["signed", "ship_abandoned", DATA.delivery_info.abandoned, "bad"],
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

function makeKitConfig(key) {
  const kit = DATA.kits[key];
  const quiz = DATA.quizzes[key];
  const microbiome = DATA.microbiome_data[key];
  const reports = DATA.reports[key];

  return {
    w: 1022,
    h: 221,
    scale: KIT_SCALE,
    stepGap: 136.5,
    left: 120,
    top: 32.5,
    nodeW: 17,
    gap: 14,
    steps: KIT_STEPS,
    entries: [["activated", kit.activated, "good"]],
    nodes: [
      ["activated", 0, "Activated", kit.activated, "good", "left"],
      ["completed", 1, "Completed", quiz.completed, "good"],
      ["both", 2, "Both", microbiome.both_arrived, "good"],
      ["bacteria", 2, "Only bacteria", microbiome.only_bacteria_arrived, "neut"],
      ["fungi", 2, "Only fungi", microbiome.only_fungi_arrived, "neut"],
      ["generated", 3, "Generated", reports.generated, "yellow"],
      ["approved", 4, "Approved", reports.approved, "yellow"],
      ["released", 5, "Released", reports.released, "yellow"],
      ["seen", 6, "Seen", reports.seen, "yellow"],
    ],
    links: [
      ["activated", "completed", Math.min(kit.activated, quiz.completed), "good"],
      ["completed", "both", microbiome.both_arrived, "good"],
      ["completed", "bacteria", microbiome.only_bacteria_arrived, "neut"],
      ["completed", "fungi", microbiome.only_fungi_arrived, "neut"],
      ["both", "generated", Math.min(microbiome.both_arrived, reports.generated), "yellow"],
      ["generated", "approved", Math.min(reports.generated, reports.approved), "yellow"],
      ["approved", "released", Math.min(reports.approved, reports.released), "yellow"],
      ["released", "seen", Math.min(reports.released, reports.seen), "yellow"],
    ],
  };
}

const K1 = makeKitConfig("t1");
const K2 = makeKitConfig("t2");

function getRequiredChartHeight(cfg) {
  let maxBottom = cfg.top;

  cfg.steps.forEach((_, step) => {
    let y = cfg.top;

    cfg.nodes
      .filter((node) => node[1] === step && node[3] > 0)
      .forEach((node) => {
        y += node[3] * cfg.scale;
        maxBottom = Math.max(maxBottom, y);
        y += cfg.gap;
      });
  });

  return Math.max(cfg.h, Math.ceil(maxBottom + 24));
}

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
  const entryPaths = (cfg.entries || [])
    .filter(([to, value]) => value > 0 && map[to])
    .map(([to, value, type]) => {
      const target = map[to];
      const sw = Math.min(value * cfg.scale, target.h);
      const targetOffset = incoming[to] || 0;
      incoming[to] = targetOffset + sw;

      const x1 = 0;
      const y1 = target.y + targetOffset + sw / 2;
      const x2 = target.x;
      const y2 = y1;
      const mx = (x1 + x2) / 2;

      return {
        id: `entry-${to}`,
        from: null,
        to,
        d: `M${x1} ${y1} C${mx} ${y1},${mx} ${y2},${x2} ${y2}`,
        sw,
        type,
      };
    });

  const linkedPaths = cfg.links
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
        id: `${from}-${to}`,
        from,
        to,
        d: `M${x1} ${y1} C${mx} ${y1},${mx} ${y2},${x2} ${y2}`,
        sw,
        type,
      };
    });

  return { nodes: Object.values(map), paths: [...entryPaths, ...linkedPaths] };
}

function Sankey({ cfg, chartId, hovered, onHover }) {
  const data = useMemo(() => build(cfg), [cfg]);
  const chartHeight = getRequiredChartHeight(cfg);
  const hasHoveredLabel = hovered !== null;
  const activeChart = hovered?.chartId === chartId;

  return (
    <div className="stage" style={{ "--w": `${cfg.w}px`, "--h": `${chartHeight}px` }}>
      <div className="inner">
        <svg className="svg" width={cfg.w} height={chartHeight} viewBox={`0 0 ${cfg.w} ${chartHeight}`}>
          {data.paths.map((path) => {
            const isIncomingFlow = activeChart && path.to === hovered?.nodeId;
            const opacity = hasHoveredLabel ? (isIncomingFlow ? 0.35 : 0.15) : 0.35;

            return (
              <path
                className="flow-path"
                key={path.id}
                d={path.d}
                fill="none"
                stroke={`var(--${path.type})`}
                strokeWidth={path.sw}
                strokeLinecap="butt"
                opacity={opacity}
              />
            );
          })}
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

        {data.nodes.map((node) => {
          const isActiveNode = activeChart && hovered?.nodeId === node.id;
          const opacity = hasHoveredLabel ? (isActiveNode ? 1 : 0.5) : 1;

          return (
            <div
              className={`node ${node.type}`}
              key={node.id}
              style={{ left: node.x, top: node.y, width: node.w, height: node.h, opacity }}
            />
          );
        })}

        {data.nodes.map((node) => {
          if (node.hideLabel) return null;

          const isActiveLabel = activeChart && hovered?.nodeId === node.id;
          const opacity = hasHoveredLabel ? (isActiveLabel ? 1 : 0.7) : 1;
          const isRight = node.side === "right";

          return (
            <div
              className={`label ${isRight ? "right" : "left"}`}
              key={`${node.id}-label`}
              style={{
                left: isRight ? node.x + node.w + 10 : node.x - 10,
                top: node.y + node.h / 2,
                opacity,
              }}
              onMouseEnter={() => onHover({ chartId, nodeId: node.id })}
              onMouseLeave={() => onHover(null)}
            >
              {node.label} (<b>{node.value}</b>)
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getVisibleViewportSize(viewport) {
  const rect = viewport.getBoundingClientRect();
  const visibleWidth = Math.max(
    0,
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0),
  );
  const visibleHeight = Math.max(
    0,
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
  );

  return {
    width: Math.min(viewport.clientWidth, visibleWidth || viewport.clientWidth),
    height: Math.min(viewport.clientHeight, visibleHeight || viewport.clientHeight),
  };
}

function clampPan(point, viewport, canvas) {
  if (!viewport || !canvas) return point;

  const visible = getVisibleViewportSize(viewport);
  const minX = Math.min(0, visible.width - canvas.offsetWidth - 48);
  const minY = Math.min(0, visible.height - canvas.offsetHeight - 48);

  return {
    x: Math.max(minX, Math.min(0, point.x)),
    y: Math.max(minY, Math.min(0, point.y)),
  };
}

function DiagramBoard({ children }) {
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const dragRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const constrainPan = useCallback(
    (point) => clampPan(point, viewportRef.current, canvasRef.current),
    [],
  );

  useEffect(() => {
    const handleViewportChange = () => {
      setPan((current) => constrainPan(current));
    };

    const observer = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(handleViewportChange);

    if (observer && viewportRef.current) observer.observe(viewportRef.current);
    if (observer && canvasRef.current) observer.observe(canvasRef.current);

    window.addEventListener("resize", handleViewportChange);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [constrainPan]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    if (event.target.closest(".label,.node,.step,.section-title")) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    setDragging(true);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    setPan(
      constrainPan({
        x: drag.panX + event.clientX - drag.startX,
        y: drag.panY + event.clientY - drag.startY,
      }),
    );
  };

  const stopDragging = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={viewportRef}
      className={`diagram-viewport${dragging ? " dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <div
        ref={canvasRef}
        className="diagram-canvas"
        style={{ transform: `translate3d(${pan.x}px, ${pan.y}px, 0)` }}
      >
        {children}
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
  const [hovered, setHovered] = useState(null);

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
                    <Stat src={ICONS.people} value={DATA.registrations.completed} lines={["Total", "Participants"]} />
                    <Stat src={ICONS.filter} value={DATA.eligibility_filter.filtered_in} lines={["Filtered In", "Participants"]} />
                    <Stat src={ICONS.thumb} value={DATA.eligibility_confirmation.confirmed} lines={["Confirmed", "Participants"]} />
                    <Stat src={ICONS.verified} value={DATA.total} lines={["Completed", "Tests"]} />
                  </div>

                  <DiagramBoard>
                    <section className="flow-section participant-section">
                      <h2 className="section-title">Participant flow</h2>
                      <div className="chart participant-chart">
                        <Sankey
                          cfg={P}
                          chartId="participant"
                          hovered={hovered}
                          onHover={setHovered}
                        />
                      </div>
                    </section>

                    <div className="tests-column">
                      <section className="flow-section test-section">
                        <h2 className="section-title">Test 1</h2>
                        <div className="chart test-chart" style={{ height: getRequiredChartHeight(K1) }}>
                          <Sankey cfg={K1} chartId="test-1" hovered={hovered} onHover={setHovered} />
                        </div>
                      </section>

                      <section className="flow-section test-section">
                        <h2 className="section-title">Test 2</h2>
                        <div className="chart test-chart" style={{ height: getRequiredChartHeight(K2) }}>
                          <Sankey cfg={K2} chartId="test-2" hovered={hovered} onHover={setHovered} />
                        </div>
                      </section>
                    </div>
                  </DiagramBoard>
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
