import { embeddedBoards } from '../data/engineering-content.js';
import { escapeHtml } from '../core/format.js';
import { icon } from '../core/icons.js';

export function renderEmbedded() {
  const boardCards = embeddedBoards.map((board) => `
    <section class="board-panel" data-board-panel="${board.id}">
      <div class="board-intro board-${board.color}"><div><span class="eyebrow">${board.category.toUpperCase()}</span><h2>${board.name}<span class="board-dot"></span></h2><p>${board.intro}</p></div><div class="board-chip">${icon('chip', 32)}<span>MCU<br>REFERENCE</span></div></div>
      <div class="board-content-grid"><div class="topic-list">${board.topics.map((topic, index) => `<details class="topic-item" ${index === 0 ? 'open' : ''}><summary><span class="topic-index">0${index + 1}</span><strong>${topic.name}</strong><span class="topic-toggle">+</span></summary><p>${topic.detail}</p></details>`).join('')}</div>
      <div class="code-panel"><div class="code-panel-head"><span><i class="source-dot"></i> ${board.name.toUpperCase()} / EXAMPLE</span><button class="icon-button copy-button" type="button" data-copy="${board.id}" aria-label="Copy ${board.name} example" title="Copy example">${icon('copy', 16)}</button></div><pre><code>${escapeHtml(board.code)}</code></pre><div class="code-panel-foot"><span>ILLUSTRATIVE SNIPPET</span><span>CHECK BOARD-SPECIFIC PINOUTS</span></div></div></div>
      <div class="board-note"><span class="note-marker">!</span><p>Check electrical limits, pin mappings and driver requirements against the exact board and component datasheets before connecting hardware.</p></div>
    </section>
  `).join('');
  return `
    <section class="page-lede-row"><p class="page-lede">A practical map from prototype-friendly boards to deterministic embedded control.</p><span class="note-tag">REFERENCE CONTENT · NO DEVICE LINK</span></section>
    <div class="board-switcher" role="tablist" aria-label="Embedded platform"><span class="eyebrow">PLATFORM</span>${embeddedBoards.map((board, index) => `<button class="board-tab ${index === 0 ? 'is-selected' : ''}" type="button" role="tab" aria-selected="${index === 0}" data-board-tab="${board.id}"><span>0${index + 1}</span>${board.name}</button>`).join('')}</div>
    <div class="embedded-board-content">${boardCards}</div>
    <section class="principle-strip"><div class="principle-strip-mark">${icon('alert', 20)}</div><div><p class="eyebrow">ENGINEERING PRACTICE</p><h3>Start with the datasheet. End with a measured result.</h3></div><p>Pin voltage, current limits, timing, grounding and protection are part of the design—not afterthoughts.</p></section>
  `;
}

export function bindEmbedded(root, toast) {
  const activate = (id) => {
    root.querySelectorAll('[data-board-tab]').forEach((tab) => {
      const selected = tab.dataset.boardTab === id;
      tab.classList.toggle('is-selected', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    root.querySelectorAll('[data-board-panel]').forEach((panel) => panel.hidden = panel.dataset.boardPanel !== id);
  };
  root.querySelectorAll('[data-board-tab]').forEach((tab) => tab.addEventListener('click', () => activate(tab.dataset.boardTab)));
  activate(embeddedBoards[0].id);
  root.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', async () => {
    const board = embeddedBoards.find((entry) => entry.id === button.dataset.copy);
    try { await navigator.clipboard.writeText(board.code); toast(`${board.name} example copied`); }
    catch { toast('Clipboard access is unavailable in this browser'); }
  }));
}
