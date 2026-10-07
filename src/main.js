import { icon } from './core/icons.js';
import { applyLocalization, observeLocalization, translateString } from './data/localization.js';
import { renderLayout } from './views/layout.js';
import { renderHome } from './views/home.js';
import { renderTools } from './views/tools.js';
import { bindTools } from './views/tools-controller.js';
import { renderCircuits } from './views/circuits.js';
import { bindCircuits } from './views/circuits-controller.js';
import { renderEmbedded, bindEmbedded } from './views/embedded.js';
import { renderCommunications, bindCommunications } from './views/communications.js';
import { renderDashboard } from './views/dashboard.js';
import { bindDashboard } from './views/dashboard-controller.js';
import { renderSolarPump } from './views/solar-pump.js';
import { bindSolarPump } from './views/solar-pump-controller.js';
import { renderProjects } from './views/projects.js';
import { renderDocumentation } from './views/documentation.js';

const root = document.querySelector('#app');
const pages = {
  home: { title: 'Engineering workspace', eyebrow: 'OVERVIEW', render: renderHome },
  tools: { title: 'Engineering tools', eyebrow: 'CALCULATE', render: renderTools, bind: bindTools },
  circuits: { title: 'Circuit lab', eyebrow: 'SIMULATE', render: renderCircuits, bind: bindCircuits },
  embedded: { title: 'Embedded systems', eyebrow: 'REFERENCE', render: renderEmbedded, bind: bindEmbedded },
  communications: { title: 'Communication lab', eyebrow: 'CONNECT', render: renderCommunications, bind: bindCommunications },
  dashboard: { title: 'IoT dashboard', eyebrow: 'MONITOR', render: renderDashboard, bind: bindDashboard },
  'solar-pump': { title: 'Smart solar water pump', eyebrow: 'FIELD SYSTEM', render: renderSolarPump, bind: bindSolarPump },
  projects: { title: 'Selected projects', eyebrow: 'PORTFOLIO', render: renderProjects },
  documentation: { title: 'System documentation', eyebrow: 'REFERENCE', render: renderDocumentation },
};

let disposePage = () => {};
let disconnectLocalization = () => {};
let observer;
let toastTimer;
let language = localStorage.getItem('eel-language') === 'ar' ? 'ar' : 'en';
const themeStorageKey = 'eel-theme';
const storedTheme = localStorage.getItem(themeStorageKey);
document.documentElement.dataset.theme = storedTheme === 'light' ? 'light' : 'dark';

function currentRoute() {
  const route = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return pages[route] ? route : 'home';
}

function notify(message) {
  const region = root.querySelector('.toast-region');
  if (!region) return;
  region.textContent = message;
  region.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => region.classList.remove('is-visible'), 2200);
}

function revealSections() {
  observer?.disconnect();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-revealed'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  root.querySelectorAll('.reveal-in:not(.is-revealed), .section-block:not(.is-revealed)').forEach((section) => observer.observe(section));
}

function render() {
  disposePage();
  disposePage = () => {};
  disconnectLocalization();
  const route = currentRoute();
  const page = pages[route];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dataset.language = language;
  const localizedTitle = translateString(page.title, language);
  const localizedBrand = translateString('Embedded Engineering Lab', language);
  document.title = `${localizedTitle} — ${localizedBrand}`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = language === 'ar'
    ? 'مختبر تفاعلي للإلكترونيات والأنظمة المضمنة ومحاكاة الدوائر وإنترنت الأشياء.'
    : 'An interactive engineering lab for electronics, embedded systems, circuit simulation and IoT.';
  root.innerHTML = renderLayout({ active: route, title: page.title, eyebrow: page.eyebrow, content: page.render(), language });
  const pageRoot = root.querySelector('#page-root');
  pageRoot?.focus({ preventScroll: true });
  const cleanup = page.bind?.(pageRoot, notify);
  if (typeof cleanup === 'function') disposePage = cleanup;
  revealSections();
  root.classList.remove('menu-open');
  const themeButton = root.querySelector('[data-action="theme"]');
  if (themeButton) themeButton.innerHTML = icon(document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon', 18);
  applyLocalization(root, language);
  disconnectLocalization = observeLocalization(root, () => language);
}

root.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (action === 'theme') {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem(themeStorageKey, nextTheme);
    const button = root.querySelector('[data-action="theme"]');
    if (button) button.innerHTML = icon(nextTheme === 'dark' ? 'sun' : 'moon', 18);
    notify(`${nextTheme === 'dark' ? 'Dark' : 'Light'} theme enabled`);
  }
  if (action === 'language') {
    language = language === 'ar' ? 'en' : 'ar';
    localStorage.setItem('eel-language', language);
    render();
    notify(language === 'ar' ? 'Language changed to العربية' : 'Language changed to English');
  }
  if (action === 'toggle-menu') root.classList.toggle('menu-open');
  if (action === 'close-menu' || event.target.closest('.nav-item')) root.classList.remove('menu-open');
});

window.addEventListener('hashchange', render);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') root.classList.remove('menu-open');
});
if (!window.location.hash) window.history.replaceState(null, '', '#/home');
render();
