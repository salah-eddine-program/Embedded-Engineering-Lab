import { translateString as dictionaryTranslate } from './i18n.js';

const additionalArabic = {
  'Social profiles': 'روابط التواصل والملفات المهنية',
  'Contact and profile links': 'روابط التواصل والملفات المهنية',
  'Embedded Engineering Lab home': 'الصفحة الرئيسية لمختبر الأنظمة المضمنة',
  'System documentation': 'توثيق النظام',
  'EEL—01 / FIELD NOTES': 'EEL—01 / ملاحظات هندسية',
  'Capacitance': 'السعة الكهربائية',
  'Inductance': 'المحاثة',
  'Frequency': 'التردد',
  'Temperature': 'درجة الحرارة',
  'Length': 'الطول',
  'Power': 'القدرة',
  'Solar power': 'القدرة الشمسية',
  'SMD resistor code': 'شفرة مقاومة SMD',
  'System readings preview': 'معاينة قراءات النظام',
  'Sample voltage trend graph': 'مخطط اتجاه الجهد التجريبي',
  'Simulated temperature trend chart': 'مخطط اتجاه الحرارة المحاكى',
  'Simulated solar power trend chart': 'مخطط القدرة الشمسية المحاكى',
  'RC capacitor voltage over time': 'جهد مكثف RC بمرور الزمن',
  'Run-time estimate': 'تقدير مدة التشغيل',
  'WARNING': 'تحذير',
  'CRITICAL': 'حرج',
  'Series resistance': 'المقاومة المكافئة على التوالي',
  'SIM / 04': 'محاكاة / 04',
  'FEATURE PROJECT': 'مشروع مميز',
  'RAPID PROTOTYPING': 'النمذجة الأولية السريعة',
  'ARDUINO / EXAMPLE': 'أردوينو / مثال',
  'CONNECTED EDGE DEVICE': 'جهاز طرفي متصل',
  'REAL-TIME CONTROL': 'تحكم آني',
  'ESP32 / EXAMPLE': 'ESP32 / مثال',
  'STM32 / EXAMPLE': 'STM32 / مثال',
  'ASYNCHRONOUS SERIAL': 'اتصال تسلسلي غير متزامن',
  '01 / BAUD RATE': '01 / معدل البود',
  '02 / DATA BITS': '02 / بتات البيانات',
  '03 / PARITY': '03 / التكافؤ',
  '04 / STOP BITS': '04 / بتات التوقف',
  'STATE OF CHARGE': 'حالة الشحن',
  'Database': 'قاعدة البيانات',
  'Dashboard': 'لوحة البيانات',
  'FIELD-SIM / EEL-01': 'محاكاة ميدانية / EEL-01',
};

function preserveWhitespace(value, replacement) {
  const leading = value.match(/^\s*/u)?.[0] ?? '';
  const trailing = value.match(/\s*$/u)?.[0] ?? '';
  if (leading.length + trailing.length >= value.length) return value;
  return `${leading}${replacement}${trailing}`;
}

export function translateString(value, language = 'en') {
  if (language !== 'ar' || !value) return value;
  const core = value.trim();
  if (!core) return value;
  const extra = additionalArabic[core];
  if (extra) return preserveWhitespace(value, extra);
  const runtime = core.match(/^(\d+(?:\.\d+)?) hours$/u);
  if (runtime) {
    const hours = Number(runtime[1]);
    const unit = hours === 1 ? 'ساعة' : hours === 2 ? 'ساعتان' : hours >= 3 && hours <= 10 ? 'ساعات' : 'ساعة';
    return preserveWhitespace(value, `${runtime[1]} ${unit}`);
  }
  const ratio = core.match(/^(\d+(?:\.\d+)?)% of Vin$/u);
  if (ratio) return preserveWhitespace(value, `${ratio[1]}% من جهد الدخل`);
  const alertCount = core.match(/^(\d+) ACTIVE$/u);
  if (alertCount) return preserveWhitespace(value, `${alertCount[1]} تنبيهات نشطة`);
  return dictionaryTranslate(value, language);
}

function isTextProtected(element) {
  return element?.closest('pre, code, svg, script, style, textarea, [contenteditable="true"]');
}

function translateTextNode(node, language) {
  if (node.nodeType !== Node.TEXT_NODE || !node.parentElement || isTextProtected(node.parentElement)) return;
  const translated = translateString(node.nodeValue, language);
  if (translated !== node.nodeValue) node.nodeValue = translated;
}

function translateElementAttributes(element, language) {
  if (!(element instanceof Element) || element.closest('pre, code, script, style, textarea, [contenteditable="true"]')) return;
  for (const name of ['aria-label', 'title', 'placeholder', 'alt']) {
    if (!element.hasAttribute(name)) continue;
    const oldValue = element.getAttribute(name);
    const newValue = translateString(oldValue, language);
    if (oldValue !== newValue) element.setAttribute(name, newValue);
  }
}

function translateNode(node, language) {
  if (node.nodeType === Node.TEXT_NODE) { translateTextNode(node, language); return; }
  if (!(node instanceof Element)) return;
  translateElementAttributes(node, language);
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = walker.nextNode())) translateTextNode(textNode, language);
  node.querySelectorAll('[aria-label], [title], [placeholder], [alt]').forEach((element) => translateElementAttributes(element, language));
}

export function applyLocalization(root, language) {
  translateNode(root, language);
}

export function observeLocalization(root, getLanguage) {
  const observer = new MutationObserver((records) => {
    const language = getLanguage();
    records.forEach((record) => {
      if (record.type === 'characterData') translateTextNode(record.target, language);
      if (record.type === 'attributes') translateElementAttributes(record.target, language);
      if (record.type === 'childList') record.addedNodes.forEach((node) => translateNode(node, language));
    });
  });
  observer.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['aria-label', 'title', 'placeholder', 'alt'] });
  return () => observer.disconnect();
}
