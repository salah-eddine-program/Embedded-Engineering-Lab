import { icon } from '../core/icons.js';

export function renderHome() {
  return `
    <section class="hero-grid reveal-in">
      <div class="hero-copy">
        <div class="status-label"><span class="status-dot"></span> INTERACTIVE ENGINEERING ENVIRONMENT</div>
        <h2>Build intuition.<br><em>Verify the numbers.</em></h2>
        <p class="hero-lede">Interactive Electronics, Embedded Systems &amp; IoT Projects — a practical lab for turning engineering principles into working systems.</p>
        <div class="hero-actions"><a class="button button-primary" href="#/tools">Explore lab ${icon('arrow', 17)}</a><a class="button button-quiet" href="#/projects">View projects ${icon('arrow', 16)}</a></div>
        <div class="hero-caption"><span>01 / INSTRUMENT YOUR IDEAS</span><span>NO HARDWARE REQUIRED TO START</span></div>
      </div>
      <div class="hero-instrument" aria-label="System readings preview">
        <div class="instrument-head"><span>NODE / EEL-01</span><span class="instrument-live"><i></i> SAMPLE FEED</span></div>
        <div class="instrument-display">
          <div class="instrument-readings">
            <div class="instrument-reading"><span>${icon('bolt', 16)} BUS VOLTAGE</span><strong>18.6 <small>V</small></strong><div class="mini-meter"><i style="width:72%"></i></div></div>
            <div class="instrument-reading"><span>${icon('battery', 16)} STORAGE</span><strong>82 <small>%</small></strong><div class="mini-meter"><i style="width:82%"></i></div></div>
            <div class="instrument-reading"><span>${icon('thermometer', 16)} THERMAL</span><strong>27.4 <small>°C</small></strong><div class="reading-sub">WITHIN OPERATING RANGE</div></div>
          </div>
          <div class="instrument-graph"><div class="graph-head"><span>VOLTAGE / 60 MIN</span><span>+2.8%</span></div><svg viewBox="0 0 360 100" preserveAspectRatio="none" role="img" aria-label="Sample voltage trend graph"><defs><linearGradient id="heroFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="var(--accent)" stop-opacity=".2"/><stop offset="1" stop-color="var(--accent)" stop-opacity="0"/></linearGradient></defs><path class="hero-area" d="M0 70 C22 66 28 58 48 64 S75 75 96 55 S125 63 145 46 S173 55 196 39 S223 44 246 32 S275 50 298 25 S330 35 360 12 V100 H0Z"/><path class="hero-line" d="M0 70 C22 66 28 58 48 64 S75 75 96 55 S125 63 145 46 S173 55 196 39 S223 44 246 32 S275 50 298 25 S330 35 360 12"/></svg><div class="graph-axis"><span>13:00</span><span>13:20</span><span>13:40</span><span>14:00</span></div></div>
        </div>
        <div class="instrument-foot"><span>DATA SOURCE</span><strong><i class="source-dot"></i> SIMULATED TELEMETRY</strong><span class="mono">REFRESH 2.5s</span></div>
      </div>
    </section>

    <section class="section-block reveal-in">
      <div class="section-head"><div><p class="eyebrow">A WORKBENCH, NOT A SLIDE DECK</p><h2>From first principle to field system.</h2></div><a class="text-link" href="#/documentation">How the lab works ${icon('arrow', 15)}</a></div>
      <div class="pathway-strip"><div class="path-step"><span class="step-no">01</span><span>ELECTRONICS</span>${icon('arrow', 15)}</div><div class="path-step"><span class="step-no">02</span><span>CALCULATIONS</span>${icon('arrow', 15)}</div><div class="path-step"><span class="step-no">03</span><span>CIRCUIT SIMULATION</span>${icon('arrow', 15)}</div><div class="path-step"><span class="step-no">04</span><span>EMBEDDED SYSTEMS</span>${icon('arrow', 15)}</div><div class="path-step"><span class="step-no">05</span><span>IoT + DATA</span></div></div>
      <div class="overview-grid">
        <a class="overview-card overview-card-feature" href="#/tools"><div class="overview-card-top"><span class="card-icon">${icon('tools', 19)}</span><span class="card-index">01—08</span></div><div><h3>Engineering tools</h3><p>Eight practical calculators for circuits, components and energy.</p></div><div class="card-bottom"><span>OPEN TOOLKIT</span>${icon('arrow', 16)}</div></a>
        <a class="overview-card" href="#/circuits"><div class="overview-card-top"><span class="card-icon">${icon('circuit', 19)}</span><span class="card-index">SIM / 04</span></div><div><h3>Circuit lab</h3><p>Change the values. Watch the circuit respond.</p></div><div class="card-bottom"><span>RUN SIMULATIONS</span>${icon('arrow', 16)}</div></a>
        <a class="overview-card" href="#/dashboard"><div class="overview-card-top"><span class="card-icon">${icon('chart', 19)}</span><span class="card-index">NODE / 01</span></div><div><h3>IoT dashboard</h3><p>Live-style telemetry from a clearly marked demo node.</p></div><div class="card-bottom"><span>VIEW TELEMETRY</span>${icon('arrow', 16)}</div></a>
        <a class="overview-card overview-card-accent" href="#/solar-pump"><div class="overview-card-top"><span class="card-icon">${icon('pump', 19)}</span><span class="card-index">FEATURE PROJECT</span></div><div><h3>Smart solar water pump</h3><p>A field system, its architecture and its fault logic.</p></div><div class="card-bottom"><span>INSPECT THE SYSTEM</span>${icon('arrow', 16)}</div></a>
      </div>
    </section>

    <section class="section-block home-bottom reveal-in">
      <div class="home-bottom-copy"><p class="eyebrow">MEASURE → MODEL → IMPROVE</p><h2>Built around the way engineers think.</h2><p>Start with the math. Connect it to a circuit. Then follow the signal all the way to a connected device.</p><a class="text-link" href="#/embedded">Explore embedded systems ${icon('arrow', 15)}</a></div>
      <div class="stat-rail"><div><strong>08</strong><span>ENGINEERING TOOLS</span></div><div><strong>05</strong><span>INTERACTIVE SIMS</span></div><div><strong>06</strong><span>PROJECT STUDIES</span></div><div class="stat-rail-note"><span class="eyebrow">DEMO BOUNDARY</span><p>Sensor readings are simulated locally. No live hardware is connected.</p></div></div>
    </section>
  `;
}
