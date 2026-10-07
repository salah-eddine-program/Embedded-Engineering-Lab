import { UNIT_GROUPS } from '../core/calculations.js';
import { icon } from '../core/icons.js';

const unitOptions = (group, selected) => Object.keys(UNIT_GROUPS[group]).map((unit) => `<option value="${unit}" ${unit === selected ? 'selected' : ''}>${unit}</option>`).join('');
const field = (label, key, value, unit, step = 'any') => `<label class="field"><span>${label}</span><div class="input-wrap"><input type="number" inputmode="decimal" step="${step}" value="${value}" data-field="${key}" aria-label="${label}" /><small>${unit}</small></div></label>`;

export function renderTools() {
  return `
    <section class="page-lede-row"><p class="page-lede">The numbers behind dependable hardware. Change an input and the result follows instantly.</p><span class="note-tag">ALL CALCULATIONS RUN IN YOUR BROWSER</span></section>
    <div class="tool-grid">
      <article class="tool-card tool-card-large" data-tool="ohm">
        <div class="tool-card-heading"><span class="tool-number">01</span><div><p class="eyebrow">FOUNDATION / DC</p><h2>Ohm’s law</h2></div><span class="tool-icon">${icon('bolt')}</span></div>
        <p class="tool-description">Enter any two known values. The missing value and power are derived from the circuit relationship.</p>
        <div class="field-row">${field('Voltage', 'voltage', '12', 'V')}${field('Current', 'current', '', 'A')}${field('Resistance', 'resistance', '4', 'Ω')}</div>
        <div class="result-band"><div><span>CALCULATED CURRENT</span><strong data-output="current">3 A</strong></div><div><span>POWER DISSIPATION</span><strong data-output="power">36 W</strong></div><div class="equation-note"><code>V = I × R</code><code>P = V × I</code></div></div>
      </article>

      <article class="tool-card" data-tool="color">
        <div class="tool-card-heading"><span class="tool-number">02</span><div><p class="eyebrow">PASSIVE COMPONENTS</p><h2>Resistor color code</h2></div><span class="tool-icon">${icon('circuit')}</span></div>
        <p class="tool-description">Decode the four-band convention: two significant digits, multiplier and tolerance.</p>
        <div class="resistor-visual" aria-label="Four-band resistor illustration"><span class="resistor-wire"></span><span class="resistor-body"><i data-band-visual="1"></i><i data-band-visual="2"></i><i data-band-visual="3"></i><i data-band-visual="4"></i></span><span class="resistor-wire"></span></div>
        <div class="field-row field-row-4">
          <label class="field"><span>BAND 1</span><select data-field="band1"><option value="0">Black · 0</option><option value="1">Brown · 1</option><option value="2">Red · 2</option><option value="3">Orange · 3</option><option value="4" selected>Yellow · 4</option><option value="5">Green · 5</option><option value="6">Blue · 6</option><option value="7">Violet · 7</option><option value="8">Grey · 8</option><option value="9">White · 9</option></select></label>
          <label class="field"><span>BAND 2</span><select data-field="band2"><option value="0">Black · 0</option><option value="1">Brown · 1</option><option value="2">Red · 2</option><option value="3">Orange · 3</option><option value="4">Yellow · 4</option><option value="5">Green · 5</option><option value="6">Blue · 6</option><option value="7" selected>Violet · 7</option><option value="8">Grey · 8</option><option value="9">White · 9</option></select></label>
          <label class="field"><span>MULTIPLIER</span><select data-field="multiplier"><option value="0.01">Silver · ×0.01</option><option value="0.1">Gold · ×0.1</option><option value="1">Black · ×1</option><option value="10">Brown · ×10</option><option value="100" selected>Red · ×100</option><option value="1000">Orange · ×1k</option><option value="10000">Yellow · ×10k</option></select></label>
          <label class="field"><span>TOLERANCE</span><select data-field="tolerance"><option value="1">Brown · ±1%</option><option value="2">Red · ±2%</option><option value="5" selected>Gold · ±5%</option><option value="10">Silver · ±10%</option></select></label>
        </div>
        <div class="result-inline"><span>RESISTANCE</span><strong data-output="value">4.7 kΩ</strong><small data-output="tolerance">±5%</small></div>
      </article>

      <article class="tool-card" data-tool="smd">
        <div class="tool-card-heading"><span class="tool-number">03</span><div><p class="eyebrow">SURFACE MOUNT</p><h2>SMD resistor</h2></div><span class="tool-icon">${icon('chip')}</span></div>
        <p class="tool-description">Read 3/4-digit numeric codes or embedded decimal markers.</p>
        <label class="field field-wide"><span>MARKING ON COMPONENT</span><div class="input-wrap code-input"><input type="text" value="472" maxlength="4" data-field="code" aria-label="SMD resistor code" /><small>3-DIGIT CODE</small></div></label>
        <div class="code-examples"><span>TRY</span><button type="button" data-code="103">103</button><button type="button" data-code="4R7">4R7</button><button type="button" data-code="R22">R22</button><button type="button" data-code="2K2">2K2</button></div>
        <div class="result-inline result-inline-strong"><span>DECODED VALUE</span><strong data-output="value">4.7 kΩ</strong><small data-output="message">47 × 10² Ω</small></div>
      </article>

      <article class="tool-card" data-tool="divider">
        <div class="tool-card-heading"><span class="tool-number">04</span><div><p class="eyebrow">ANALOG DESIGN</p><h2>Voltage divider</h2></div><span class="tool-icon">${icon('circuit')}</span></div>
        <p class="tool-description">A two-resistor network sets a predictable fraction of the input voltage.</p>
        <div class="field-row">${field('Input voltage', 'vin', '12', 'V')}${field('R1 · upper', 'r1', '10000', 'Ω')}${field('R2 · lower', 'r2', '10000', 'Ω')}</div>
        <div class="divider-diagram"><svg viewBox="0 0 320 76" role="img" aria-label="Voltage divider schematic"><path d="M18 38h58m30 0h47m30 0h99M76 38v-21h30v42H76zm77 0v-21h30v42h-30z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="153" cy="38" r="4" fill="var(--accent)"/><path d="M252 38v19m-12 0h24m-20 6h16m-12 6h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><text x="11" y="30">Vin</text><text x="80" y="15">R1</text><text x="155" y="15">R2</text><text x="193" y="31">Vout</text></svg></div>
        <div class="result-inline"><span>OUTPUT VOLTAGE</span><strong data-output="vout">6 V</strong><small data-output="ratio">50.0% of Vin</small></div>
      </article>

      <article class="tool-card" data-tool="led">
        <div class="tool-card-heading"><span class="tool-number">05</span><div><p class="eyebrow">LED CURRENT LIMITING</p><h2>LED resistor</h2></div><span class="tool-icon">${icon('bolt')}</span></div>
        <p class="tool-description">Select a resistor at or above the theoretical value to keep LED current within target.</p>
        <div class="field-row">${field('Supply', 'supply', '12', 'V')}${field('LED forward', 'led', '2', 'V')}${field('Target current', 'current', '20', 'mA')}</div>
        <div class="result-band result-band-compact"><div><span>THEORETICAL</span><strong data-output="theoretical">500 Ω</strong></div><div><span>STANDARD PICK · E24</span><strong class="accent-text" data-output="standard">510 Ω</strong></div><div><span>RESISTOR POWER</span><strong data-output="power">0.2 W</strong></div></div>
        <p class="micro-note">Choose a suitably rated resistor; allow margin for supply variation and LED tolerance.</p>
      </article>

      <article class="tool-card" data-tool="power">
        <div class="tool-card-heading"><span class="tool-number">06</span><div><p class="eyebrow">LOAD ESTIMATION</p><h2>Power &amp; energy</h2></div><span class="tool-icon">${icon('bolt')}</span></div>
        <p class="tool-description">For DC loads, real power is V × I. Add operating time to estimate consumed energy.</p>
        <div class="field-row">${field('Voltage', 'voltage', '12', 'V')}${field('Current', 'current', '3', 'A')}${field('Duration', 'hours', '4', 'h')}</div>
        <div class="result-tiles"><div><span>REAL POWER</span><strong data-output="watts">36 W</strong></div><div><span>APPARENT · DC</span><strong data-output="va">36 VA</strong></div><div><span>ENERGY</span><strong data-output="wh">144 Wh</strong></div><div><span>ENERGY</span><strong data-output="kwh">0.144 kWh</strong></div></div>
        <p class="micro-note">VA is shown equal to W for this DC estimate; AC power factor is not modelled.</p>
      </article>

      <article class="tool-card" data-tool="battery">
        <div class="tool-card-heading"><span class="tool-number">07</span><div><p class="eyebrow">OFF-GRID DESIGN</p><h2>Battery runtime</h2></div><span class="tool-icon">${icon('battery')}</span></div>
        <p class="tool-description">Estimate ideal runtime from capacity and a constant load current.</p>
        <div class="field-row">${field('Battery voltage', 'voltage', '12', 'V')}${field('Capacity', 'capacity', '20', 'Ah')}${field('Load current', 'current', '2', 'A')}</div>
        <div class="runtime-result"><div class="runtime-dial"><span data-output="hours">10</span><small>HOURS</small></div><div><span>IDEAL ESTIMATE</span><strong data-output="formatted">10 hours</strong><p>Real runtime will be lower due to conversion losses, temperature, ageing and discharge limits.</p></div></div>
      </article>

      <article class="tool-card tool-card-wide" data-tool="converter">
        <div class="tool-card-heading"><span class="tool-number">08</span><div><p class="eyebrow">ENGINEERING UNITS</p><h2>Unit converter</h2></div><span class="tool-icon">${icon('waves')}</span></div>
        <p class="tool-description">Switch domains without losing the engineering context.</p>
        <div class="converter-fields"><label class="field"><span>MEASUREMENT</span><select data-field="category"><option value="voltage">Voltage</option><option value="current">Current</option><option value="resistance">Resistance</option><option value="capacitance">Capacitance</option><option value="inductance">Inductance</option><option value="power">Power</option><option value="frequency">Frequency</option><option value="temperature">Temperature</option><option value="length">Length</option></select></label>${field('VALUE', 'value', '1000', '')}<label class="field"><span>FROM</span><select data-field="from">${unitOptions('voltage', 'mV')}</select></label><span class="converter-arrow">${icon('arrow', 18)}</span><label class="field"><span>TO</span><select data-field="to">${unitOptions('voltage', 'V')}</select></label></div>
        <div class="converter-result"><span>CONVERTED VALUE</span><strong data-output="result">1 V</strong><span data-output="equation">1000 mV = 1 V</span></div>
      </article>
    </div>
  `;
}
