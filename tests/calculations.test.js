import test from 'node:test';
import assert from 'node:assert/strict';
import {
  batteryRuntime,
  convertUnit,
  ledResistor,
  nearestE24AtOrAbove,
  parseSmdCode,
  resistorColorValue,
  solveElectrical,
  solveOhm,
  voltageDivider,
} from '../src/core/calculations.js';
import { getFaults } from '../src/data/telemetry.js';

const closeTo = (actual, expected, tolerance = 1e-9) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);

test('Ohm’s law derives current and power from 12 V and 4 Ω', () => {
  const result = solveOhm({ voltage: 12, current: '', resistance: 4 });
  assert.equal(result.ready, true);
  closeTo(result.current, 3);
  closeTo(result.power, 36);
});

test('resistor colour code decodes 47 × 100 with 5% tolerance', () => {
  assert.deepEqual(resistorColorValue(4, 7, 100, 5), { ohms: 4700, tolerance: 5 });
});

test('SMD numeric and decimal-marked codes decode correctly', () => {
  assert.equal(parseSmdCode('472'), 4700);
  assert.equal(parseSmdCode('103'), 10000);
  assert.equal(parseSmdCode('4R7'), 4.7);
  assert.equal(parseSmdCode('R22'), 0.22);
  assert.equal(parseSmdCode('2K2'), 2200);
  assert.equal(parseSmdCode('bad'), null);
});

test('voltage divider returns 6 V from equal 10 kΩ resistors at 12 V', () => {
  closeTo(voltageDivider(12, 10000, 10000), 6);
});

test('LED resistor recommendation rounds upward to a safe E24 value', () => {
  const result = ledResistor(12, 2, 20);
  closeTo(result.theoretical, 500);
  assert.equal(result.standard, 510);
  assert.equal(nearestE24AtOrAbove(920), 1000);
  assert.equal(nearestE24AtOrAbove(560), 560);
});

test('power and battery estimates follow the documented DC assumptions', () => {
  const electrical = solveElectrical({ voltage: 12, current: 3, resistance: '', power: '' });
  closeTo(electrical.power, 36);
  closeTo(batteryRuntime(20, 2), 10);
});

test('unit converter handles engineering scale prefixes and temperature', () => {
  closeTo(convertUnit(1000, 'current', 'mA', 'A'), 1);
  closeTo(convertUnit(1000, 'capacitance', 'µF', 'mF'), 1);
  closeTo(convertUnit(1, 'frequency', 'MHz', 'Hz'), 1e6);
  closeTo(convertUnit(0, 'temperature', '°C', '°F'), 32);
});

test('pump alert rules preserve their exact thresholds and conditions', () => {
  const faults = getFaults({ water: 5, temperature: 42.1, pumpOn: true, current: 0 });
  assert.deepEqual(faults.map((fault) => fault.title), ['LOW WATER LEVEL', 'HIGH TEMPERATURE', 'POSSIBLE PUMP FAILURE']);
  assert.deepEqual(getFaults({ water: 5.1, temperature: 42, pumpOn: false, current: 0 }), []);
});
