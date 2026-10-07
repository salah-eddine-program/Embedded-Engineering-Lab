import { clamp } from '../core/format.js';

const state = {
  temperature: 27.4,
  humidity: 42,
  voltage: 18.6,
  current: 5.2,
  battery: 82,
  water: 78,
  energy: 1.84,
  pumpOn: true,
  mode: 'normal',
  tick: 0,
};

const history = Array.from({ length: 24 }, (_, index) => ({
  label: `${String((index * 5) % 60).padStart(2, '0')}:00`,
  temperature: 25.4 + Math.sin(index / 3.1) * 1.5 + index * 0.055,
  voltage: 17.8 + Math.sin(index / 4) * 0.7,
  power: 88 + Math.cos(index / 3.5) * 15,
}));

export function getTelemetry() {
  return { ...state, power: state.voltage * state.current };
}

export function getHistory() {
  return history.map((point) => ({ ...point }));
}

export function setScenario(mode) {
  state.mode = mode;
  if (mode === 'normal') Object.assign(state, { temperature: 31, current: 5.2, water: 78, pumpOn: true });
  if (mode === 'low-water') Object.assign(state, { temperature: 31, current: 5.2, water: 5, pumpOn: true });
  if (mode === 'high-temperature') Object.assign(state, { temperature: 48, current: 5.2, water: 78, pumpOn: true });
  if (mode === 'pump-failure') Object.assign(state, { temperature: 31, current: 0, water: 78, pumpOn: true });
  return getTelemetry();
}

export function getFaults(sample = state) {
  const faults = [];
  if (sample.water <= 5) faults.push({ level: 'critical', title: 'LOW WATER LEVEL', detail: 'Water level has reached the 5% minimum threshold.' });
  if (sample.temperature > 42) faults.push({ level: 'warning', title: 'HIGH TEMPERATURE', detail: 'Temperature is above the configured 42°C limit.' });
  if (sample.pumpOn && sample.current === 0) faults.push({ level: 'critical', title: 'POSSIBLE PUMP FAILURE', detail: 'Pump is ON while measured current is zero.' });
  return faults;
}

export function tickTelemetry() {
  state.tick += 1;
  if (state.mode === 'normal') {
    state.temperature = clamp(state.temperature + Math.sin(state.tick / 3) * 0.28, 29.4, 32.1);
    state.humidity = clamp(state.humidity + Math.cos(state.tick / 4) * 0.6, 39, 46);
    state.voltage = clamp(state.voltage + Math.sin(state.tick / 2.7) * 0.16, 17.9, 19.1);
    state.current = clamp(state.current + Math.cos(state.tick / 3.8) * 0.12, 4.8, 5.5);
    state.water = clamp(state.water - 0.025, 74, 79);
    state.battery = clamp(state.battery + Math.sin(state.tick / 6) * 0.05, 80, 85);
    state.energy += (state.voltage * state.current) / 1000 / 30;
  }
  const sample = getTelemetry();
  const now = new Date();
  history.push({
    label: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
    temperature: sample.temperature,
    voltage: sample.voltage,
    power: sample.power,
  });
  if (history.length > 30) history.shift();
  return sample;
}
