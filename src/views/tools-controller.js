import { batteryRuntime, convertUnit, ledResistor, resistorColorValue, solveElectrical, solveOhm, UNIT_GROUPS, voltageDivider } from '../core/calculations.js';
import { formatNumber, formatResistance } from '../core/format.js';
import { describeSmdCode } from '../core/smd.js';

const get = (card, key) => card.querySelector(`[data-field="${key}"]`)?.value ?? '';
const output = (card, key, value) => { const node = card.querySelector(`[data-output="${key}"]`); if (node) node.textContent = value; };
const numeric = (value) => value === '' ? NaN : Number(value);
const colorHex = { 0: '#202321', 1: '#8b4c27', 2: '#d95045', 3: '#e9853c', 4: '#f0ce58', 5: '#70ad70', 6: '#5d81c2', 7: '#a77ac8', 8: '#9ca4a3', 9: '#f2f1e8' };

function updateOhm(card) {
  const result = solveOhm({ voltage: get(card, 'voltage'), current: get(card, 'current'), resistance: get(card, 'resistance') });
  output(card, 'current', result.ready ? `${formatNumber(result.current, 4)} A` : 'Enter any two values');
  output(card, 'power', result.ready ? `${formatNumber(result.power, 4)} W` : '—');
}

function updateColor(card) {
  const tolerance = numeric(get(card, 'tolerance'));
  const result = resistorColorValue(get(card, 'band1'), get(card, 'band2'), get(card, 'multiplier'), tolerance);
  output(card, 'value', result ? formatResistance(result.ohms) : '—');
  output(card, 'tolerance', result ? `±${formatNumber(result.tolerance)}%` : '');
  [get(card, 'band1'), get(card, 'band2')].forEach((value, index) => {
    const band = card.querySelector(`[data-band-visual="${index + 1}"]`);
    if (band) band.style.backgroundColor = colorHex[value] ?? '#888';
  });
  const multiplierColors = { '0.01': '#c4c4c4', '0.1': '#c7a252', '1': '#202321', '10': '#8b4c27', '100': '#d95045', '1000': '#e9853c', '10000': '#f0ce58' };
  const multBand = card.querySelector('[data-band-visual="3"]');
  const toleranceBand = card.querySelector('[data-band-visual="4"]');
  if (multBand) multBand.style.backgroundColor = multiplierColors[get(card, 'multiplier')] ?? '#888';
  if (toleranceBand) toleranceBand.style.backgroundColor = tolerance === 1 ? '#8b4c27' : tolerance === 2 ? '#d95045' : tolerance === 10 ? '#c4c4c4' : '#c7a252';
}

function updateSmd(card) {
  const result = describeSmdCode(get(card, 'code'));
  const codeInput = card.querySelector('[data-field="code"]');
  codeInput?.classList.toggle('is-invalid', !result);
  output(card, 'value', result?.value ?? 'Invalid code');
  output(card, 'message', result?.message ?? 'Use 3/4 digits or R/K decimal notation');
}

function updateDivider(card) {
  const vin = numeric(get(card, 'vin'));
  const r1 = numeric(get(card, 'r1'));
  const r2 = numeric(get(card, 'r2'));
  const value = voltageDivider(vin, r1, r2);
  output(card, 'vout', value === null ? 'Check inputs' : `${formatNumber(value, 4)} V`);
  output(card, 'ratio', value === null || vin === 0 ? '—' : `${formatNumber(value / vin * 100, 1)}% of Vin`);
}

function updateLed(card) {
  const result = ledResistor(get(card, 'supply'), get(card, 'led'), get(card, 'current'));
  output(card, 'theoretical', result ? formatResistance(result.theoretical) : 'Supply must exceed LED voltage');
  output(card, 'standard', result ? formatResistance(result.standard) : '—');
  output(card, 'power', result ? `${formatNumber(result.power, 3)} W` : '—');
}

function updatePower(card) {
  const result = solveElectrical({ voltage: get(card, 'voltage'), current: get(card, 'current'), resistance: get(card, 'resistance'), power: get(card, 'power') });
  const hours = Math.max(0, numeric(get(card, 'hours')) || 0);
  if (!result.ready) {
    ['watts', 'va', 'wh', 'kwh'].forEach((key) => output(card, key, 'Enter any two values'));
    return;
  }
  const energy = result.power * hours;
  output(card, 'watts', `${formatNumber(result.power, 4)} W`);
  output(card, 'va', `${formatNumber(result.power, 4)} VA`);
  output(card, 'wh', `${formatNumber(energy, 4)} Wh`);
  output(card, 'kwh', `${formatNumber(energy / 1000, 5)} kWh`);
}

function updateBattery(card) {
  const runtime = batteryRuntime(get(card, 'capacity'), get(card, 'current'));
  output(card, 'hours', runtime === null ? '—' : formatNumber(runtime, 2));
  output(card, 'formatted', runtime === null ? 'Check capacity and load' : `${formatNumber(runtime, 2)} hours`);
}

function renderUnits(select, category, selected) {
  if (!select) return;
  select.innerHTML = Object.keys(UNIT_GROUPS[category]).map((unit) => `<option value="${unit}" ${unit === selected ? 'selected' : ''}>${unit}</option>`).join('');
}

function updateConverter(card, categoryChanged = false) {
  const category = get(card, 'category');
  const from = card.querySelector('[data-field="from"]');
  const to = card.querySelector('[data-field="to"]');
  if (categoryChanged) {
    const units = Object.keys(UNIT_GROUPS[category]);
    renderUnits(from, category, units[0]);
    renderUnits(to, category, units[1] ?? units[0]);
  }
  const fromUnit = get(card, 'from');
  const toUnit = get(card, 'to');
  const value = numeric(get(card, 'value'));
  const converted = convertUnit(value, category, fromUnit, toUnit);
  output(card, 'result', converted === null ? '—' : `${formatNumber(converted, 7)} ${toUnit}`);
  output(card, 'equation', converted === null ? 'Check value and units' : `${formatNumber(value, 7)} ${fromUnit} = ${formatNumber(converted, 7)} ${toUnit}`);
}

const updaters = { ohm: updateOhm, color: updateColor, smd: updateSmd, divider: updateDivider, led: updateLed, power: updatePower, battery: updateBattery };

export function bindTools(root) {
  const updateCard = (card, categoryChanged = false) => {
    const type = card?.dataset.tool;
    if (type === 'converter') updateConverter(card, categoryChanged);
    else updaters[type]?.(card);
  };
  root.querySelectorAll('[data-tool]').forEach((card) => updateCard(card));
  const onInput = (event) => {
    const card = event.target.closest('[data-tool]');
    if (card) updateCard(card);
  };
  const onChange = (event) => {
    const card = event.target.closest('[data-tool]');
    if (card) updateCard(card, event.target.dataset.field === 'category');
  };
  const onClick = (event) => {
    const button = event.target.closest('[data-code]');
    if (!button) return;
    const card = button.closest('[data-tool="smd"]');
    const input = card?.querySelector('[data-field="code"]');
    if (input) { input.value = button.dataset.code; updateCard(card); input.focus(); }
  };
  root.addEventListener('input', onInput);
  root.addEventListener('change', onChange);
  root.addEventListener('click', onClick);
  return () => {
    root.removeEventListener('input', onInput);
    root.removeEventListener('change', onChange);
    root.removeEventListener('click', onClick);
  };
}
