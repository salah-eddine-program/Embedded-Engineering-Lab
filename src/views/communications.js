import { protocols } from '../data/engineering-content.js';
import { icon } from '../core/icons.js';

function protocolDetails(protocol) {
  return `<div class="protocol-detail-head"><div><p class="eyebrow">${protocol.type.toUpperCase()}</p><h2>${protocol.name}</h2></div><span class="protocol-rate">${protocol.rate}</span></div><p class="protocol-summary">${protocol.summary}</p><div class="protocol-field-grid">${protocol.fields.map(([name, detail], index) => `<div class="protocol-field"><span>0${index + 1} / ${name.toUpperCase()}</span><p>${detail}</p></div>`).join('')}</div>${protocol.wires ? `<div class="uart-diagram"><div class="uart-diagram-head"><span>LOGIC CONNECTION</span><span>3-WIRE MINIMUM</span></div><div class="uart-row uart-row-head"><span>DEVICE A</span><span>LINE</span><span>DEVICE B</span></div>${protocol.wires.map(([a, b]) => `<div class="uart-row"><strong>${a}</strong><span class="uart-wire"><i></i><b>${a === 'GND' ? 'COMMON REFERENCE' : 'CROSSED DATA'}</b><i></i></span><strong>${b}</strong></div>`).join('')}</div>` : `<div class="protocol-note"><span>${icon('waves', 18)}</span><p>Review the bus topology, electrical layer and termination before selecting transceivers.</p></div>`}`;
}

export function renderCommunications() {
  const initial = protocols[0];
  return `
    <section class="page-lede-row"><p class="page-lede">Choose the link that fits the distance, topology, noise environment and data rate.</p><span class="note-tag">PHYSICAL LAYER → APPLICATION</span></section>
    <div class="communication-layout"><aside class="protocol-nav"><div class="protocol-nav-title"><span>PROTOCOL INDEX</span><span>09</span></div>${protocols.map((protocol, index) => `<button type="button" class="protocol-nav-item ${index === 0 ? 'is-selected' : ''}" data-protocol-select="${protocol.id}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${protocol.name}</strong><small>${protocol.type}</small>${index === 0 ? icon('arrow', 15) : ''}</button>`).join('')}<div class="protocol-nav-foot">Select a protocol to inspect its framing and practical wiring notes.</div></aside><article class="protocol-detail" id="protocol-detail">${protocolDetails(initial)}</article></div>
    <section class="protocol-comparison"><div><p class="eyebrow">QUICK SELECTION</p><h2>Choose by constraint, not habit.</h2></div><div class="comparison-row"><span>SHORT, SIMPLE MCU LINK</span><strong>UART</strong><span>SHARED SENSOR BUS</span><strong>I²C</strong><span>FAST PERIPHERAL LINK</span><strong>SPI</strong></div><div class="comparison-row"><span>NOISY / LONG CABLE</span><strong>RS-485 / CAN</strong><span>INDUSTRIAL REGISTERS</span><strong>Modbus</strong><span>NETWORK TELEMETRY</span><strong>MQTT / HTTP</strong></div></section>
  `;
}

export function bindCommunications(root) {
  const detail = root.querySelector('#protocol-detail');
  root.querySelectorAll('[data-protocol-select]').forEach((button) => button.addEventListener('click', () => {
    root.querySelectorAll('[data-protocol-select]').forEach((entry) => entry.classList.toggle('is-selected', entry === button));
    const protocol = protocols.find((entry) => entry.id === button.dataset.protocolSelect);
    detail.innerHTML = protocolDetails(protocol);
  }));
}
