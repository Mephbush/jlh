import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createStealthBrowser } from './stealth-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// معلومات المهمة
const TASK = {
  "id": "1767313244716",
  "name": "اختبار بالخطوات المتقدمة",
  "description": "مهمة تم إنشاؤها بالمنشئ المرئي المتقدم",
  "type": "custom",
  "status": "idle",
  "script": `async function runTask(page) {
    try {
      // Step 1: تسجيل فيديو
      console.log('🎥 خطوة الفيديو: جاري تسجيل الفيديو - سيتم حفظه في مجلد videos/');

      // Step 2: فتح الصفحة
      await page.goto('https://rescend.netlify.app/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      console.log('✅ تم فتح الصفحة بنجاح');

      // Step 3: التمرير إلى 4500 بكسل
      await page.evaluate(() => {
        window.scrollTo({ top: 4500, behavior: 'smooth' });
      });
      console.log('✅ تم التمرير إلى 4500 بكسل');

      // الانتظار 3 ثواني
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('✅ تم الانتظار 3 ثواني');

      // Step 4: البحث عن العنصر والنقر عليه
      const selectorsToTry = [
        'a[href*="cultivated-cell.com"]',
        'a[target="_blank"]'
      ];

      let clicked = false;

      for (const selector of selectorsToTry) {
        try {
          // البحث عن العنصر
          const element = await page.waitForSelector(selector, { timeout: 5000, visible: true });

          if (element) {
            // التمرير إلى العنصر
            await element.scrollIntoViewIfNeeded();

            // الانتظار قليلًا بعد التمرير
            await new Promise(resolve => setTimeout(resolve, 1000));

            // النقر على العنصر
            await element.click();
            console.log('✅ تم النقر على العنصر:', selector);
            clicked = true;
            break;
          }
        } catch (error) {
          console.log('⚠️ لم يتم العثور على العنصر باستخدام المحدد:', selector);
        }
      }

      if (!clicked) {
        throw new Error('❌ لم يتم العثور على أي عنصر للنقر عليه');
      }

      // Step 5: التقاط صورة
      await page.screenshot({ path: "screenshot.png" });
      console.log('✅ تم التقاط صورة للصفحة');

      return { success: true };
    } catch (error) {
      console.error("❌ خطأ:", error.message);
      return { success: false, error: error.message };
    }
  }`,
  "targetUrl": "https://rescend.netlify.app/",
  "createdAt": "2026-01-02T00:20:44.717Z",
  "lastRun": "2026-01-02T00:23:19.901Z"
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

  // التحقق من الحاجة لتسجيل الفيديو
  const needsVideoRecording = hasVideoStep(TASK.script);
  if (needsVideoRecording) {
    console.log('🎥 تم اكتشاف خطوة فيديو - سيتم تسجيل الجلسة');
  }

  // إنشاء متصفح Stealth مع دعم الفيديو إذا لزم الأمر
  const { browser, context, page } = await createStealthBrowser({ recordVideo: needsVideoRecording });

  try {
    // تنفيذ السكريبت المخصص
    console.log('⚙️ بدء تنفيذ المهمة...');
    const taskFunction = new Function('page', TASK.script);
    taskResult = await taskFunction(page);

    // إعداد المجلدات المطلوبة
    await fs.mkdir('screenshots', { recursive: true });
    await fs.mkdir('videos', { recursive: true });

    // التقاط صورة نهائية
    const screenshotPath = path.join('screenshots', TASK.id + '-' + Date.now() + '.png');
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    console.log('✅ تم حفظ الصورة:', screenshotPath);

    const duration = (Date.now() - startTime) / 1000;
    console.log('✅ اكتملت المهمة في ' + duration.toFixed(2) + ' ثانية');

    // حفظ النتائج
    await saveResults({
      taskId: TASK.id,
      taskName: TASK.name,
      status: 'success',
      duration,
      timestamp: new Date().toISOString(),
      screenshot: screenshotPath,
      data: taskResult
    });

    console.log('🎉 المهمة نجحت بالكامل!');
  } catch (error) {
    console.error('❌ خطأ في المهمة:', error.message);
    console.error('Stack trace:', error.stack);

    // محاولة التقاط صورة للخطأ
    try {
      await fs.mkdir('screenshots', { recursive: true });
      const errorScreenshot = path.join('screenshots', TASK.id + '-error-' + Date.now() + '.png');
      await page.screenshot({ path: errorScreenshot }).catch(() => {});
      console.log('📸 تم حفظ صورة الخطأ:', errorScreenshot);
    } catch (e) {
      // تجاهل أخطاء حفظ الصورة
    }

    await saveResults({
      taskId: TASK.id,
      taskName: TASK.name,
      status: 'failed',
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    throw error;
  } finally {
    try {
      // إضافة تأخير صغير للتأكد من حفظ الفيديو
      if (needsVideoRecording) {
        console.log('⏳ جاري انتظار حفظ الفيديو...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      await browser.close();
      console.log('🔒 تم إغلاق المتصفح');
    } catch (closeError) {
      console.error('خطأ أثناء إغلاق المتصفح:', closeError);
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
