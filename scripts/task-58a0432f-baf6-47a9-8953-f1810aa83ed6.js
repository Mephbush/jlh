import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createStealthBrowser, humanClick, humanType, humanScroll } from './stealth-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// معلومات المهمة
const TASK = {
  "id": "58a0432f-baf6-47a9-8953-f1810aa83ed6",
  "name": "اختبار تشغيل الطابور",
  "description": "مهمة تم إنشاؤها بالمنشئ المرئي المتقدم",
  "type": "custom",
  "status": "idle",
  "script": "const { chromium } = require('playwrigh\n\n// ============================================\n// تطبيق إعدادات التخفي التلقائي\n// ============================================\n\n\n// 1. إخفاء علامات Webdriver\ntry {\n  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });\n  delete navigator.__proto__.webdriver;\n} catch (e) {}\n\n// 2. إخفاء بصمة المتصفح المتقدم\ntry {\n  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {\n    value: function() {\n      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwADhgGAWjR9awAAAABJRU5ErkJggg==';\n    }\n  });\n} catch (e) {}\n\n// 3. تعيين منطقة زمنية عشوائية\ntry {\n  const timezones = ['UTC', 'GMT', 'EST', 'CST', 'MST', 'PST', 'GMT+1', 'GMT+2'];\n  const tz = timezones[Math.floor(Math.random() * timezones.length)];\n  process.env.TZ = tz;\n} catch (e) {}\n\n// 4. حظر WebRTC (منع تسريب IP الحقيقي)\ntry {\n  window.RTCPeerConnection = undefined;\n  window.webkitRTCPeerConnection = undefined;\n} catch (e) {}\n\n// 5. إضافة تأخيرات عشوائية\nconst baseWait = async (ms) => new Promise(r => setTimeout(r, ms));\nconst randomWait = async (min = 100, max = 500) => {\n  const delay = min + Math.random() * (max - min);\n  return new Promise(r => setTimeout(r, delay));\n};\n\n// 6. إعادة تعيين البيانات المحفوظة (في البداية)\ntry {\n  if (typeof localStorage !== 'undefined') localStorage.clear();\n  if (typeof sessionStorage !== 'undefined') sessionStorage.clear();\n} catch (e) {}\n\n// 7. محاكاة حركات الماوس البشرية\nconst sleep = (ms) => new Promise(r => setTimeout(r, ms));\nconst humanDelay = () => new Promise(r => setTimeout(r, 50 + Math.random() * 150));\n\n// تطبيق الإعدادات بنجاح\nconsole.log('✅ تم تطبيق إعدادات التخفي بنجاح');\n\nt');\nconst fs = require('fs');\nconst path = require('path');\n\n// دالة إنشاء المجلدات المطلوبة\nfunction ensureOutputDirs() {\n  const dirs = ['outputs', 'outputs/screenshots', 'outputs/videos'];\n  dirs.forEach(dir => {\n    if (!fs.existsSync(dir)) {\n      fs.mkdirSync(dir, { recursive: true });\n    }\n  });\n}\n\nasync function runTask(page, context) {\n  // تهيئة المجلدات والصفحة الحالية ومتغيرات التتبع\n  ensureOutputDirs();\n  let currentPage = page;\n  const pages = {};\n  pages['main'] = page;\n  let screenshotCounter = 0;\n  \n  try {\n    // Step 1: تسجيل فيديو\n    let retries_step1 = 3;\n    while (retries_step1 > 0) {\n      try {\n        // 🎥 تسجيل الفيديو - تم تفعيله على مستوى السياق\n        console.log('🎥 خطوة الفيديو:');\n        console.log('   ℹ️  التسجيل يشمل جميع الصفحات في هذا السياق');\n        console.log('   📁 مجلد الحفظ: outputs/videos/');\n        console.log('   ⏱️  سيتم حفظ الفيديو تلقائياً عند إغلاق السياق');\n        console.log('   ✅ الحالة: الفيديو نشط ومُسجَّل');\n                break;\n      } catch (stepError) {\n        retries_step1--;\n        if (retries_step1 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 2: فتح صفحة\n    let retries_step2 = 3;\n    while (retries_step2 > 0) {\n      try {\n        // 🌐 فتح صفحة جديدة\n        console.log('\\n🌐 فتح صفحة جديدة:');\n        console.log('   📍 المتغير: matube');\n        console.log('   🔗 الرابط: https://youtube.com');\n        try {\n          console.log('   ⏳ جاري إنشاء صفحة جديدة من السياق...');\n          const matube = await context.newPage();\n          console.log('   ✅ تم إنشاء الصفحة');\n          console.log('   ⏳ جاري الانتقال إلى الرابط...');\n          await matube.goto(\"https://youtube.com\", { waitUntil: 'networkidle' }).catch(() => {});\n          console.log('   ✅ تم تحميل الصفحة');\n          pages[\"matube\"] = matube;\n          currentPage = matube;\n          console.log('   ✅ تم تعيين الصفحة الحالية');\n          console.log('   📌 الصفحة جاهزة للعمل');\n        } catch (navError) {\n          console.error('   ❌ خطأ في فتح الصفحة:', navError.message);\n          throw navError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step2--;\n        if (retries_step2 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 3: التقاط صورة\n    let retries_step3 = 3;\n    while (retries_step3 > 0) {\n      try {\n        // 📸 التقاط لقطة شاشة\n        screenshotCounter++;\n        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');\n        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);\n        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');\n        try {\n          await currentPage.screenshot({ path: screenshotPath,  });\n          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);\n        } catch (screenshotError) {\n          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);\n          throw screenshotError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step3--;\n        if (retries_step3 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 4: انتظار\n    let retries_step4 = 3;\n    while (retries_step4 > 0) {\n      try {\n        // ⏱️ انتظار زمني\n        console.log('\\n⏱️ الانتظار:');\n        console.log('   ⏳ المدة: 5000ms (5.0s)');\n        console.log('   ⏳ جاري الانتظار...');\n        await currentPage.waitForTimeout(5000);\n        console.log('   ✅ انتهت مدة الانتظار');\n                break;\n      } catch (stepError) {\n        retries_step4--;\n        if (retries_step4 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 5: التقاط صورة\n    let retries_step5 = 3;\n    while (retries_step5 > 0) {\n      try {\n        // 📸 التقاط لقطة شاشة\n        screenshotCounter++;\n        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');\n        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);\n        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');\n        try {\n          await currentPage.screenshot({ path: screenshotPath,  });\n          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);\n        } catch (screenshotError) {\n          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);\n          throw screenshotError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step5--;\n        if (retries_step5 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 6: فتح صفحة\n    let retries_step6 = 3;\n    while (retries_step6 > 0) {\n      try {\n        // 🌐 فتح صفحة\n        console.log('\\n🌐 الانتقال إلى صفحة:');\n        console.log('   🔗 الرابط: https://google.com');\n        try {\n          console.log('   ⏳ جاري تحميل الصفحة...');\n          await page.goto(\"https://google.com\", { waitUntil: 'networkidle' }).catch(() => {});\n          console.log('   ✅ تم تحميل الصفحة بنجاح');\n          currentPage = page;\n        } catch (navError) {\n          console.error('   ❌ خطأ في تحميل الصفحة:', navError.message);\n          throw navError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step6--;\n        if (retries_step6 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 7: انتظار\n    let retries_step7 = 3;\n    while (retries_step7 > 0) {\n      try {\n        // ⏱️ انتظار زمني\n        console.log('\\n⏱️ الانتظار:');\n        console.log('   ⏳ المدة: 5000ms (5.0s)');\n        console.log('   ⏳ جاري الانتظار...');\n        await currentPage.waitForTimeout(5000);\n        console.log('   ✅ انتهت مدة الانتظار');\n                break;\n      } catch (stepError) {\n        retries_step7--;\n        if (retries_step7 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 8: التقاط صورة\n    let retries_step8 = 3;\n    while (retries_step8 > 0) {\n      try {\n        // 📸 التقاط لقطة شاشة\n        screenshotCounter++;\n        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');\n        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);\n        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');\n        try {\n          await currentPage.screenshot({ path: screenshotPath,  });\n          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);\n        } catch (screenshotError) {\n          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);\n          throw screenshotError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step8--;\n        if (retries_step8 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 9: العودة إلى صفحة\n    let retries_step9 = 3;\n    while (retries_step9 > 0) {\n      try {\n        // ↩️ العودة إلى الصفحة المحفوظة\n        console.log('\\n↩️ العودة إلى صفحة محفوظة:');\n        console.log('   📍 اسم متغير الصفحة: matube');\n        console.log('   🔍 التحقق من وجود الصفحة في الذاكرة...');\n        \n        // التحقق من وجود الصفحة وصحتها\n        if (!pages || typeof pages !== 'object') {\n          const errorMsg = '❌ خطأ حرج: كائن الصفحات غير متوفر أو غير صحيح';\n          console.error(errorMsg);\n          throw new Error(errorMsg);\n        }\n        \n        if (!pages[\"matube\"]) {\n          const availablePages = Object.keys(pages).join(', ') || 'لا توجد صفحات';\n          const errorMsg = '❌ لم يتم العثور على الصفحة: ' + \"matube\" + '\\n' +\n            'الصفحات المتاحة: ' + availablePages;\n          console.error(errorMsg);\n          throw new Error(errorMsg);\n        }\n        \n        const pageToSwitch = pages[\"matube\"];\n        \n        // التحقق من أن الصفحة هي كائن صفحة حقيقي (له الدوال المطلوبة)\n        if (!pageToSwitch || typeof pageToSwitch !== 'object') {\n          const errorMsg = '❌ خطأ: الصفحة المحفوظة ليست من نوع صفحة صحيح';\n          console.error(errorMsg);\n          throw new Error(errorMsg);\n        }\n        \n        if (typeof pageToSwitch.bringToFront !== 'function') {\n          const errorMsg = '❌ خطأ: الصفحة لا تحتوي على الدالة bringToFront - قد تكون URL بدلاً من page object';\n          console.error(errorMsg);\n          throw new Error(errorMsg);\n        }\n        \n        try {\n          console.log('   ⏳ جاري إحضار الصفحة إلى الواجهة...');\n          await pageToSwitch.bringToFront();\n          currentPage = pageToSwitch;\n          console.log('   ✅ تم العودة بنجاح إلى الصفحة: matube');\n          console.log('   📌 الصفحة الحالية معدلة');\n        } catch (pageError) {\n          const errorMsg = '❌ خطأ في إحضار الصفحة: ' + pageError.message;\n          console.error(errorMsg);\n          throw new Error(errorMsg);\n        }\n                break;\n      } catch (stepError) {\n        retries_step9--;\n        if (retries_step9 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 10: انتظار\n    let retries_step10 = 3;\n    while (retries_step10 > 0) {\n      try {\n        // ⏱️ انتظار زمني\n        console.log('\\n⏱️ الانتظار:');\n        console.log('   ⏳ المدة: 5000ms (5.0s)');\n        console.log('   ⏳ جاري الانتظار...');\n        await currentPage.waitForTimeout(5000);\n        console.log('   ✅ انتهت مدة الانتظار');\n                break;\n      } catch (stepError) {\n        retries_step10--;\n        if (retries_step10 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 11: التقاط صورة\n    let retries_step11 = 3;\n    while (retries_step11 > 0) {\n      try {\n        // 📸 التقاط لقطة شاشة\n        screenshotCounter++;\n        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');\n        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);\n        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');\n        try {\n          await currentPage.screenshot({ path: screenshotPath,  });\n          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);\n        } catch (screenshotError) {\n          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);\n          throw screenshotError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step11--;\n        if (retries_step11 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    console.log(\"✅ اكتملت المهمة بنجاح\");\n    return { success: true };\n  } catch (error) {\n    console.error(\"❌ خطأ:\", error.message);\n    return { success: false, error: error.message };\n  }\n}\n\n// دالة تشغيل فعلية - تعمل مباشرة\n(async () => {\n  let browser = null;\n  try {\n    // تشغيل المتصفح بشكل عادي (بدون تعطيل أمان الويب)\n    browser = await chromium.launch({\n      headless: true,\n      args: [\n        '--disable-blink-features=AutomationControlled',\n        '--disable-dev-shm-usage',\n        '--no-sandbox'\n      ]\n    });\n    const contextOptions = {};\n    // تفعيل تسجيل الفيديو على مستوى السياق\n    contextOptions.recordVideo = { dir: 'outputs/videos' };\n    console.log('🎥 تسجيل الفيديو مُفعّل للسياق - سيتم الحفظ إلى: outputs/videos/');\n    const context = await browser.newContext(contextOptions);\n    const page = await context.newPage();\n    let executionSuccess = false;\n    let executionError = null;\n\n    // تنفيذ المهمة\n    try {\n      const result = await runTask(page, context);\n      executionSuccess = result.success;\n      console.log('📊 نتيجة التنفيذ:', result.success ? '✅ نجحت' : '❌ فشلت');\n    } catch (taskError) {\n      executionError = taskError;\n      console.error('❌ خطأ في تنفيذ المهمة:', taskError.message);\n    }\n  } catch (error) {\n    console.error('❌ خطأ حرج في البداية:', error.message);\n  } finally {\n    // تنظيف الموارد - إغلاق السياق والمتصفح مرة واحدة فقط\n    try {\n      if (context) {\n        console.log('\\n🔒 إغلاق السياق وحفظ المخرجات:');\n        console.log('   ⏳ جاري إغلاق السياق...');\n        await context.close();\n        console.log('   ✅ تم إغلاق السياق');\n        console.log('   📁 الفيديوهات محفوظة في: outputs/videos/');\n        console.log('   📁 لقطات الشاشة محفوظة في: outputs/screenshots/');\n      }\n    } catch (contextError) {\n      console.warn('⚠️ خطأ في إغلاق السياق:', contextError.message);\n    }\n    try {\n      if (browser) {\n        console.log('🔒 إغلاق المتصفح...');\n        await browser.close();\n        console.log('✅ تم إغلاق المتصفح');\n      }\n    } catch (browserError) {\n      console.warn('⚠️ خطأ في إغلاق المتصفح:', browserError.message);\n    }\n    // الخروج بكود النجاح/الفشل الصحيح\n    process.exit(executionSuccess ? 0 : 1);\n  }\n})();\n",
  "targetUrl": "https://youtube.com",
  "createdAt": "2026-01-21T19:31:32.824Z",
  "metadata": {
    "source": "advanced-builder",
    "stepsData": "[{\"id\":\"1769023818749_nru7llpw9\",\"type\":\"video\",\"params\":{\"codec\":\"vp9\",\"recordAudio\":false},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023755030_fcumuj3uv\",\"type\":\"navigate\",\"params\":{\"url\":\"https://youtube.com\",\"pageLabel\":\"\",\"variableName\":\"matube\"},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023822788_lk9mawf3r\",\"type\":\"screenshot\",\"params\":{\"fullPage\":false},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023809859_8rgw5vu7w\",\"type\":\"wait\",\"params\":{\"type\":\"time\",\"duration\":5000},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023825613_ct35gvbar\",\"type\":\"screenshot\",\"params\":{\"fullPage\":false},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023835111_gln7b6ips\",\"type\":\"navigate\",\"params\":{\"url\":\"https://google.com\",\"pageLabel\":\"\",\"variableName\":\"\"},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023858107_bv4kv45ll\",\"type\":\"wait\",\"params\":{\"type\":\"time\",\"duration\":5000},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023859561_jm58boz82\",\"type\":\"screenshot\",\"params\":{\"fullPage\":false},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023862030_s6v09ppjj\",\"type\":\"goToPage\",\"params\":{\"variableName\":\"matube\"},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023868490_1t2hkq5fu\",\"type\":\"wait\",\"params\":{\"type\":\"time\",\"duration\":5000},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769023871328_h10670cw2\",\"type\":\"screenshot\",\"params\":{\"fullPage\":false},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}}]"
  }
};

// التحقق من وجود خطوات فيديو
function hasVideoStep(script) {
  return script && (
    script.includes('recordVideo') ||
    script.includes("'video'") ||
    script.includes('"video"') ||
    script.includes('🎥')
  );
}

async function runTask() {
  console.log('🚀 بدء المهمة: ' + TASK.name);
  console.log('📝 الوصف: ' + TASK.description);
  console.log('🎯 الهدف: ' + TASK.targetUrl);

  const startTime = Date.now();
  let taskResult = null;
  let executionStatus = 'unknown';
  let executionError = null;
  let screenshotPath = null;
  const artifacts = [];

  // التحقق من الحاجة لتسجيل الفيديو
  const needsVideoRecording = hasVideoStep(TASK.script);
  if (needsVideoRecording) {
    console.log('🎥 تم اكتشاف خطوة فيديو - سيتم تسجيل الجلسة');
  }

  // التحقق من الحاجة لتعطيل أمان الويب (Cross-Origin)
  
  const needsDisableSecurity = false;
  

  // إعداد المجلدات المطلوبة قبل إنشاء المتصفح
  await fs.mkdir('screenshots', { recursive: true });
  await fs.mkdir('videos', { recursive: true });

  // إنشاء متصفح Stealth مع دعم الفيديو والـ Cross-Origin إذا لزم الأمر
  const { browser, context, page } = await createStealthBrowser({
    recordVideo: needsVideoRecording,
    disableWebSecurity: needsDisableSecurity
  });

  try {
    // الانتقال للصفحة
    console.log('🌐 الانتقال إلى:', TASK.targetUrl);
    await page.goto(TASK.targetUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    console.log('✅ تم تحميل الصفحة بنجاح');

    // تنفيذ السكريبت
    
    // تنفيذ السكريبت المخصص (من المنشئ المرئي المتقدم)
    console.log('⚙️ بدء تنفيذ المهمة...');

    let stepResults = [];
    // تهيئة كائن الصفحات لتخزين مراجع الصفحات المتعددة
    const pages = {};
    pages['main'] = page; // تخزين الصفحة الرئيسية

    try {
      // تهيئة المجلدات والصفحة الحالية ومتغيرات التتبع
  ensureOutputDirs();
  let currentPage = page;
  const pages = {};
  pages['main'] = page;
  let screenshotCounter = 0;
  
  try {
    // Step 1: تسجيل فيديو
    let retries_step1 = 3;
    while (retries_step1 > 0) {
      try {
        // 🎥 تسجيل الفيديو - تم تفعيله على مستوى السياق
        console.log('🎥 خطوة الفيديو:');
        console.log('   ℹ️  التسجيل يشمل جميع الصفحات في هذا السياق');
        console.log('   📁 مجلد الحفظ: outputs/videos/');
        console.log('   ⏱️  سيتم حفظ الفيديو تلقائياً عند إغلاق السياق');
        console.log('   ✅ الحالة: الفيديو نشط ومُسجَّل');
                break;
      } catch (stepError) {
        retries_step1--;
        if (retries_step1 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 2: فتح صفحة
    let retries_step2 = 3;
    while (retries_step2 > 0) {
      try {
        // 🌐 فتح صفحة جديدة
        console.log('\n🌐 فتح صفحة جديدة:');
        console.log('   📍 المتغير: matube');
        console.log('   🔗 الرابط: https://youtube.com');
        try {
          console.log('   ⏳ جاري إنشاء صفحة جديدة من السياق...');
          const matube = await context.newPage();
          console.log('   ✅ تم إنشاء الصفحة');
          console.log('   ⏳ جاري الانتقال إلى الرابط...');
          await matube.goto("https://youtube.com", { waitUntil: 'networkidle' }).catch(() => {});
          console.log('   ✅ تم تحميل الصفحة');
          pages["matube"] = matube;
          currentPage = matube;
          console.log('   ✅ تم تعيين الصفحة الحالية');
          console.log('   📌 الصفحة جاهزة للعمل');
        } catch (navError) {
          console.error('   ❌ خطأ في فتح الصفحة:', navError.message);
          throw navError;
        }
                break;
      } catch (stepError) {
        retries_step2--;
        if (retries_step2 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 3: التقاط صورة
    let retries_step3 = 3;
    while (retries_step3 > 0) {
      try {
        // 📸 التقاط لقطة شاشة
        screenshotCounter++;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);
        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');
        try {
          await currentPage.screenshot({ path: screenshotPath,  });
          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);
        } catch (screenshotError) {
          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);
          throw screenshotError;
        }
                break;
      } catch (stepError) {
        retries_step3--;
        if (retries_step3 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 4: انتظار
    let retries_step4 = 3;
    while (retries_step4 > 0) {
      try {
        // ⏱️ انتظار زمني
        console.log('\n⏱️ الانتظار:');
        console.log('   ⏳ المدة: 5000ms (5.0s)');
        console.log('   ⏳ جاري الانتظار...');
        await currentPage.waitForTimeout(5000);
        console.log('   ✅ انتهت مدة الانتظار');
                break;
      } catch (stepError) {
        retries_step4--;
        if (retries_step4 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 5: التقاط صورة
    let retries_step5 = 3;
    while (retries_step5 > 0) {
      try {
        // 📸 التقاط لقطة شاشة
        screenshotCounter++;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);
        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');
        try {
          await currentPage.screenshot({ path: screenshotPath,  });
          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);
        } catch (screenshotError) {
          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);
          throw screenshotError;
        }
                break;
      } catch (stepError) {
        retries_step5--;
        if (retries_step5 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 6: فتح صفحة
    let retries_step6 = 3;
    while (retries_step6 > 0) {
      try {
        // 🌐 فتح صفحة
        console.log('\n🌐 الانتقال إلى صفحة:');
        console.log('   🔗 الرابط: https://google.com');
        try {
          console.log('   ⏳ جاري تحميل الصفحة...');
          await page.goto("https://google.com", { waitUntil: 'networkidle' }).catch(() => {});
          console.log('   ✅ تم تحميل الصفحة بنجاح');
          currentPage = page;
        } catch (navError) {
          console.error('   ❌ خطأ في تحميل الصفحة:', navError.message);
          throw navError;
        }
                break;
      } catch (stepError) {
        retries_step6--;
        if (retries_step6 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 7: انتظار
    let retries_step7 = 3;
    while (retries_step7 > 0) {
      try {
        // ⏱️ انتظار زمني
        console.log('\n⏱️ الانتظار:');
        console.log('   ⏳ المدة: 5000ms (5.0s)');
        console.log('   ⏳ جاري الانتظار...');
        await currentPage.waitForTimeout(5000);
        console.log('   ✅ انتهت مدة الانتظار');
                break;
      } catch (stepError) {
        retries_step7--;
        if (retries_step7 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 8: التقاط صورة
    let retries_step8 = 3;
    while (retries_step8 > 0) {
      try {
        // 📸 التقاط لقطة شاشة
        screenshotCounter++;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);
        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');
        try {
          await currentPage.screenshot({ path: screenshotPath,  });
          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);
        } catch (screenshotError) {
          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);
          throw screenshotError;
        }
                break;
      } catch (stepError) {
        retries_step8--;
        if (retries_step8 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 9: العودة إلى صفحة
    let retries_step9 = 3;
    while (retries_step9 > 0) {
      try {
        // ↩️ العودة إلى الصفحة المحفوظة
        console.log('\n↩️ العودة إلى صفحة محفوظة:');
        console.log('   📍 اسم متغير الصفحة: matube');
        console.log('   🔍 التحقق من وجود الصفحة في الذاكرة...');
        
        // التحقق من وجود الصفحة وصحتها
        if (!pages || typeof pages !== 'object') {
          const errorMsg = '❌ خطأ حرج: كائن الصفحات غير متوفر أو غير صحيح';
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
        
        if (!pages["matube"]) {
          const availablePages = Object.keys(pages).join(', ') || 'لا توجد صفحات';
          const errorMsg = '❌ لم يتم العثور على الصفحة: ' + "matube" + '\n' +
            'الصفحات المتاحة: ' + availablePages;
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
        
        const pageToSwitch = pages["matube"];
        
        // التحقق من أن الصفحة هي كائن صفحة حقيقي (له الدوال المطلوبة)
        if (!pageToSwitch || typeof pageToSwitch !== 'object') {
          const errorMsg = '❌ خطأ: الصفحة المحفوظة ليست من نوع صفحة صحيح';
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
        
        if (typeof pageToSwitch.bringToFront !== 'function') {
          const errorMsg = '❌ خطأ: الصفحة لا تحتوي على الدالة bringToFront - قد تكون URL بدلاً من page object';
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
        
        try {
          console.log('   ⏳ جاري إحضار الصفحة إلى الواجهة...');
          await pageToSwitch.bringToFront();
          currentPage = pageToSwitch;
          console.log('   ✅ تم العودة بنجاح إلى الصفحة: matube');
          console.log('   📌 الصفحة الحالية معدلة');
        } catch (pageError) {
          const errorMsg = '❌ خطأ في إحضار الصفحة: ' + pageError.message;
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
                break;
      } catch (stepError) {
        retries_step9--;
        if (retries_step9 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 10: انتظار
    let retries_step10 = 3;
    while (retries_step10 > 0) {
      try {
        // ⏱️ انتظار زمني
        console.log('\n⏱️ الانتظار:');
        console.log('   ⏳ المدة: 5000ms (5.0s)');
        console.log('   ⏳ جاري الانتظار...');
        await currentPage.waitForTimeout(5000);
        console.log('   ✅ انتهت مدة الانتظار');
                break;
      } catch (stepError) {
        retries_step10--;
        if (retries_step10 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 11: التقاط صورة
    let retries_step11 = 3;
    while (retries_step11 > 0) {
      try {
        // 📸 التقاط لقطة شاشة
        screenshotCounter++;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);
        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');
        try {
          await currentPage.screenshot({ path: screenshotPath,  });
          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);
        } catch (screenshotError) {
          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);
          throw screenshotError;
        }
                break;
      } catch (stepError) {
        retries_step11--;
        if (retries_step11 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log("✅ اكتملت المهمة بنجاح");
    return { success: true };
  } catch (error) {
    console.error("❌ خطأ:", error.message);
    return { success: false, error: error.message };
  }
    } catch (stepError) {
      console.error('❌ خطأ أثناء تنفيذ الخطوات:', stepError.message);
      throw stepError;
    }

    taskResult = {
      stepsExecuted: stepResults.length,
      success: true,
      results: stepResults
    };

    console.log('✅ تم تنفيذ جميع الخطوات بنجاح');
    console.log('📊 ملخص النتائج:', JSON.stringify(taskResult, null, 2));

    // التقاط صورة
    console.log('📸 التقاط صورة للصفحة...');
    screenshotPath = path.join('screenshots', TASK.id + '-' + Date.now() + '.png');
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    console.log('✅ تم حفظ الصورة:', screenshotPath);
    artifacts.push(screenshotPath);

    executionStatus = 'success';
    console.log('✅ اكتملت المهمة في ' + ((Date.now() - startTime) / 1000).toFixed(2) + ' ثانية');

  } catch (error) {
    console.error('❌ خطأ في المهمة:', error.message);
    console.error('Stack trace:', error.stack);

    executionStatus = 'failed';
    executionError = error;

    // محاولة التقاط صورة للخطأ - دائماً
    try {
      const errorScreenshot = path.join('screenshots', TASK.id + '-error-' + Date.now() + '.png');
      await page.screenshot({ path: errorScreenshot }).catch(() => {});
      console.log('📸 تم حفظ صورة الخطأ:', errorScreenshot);
      artifacts.push(errorScreenshot);
    } catch (e) {
      // تجاهل أخطاء حفظ الصورة
    }

  } finally {
    try {
      // إضافة تأخير صغير للتأكد من حفظ الفيديو
      if (needsVideoRecording) {
        console.log('⏳ جاري انتظار حفظ الفيديو...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      await browser.close();
      console.log('🔒 تم إغلاق المتصفح');

      // جمع ملفات الفيديو
      if (needsVideoRecording) {
        try {
          const videosDir = 'videos';
          const videos = await fs.readdir(videosDir).catch(() => []);
          if (videos.length > 0) {
            console.log(`✅ تم حفظ ${videos.length} ملف فيديو في مجلد ${videosDir}/`);
            videos.forEach(video => {
              const videoPath = path.join(videosDir, video);
              artifacts.push(videoPath);
              console.log(`   📹 ${videoPath}`);
            });
          } else {
            console.warn('⚠️ لم يتم العثور على ملفات فيديو على الرغم من تفعيل التسجيل');
          }
        } catch (e) {
          console.warn('⚠️ خطأ في قراءة مجلد الفيديو:', e.message);
        }
      }

      // حفظ النتائج مرة واحدة فقط مع جميع الحاذيات
      const duration = (Date.now() - startTime) / 1000;
      const resultData = {
        taskId: TASK.id,
        taskName: TASK.name,
        status: executionStatus,
        duration,
        timestamp: new Date().toISOString(),
        artifacts: artifacts, // جميع الملفات (صور + فيديوهات)
        data: taskResult // البيانات المستخرجة
      };

      // إضافة معلومات الخطأ إذا كان هناك خطأ
      if (executionError) {
        resultData.error = executionError.message;
        resultData.stack = executionError.stack;
      }

      await saveResults(resultData);

      // إعادة رمي الخطأ فقط إذا كان التنفيذ قد فشل
      if (executionError) {
        throw executionError;
      }

      console.log('🎉 المهمة نجحت بالكامل!');

    } catch (finallyError) {
      if (finallyError === executionError) {
        // إعادة الخطأ الأصلي
        throw finallyError;
      }
      console.error('خطأ في الـ finally:', finallyError);
      throw finallyError;
    }
  }
}

async function saveResults(data) {
  await fs.mkdir('results', { recursive: true });
  const filename = TASK.id + '-' + Date.now() + '.json';
  const filepath = path.join('results', filename);
  await fs.writeFile(filepath, JSON.stringify(data, null, 2));
  console.log('💾 تم حفظ النتائج:', filepath);
  
  // طباعة النتائج للسجلات
  console.log('\n📊 ملخص النتائج:');
  console.log(JSON.stringify(data, null, 2));
}

runTask().catch(error => {
  console.error('💥 فشلت المهمة:', error);
  process.exit(1);
});
