const paths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  tools: '<path d="M14.7 6.3a4 4 0 0 0-5.7 5.7l-5.5 5.5a2 2 0 0 0 2.8 2.8l5.5-5.5a4 4 0 0 0 5.7-5.7L15 11l-3-3z"/><path d="m14 4 6 6"/>',
  circuit: '<path d="M4 7h4m8 0h4M7 4v3m10-3v3M4 17h5m6 0h5M7 17v3m10-3v3"/><circle cx="12" cy="12" r="3"/><path d="M12 9V4m0 16v-5"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>',
  radio: '<path d="M12 18v3m-5-3a7 7 0 0 1 10 0m-13-3a11 11 0 0 1 16 0m-19-4a15 15 0 0 1 22 0"/><circle cx="12" cy="20" r="1"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 6-7"/>',
  pump: '<path d="M4 19h16M6 19V8h7v11m0-8h4l2 2v6m-13-9h9M8 5h4v3H8z"/><path d="M17 10V6h3"/>',
  folder: '<path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 10h18"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
  moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
  arrow: '<path d="M5 12h14m-7-7 7 7-7 7"/>',
  bolt: '<path d="m13 2-3 8h7l-6 12 2-9H6z"/>',
  water: '<path d="M12 3s7 7.2 7 12a7 7 0 0 1-14 0c0-4.8 7-12 7-12z"/><path d="M9 16a3 3 0 0 0 3 2"/>',
  battery: '<rect x="3" y="7" width="17" height="10" rx="2"/><path d="M23 10v4M7 10v4m5-4v4"/>',
  thermometer: '<path d="M14 14.8V5a3 3 0 0 0-6 0v9.8a5 5 0 1 0 6 0Z"/><path d="M11 11v7"/>',
  waves: '<path d="M2 12h3l3-8 5 16 3-8h6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  alert: '<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m18 6-12 12M6 6l12 12"/>',
  external: '<path d="M14 3h7v7m0-7-11 11"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
};

export function icon(name, size = 18, extraClass = '') {
  const shape = paths[name] ?? paths.circuit;
  return `<svg class="icon ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shape}</svg>`;
}
