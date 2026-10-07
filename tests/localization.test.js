import test from 'node:test';
import assert from 'node:assert/strict';
import { translateString } from '../src/data/localization.js';

test('translates interface labels and preserves English mode', () => {
  assert.equal(translateString('Overview', 'ar'), 'نظرة عامة');
  assert.equal(translateString('Overview', 'en'), 'Overview');
  assert.equal(translateString('  View projects  ', 'ar'), '  شاهد المشاريع  ');
});

test('localizes dynamic engineering outputs and alert counts', () => {
  assert.equal(translateString('10.00 hours', 'ar'), '10.00 ساعات');
  assert.equal(translateString('50.0% of Vin', 'ar'), '50.0% من جهد الدخل');
  assert.equal(translateString('2 ACTIVE', 'ar'), '2 تنبيهات نشطة');
  assert.equal(translateString('LOW WATER LEVEL', 'ar'), 'انخفاض مستوى المياه');
});

test('translates user-profile, accessibility and chart labels', () => {
  assert.equal(translateString('Social profiles', 'ar'), 'روابط التواصل والملفات المهنية');
  assert.equal(translateString('Simulated temperature trend chart', 'ar'), 'مخطط اتجاه الحرارة المحاكى');
  assert.equal(translateString('Switch language to Arabic', 'ar'), 'التبديل إلى العربية');
});

test('translates audited circuit, embedded and protocol headings', () => {
  assert.equal(translateString('Series resistance', 'ar'), 'المقاومة المكافئة على التوالي');
  assert.equal(translateString('SIM / 04', 'ar'), 'محاكاة / 04');
  assert.equal(translateString('FEATURE PROJECT', 'ar'), 'مشروع مميز');
  assert.equal(translateString('ASYNCHRONOUS SERIAL', 'ar'), 'اتصال تسلسلي غير متزامن');
  assert.equal(translateString('01 / BAUD RATE', 'ar'), '01 / معدل البود');
  assert.equal(translateString('STATE OF CHARGE', 'ar'), 'حالة الشحن');
});
