import { icon } from './icons.js';

export function metricCard({ label, value, unit = '', iconName = 'chart', delta = '', tone = '' }) {
  return `<article class="metric-card ${tone}"><div class="metric-top"><span>${label}</span><span class="metric-icon">${icon(iconName, 16)}</span></div><div class="metric-value">${value}<small>${unit}</small></div><div class="metric-foot"><span class="metric-pulse"></span><span>${delta || 'SAMPLE · LOCAL SIMULATION'}</span></div></article>`;
}

export function sparkline(values, color = 'var(--accent)') {
  const list = values.map(Number);
  const min = Math.min(...list), max = Math.max(...list), span = max - min || 1;
  const points = list.map((value, index) => `${(index / Math.max(1, list.length - 1)) * 100},${32 - ((value - min) / span) * 25}`).join(' ');
  return `<svg class="sparkline" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true"><polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.5" vector-effect="non-scaling-stroke"/></svg>`;
}
