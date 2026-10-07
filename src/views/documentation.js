import { icon } from '../core/icons.js';

export function renderDocumentation() {
  return `
    <section class="page-lede-row"><p class="page-lede">A clear boundary between what runs today and how a real embedded system could connect next.</p><span class="note-tag">DOCUMENTATION / REV 1.0</span></section>
    <section class="docs-hero"><div><p class="eyebrow">CURRENT IMPLEMENTATION</p><h2>Prototype honestly.<br><em>Design for what comes next.</em></h2></div><p>This website is a static front-end prototype. Engineering calculations run in the browser; sensor values are generated locally. No live ESP32, API, account system, database or MQTT broker is connected.</p></section>
    <section class="docs-architecture"><div class="panel-heading"><div><p class="eyebrow">FUTURE SYSTEM PATH</p><h2>From a physical sensor to a useful decision.</h2></div><span class="instrument-code">PROPOSED · NOT YET CONNECTED</span></div><div class="architecture-flow">${[['01','chip','ESP32','Read + validate'],['02','radio','Wi‑Fi','Secure transport'],['03','waves','MQTT / HTTP','Publish telemetry'],['04','tools','REST API','Validate + expose'],['05','folder','Database','Retain history'],['06','chart','Dashboard','Visualize + alert']].map(([n,ico,name,detail],index)=>`<div class="architecture-step"><span class="flow-number">${n}</span><span class="arch-icon">${icon(ico,20)}</span><strong>${name}</strong><small>${detail}</small>${index < 5 ? `<span class="flow-arrow">${icon('arrow',14)}</span>` : ''}</div>`).join('')}</div></section>
    <div class="docs-grid"><article class="docs-card"><p class="eyebrow">SUGGESTED API SURFACE</p><h3>Resource endpoints</h3><p>Potential Node.js + Express routes for a later connected version. They are documentation only in this prototype.</p><div class="endpoint-list"><div><span>GET</span><code>/api/sensors</code><small>Latest validated sensor readings</small></div><div><span>GET</span><code>/api/pump</code><small>Pump state and operating conditions</small></div><div><span>GET</span><code>/api/projects</code><small>Project/device metadata</small></div><div><span>GET</span><code>/api/energy</code><small>Energy summaries and history</small></div><div><span>GET</span><code>/api/alerts</code><small>Threshold and fault events</small></div></div></article><article class="docs-card"><p class="eyebrow">SAMPLE PAYLOAD</p><h3>Units travel with meaning.</h3><p>A future API should include timestamps, units, device identity and quality information alongside numeric values.</p><pre class="json-sample"><code>{
  "deviceId": "SPW-001",
  "timestamp": "2026-10-06T13:44:00Z",
  "temperature": 27.4,
  "humidity": 42,
  "voltage": 12.6,
  "current": 3.2,
  "source": "simulated"
}</code></pre></article></div>
    <section class="docs-roadmap"><div><p class="eyebrow">IMPLEMENTATION BOUNDARY</p><h2>Today / Next / Later</h2></div><div class="roadmap-row"><span class="roadmap-state state-now">BUILT IN FRONT END</span><p>Responsive engineering workspace, browser-side calculators, idealized circuit models, simulated IoT dashboard, demo alert logic.</p></div><div class="roadmap-row"><span class="roadmap-state state-next">NEXT ITERATION</span><p>Node.js / Express REST API, durable sensor history and verified ESP32 integration with safe credentials and transport.</p></div><div class="roadmap-row"><span class="roadmap-state state-later">FUTURE</span><p>PostgreSQL persistence, user accounts and per-device access, MQTT broker and operational deployment.</p></div></section>
    <section class="docs-note">${icon('alert',18)}<p><strong>Engineering note</strong> — Circuit results use ideal assumptions. Verify component ratings, thermal limits, tolerances, discharge limits and safety requirements before applying them to real hardware.</p></section>
  `;
}
