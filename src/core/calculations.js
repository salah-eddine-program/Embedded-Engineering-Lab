const finite = (value) => Number.isFinite(Number(value));
const positive = (value) => finite(value) && Number(value) > 0;

export function solveOhm({ voltage, current, resistance }) {
  const v = positive(voltage) ? Number(voltage) : null;
  const i = positive(current) ? Number(current) : null;
  const r = positive(resistance) ? Number(resistance) : null;
  let V = v, I = i, R = r;
  if (V !== null && I !== null) R = V / I;
  else if (V !== null && R !== null) I = V / R;
  else if (I !== null && R !== null) V = I * R;
  else return { voltage: V, current: I, resistance: R, power: null, ready: false };
  return { voltage: V, current: I, resistance: R, power: V * I, ready: true };
}

export function solveElectrical({ voltage, current, resistance, power }) {
  let V = positive(voltage) ? Number(voltage) : null;
  let I = positive(current) ? Number(current) : null;
  let R = positive(resistance) ? Number(resistance) : null;
  let P = positive(power) ? Number(power) : null;
  if (V !== null && I !== null) { R = V / I; P = V * I; }
  else if (V !== null && R !== null) { I = V / R; P = V * I; }
  else if (I !== null && R !== null) { V = I * R; P = V * I; }
  else if (P !== null && V !== null) { I = P / V; R = V / I; }
  else if (P !== null && I !== null) { V = P / I; R = V / I; }
  else if (P !== null && R !== null) { V = Math.sqrt(P * R); I = V / R; }
  else return { voltage: V, current: I, resistance: R, power: P, ready: false };
  return { voltage: V, current: I, resistance: R, power: P, ready: true };
}

export function resistorColorValue(first, second, multiplier, tolerance) {
  const digits = [Number(first), Number(second)];
  const factor = Number(multiplier);
  if (digits.some((digit) => !Number.isInteger(digit) || digit < 0 || digit > 9) || !Number.isFinite(factor)) return null;
  return { ohms: (digits[0] * 10 + digits[1]) * factor, tolerance: Number(tolerance) };
}

export function parseSmdCode(rawCode) {
  const code = String(rawCode ?? '').trim().toUpperCase().replace(/\s+/g, '');
  if (!code) return null;
  const decimalCode = code.match(/^(\d*)R(\d+)$/);
  if (decimalCode) return Number(`${decimalCode[1] || '0'}.${decimalCode[2]}`);
  const kiloCode = code.match(/^(\d*)K(\d+)$/);
  if (kiloCode) return Number(`${kiloCode[1] || '0'}.${kiloCode[2]}`) * 1000;
  if (/^\d{3}$/.test(code)) return Number(code.slice(0, 2)) * 10 ** Number(code[2]);
  if (/^\d{4}$/.test(code)) return Number(code.slice(0, 3)) * 10 ** Number(code[3]);
  return null;
}

export function voltageDivider(vin, r1, r2) {
  const V = Number(vin), R1 = Number(r1), R2 = Number(r2);
  if (![V, R1, R2].every(Number.isFinite) || V < 0 || R1 <= 0 || R2 <= 0) return null;
  return V * R2 / (R1 + R2);
}

const E24 = [10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 27, 30, 33, 36, 39, 43, 47, 51, 56, 62, 68, 75, 82, 91];
export function nearestE24AtOrAbove(value) {
  const target = Number(value);
  if (!Number.isFinite(target) || target <= 0) return null;
  const decade = 10 ** (Math.floor(Math.log10(target)) - 1);
  const scaled = target / decade;
  const candidate = E24.find((base) => base >= scaled);
  return candidate ? candidate * decade : E24[0] * decade * 10;
}

export function ledResistor(supplyVoltage, ledVoltage, currentMilliamps) {
  const supply = Number(supplyVoltage), led = Number(ledVoltage), current = Number(currentMilliamps) / 1000;
  if (![supply, led, current].every(Number.isFinite) || supply <= led || current <= 0) return null;
  const theoretical = (supply - led) / current;
  return { theoretical, standard: nearestE24AtOrAbove(theoretical), power: (supply - led) * current };
}

export function batteryRuntime(capacityAh, loadCurrentA) {
  const capacity = Number(capacityAh), current = Number(loadCurrentA);
  if (![capacity, current].every(Number.isFinite) || capacity <= 0 || current <= 0) return null;
  return capacity / current;
}

export const UNIT_GROUPS = {
  voltage: { V: 1, mV: 1e-3, kV: 1e3 },
  current: { A: 1, mA: 1e-3, 'µA': 1e-6 },
  resistance: { 'Ω': 1, 'kΩ': 1e3, 'MΩ': 1e6 },
  capacitance: { F: 1, mF: 1e-3, 'µF': 1e-6, nF: 1e-9, pF: 1e-12 },
  inductance: { H: 1, mH: 1e-3, 'µH': 1e-6 },
  power: { W: 1, mW: 1e-3, kW: 1e3 },
  frequency: { Hz: 1, kHz: 1e3, MHz: 1e6, GHz: 1e9 },
  temperature: { '°C': 'c', '°F': 'f', K: 'k' },
  length: { m: 1, cm: 1e-2, mm: 1e-3, km: 1e3 },
};

export function convertUnit(value, category, from, to) {
  const input = Number(value);
  const group = UNIT_GROUPS[category];
  if (!Number.isFinite(input) || !group || !(from in group) || !(to in group)) return null;
  if (category === 'temperature') {
    let celsius = input;
    if (from === '°F') celsius = (input - 32) * 5 / 9;
    if (from === 'K') celsius = input - 273.15;
    if (to === '°F') return celsius * 9 / 5 + 32;
    if (to === 'K') return celsius + 273.15;
    return celsius;
  }
  return input * group[from] / group[to];
}
