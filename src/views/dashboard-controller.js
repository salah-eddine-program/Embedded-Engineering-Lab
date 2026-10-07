import Chart from 'chart.js/auto';
import { lineChartOptions } from '../core/chart-theme.js';
import { formatNumber } from '../core/format.js';
import { getHistory, getTelemetry, tickTelemetry } from '../data/telemetry.js';

const setText = (root, selector, value) => { const node = root.querySelector(selector); if (node) node.textContent = value; };

export function bindDashboard(root) {
  let points = getHistory();
  const isArabic = document.documentElement.lang === 'ar';
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c8f169';
  const grid = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || 'rgba(128,140,130,.18)';
  const tempCanvas = root.querySelector('#telemetry-temp-chart');
  const powerCanvas = root.querySelector('#telemetry-power-chart');
  const tempChart = tempCanvas ? new Chart(tempCanvas, { type: 'line', data: { labels: points.map((p) => p.label), datasets: [{ label: isArabic ? 'درجة الحرارة' : 'Temperature', data: points.map((p) => p.temperature), borderColor: accent, backgroundColor: `${accent}20`, fill: true, borderWidth: 2.3, pointRadius: 0, pointHoverRadius: 4, tension: 0.36 }] }, options: { ...lineChartOptions(grid), scales: { ...lineChartOptions(grid).scales, y: { ...lineChartOptions(grid).scales.y, suggestedMin: 22, suggestedMax: 34 } } } }) : null;
  const powerChart = powerCanvas ? new Chart(powerCanvas, { type: 'line', data: { labels: points.map((p) => p.label), datasets: [{ label: isArabic ? 'القدرة' : 'Power', data: points.map((p) => p.power), borderColor: '#7f9df5', backgroundColor: '#7f9df520', fill: true, borderWidth: 2, pointRadius: 0, tension: 0.38 }] }, options: { ...lineChartOptions(grid), scales: { ...lineChartOptions(grid).scales, x: { ...lineChartOptions(grid).scales.x, display: false } } } }) : null;
  let paused = false;
  let range = '1H';
  let timer;
  const update = (sample) => {
    setText(root, '[data-metric="temperature"]', formatNumber(sample.temperature, 1));
    setText(root, '[data-metric="humidity"]', formatNumber(sample.humidity, 0));
    setText(root, '[data-metric="voltage"]', formatNumber(sample.voltage, 1));
    setText(root, '[data-metric="current"]', formatNumber(sample.current, 2));
    setText(root, '[data-metric="power"]', formatNumber(sample.power, 1));
    setText(root, '[data-metric="battery"]', formatNumber(sample.battery, 0));
    setText(root, '[data-metric="energy"]', formatNumber(sample.energy, 2));
    setText(root, '[data-average-power]', `${formatNumber(sample.power, 1)} W`);
    setText(root, '[data-sample-time]', new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    points = getHistory();
    const limit = range === '1H' ? 12 : range === '6H' ? 24 : 30;
    const selected = points.slice(-limit);
    if (tempChart) { tempChart.data.labels = selected.map((p) => p.label); tempChart.data.datasets[0].data = selected.map((p) => p.temperature); tempChart.update('none'); }
    if (powerChart) { powerChart.data.labels = selected.map((p) => p.label); powerChart.data.datasets[0].data = selected.map((p) => p.power); powerChart.update('none'); }
  };
  const start = () => { clearInterval(timer); timer = setInterval(() => { if (!paused) update(tickTelemetry()); }, 2500); };
  const onClick = (event) => {
    const pauseButton = event.target.closest('[data-action="telemetry-pause"]');
    if (pauseButton) {
      paused = !paused;
      pauseButton.innerHTML = paused ? '▶ Resume feed' : '◷ Pause feed';
      root.querySelectorAll('.chart-live-label').forEach((label) => { label.innerHTML = `<i class="status-dot ${paused ? 'is-paused' : ''}"></i> ${paused ? 'PAUSED' : 'STREAMING'}`; });
    }
    const rangeButton = event.target.closest('[data-range]');
    if (rangeButton) {
      range = rangeButton.dataset.range;
      root.querySelectorAll('[data-range]').forEach((button) => button.classList.toggle('is-selected', button === rangeButton));
      update(getTelemetry());
    }
  };
  root.addEventListener('click', onClick);
  start();
  return () => { clearInterval(timer); root.removeEventListener('click', onClick); tempChart?.destroy(); powerChart?.destroy(); };
}
