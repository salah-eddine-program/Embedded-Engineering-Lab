import { icon } from '../core/icons.js';

const navigation = [
  { id: 'home', label: 'Overview', icon: 'home', group: 'WORKSPACE' },
  { id: 'tools', label: 'Engineering tools', icon: 'tools' },
  { id: 'circuits', label: 'Circuit lab', icon: 'circuit' },
  { id: 'embedded', label: 'Embedded systems', icon: 'chip', group: 'REFERENCE' },
  { id: 'communications', label: 'Communication lab', icon: 'radio' },
  { id: 'dashboard', label: 'IoT dashboard', icon: 'chart', group: 'FIELD SYSTEMS' },
  { id: 'solar-pump', label: 'Solar water pump', icon: 'pump' },
  { id: 'projects', label: 'Projects', icon: 'folder', group: 'ABOUT' },
  { id: 'documentation', label: 'Documentation', icon: 'book' },
];

export function renderLayout({ active, title, eyebrow, content, language = 'en' }) {
  const navHtml = navigation.map((item) => {
    const group = item.group ? `<div class="nav-group-label">${item.group}</div>` : '';
    return `${group}<a class="nav-item ${active === item.id ? 'is-active' : ''}" href="#/${item.id}" ${active === item.id ? 'aria-current="page"' : ''}>${icon(item.icon)}<span>${item.label}</span>${active === item.id ? '<i class="nav-active-mark"></i>' : ''}</a>`;
  }).join('');
  const nextLanguage = language === 'ar' ? 'en' : 'ar';
  const languageName = nextLanguage === 'ar' ? 'العربية' : 'English';
  const languageAction = nextLanguage === 'ar' ? 'Switch language to Arabic' : 'Switch language to English';
  return `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <a class="brand" href="#/home" aria-label="Embedded Engineering Lab home">
          <span class="brand-mark"><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><rect x="1" y="1" width="38" height="38" rx="11" fill="currentColor" fill-opacity=".08"/><path d="M7 20h7l4-9 6 18 4-9h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="20" r="1.6" fill="currentColor"/><circle cx="33" cy="20" r="1.6" fill="currentColor"/></svg></span>
          <span class="brand-copy"><strong>Embedded</strong><small>ENGINEERING LAB</small></span>
        </a>
        <div class="sidebar-scroll">${navHtml}</div>
        <div class="sidebar-footer">
          <div class="sidebar-status"><span class="status-dot"></span><span>LAB SYSTEMS ONLINE</span><span class="mono">v1.0</span></div>
          <div class="profile-mini"><span class="profile-avatar">SB</span><span><strong>Salah Eddine</strong><small>Embedded engineer</small></span><span class="profile-chevron">↗</span></div>
        </div>
      </aside>
      <div class="sidebar-scrim" data-action="close-menu"></div>
      <div class="workspace">
        <header class="topbar">
          <button class="icon-button mobile-menu" type="button" data-action="toggle-menu" aria-label="Open navigation">${icon('menu', 20)}</button>
          <div class="breadcrumb"><span>LAB /</span><strong>${eyebrow}</strong></div>
          <div class="topbar-right">
            <span class="topbar-data"><i class="status-dot"></i> SIMULATED ENVIRONMENT</span>
            <span class="topbar-divider"></span>
            <button class="language-button" type="button" data-action="language" aria-label="${languageAction}" title="${languageAction}"><span class="language-glyph" aria-hidden="true">${language === 'ar' ? 'EN' : 'ع'}</span><span>${languageName}</span></button>
            <button class="icon-button theme-button" type="button" data-action="theme" aria-label="Toggle color theme" title="Toggle light / dark theme">${icon('sun', 18)}</button>
          </div>
        </header>
        <main id="page-root" class="page-root" tabindex="-1">
          <div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1></div><div class="page-heading-side"><span class="instrument-code">EEL—01 / FIELD NOTES</span></div></div>
          <div class="page-content">${content}</div>
        </main>
        <footer class="app-footer"><span>EMBEDDED ENGINEERING LAB</span><span>BUILT TO MEASURE · DESIGNED TO LEARN</span><span>© 2026</span></footer>
      </div>
    </div>
    <div class="toast-region" aria-live="polite" aria-atomic="true"></div>
  `;
}

export const navigationItems = navigation;
