import { formatNumber } from '../core/format.js';
import { getHistory, getTelemetry } from '../data/telemetry.js';
import { icon } from '../core/icons.js';

const metric = (id, label, value, unit, iconName, detail) => `<article class="metric-card" data-metric-card="${id}"><div class="metric-top"><span>${label}</span><span class="metric-icon">${icon(iconName, 16)}</span></div><div class="metric-value"><strong data-metric="${id}">${value}</strong><small>${unit}</small></div><div class="metric-foot"><span class="metric-pulse"></span><span>${detail}</span></div></article>`;

export function renderDashboard() {
  const sample = getTelemetry();
  return `
    <section class="page-lede-row"><p class="page-lede">A connected-system view, driven by a local deterministic demo feed.</p><span class="demo-chip"><i class="status-dot"></i> SIMULATED TELEMETRY</span></section>
    <section class="device-strip"><div class="device-id"><span class="device-avatar">${icon('chip', 24)}</span><div><span>DEVICE NODE</span><strong>FIELD-SIM / EEL-01</strong></div></div><div class="device-meta"><span>FIRMWARE <strong>DEMO 1.0</strong></span><span>TRANSPORT <strong>LOCAL MOCK</strong></span><span>LAST SAMPLE <strong data-sample-time>just now</strong></span></div><button class="button button-secondary button-small" type="button" data-action="telemetry-pause">${icon('clock', 14)} Pause feed</button></section>
    <div class="metrics-grid">
      ${metric('temperature', 'TEMPERATURE', `${formatNumber(sample.temperature, 1)}`, '°C', 'thermometer', 'AMBIENT SENSOR · DEMO')}
      ${metric('humidity', 'HUMIDITY', `${formatNumber(sample.humidity, 0)}`, '%', 'water', 'RELATIVE HUMIDITY · DEMO')}
      ${metric('voltage', 'BUS VOLTAGE', `${formatNumber(sample.voltage, 1)}`, 'V', 'bolt', 'DC INPUT · DEMO')}
      ${metric('current', 'LOAD CURRENT', `${formatNumber(sample.current, 2)}`, 'A', 'waves', 'PUMP CIRCUIT · DEMO')}
      ${metric('power', 'SOLAR POWER', `${formatNumber(sample.power, 1)}`, 'W', 'sun', 'V × I · ESTIMATED')}
      ${metric('battery', 'BATTERY STATE', `${formatNumber(sample.battery, 0)}`, '%', 'battery', 'STATE OF CHARGE · DEMO')}
    </div>
    <div class="dashboard-chart-grid"><article class="chart-panel chart-panel-large"><div class="panel-heading"><div><p class="eyebrow">SENSOR HISTORY / SIMULATED</p><h2>Temperature trend</h2></div><div class="range-filter"><button type="button" class="is-selected" data-range="1H">1H</button><button type="button" data-range="6H">6H</button><button type="button" data-range="24H">24H</button></div></div><div class="chart-legend"><span><i class="legend-temp"></i> TEMP °C</span><span class="chart-live-label"><i class="status-dot"></i> STREAMING</span></div><div class="chart-canvas-wrap"><canvas id="telemetry-temp-chart" aria-label="Simulated temperature trend chart"></canvas></div></article>
      <article class="chart-panel"><div class="panel-heading"><div><p class="eyebrow">ENERGY / TODAY</p><h2>Solar output</h2></div>${icon('bolt', 19, 'subtle-icon')}</div><div class="energy-highlight"><strong><span data-metric="energy">${formatNumber(sample.energy, 2)}</span><small>kWh</small></strong><span>GENERATED TODAY</span></div><div class="chart-canvas-wrap chart-canvas-short"><canvas id="telemetry-power-chart" aria-label="Simulated solar power trend chart"></canvas></div><div class="chart-footnote"><span>PEAK <strong>142 W</strong></span><span>AVG <strong data-average-power>${formatNumber(sample.power, 1)} W</strong></span></div></article></div>
    <div class="data-boundary"><span class="boundary-icon">i</span><div><strong>Simulation boundary</strong><p>All values on this page are locally generated demo data. No ESP32, broker, external API or database is connected. The display is structured to illustrate a future telemetry pipeline.</p></div><a class="text-link" href="#/documentation">View architecture ${icon('arrow', 14)}</a></div>
  `;
}
