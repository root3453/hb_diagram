import * as React from "react";
import { createRoot } from "react-dom/client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LabelIcon from "@mui/icons-material/Label";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import QuizIcon from "@mui/icons-material/Quiz";
import ScienceIcon from "@mui/icons-material/Science";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

const { useMemo, useState } = React;

const css = `
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#f7f6f0;
  --paper:#fff;
  --text:#282828;
  --muted:#6d6d6d;
  --line:#e6e0d8;
  --active:#e7f2f0;
  --brand:#315d58;
  --good:#c1ca85;
  --bad:#fa7d88;
  --neut:#bb93c2;
  --yellow:#f2df5a;
}
html,body,#root{min-height:100%}
body{
  min-width:1180px;
  font-family:Poppins,Inter,Arial,sans-serif;
  background:var(--bg);
  color:var(--text);
}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
.react-debug{position:fixed;z-index:9999;top:10px;right:10px;background:#dcfce7;color:#14532d;border:1px solid #86efac;border-radius:999px;padding:7px 12px;font:700 12px/1 Inter,Arial,sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.12)}
.shell{min-height:100vh;display:grid;grid-template-columns:259px minmax(0,1fr);background:var(--bg)}
.sidebar{background:var(--paper);min-height:100vh;overflow:hidden}
.logo-wrap{height:88px;display:flex;align-items:center;padding:16px 30px}
.logo{
  width:200px;height:48px;display:grid;place-items:center;border:1px solid #d9d6cf;
  color:#234943;font-size:21px;font-weight:600;letter-spacing:.08em;
}
.nav{display:grid;gap:8px;padding:16px 8px 16px 16px}
.nav-item{
  height:48px;display:grid;grid-template-columns:24px 1fr 30px;align-items:center;gap:4px;
  padding:8px 16px;color:#282828;text-align:left;
}
.nav-item.active{background:var(--active)}
.nav-item svg{font-size:24px;color:#282828}
.nav-item span{font-size:16px;line-height:24px;letter-spacing:.15px}
.nav-item .chevron{justify-self:center;font-size:30px}
.nav-item .spacer{width:30px;height:30px}
.app{min-width:0}
.topbar{
  height:56px;background:var(--paper);display:flex;align-items:center;justify-content:space-between;padding:0 8px;
}
.icon-btn{width:40px;height:40px;display:grid;place-items:center;border-radius:50%}
.icon-btn svg{font-size:30px;color:#282828}
.avatar-wrap{width:72px;height:56px;display:grid;place-items:center}
.avatar{
  width:40px;height:40px;border-radius:50%;display:grid;place-items:center;
  background:#d1d9d6;color:#213f3a;font-size:20px;font-weight:500;
}
.content{padding:8px 32px 24px 24px}
.study-head{height:50px;display:flex;align-items:center;gap:16px}
.back{width:40px;height:40px;display:grid;place-items:center}
.back svg{font-size:40px;color:#282828}
.title{font-size:34px;line-height:50px;font-weight:500;color:#1f1f1f}
.tabs{
  height:72px;display:flex;align-items:flex-end;gap:16px;padding-left:16px;
  border-bottom:1px solid var(--line);margin-top:16px;
}
.tab{
  height:48px;padding:0 16px;display:grid;place-items:center;border-bottom:2px solid transparent;
  color:#4d4d4d;font-size:15px;letter-spacing:.4px;
}
.tab.active{color:#111;border-bottom-color:#111}
.metrics{display:flex;gap:54px;padding:42px 0 40px 40px}
.metric{height:42px;min-width:200px;display:grid;gap:2px}
.metric b{font-size:22px;line-height:26px;font-weight:500}
.metric span{font-size:13px;line-height:16px;color:var(--muted)}
.dashboard-grid{display:grid;grid-template-columns:minmax(620px,870px) minmax(620px,1fr);gap:16px}
.kits{display:grid;gap:16px;align-content:start}
.card{background:var(--paper);border:1px solid var(--line);overflow:hidden}
.card-head{
  min-height:54px;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--line);
}
.card-title{font-size:20px;line-height:24px;font-weight:400}
.card-note{color:var(--muted);font-size:12px}
.diagram{
  position:relative;overflow:auto;background-image:radial-gradient(rgba(40,40,40,.08) 1px,transparent 1px);
  background-size:16px 16px;
}
.node{
  position:absolute;border-radius:2px;cursor:pointer;transition:background-color .12s ease,outline-color .12s ease;
  outline:1px solid rgba(0,0,0,.04);
}
.node.good{background:var(--good)}
.node.bad{background:var(--bad)}
.node.neut{background:var(--neut)}
.node.yellow{background:var(--yellow)}
.node.good.hovered{background:#b5bf73}
.node.bad.hovered{background:#ef6a76}
.node.neut.hovered{background:#aa80b3}
.node.yellow.hovered{background:#dfcc45}
.label{
  position:absolute;top:50%;transform:translateY(-50%);font-size:9px;line-height:1.15;white-space:nowrap;
  text-decoration:underline;text-underline-offset:2px;color:#1f2933;
}
.label.left{right:calc(100% + 8px);text-align:right}
.label.right{left:calc(100% + 8px)}
.label b{font-weight:700}
.step-label{
  position:absolute;top:12px;transform:translateX(-50%);font-size:9px;color:#1f2933;white-space:nowrap;
}
.svg{position:absolute;inset:0;pointer-events:none;overflow:visible}
.tt{
  position:fixed;pointer-events:none;z-index:20;background:#fff;border:1px solid #ddd;padding:6px 10px;
  font-size:12px;color:#222;box-shadow:0 10px 25px rgba(0,0,0,.08);
}
@media(max-width:1280px){
  body{min-width:0}
  .shell{grid-template-columns:88px minmax(0,1fr)}
  .logo{width:48px;font-size:14px;letter-spacing:0}
  .logo-wrap{padding:16px 20px}
  .nav-item{grid-template-columns:24px;padding:8px 16px;width:56px}
  .nav-item span,.nav-item .chevron,.nav-item .spacer{display:none}
  .dashboard-grid{grid-template-columns:1fr}
  .metrics{flex-wrap:wrap;gap:24px;padding-left:16px}
}
`;

const DATA = {
  registrations: { completed: 38 },
  eligibility_quiz: { completed: 27, pending: 2, abandoned: 3 },
  eligibility_filter: { filtered_in: 24, filtered_out: 3 },
  eligibility_confirmation: { confirmed: 21, pending: 1, rejected: 2 },
  esignature: { signed: 15, pending: 1, declined: 1, abandoned: 2 },
  delivery_info: { provided: 14, abandoned: 1 },
  kits: { t1: { activated: 12 }, t2: { activated: 7 } },
  quizzes: { t1: { completed: 10 }, t2: { completed: 5 } },
  microbiome_data: {
    t1: { only_bacteria_arrived: 1, only_fungi_arrived: 1, both_arrived: 8 },
    t2: { only_bacteria_arrived: 1, only_fungi_arrived: 0, both_arrived: 3 },
  },
  reports: {
    t1: { generated: 2, approved: 3, released: 1, seen: 1 },
    t2: { generated: 1, approved: 0, released: 0, seen: 1 },
  },
  total: 10,
  timestamp: 1781187981329,
};

const FLOW_STEPS = ["Registered", "El. Quiz", "El. Filter", "Confirm", "E-Signature", "Shipping Det."];
const KIT_STEPS = ["Kit activated", "Quiz completed", "Data arrived", "Report generated", "Report approved", "Report released", "Report seen"];
const NODE_W = 14;
const GAP = 10;
const FLOW_SCALE = 14;
const KIT_SCALE = 18;

const navItems = [
  [DashboardIcon, "Dashboard"],
  [HelpOutlineIcon, "Questions"],
  [QuizIcon, "Quizzles"],
  [Inventory2Icon, "Kits", true],
  [LocalShippingIcon, "Packages", true],
  [ArticleIcon, "Reports"],
  [PeopleIcon, "Users"],
  [MenuBookIcon, "Glossary"],
  [PersonIcon, "Admins"],
  [PeopleIcon, "Clients"],
  [LabelIcon, "Tags"],
  [MenuBookIcon, "Guides"],
  [SettingsSuggestIcon, "Regimen", true],
  [ScienceIcon, "Studies", false, true],
];

function makeParticipantNodes(data) {
  return [
    { id: "registered", step: 0, label: "Completed", value: data.registrations.completed, type: "good", side: "right" },
    { id: "quiz_completed", step: 1, label: "Completed", value: data.eligibility_quiz.completed, type: "good" },
    { id: "quiz_pending", step: 1, label: "Pending", value: data.eligibility_quiz.pending, type: "neut" },
    { id: "quiz_abandoned", step: 1, label: "Abandoned", value: data.eligibility_quiz.abandoned, type: "bad" },
    { id: "filter_in", step: 2, label: "Filtered In", value: data.eligibility_filter.filtered_in, type: "good" },
    { id: "filter_out", step: 2, label: "Filtered Out", value: data.eligibility_filter.filtered_out, type: "bad" },
    { id: "confirm_confirmed", step: 3, label: "Confirmed", value: data.eligibility_confirmation.confirmed, type: "good" },
    { id: "confirm_pending", step: 3, label: "Pending", value: data.eligibility_confirmation.pending, type: "neut" },
    { id: "confirm_rejected", step: 3, label: "Rejected", value: data.eligibility_confirmation.rejected, type: "bad" },
    { id: "esign_signed", step: 4, label: "Signed", value: data.esignature.signed, type: "good" },
    { id: "esign_pending", step: 4, label: "Pending", value: data.esignature.pending, type: "neut" },
    { id: "esign_declined", step: 4, label: "Declined", value: data.esignature.declined, type: "bad" },
    { id: "esign_abandoned", step: 4, label: "Abandoned", value: data.esignature.abandoned, type: "bad" },
    { id: "delivery_provided", step: 5, label: "Provided", value: data.delivery_info.provided, type: "good" },
    { id: "delivery_abandoned", step: 5, label: "Abandoned", value: data.delivery_info.abandoned, type: "bad" },
  ];
}

function makeParticipantLinks() {
  return [
    ["registered", "quiz_completed"],
    ["registered", "quiz_pending"],
    ["registered", "quiz_abandoned"],
    ["quiz_completed", "filter_in"],
    ["quiz_completed", "filter_out"],
    ["filter_in", "confirm_confirmed"],
    ["filter_in", "confirm_pending"],
    ["filter_in", "confirm_rejected"],
    ["confirm_confirmed", "esign_signed"],
    ["confirm_confirmed", "esign_pending"],
    ["confirm_confirmed", "esign_declined"],
    ["confirm_confirmed", "esign_abandoned"],
    ["esign_signed", "delivery_provided"],
    ["esign_signed", "delivery_abandoned"],
  ];
}

function makeKitNodes(data, key) {
  return [
    { id: `${key}_activated`, step: 0, label: "Activated", value: data.kits[key].activated, type: "good", side: "left" },
    { id: `${key}_quiz`, step: 1, label: "Completed", value: data.quizzes[key].completed, type: "good", side: "right" },
    { id: `${key}_both`, step: 2, label: "Both", value: data.microbiome_data[key].both_arrived, type: "good", side: "right" },
    { id: `${key}_bacteria`, step: 2, label: "Only bacteria", value: data.microbiome_data[key].only_bacteria_arrived, type: "neut", side: "right" },
    { id: `${key}_fungi`, step: 2, label: "Only fungi", value: data.microbiome_data[key].only_fungi_arrived, type: "neut", side: "right" },
    { id: `${key}_generated`, step: 3, label: "Generated", value: data.reports[key].generated, type: "yellow", side: "right" },
    { id: `${key}_approved`, step: 4, label: "Approved", value: data.reports[key].approved, type: "yellow", side: "right" },
    { id: `${key}_released`, step: 5, label: "Released", value: data.reports[key].released, type: "yellow", side: "right" },
    { id: `${key}_seen`, step: 6, label: "Seen", value: data.reports[key].seen, type: "yellow", side: "right" },
  ];
}

function makeKitLinks(key) {
  return [
    [`${key}_activated`, `${key}_quiz`],
    [`${key}_quiz`, `${key}_both`],
    [`${key}_quiz`, `${key}_bacteria`],
    [`${key}_quiz`, `${key}_fungi`],
    [`${key}_both`, `${key}_generated`],
    [`${key}_generated`, `${key}_approved`],
    [`${key}_approved`, `${key}_released`],
    [`${key}_released`, `${key}_seen`],
  ];
}

function groupByStep(nodes, count) {
  return Array.from({ length: count }, (_, step) => nodes.filter((node) => node.step === step && node.value > 0));
}

function buildLayout(nodes, stepsCount, width, scale, top = 48) {
  const layout = {};
  const colGap = width / stepsCount;
  const groups = groupByStep(nodes, stepsCount);

  groups.forEach((items, step) => {
    let y = top;
    const x = 46 + step * colGap;
    items.forEach((node) => {
      const h = Math.max(10, node.value * scale);
      layout[node.id] = { x, y, w: NODE_W, h };
      y += h + GAP;
    });
  });

  return layout;
}

function buildPaths(nodes, links, layout, scale) {
  const map = new Map(nodes.map((node) => [node.id, node]));
  const outOffset = {};
  const inOffset = {};

  return links.map(([fromId, toId]) => {
    const from = layout[fromId];
    const to = layout[toId];
    const toNode = map.get(toId);
    if (!from || !to || !toNode || toNode.value <= 0) return null;

    const width = Math.max(2, toNode.value * scale);
    const fromOffset = outOffset[fromId] || 0;
    const toOffset = inOffset[toId] || 0;
    const x1 = from.x + from.w;
    const y1 = from.y + fromOffset + width / 2;
    const x2 = to.x;
    const y2 = to.y + toOffset + width / 2;
    const mx = (x1 + x2) / 2;

    outOffset[fromId] = fromOffset + width;
    inOffset[toId] = toOffset + width;

    return {
      id: `${fromId}-${toId}`,
      from: fromId,
      to: toId,
      type: toNode.type,
      width,
      d: `M${x1} ${y1} C${mx} ${y1},${mx} ${y2},${x2} ${y2}`,
    };
  }).filter(Boolean);
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo">HB</div>
      </div>
      <nav className="nav" aria-label="Admin navigation">
        {navItems.map(([Icon, label, hasChildren, active]) => (
          <button className={`nav-item ${active ? "active" : ""}`} key={label} type="button">
            <Icon />
            <span>{label}</span>
            {hasChildren ? <ExpandMoreIcon className="chevron" /> : <i className="spacer" />}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function StepLabels({ steps, width }) {
  const colGap = width / steps.length;
  return steps.map((step, index) => (
    <div className="step-label" key={step} style={{ left: 46 + index * colGap + NODE_W / 2 }}>
      {step}
    </div>
  ));
}

function Node({ node, position, hovered, onEnter, onMove, onLeave }) {
  if (!position) return null;
  const side = node.side || "left";
  return (
    <div
      className={`node ${node.type} ${hovered ? "hovered" : ""}`}
      style={{ left: position.x, top: position.y, width: position.w, height: position.h }}
      onMouseEnter={(event) => onEnter(event, node)}
      onMouseMove={(event) => onMove(event, node)}
      onMouseLeave={onLeave}
    >
      <div className={`label ${side}`}>{node.label} (<b>{node.value}</b>)</div>
    </div>
  );
}

function Tooltip({ tooltip }) {
  if (!tooltip.visible) return null;
  return <div className="tt" style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.text}</div>;
}

function Diagram({ title, note, steps, nodes, links, width, height, scale }) {
  const [hoverId, setHoverId] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });
  const layout = useMemo(() => buildLayout(nodes, steps.length, width, scale), [nodes, steps.length, width, scale]);
  const paths = useMemo(() => buildPaths(nodes, links, layout, scale), [nodes, links, layout, scale]);

  const showTooltip = (event, node) => {
    setHoverId(node.id);
    setTooltip({ visible: true, x: event.clientX + 14, y: event.clientY + 14, text: `${node.label}: ${node.value}` });
  };

  const moveTooltip = (event, node) => {
    setTooltip({ visible: true, x: event.clientX + 14, y: event.clientY + 14, text: `${node.label}: ${node.value}` });
  };

  return (
    <section className="card">
      <header className="card-head">
        <h2 className="card-title">{title}</h2>
        {note ? <span className="card-note">{note}</span> : null}
      </header>
      <div className="diagram" style={{ height }}>
        <div style={{ position: "relative", width, height }}>
          <StepLabels steps={steps} width={width} />
          <svg className="svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            {paths.map((path) => (
              <path
                key={path.id}
                d={path.d}
                fill="none"
                stroke={hoverId === path.from || hoverId === path.to ? `var(--${path.type})` : `color-mix(in srgb, var(--${path.type}) 45%, transparent)`}
                strokeWidth={path.width}
                strokeLinecap="butt"
                opacity={hoverId && hoverId !== path.from && hoverId !== path.to ? 0.26 : 0.72}
              />
            ))}
          </svg>
          {nodes.map((node) => (
            <Node
              key={node.id}
              node={node}
              position={layout[node.id]}
              hovered={hoverId === node.id}
              onEnter={showTooltip}
              onMove={moveTooltip}
              onLeave={() => {
                setHoverId(null);
                setTooltip({ visible: false, x: 0, y: 0, text: "" });
              }}
            />
          ))}
        </div>
      </div>
      <Tooltip tooltip={tooltip} />
    </section>
  );
}

function Metric({ value, label }) {
  return (
    <div className="metric">
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

function Dashboard() {
  const participantNodes = useMemo(() => makeParticipantNodes(DATA), []);
  const participantLinks = useMemo(() => makeParticipantLinks(), []);
  const t1Nodes = useMemo(() => makeKitNodes(DATA, "t1"), []);
  const t2Nodes = useMemo(() => makeKitNodes(DATA, "t2"), []);
  const t1Links = useMemo(() => makeKitLinks("t1"), []);
  const t2Links = useMemo(() => makeKitLinks("t2"), []);

  return (
    <main className="app">
      <header className="topbar">
        <button className="icon-btn" type="button" aria-label="Open navigation">
          <MenuOpenIcon />
        </button>
        <div className="avatar-wrap">
          <div className="avatar" aria-label="User profile"><AccountCircleIcon /></div>
        </div>
      </header>

      <div className="content">
        <div className="study-head">
          <button className="back" type="button" aria-label="Back">
            <NavigateBeforeIcon />
          </button>
          <h1 className="title">Arbonne Main Study</h1>
        </div>

        <div className="tabs" role="tablist" aria-label="Study sections">
          <button className="tab" type="button" role="tab">Users</button>
          <button className="tab active" type="button" role="tab">Participant Flow</button>
          <button className="tab" type="button" role="tab">Statistics</button>
          <button className="tab" type="button" role="tab">Settings</button>
        </div>

        <section className="metrics" aria-label="Study metrics">
          <Metric value={DATA.registrations.completed} label="Registered participants" />
          <Metric value={DATA.eligibility_filter.filtered_in} label="Eligible participants" />
          <Metric value={DATA.esignature.signed} label="Signed e-signatures" />
          <Metric value={DATA.total} label="Reports dataset total" />
        </section>

        <div className="dashboard-grid">
          <Diagram
            title="Participant flow"
            note="Registration to shipping details"
            steps={FLOW_STEPS}
            nodes={participantNodes}
            links={participantLinks}
            width={840}
            height={620}
            scale={FLOW_SCALE}
          />

          <div className="kits">
            <Diagram
              title="T1 kit flow"
              note="Activation to report seen"
              steps={KIT_STEPS}
              nodes={t1Nodes}
              links={t1Links}
              width={760}
              height={300}
              scale={KIT_SCALE}
            />
            <Diagram
              title="T2 kit flow"
              note="Activation to report seen"
              steps={KIT_STEPS}
              nodes={t2Nodes}
              links={t2Links}
              width={760}
              height={300}
              scale={KIT_SCALE}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <style>{css}</style>
      <div className="react-debug">React loaded</div>
      <div className="shell">
        <Sidebar />
        <Dashboard />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
