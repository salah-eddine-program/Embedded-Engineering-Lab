export function formatNumber(value, maximumFractionDigits = 2) {
  const number = Number(value);
  if (!Number.isFinite(number)) return '—';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits, minimumFractionDigits: 0 }).format(number);
}

export function formatResistance(value) {
  const ohms = Number(value);
  if (!Number.isFinite(ohms)) return '—';
  if (ohms >= 1e6) return `${formatNumber(ohms / 1e6, 3)} MΩ`;
  if (ohms >= 1e3) return `${formatNumber(ohms / 1e3, 3)} kΩ`;
  return `${formatNumber(ohms, 2)} Ω`;
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value)));
}
