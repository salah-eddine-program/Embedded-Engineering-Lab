import { parseSmdCode } from './calculations.js';
import { formatNumber, formatResistance } from './format.js';

export function describeSmdCode(code) {
  const ohms = parseSmdCode(code);
  if (ohms === null || !Number.isFinite(ohms)) return null;
  const normalized = String(code).trim().toUpperCase();
  let message = `${formatNumber(ohms)} Ω`;
  if (/^\d{3}$/.test(normalized)) message = `${normalized.slice(0, 2)} × 10^${normalized[2]} Ω`;
  if (/^\d{4}$/.test(normalized)) message = `${normalized.slice(0, 3)} × 10^${normalized[3]} Ω`;
  return { ohms, value: formatResistance(ohms), message };
}
