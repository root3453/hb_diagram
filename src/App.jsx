import * as React from "react";
import { createRoot } from "react-dom/client";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body,#root{width:100%;min-height:100%;height:100%}
body{font-family:Poppins,Arial,sans-serif;background:#f7f6f0;color:#282828;min-width:1024px}
button{font:inherit;background:none;border:0;color:inherit;cursor:pointer}
.page{min-height:100vh;height:100vh;background:#f7f6f0;display:flex;align-items:stretch;overflow:hidden}
.side{width:259px;height:100%;background:#fff;flex:0 0 259px}
.main{flex:1 1 auto;min-width:0;height:100%;display:flex;flex-direction:column;gap:8px;align-items:center}
.topbar{height:56px;width:100%;display:flex;align-items:center;justify-content:space-between;padding:0 8px;flex:0 0 56px}
.menu{width:30px;height:30px;display:grid;place-items:center;font-size:20px;line-height:1;color:#282828}
.avatar-wrap{height:56px;padding:8px 16px;display:flex;align-items:center}
.avatar{width:40px;height:40px;border-radius:200px;background:#aba698;color:#e9e8e0;display:grid;place-items:center;font-size:25px;line-height:1}
.content{width:100%;flex:1 1 auto;min-height:0;padding:8px 32px 24px 24px;overflow:hidden}
.content-inner{height:100%;display:flex;flex-direction:column;gap:16px;min-height:0}
.header{height:50px;width:100%;display:flex;align-items:center;gap:16px;flex:0 0 50px}
.back{width:40px;height:40px;display:grid;place-items:center;font-size:30px;color:#282828}
.title{font-size:40px;font-weight:400;line-height:50px;white-space:nowrap;color:#282828}
.panel{background:#fff;border-radius:8px 8px 0 0;width:100%;height:1138px;min-height:0;flex:1 1 auto;display:flex;flex-direction:column;gap:50px;padding:24px 0 16px;overflow:hidden}
.tabs-wrap{padding-left:16px;width:100%;flex:0 0 auto}
.tabs{display:flex;gap:16px;align-items:center;width:556px}
.tab{height:48px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;padding:0 8px;font-size:15px;font-weight:500;line-height:26px;letter-spacing:.46px;text-transform:uppercase;color:#282828;opacity:.7}
.tab.active{opacity:1}
.tab.active:after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:#282828}
.body{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:40px;width:100%}
.stats{display:flex;gap:54px;align-items:center;padding:0 40px;flex:0 0 auto}
.stat{display:flex;gap:16px;align-items:flex-start;overflow:hidden;flex:0 0 auto}
.stat svg{width:30px;height:30px;flex:0 0 30px;margin-top:3px}
.stat-copy{display:flex;gap:16px;align-items:flex-end;color:#282828}
.stat-num{font-size:50px;font-weight:400;line-height:.8;letter-spacing:-1px;white-space:nowrap}
.stat-label{font-size:16px;font-weight:400;line-height:1.3;width:109px}
.grid{flex:1 1 auto;min-height:0;display:flex;gap:16px;align-items:stretch;padding:0 16px;width:100%}
.flow-card{width:870px;height:100%;background:#fbfaf9;border-radius:4px;display:flex;flex-direction:column;gap:24px;padding:24px 0 24px 24px;flex:0 0 870px;overflow:hidden}
.kit-col{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:16px;justify-content:center}
.kit-card{height:340px;background:#fafaf9;border-radius:4px;display:flex;flex-direction:column;gap:24px;padding:24px 24px 24px 0;overflow:hidden;flex:0 0 340px}
.card-title{height:50px;display:flex;align-items:center;font-size:32px;font-weight:400;line-height:50px;color:#282828;white-space:nowrap}
.flow-card .card-title{width:846px}
.kit-card .card-title{padding-left:40px;width:1023px}
.diagram-area{flex:1 1 auto;min-height:0;position:relative;overflow:hidden;background-image:radial-gradient(rgba(40,40,40,.08) 1px,transparent 1px);background-size:16px 16px}
.participant{width:844px;height:678px;margin-left:31px;margin-top:30px}
.kit{width:1022px;height:221px}
.step{position:absolute;top:0;transform:translateX(-50%);font-size:14px;font-weight:500;line-height:1.2;color:#111827;white-space:nowrap;text-align:center}
.node{position:absolute;width:16px;border-radius:0}.n-good{background:#c1ca85}.n-bad{background:#fa7d88}.n-neut{background:#bb93c2}.n-yellow{background:#ede280}
.label{position:absolute;transform:translateX(-100%);font-size:12px;font-weight:400;line-height:1.2;color:#111827;text-align:right;white-space:nowrap;text-decoration:underline;text-underline-offset:2px}.label b{font-weight:700}.multi{width:122px;white-space:pre-wrap;line-height:1.4}
.curves{position:absolute;inset:0;overflow:visible}.curves path{fill:none;stroke-linecap:butt;opacity:.55}.good{stroke:#c1ca85}.bad{stroke:#fa7d88}.neut{stroke:#bb93c2}.yellow{stroke:#ede280}
@media(max-width:1280px){body{min-width:0}.side{width:88px;flex-basis:88px}.title{font-size:28px}.panel{gap:28px}.stats{gap:26px;flex-wrap:wrap}.grid{flex-direction:column;overflow:auto}.flow-card{height:760px}.kit-col{flex:0 0 auto}.kit-card{width:100%}}
`;

function PeopleIcon(){return <svg viewBox="0 0 30 30"><path d="M20 13.75C22.075 13.75 23.7375 12.075 23.7375 10C23.7375 7.925 22.075 6.25 20 6.25C17.925 6.25 16.25 7.925 16.25 10C16.25 12.075 17.925 13.75 20 13.75ZM10 13.75C12.075 13.75 13.7375 12.075 13.7375 10C13.7375 7.925 12.075 6.25 10 6.25C7.925 6.25 6.25 7.925 6.25 10C6.25 12.075 7.925 13.75 10 13.75ZM10 16.25C7.0875 16.25 1.25 17.7125 1.25 20.625V23.75H18.75V20.625C18.75 17.7125 12.9125 16.25 10 16.25ZM20 16.25C19.6375 16.25 19.225 16.275 18.7875 16.3125C20.2375 17.3625 21.25 18.775 21.25 20.625V23.75H28.75V20.625C28.75 17.7125 22.9125 16.25 20 16.25Z" fill="#EDE280"/></svg>}
function FilterIcon(){return <svg viewBox="0 0 30 30"><path d="M5.31254 7.0125C7.83754 10.25 12.5 16.25 12.5 16.25V23.75C12.5 24.4375 13.0625 25 13.75 25H16.25C16.9375 25 17.5 24.4375 17.5 23.75V16.25C17.5 16.25 22.15 10.25 24.675 7.0125C25.3125 6.1875 24.725 5 23.6875 5H6.30004C5.26254 5 4.67504 6.1875 5.31254 7.0125Z" fill="#EDE280"/></svg>}
function ThumbIcon(){return <svg viewBox="0 0 30 30"><path d="M2.5 25H5C5.6875 25 6.25 24.4375 6.25 23.75V12.5C6.25 11.8125 5.6875 11.25 5 11.25H2.5V25ZM27.2875 16.1C27.425 15.7875 27.5 15.45 27.5 15.1V13.75C27.5 12.375 26.375 11.25 25 11.25H18.125L19.275 5.4375C19.3375 5.1625 19.3 4.8625 19.175 4.6125C18.8875 4.05 18.525 3.5375 18.075 3.0875L17.5 2.5L9.4875 10.5125C9.0125 10.9875 8.75 11.625 8.75 12.2875V22.0875C8.75 23.6875 10.0625 25 11.675 25H21.8125C22.6875 25 23.5125 24.5375 23.9625 23.7875L27.2875 16.1Z" fill="#EDE280"/></svg>}
function VerifiedIcon(){return <svg viewBox="0 0 30 30"><path d="M28.75 15L25.7 11.5125L26.125 6.9L21.6125 5.875L19.25 1.875L15 3.7L10.75 1.875L8.3875 5.8625L3.875 6.875L4.3 11.5L1.25 15L4.3 18.4875L3.875 23.1125L8.3875 24.1375L10.75 28.125L15 26.2875L19.25 28.1125L21.6125 24.125L26.125 23.1L25.7 18.4875L28.75 15ZM12.6125 20.9L7.8625 16.1375L9.7125 14.2875L12.6125 17.2L19.925 9.8625L21.775 11.7125L12.6125 20.9Z" fill="#EDE280"/></svg>}

function Stat({icon:Icon,value,lines}){return <div className="stat"><Icon/><div className="stat-copy"><div className="stat-num">{value}</div><div className="stat-label">{lines.map(x=><React.Fragment key={x}>{x}<br/></React.Fragment>)}</div></div></div>}
function Node({x,y,h,type}){return <div className={`node n-${type}`} style={{left:x,top:y,height:h}}/>}
function Label({x,y,children,multi}){return <div className={`label ${multi?"multi":""}`} style={{left:x,top:y}}>{children}</div>}
function Path({d,w,type}){return <path className={type} d={d} strokeWidth={w}/>}

function ParticipantFlow(){return <div className="diagram-area participant">
  <svg className="curves" viewBox="0 0 844 678">
    <Path type="good" w="350" d="M16 175 C78 175 84 175 146 175"/><Path type="neut" w="75" d="M16 387 C78 387 84 387 146 387"/><Path type="bad" w="218" d="M16 569 C78 569 84 569 146 569"/>
    <Path type="good" w="261" d="M162 131 C222 131 232 131 292 131"/><Path type="bad" w="88" d="M162 323 C222 323 232 323 292 323"/>
    <Path type="good" w="139" d="M308 70 C368 70 378 70 438 70"/><Path type="bad" w="121" d="M308 218 C368 218 378 218 438 218"/>
    <Path type="good" w="100" d="M454 50 C514 50 524 50 584 50"/><Path type="neut" w="6" d="M454 132 C514 132 524 132 584 132"/><Path type="bad" w="6" d="M454 168 C514 168 524 168 584 168"/><Path type="bad" w="6" d="M454 196 C514 196 524 196 584 196"/>
    <Path type="good" w="87" d="M600 44 C660 44 670 44 730 44"/><Path type="bad" w="12" d="M600 130 C660 130 670 130 730 130"/>
  </svg>
  {[[38,"Registered"],[184.5,"El. Quiz"],[329,"El. Filter"],[476,"Confirm"],[622.5,"E-Signature"],[767.5,"Shipping Det."]].map(([l,t])=><div className="step" style={{left:l}} key={t}>{t}</div>)}
  <Node x={0} y={32} h={642} type="good"/><Node x={146} y={32} h={348} type="good"/><Node x={146} y={399} h={75} type="neut"/><Node x={146} y={490} h={218} type="bad"/><Node x={292} y={32} h={261} type="good"/><Node x={292} y={311} h={88} type="bad"/><Node x={438} y={32} h={139} type="good"/><Node x={438} y={190} h={121} type="bad"/><Node x={584} y={32} h={100} type="good"/><Node x={584} y={156} h={6} type="neut"/><Node x={584} y={186} h={6} type="bad"/><Node x={584} y={214} h={6} type="bad"/><Node x={730} y={32} h={87} type="good"/><Node x={730} y={154} h={12} type="bad"/>
  <Label x={136} y={252}>Completed(<b>53</b>)</Label><Label x={136} y={430}>Pending(<b>12</b>)</Label><Label x={136} y={585}>Abandoned(<b>35</b>)</Label><Label x={282} y={164}>Filtered In (<b>39</b>)</Label><Label x={282} y={345}>Filtered Out (<b>10</b>)</Label><Label x={428} y={75} multi>Confirmed (<b>13</b>)<br/>-manually (<b>10</b>)<br/> -auto (<b>3</b>)</Label><Label x={428} y={242}>Rejected (<b>24</b>)</Label><Label x={574} y={74}>Signed (<b>10</b>)</Label><Label x={574} y={154}>Pending (<b>1</b>)</Label><Label x={574} y={186}>Declined (<b>1</b>)</Label><Label x={574} y={214}>Abandoned (<b>1</b>)</Label><Label x={720} y={67}>Provided (<b>8</b>)</Label><Label x={720} y={154}>Abandoned (<b>1</b>)</Label>
</div>}

function KitDiagram(){return <div className="diagram-area kit">
  <svg className="curves" viewBox="0 0 1022 221">
    <Path type="good" w="139" d="M0 102 C55 102 65 102 120 102"/><Path type="good" w="119" d="M136 92 C191 92 200 92 255 92"/><Path type="good" w="104" d="M272 85 C327 85 337 85 392 85"/><Path type="yellow" w="61" d="M409 63 C464 63 473 63 528 63"/><Path type="yellow" w="48" d="M545 57 C600 57 610 57 665 57"/><Path type="yellow" w="38" d="M682 52 C737 52 746 52 801 52"/><Path type="yellow" w="38" d="M818 52 C873 52 883 52 938 52"/><Path type="neut" w="28" d="M272 155 C327 155 337 155 392 155"/><Path type="neut" w="50" d="M272 180 C327 180 337 180 392 180"/>
  </svg>
  {[[128,"Kit activated"],[263,"Quiz completed"],[400,"Data arrived"],[536.5,"Report generated"],[673,"Report approved"],[809,"Report released"],[946,"Report seen"]].map(([l,t])=><div className="step" style={{left:l,top:1}} key={t}>{t}</div>)}
  <Node x={120} y={33} h={139} type="good"/><Node x={255} y={33} h={119} type="good"/><Node x={392} y={33} h={104} type="good"/><Node x={392} y={166} h={6} type="neut"/><Node x={392} y={193} h={6} type="neut"/><Node x={528} y={33} h={60} type="yellow"/><Node x={665} y={33} h={47} type="yellow"/><Node x={801} y={33} h={37} type="yellow"/><Node x={938} y={33} h={37} type="yellow"/>
  <Label x={114} y={94}>Activated (<b>8</b>)</Label><Label x={248} y={84}>Completed (<b>7</b>)</Label><Label x={384} y={68}>Both (<b>6</b>)</Label><Label x={384} y={162}>Only bacteria (<b>1</b>)</Label><Label x={384} y={190}>Only fungi (<b>1</b>)</Label><Label x={522} y={57}>Generated (<b>4</b>)</Label><Label x={659} y={52}>Approved (<b>3</b>)</Label><Label x={795} y={45}>Released (<b>2</b>)</Label><Label x={932} y={45}>Seen (<b>2</b>)</Label>
</div>}

function App(){return <><style>{css}</style><div className="page"><aside className="side"/><main className="main"><header className="topbar"><button className="menu">≡</button><div className="avatar-wrap"><div className="avatar">A</div></div></header><section className="content"><div className="content-inner"><div className="header"><button className="back">‹</button><h1 className="title">Lorem Ipsum</h1></div><div className="panel"><div className="tabs-wrap"><nav className="tabs"><button className="tab active">Dashboard</button><button className="tab">Participants</button><button className="tab">Settings</button></nav></div><div className="body"><div className="stats"><Stat icon={PeopleIcon} value="126" lines={["Total","Participants"]}/><Stat icon={FilterIcon} value="13" lines={["Filtered In","Participants"]}/><Stat icon={ThumbIcon} value="10" lines={["Confirmed","Participants"]}/><Stat icon={VerifiedIcon} value="3" lines={["Completed","Tests"]}/></div><div className="grid"><section className="flow-card"><h2 className="card-title">Participant flow</h2><ParticipantFlow/></section><div className="kit-col"><section className="kit-card"><h2 className="card-title">Kit #1</h2><KitDiagram/></section><section className="kit-card"><h2 className="card-title">Kit #2</h2><KitDiagram/></section></div></div></div></div></div></section></main></div></>}

createRoot(document.getElementById("root")).render(<App/>);
