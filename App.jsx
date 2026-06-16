import { useMemo, useState } from "react";

const css = `
*{box-sizing:border-box;margin:0;padding:0}

:root{
  --bg:#f7f6f2;
  --paper:#fff;
  --text:#1f2933;
  --muted:#6b7280;
  --line:#ece7df;
  --good:#c1ca85;
  --bad:#fa7d88;
  --neut:#bb93c2;
  --yellow:#f2df5a;
}

body{
  font-family:Poppins,Inter,Arial,sans-serif;
  background:var(--bg);
  color:var(--text);
}

.page{
  padding:24px;
  display:grid;
  gap:18px;
}

.title{
  font-size:30px;
  font-weight:500;
}

.stats{
  display:flex;
  flex-wrap:wrap;
  gap:18px;
  background:var(--paper);
  border:1px solid var(--line);
  border-radius:10px;
  padding:18px;
}

.stat{min-width:140px}

.stat b{
  font-size:30px;
  font-weight:500;
  display:block;
}

.stat span{
  font-size:12px;
  color:var(--muted);
}

.raw{
  background:var(--paper);
  border:1px solid var(--line);
  border-radius:10px;
  padding:16px;
}

.raw h3{
  font-size:14px;
  margin-bottom:10px;
}

.raw-grid{
  display:grid;
  grid-template-columns:repeat(3,minmax(240px,1fr));
  gap:16px;
}

.raw-box{
  border:1px solid var(--line);
  border-radius:8px;
  padding:12px;
  font-size:12px;
  line-height:1.55;
}

.raw-box h4{
  font-size:13px;
  margin-bottom:8px;
}

.raw-box div{
  display:flex;
  justify-content:space-between;
  gap:16px;
  border-bottom:1px dotted #e5e0d8;
  padding:2px 0;
}

.raw-box div:last-child{border-bottom:0}

.dashboard{
  display:grid;
  grid-template-columns:1.05fr 1.25fr;
  gap:16px;
}

.card{
  background:var(--paper);
  border:1px solid var(--line);
  border-radius:10px;
  overflow:hidden;
}

.card-head{
  padding:16px 18px;
  font-size:22px;
  font-weight:400;
  border-bottom:1px solid var(--line);
}

.diagram{
  position:relative;
  overflow:auto;
  background-image:radial-gradient(rgba(17,24,39,.08) 1px,transparent 1px);
  background-size:16px 16px;
}

.node{
  position:absolute;
  border-radius:2px;
  cursor:pointer;
  transition:background-color .12s ease;
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
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  font-size:9px;
  line-height:1.15;
  white-space:nowrap;
  text-decoration:underline;
  text-underline-offset:2px;
}

.label.left{
  right:calc(100% + 8px);
  text-align:right;
}

.label.right{
  left:calc(100% + 8px);
}

.label b{font-weight:700}

.step-label{
  position:absolute;
  top:12px;
  transform:translateX(-50%);
  font-size:9px;
  color:#1f2933;
  white-space:nowrap;
}

.svg{
  position:absolute;
  inset:0;
  pointer-events:none;
  overflow:visible;
}

.tt{
  position:fixed;
  pointer-events:none;
  z-index:99;
  background:#fff;
  border:1px solid #ddd;
  border-radius:8px;
  padding:6px 10px;
  font-size:12px;
  color:#222;
  box-shadow:0 10px 25px rgba(0,0,0,.08);
}

.kits{
  display:grid;
  gap:16px;
}

@media(max-width:1200px){
  .dashboard{grid-template-columns:1fr}
  .raw-grid{grid-template-columns:1fr}
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

const FLOW_SCALE = 14;
const KIT_SCALE = 18;
const NODE_W = 14;
const GAP = 10;

const FLOW_STEPS = [
  "Registered",
  "El. Quiz",
  "El. Filter",
  "Confirm",
  "E-Signature",
  "Shipping Det.",
];

const KIT_STEPS = [
  "Kit activated",
  "Quiz completed",
  "Data arrived",
  "Report generated",
  "Report approved",
  "Report released",
  "Report seen",
];

const COLORS = {
  good: "rgba(193,202,133,.36)",
  bad: "rgba(250,125,136,.30)",
  neut: "rgba(187,147,194,.28)",
  yellow: "rgba(242,223,90,.42)",
};

const COLORS_HOVER = {
  good: "rgba(193,202,133,.56)",
  bad: "rgba(250,125,136,.50)",
  neut: "rgba(187,147,194,.48)",
  yellow: "rgba(242,223,90,.62)",
};

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
  return Array.from({ length: count }, (_, step) =>
    nodes.filter((node) => node.step === step && node.value > 0)
  );
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

  return links
    .map(([fromId, toId]) => {
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
    })
    .filter(Boolean);
}

function StepLabels({ steps, width }) {
  const colGap = width / steps.length;

  return steps.map((step, index) => (
    <div
      className="step-label"
      key={step}
      style={{ left: 46 + index * colGap + NODE_W / 2 }}
    >
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
      style={{
        left: position.x,
        top: position.y,
        width: position.w,
        height: position.h,
      }}
      onMouseEnter={(event) => onEnter(event, node)}
      onMouseMove={(event) => onMove(event, node)}
      onMouseLeave={onLeave}
    >
      <div className={`label ${side}`}>
        {node.label} (<b>{node.value}</b>)
      </div>
    </div>
  );
}

function Tooltip({ tooltip }) {
  if (!tooltip.visible) return null;

  return (
    <div className="tt" style={{ left: tooltip.x, top: tooltip.y }}>
      {tooltip.text}
    </div>
  );
}

function Diagram({ title, steps, nodes, links, width, height, scale }) {
  const [hoverId, setHoverId] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const layout = useMemo(
    () => buildLayout(nodes, steps.length, width, scale),
    [nodes, steps.length, width, scale]
  );

  const paths = useMemo(
    () => buildPaths(nodes, links, layout, scale),
    [nodes, links, layout, scale]
  );

  function showTooltip(event, node) {
    setHoverId(node.id);
    setTooltip({
      visible: true,
      x: event.clientX + 14,
      y: event.clientY - 28,
      text: `${node.label} (${node.value})`,
    });
  }

  function moveTooltip(event) {
    setTooltip((current) => ({
      ...current,
      visible: true,
      x: event.clientX + 14,
      y: event.clientY - 28,
    }));
  }

  function hideTooltip() {
    setHoverId(null);
    setTooltip({ visible: false, x: 0, y: 0, text: "" });
  }

  return (
    <div className="card">
      <div className="card-head">{title}</div>

      <div className="diagram" style={{ height }}>
        <div style={{ position: "relative", width, height }}>
          <StepLabels steps={steps} width={width} />

          <svg className="svg" width={width} height={height}>
            {paths.map((path) => {
              const related = path.from === hoverId || path.to === hoverId;

              return (
                <path
                  key={path.id}
                  fill="none"
                  stroke={related ? COLORS_HOVER[path.type] : COLORS[path.type]}
                  strokeWidth={path.width}
                  strokeLinecap="butt"
                  d={path.d}
                />
              );
            })}
          </svg>

          {nodes
            .filter((node) => node.value > 0)
            .map((node) => (
              <Node
                key={node.id}
                node={node}
                position={layout[node.id]}
                hovered={hoverId === node.id}
                onEnter={showTooltip}
                onMove={moveTooltip}
                onLeave={hideTooltip}
              />
            ))}
        </div>

        <Tooltip tooltip={tooltip} />
      </div>
    </div>
  );
}

function RawBox({ title, rows }) {
  return (
    <div className="raw-box">
      <h4>{title}</h4>
      {rows.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <b>{value}</b>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const participantNodes = useMemo(() => makeParticipantNodes(DATA), []);
  const participantLinks = useMemo(() => makeParticipantLinks(), []);

  const kit1Nodes = useMemo(() => makeKitNodes(DATA, "t1"), []);
  const kit1Links = useMemo(() => makeKitLinks("t1"), []);

  const kit2Nodes = useMemo(() => makeKitNodes(DATA, "t2"), []);
  const kit2Links = useMemo(() => makeKitLinks("t2"), []);

  return (
    <>
      <style>{css}</style>

      <div className="page">
        <div className="title">Arbonne Main Study</div>

        <div className="stats">
          <div className="stat">
            <b>{DATA.registrations.completed}</b>
            <span>Total Participants</span>
          </div>

          <div className="stat">
            <b>{DATA.eligibility_filter.filtered_in}</b>
            <span>Filtered In Participants</span>
          </div>

          <div className="stat">
            <b>{DATA.eligibility_confirmation.confirmed}</b>
            <span>Confirmed Participants</span>
          </div>

          <div className="stat">
            <b>{DATA.reports.t1.generated + DATA.reports.t2.generated}</b>
            <span>Generated Reports</span>
          </div>
        </div>

        <div className="raw">
          <h3>Source values</h3>

          <div className="raw-grid">
            <RawBox
              title="Participant flow"
              rows={[
                ["Registrations completed", DATA.registrations.completed],
                ["Eligibility quiz completed", DATA.eligibility_quiz.completed],
                ["Eligibility quiz pending", DATA.eligibility_quiz.pending],
                ["Eligibility quiz abandoned", DATA.eligibility_quiz.abandoned],
                ["Filtered in", DATA.eligibility_filter.filtered_in],
                ["Filtered out", DATA.eligibility_filter.filtered_out],
                ["Confirmed", DATA.eligibility_confirmation.confirmed],
                ["Confirmation pending", DATA.eligibility_confirmation.pending],
                ["Confirmation rejected", DATA.eligibility_confirmation.rejected],
                ["E-signature signed", DATA.esignature.signed],
                ["E-signature pending", DATA.esignature.pending],
                ["E-signature declined", DATA.esignature.declined],
                ["E-signature abandoned", DATA.esignature.abandoned],
                ["Delivery info provided", DATA.delivery_info.provided],
                ["Delivery info abandoned", DATA.delivery_info.abandoned],
              ]}
            />

            <RawBox
              title="Kit #1"
              rows={[
                ["Kit activated", DATA.kits.t1.activated],
                ["Quiz completed", DATA.quizzes.t1.completed],
                ["Only bacteria arrived", DATA.microbiome_data.t1.only_bacteria_arrived],
                ["Only fungi arrived", DATA.microbiome_data.t1.only_fungi_arrived],
                ["Both arrived", DATA.microbiome_data.t1.both_arrived],
                ["Report generated", DATA.reports.t1.generated],
                ["Report approved", DATA.reports.t1.approved],
                ["Report released", DATA.reports.t1.released],
                ["Report seen", DATA.reports.t1.seen],
              ]}
            />

            <RawBox
              title="Kit #2"
              rows={[
                ["Kit activated", DATA.kits.t2.activated],
                ["Quiz completed", DATA.quizzes.t2.completed],
                ["Only bacteria arrived", DATA.microbiome_data.t2.only_bacteria_arrived],
                ["Only fungi arrived", DATA.microbiome_data.t2.only_fungi_arrived],
                ["Both arrived", DATA.microbiome_data.t2.both_arrived],
                ["Report generated", DATA.reports.t2.generated],
                ["Report approved", DATA.reports.t2.approved],
                ["Report released", DATA.reports.t2.released],
                ["Report seen", DATA.reports.t2.seen],
              ]}
            />
          </div>
        </div>

        <div className="dashboard">
          <Diagram
            title="Participant flow"
            steps={FLOW_STEPS}
            nodes={participantNodes}
            links={participantLinks}
            width={720}
            height={620}
            scale={FLOW_SCALE}
          />

          <div className="kits">
            <Diagram
              title="Kit #1"
              steps={KIT_STEPS}
              nodes={kit1Nodes}
              links={kit1Links}
              width={840}
              height={240}
              scale={KIT_SCALE}
            />

            <Diagram
              title="Kit #2"
              steps={KIT_STEPS}
              nodes={kit2Nodes}
              links={kit2Links}
              width={840}
              height={240}
              scale={KIT_SCALE}
            />
          </div>
        </div>
      </div>
    </>
  );
}
