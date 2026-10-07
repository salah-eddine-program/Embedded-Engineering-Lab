import Chart from 'chart.js/auto';
import { formatNumber, formatResistance } from '../core/format.js';
import { voltageDivider } from '../core/calculations.js';

const isArabic = () => document.documentElement.lang === 'ar';
const read = (card, key) => Number(card.querySelector(`[data-sim-field="${key}"]`)?.value ?? NaN);
const text = (card, key, value) => { const node = card.querySelector(`[data-readout="${key}"]`); if (node) node.textContent = value; };
const modeState = new WeakMap();

function updateOhm(card) {
  const voltage = read(card, 'voltage');
  const resistance = read(card, 'resistance');
  text(card, 'resistanceValue', formatResistance(resistance));
  text(card, 'currentResult', `${formatNumber(voltage / resistance * 1000, 2)} mA`);
}

function updateDivider(card) {
  const vin = read(card, 'vin');
  const r1 = read(card, 'r1') * 1000;
  const r2 = read(card, 'r2') * 1000;
  const vout = voltageDivider(vin, r1, r2);
  text(card, 'vin', `${formatNumber(vin)} V`);
  text(card, 'r1Value', formatResistance(r1));
  text(card, 'r2Value', formatResistance(r2));
  text(card, 'vout', `${formatNumber(vout, 3)} V`);
  text(card, 'ratio', `${formatNumber(vout / vin * 100, 1)}% of Vin`);
}

function rcData(card) {
  const voltage = read(card, 'rcVoltage');
  const resistance = read(card, 'rcResistance') * 1000;
  const capacitance = read(card, 'capacitance') * 1e-6;
  const tau = resistance * capacitance;
  const mode = modeState.get(card) ?? 'charge';
  const labels = Array.from({ length: 41 }, (_, index) => index / 8 * tau);
  const data = labels.map((time) => mode === 'charge' ? voltage * (1 - Math.exp(-time / tau)) : voltage * Math.exp(-time / tau));
  text(card, 'tau', `${formatNumber(tau, 3)} s`);
  return { labels, data, voltage, tau, mode };
}

function updateRc(card, chart) {
  const result = rcData(card);
  chart.data.labels = result.labels.map((time) => formatNumber(time, 2));
  chart.data.datasets[0].data = result.data;
  chart.data.datasets[0].label = result.mode === 'charge' ? (isArabic() ? 'جهد الشحن' : 'Charging voltage') : (isArabic() ? 'جهد التفريغ' : 'Discharging voltage');
  chart.options.scales.y.max = result.voltage;
  chart.update('none');
}

function updateLed(card) {
  const supply = read(card, 'ledSupply');
  const resistance = read(card, 'ledResistance');
  const drop = 2;
  text(card, 'ledResistance', formatResistance(resistance));
  text(card, 'ledDrop', `${formatNumber(drop, 1)} V`);
  const current = Math.max(0, (supply - drop) / resistance * 1000);
  text(card, 'ledCurrent', `${formatNumber(current, 2)} mA`);
  card.classList.toggle('led-off', supply <= drop);
}

function updateKirchhoff(card) {
  const current = read(card, 'i1') + read(card, 'i2');
  text(card, 'iin', `${formatNumber(current, 2)} A`);
  text(card, 'kclState', 'NODE BALANCED · 0.0 A RESIDUAL');
}

export function bindCircuits(root) {
  const rcCard = root.querySelector('[data-sim="rc"]');
  const canvas = root.querySelector('#rc-chart');
  const chartColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c8f169';
  const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || 'rgba(128,140,130,.18)';
  const initial = rcCard ? rcData(rcCard) : null;
  let chart = null;
  if (canvas && initial) {
    chart = new Chart(canvas, {
      type: 'line',
      data: { labels: initial.labels.map((time) => formatNumber(time, 2)), datasets: [{ label: isArabic() ? 'جهد الشحن' : 'Charging voltage', data: initial.data, borderColor: chartColor, backgroundColor: `${chartColor}20`, fill: true, borderWidth: 2.5, pointRadius: 0, pointHoverRadius: 4, tension: 0.35 }] },
      options: { responsive: true, maintainAspectRatio: false, animation: { duration: 220 }, plugins: { legend: { display: false }, tooltip: { intersect: false, mode: 'index', callbacks: { title: (items) => isArabic() ? `الزمن = ${items[0]?.label} ث` : `t = ${items[0]?.label} s`, label: (item) => isArabic() ? ` جهد المكثف  ${formatNumber(item.raw, 3)} V` : ` Vc  ${formatNumber(item.raw, 3)} V` } } }, scales: { x: { title: { display: true, text: isArabic() ? 'الزمن (ث)' : 'TIME (s)', color: '#859087', font: { family: 'IBM Plex Mono', size: 9 } }, grid: { color: gridColor }, ticks: { color: '#859087', maxTicksLimit: 8, font: { family: 'IBM Plex Mono', size: 9 } } }, y: { min: 0, max: initial.voltage, title: { display: true, text: isArabic() ? 'الجهد (V)' : 'VOLTAGE (V)', color: '#859087', font: { family: 'IBM Plex Mono', size: 9 } }, grid: { color: gridColor }, ticks: { color: '#859087', font: { family: 'IBM Plex Mono', size: 9 } } } } },
    });
  }
  const update = (card) => {
    if (card.matches('[data-sim="ohm"]')) updateOhm(card);
    if (card.matches('[data-sim="divider"]')) updateDivider(card);
    if (card.matches('[data-sim="rc"]') && chart) updateRc(card, chart);
    if (card.matches('[data-sim="led"]')) updateLed(card);
    if (card.matches('[data-sim="kirchhoff"]')) updateKirchhoff(card);
  };
  root.querySelectorAll('[data-sim]').forEach(update);
  const abort = new AbortController();
  root.addEventListener('input', (event) => { const card = event.target.closest('[data-sim]'); if (card) update(card); }, { signal: abort.signal });
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-rc-mode]');
    if (!button || !rcCard) return;
    const mode = button.dataset.rcMode;
    modeState.set(rcCard, mode);
    rcCard.querySelectorAll('[data-rc-mode]').forEach((entry) => entry.classList.toggle('is-selected', entry === button));
    updateRc(rcCard, chart);
  }, { signal: abort.signal });
  return () => { abort.abort(); chart?.destroy(); };
}
