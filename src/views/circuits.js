import { icon } from '../core/icons.js';

const field = (label, key, value, unit, min, max, step) => `<label class="range-control"><span>${label}<strong data-readout="${key}">${value} ${unit}</strong></span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-sim-field="${key}" aria-label="${label}" /><small class="range-limits"><span>${min} ${unit}</span><span>${max} ${unit}</span></small></label>`;

export function renderCircuits() {
  return `
    <section class="page-lede-row"><p class="page-lede">A circuit is a set of relationships. Move the controls and inspect what changes.</p><span class="note-tag">INTERACTIVE · IDEAL COMPONENT MODEL</span></section>
    <div class="simulation-grid">
      <article class="sim-card" data-sim="ohm">
        <div class="sim-card-head"><div><p class="eyebrow">SIMULATION 01 / DC</p><h2>Ohm’s law</h2></div><span class="sim-badge">LIVE MODEL</span></div>
        <div class="sim-main-row"><div class="schematic-box"><svg viewBox="0 0 350 128" role="img" aria-label="DC voltage source and resistor circuit"><path d="M45 64h67m72 0h121M112 64V29h72v70h-72z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M45 64v37h67m72 0h121V64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="45" cy="64" r="15" fill="var(--panel)" stroke="currentColor" stroke-width="2"/><path d="M45 56v16m-5-8h10" stroke="currentColor" stroke-width="1.8"/><text x="122" y="24">R = <tspan data-readout="resistanceValue">240 Ω</tspan></text><text x="7" y="48">V</text><text x="218" y="53">I →</text><text x="215" y="117">GND</text></svg></div><div class="sim-result"><span>CURRENT</span><strong data-readout="currentResult">50 mA</strong><small>V / R</small></div></div>
        <div class="range-stack">${field('Supply voltage', 'voltage', 12, 'V', 1, 24, 0.5)}${field('Resistance', 'resistance', 240, 'Ω', 50, 1000, 10)}</div>
      </article>

      <article class="sim-card" data-sim="divider">
        <div class="sim-card-head"><div><p class="eyebrow">SIMULATION 02 / ANALOG</p><h2>Voltage divider</h2></div><span class="sim-badge">LIVE MODEL</span></div>
        <div class="divider-model"><svg viewBox="0 0 410 120" role="img" aria-label="Interactive voltage divider"><path d="M24 60h72m68 0h70m68 0h83M96 60V27h68v66H96zm138 0V27h68v66h-68z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><circle cx="234" cy="60" r="5" fill="var(--accent)"/><path d="M343 60v27m-13 0h26m-22 7h18m-14 7h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><text x="104" y="21">R1 · <tspan data-readout="r1Value">10 kΩ</tspan></text><text x="243" y="21">R2 · <tspan data-readout="r2Value">10 kΩ</tspan></text><text x="255" y="51">Vout <tspan data-readout="vout">6.00 V</tspan></text><text x="10" y="49">Vin <tspan data-readout="vin">12 V</tspan></text></svg></div>
        <div class="range-stack range-stack-three">${field('Vin', 'vin', 12, 'V', 1, 24, 0.5)}${field('R1', 'r1', 10, 'kΩ', 1, 100, 1)}${field('R2', 'r2', 10, 'kΩ', 1, 100, 1)}</div>
        <div class="formula-strip"><code>Vout = Vin × R2 / (R1 + R2)</code><span data-readout="ratio">50.0% of Vin</span></div>
      </article>

      <article class="sim-card sim-card-wide" data-sim="rc">
        <div class="sim-card-head"><div><p class="eyebrow">SIMULATION 03 / TRANSIENT RESPONSE</p><h2>RC charge &amp; discharge</h2></div><div class="segmented-control"><button class="is-selected" type="button" data-rc-mode="charge">CHARGE</button><button type="button" data-rc-mode="discharge">DISCHARGE</button></div></div>
        <div class="rc-chart-wrap"><div class="chart-legend"><span><i></i> CAPACITOR VOLTAGE</span><span class="tau-readout">τ <b data-readout="tau">1.00 s</b></span></div><canvas id="rc-chart" aria-label="RC capacitor voltage over time"></canvas></div>
        <div class="range-stack range-stack-three rc-controls">${field('Supply', 'rcVoltage', 5, 'V', 1, 12, 0.5)}${field('Resistance', 'rcResistance', 10, 'kΩ', 1, 100, 1)}${field('Capacitance', 'capacitance', 100, 'µF', 10, 1000, 10)}</div>
        <p class="micro-note">First-order ideal RC response: τ = R × C. Charge: Vc = Vs(1 − e−t/τ). Discharge: Vc = V₀e−t/τ.</p>
      </article>

      <article class="sim-card" data-sim="led">
        <div class="sim-card-head"><div><p class="eyebrow">SIMULATION 04 / LOAD PROTECTION</p><h2>LED circuit</h2></div><span class="sim-badge">CURRENT-LIMITED</span></div>
        <div class="led-circuit"><svg viewBox="0 0 340 110" role="img" aria-label="LED and series resistor circuit"><path d="M28 56h48m61 0h46m39 0h89v35H28V71" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><circle cx="28" cy="56" r="14" fill="var(--panel)" stroke="currentColor" stroke-width="2"/><path d="M28 49v14m-5-7h10" stroke="currentColor" stroke-width="1.7"/><path d="m76 56 12-13v26zm18 0 12-13v26z" fill="none" stroke="currentColor" stroke-width="2"/><path d="m93 34 9-8m-2 0 2 0 0 2m-19 1 9-8m-2 0 2 0 0 2" stroke="var(--accent)" stroke-width="2"/><path d="M137 56V36h38v40h-38z" fill="none" stroke="currentColor" stroke-width="2"/><text x="128" y="30">R = <tspan data-readout="ledResistance">510 Ω</tspan></text><text x="204" y="50">LED <tspan data-readout="ledCurrent">19.6 mA</tspan></text></svg></div>
        <div class="range-stack">${field('Supply voltage', 'ledSupply', 12, 'V', 3, 24, 0.5)}${field('Series resistance', 'ledResistance', 510, 'Ω', 100, 1500, 10)}</div>
        <div class="result-inline"><span>FORWARD DROP</span><strong data-readout="ledDrop">2.0 V</strong><small>Nominal red LED</small></div>
      </article>

      <article class="sim-card" data-sim="kirchhoff">
        <div class="sim-card-head"><div><p class="eyebrow">CIRCUIT PRINCIPLE / NODE LAW</p><h2>Kirchhoff’s current law</h2></div><span class="sim-badge">Σ I = 0</span></div>
        <div class="kcl-graphic"><svg viewBox="0 0 260 130" role="img" aria-label="Three currents meeting at a circuit node"><path d="M21 65h94m28 0h96M129 13v104" stroke="currentColor" stroke-width="2.2"/><circle cx="129" cy="65" r="8" fill="var(--accent)" stroke="var(--panel)" stroke-width="4"/><path d="m104 59 10 6-10 6m20-37 5-11 5 11m47 25 10 6-10 6" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/><text x="30" y="54">IIN</text><text x="131" y="27">I₁</text><text x="196" y="54">I₂</text></svg><div class="kcl-equation"><span>INCOMING CURRENT</span><strong data-readout="iin">2.0 A</strong><code>Iin = I₁ + I₂</code><small data-readout="kclState">NODE BALANCED · 0.0 A RESIDUAL</small></div></div>
        <div class="range-stack">${field('Branch current · I₁', 'i1', 1.2, 'A', 0.1, 5, 0.1)}${field('Branch current · I₂', 'i2', 0.8, 'A', 0.1, 5, 0.1)}</div>
      </article>
    </div>
  `;
}
