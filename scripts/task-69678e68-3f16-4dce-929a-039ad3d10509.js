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
  "id": "69678e68-3f16-4dce-929a-039ad3d10509",
  "name": "تحميل ملفات",
  "description": "تحميل المستندات والصور تلقائياً",
  "type": "custom",
  "status": "running",
  "script": "async function runTask(page) {\n  try {\n    await page.goto('undefined');\n    const links = await page.evaluate(() => {\n      const extensions = '';\n      return Array.from(document.querySelectorAll('a[href]'))\n        .map(a => a.href)\n        .filter(href => !extensions || extensions.split(',').some(ext => href.includes(ext.trim())));\n    });\n    return { files: links, count: links.length };\n  } catch (error) {\n    console.error('Error:', error.message);\n    return { success: false, error: error.message };\n  }\n}",
  "targetUrl": "",
  "createdAt": "2026-01-20T20:52:40.719Z"
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
      await page.goto('undefined');
    const links = await page.evaluate(() => {
      const extensions = '';
      return Array.from(document.querySelectorAll('a[href]'))
        .map(a => a.href)
        .filter(href => !extensions || extensions.split(',').some(ext => href.includes(ext.trim())));
    });
    return { files: links, count: links.length };
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
