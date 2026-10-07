import Chart from 'chart.js/auto';
import { formatNumber } from '../core/format.js';
import { getFaults, getHistory, getTelemetry, setScenario, tickTelemetry } from '../data/telemetry.js';
import { icon } from '../core/icons.js';

const set = (root, key, value) => { const node = root.querySelector(`[data-solar="${key}"]`); if (node) node.textContent = value; };

export function bindSolarPump(root) {
  const isArabic = document.documentElement.lang === 'ar';
  const canvas = root.querySelector('#solar-energy-chart');
  const grid = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || 'rgba(128,140,130,.18)';
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c8f169';
  const points = getHistory();
  const chart = canvas ? new Chart(canvas, { type: 'line', data: { labels: points.map((p) => p.label), datasets: [{ label: isArabic ? 'القدرة الشمسية' : 'Solar power', data: points.map((p) => p.power), borderColor: accent, backgroundColor: `${accent}20`, fill: true, borderWidth: 2, pointRadius: 0, tension: .4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { grid: { color: grid }, ticks: { color: '#8a958d', font: { family: isArabic ? 'Noto Sans Arabic' : 'IBM Plex Mono', size: 9 } } } } } }) : null;
  const faultList = root.querySelector('[data-fault-list]');
  const update = (sample) => {
    set(root, 'water', formatNumber(sample.water, 0));
    set(root, 'voltage', formatNumber(sample.voltage, 1));
    set(root, 'current', formatNumber(sample.current, 1));
    set(root, 'power', formatNumber(sample.power, 1));
    set(root, 'battery', formatNumber(sample.battery, 0));
    set(root, 'temperature', formatNumber(sample.temperature, 1));
    set(root, 'energy', formatNumber(sample.energy, 2));
    const gauge = root.querySelector('[data-water-gauge]');
    if (gauge) gauge.style.setProperty('--gauge', `${sample.water}%`);
    const waterCondition = root.querySelector('[data-water-condition]');
    if (waterCondition) { waterCondition.textContent = sample.water <= 5 ? 'CRITICAL' : 'NORMAL'; waterCondition.classList.toggle('is-alert', sample.water <= 5); }
    const faults = getFaults(sample);
    root.querySelector('[data-alert-count]').textContent = `${faults.length} ACTIVE`;
    root.querySelector('[data-alert-count]').classList.toggle('has-alerts', faults.length > 0);
    faultList.innerHTML = faults.length ? faults.map((fault) => `<div class="fault-item fault-${fault.level}"><span class="fault-icon">${icon('alert', 17)}</span><span><strong>${fault.title}</strong><small>${fault.detail}</small></span><span class="fault-level">${fault.level.toUpperCase()}</span></div>`).join('') : `<div class="fault-ok">${icon('check', 18)}<span>No active faults.<small>Thresholds are evaluated on each demo sample.</small></span></div>`;
    const history = getHistory();
    if (chart) { chart.data.labels = history.map((point) => point.label); chart.data.datasets[0].data = history.map((point) => point.power); chart.update('none'); }
  };
  const onClick = (event) => {
    const button = event.target.closest('[data-scenario]');
    if (!button) return;
    root.querySelectorAll('[data-scenario]').forEach((entry) => entry.classList.toggle('is-selected', entry === button));
    update(setScenario(button.dataset.scenario));
  };
  root.addEventListener('click', onClick);
  const timer = setInterval(() => { if (getTelemetry().mode === 'normal') update(tickTelemetry()); }, 2500);
  return () => { clearInterval(timer); root.removeEventListener('click', onClick); chart?.destroy(); };
}
