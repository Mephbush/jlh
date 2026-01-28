import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// معلومات المهمة
const TASK = {
  "id": "8570b73b-7c78-4aab-942b-cfa24dbc358f",
  "name": "Chech duo",
  "description": "مهمة تم إنشاؤها بالمنشئ المرئي المتقدم",
  "type": "custom",
  "status": "idle",
  "targetUrl": "https://www.duolingo.com"
};

// دالة إنشاء المجلدات المطلوبة
async function ensureOutputDirs() {
  const dirs = ['outputs', 'outputs/screenshots', 'outputs/videos', 'screenshots', 'videos', 'results'];
  for (const dir of dirs) {
    try {
      await fs.mkdir(path.join(__dirname, dir), { recursive: true });
    } catch (err) {
      console.error(`خطأ في إنشاء المجلد ${dir}:`, err.message);
    }
  }
}

async function runTask(page, context) {
  await ensureOutputDirs();
  let currentPage = page;
  let screenshotCounter = 0;

  try {
    // Step 1: تسجيل فيديو
    console.log('🎥 تسجيل الفيديو مُفعّل للسياق - سيتم الحفظ إلى: outputs/videos/');

    // Step 2: فتح صفحة
    console.log('\n🌐 الانتقال إلى صفحة: https://www.duolingo.com');
    try {
      console.log('   ⏳ جاري تحميل الصفحة...');
      await page.goto("https://www.duolingo.com", { waitUntil: 'networkidle' });
      console.log('   ✅ تم تحميل الصفحة بنجاح');
      currentPage = page;
    } catch (navError) {
      console.error('   ❌ خطأ في تحميل الصفحة:', navError.message);
      throw navError;
    }

    // Step 3: التقاط صورة
    screenshotCounter++;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = path.join(__dirname, 'outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);
    console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');
    try {
      await currentPage.screenshot({ path: screenshotPath });
      console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);
    } catch (screenshotError) {
      console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);
      throw screenshotError;
    }

    // Step 4: انتظار
    console.log('\n⏱️ الانتظار: 6 ثوانٍ');
    await currentPage.waitForTimeout(5999);

    // Step 5: التقاط صورة أخرى
    screenshotCounter++;
    const timestamp2 = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath2 = path.join(__dirname, 'outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp2}.png`);
    console.log('📸 جاري التقاط لقطة شاشة أخرى (viewport)...');
    try {
      await currentPage.screenshot({ path: screenshotPath2 });
      console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath2);
    } catch (screenshotError) {
      console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);
      throw screenshotError;
    }

    // Step 6: تمرير الصفحة
    console.log('\n📜 تمرير الصفحة إلى الأسفل');
    try {
      await currentPage.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      console.log('   ✅ تم التمرير إلى نهاية الصفحة');
    } catch (scrollError) {
      console.error('❌ خطأ في تمرير الصفحة:', scrollError.message);
      throw scrollError;
    }

    // Step 7: انتظار
    console.log('\n⏱️ الانتظار: 6 ثوانٍ أخرى');
    await currentPage.waitForTimeout(5999);

    // Step 8: التقاط صورة أخيرة
    screenshotCounter++;
    const timestamp3 = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath3 = path.join(__dirname, 'outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp3}.png`);
    console.log('📸 جاري التقاط لقطة شاشة أخيرة (viewport)...');
    try {
      await currentPage.screenshot({ path: screenshotPath3 });
      console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath3);
    } catch (screenshotError) {
      console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);
      throw screenshotError;
    }

    console.log("✅ اكتملت المهمة بنجاح");
    return { success: true };
  } catch (error) {
    console.error("❌ خطأ:", error.message);
    return { success: false, error: error.message };
  }
}

async function saveResults(data) {
  await fs.mkdir(path.join(__dirname, 'results'), { recursive: true });
  const filename = TASK.id + '-' + Date.now() + '.json';
  const filepath = path.join(__dirname, 'results', filename);
  await fs.writeFile(filepath, JSON.stringify(data, null, 2));
  console.log('💾 تم حفظ النتائج:', filepath);
}

(async () => {
  let browser = null;
  let context = null;
  try {
    await ensureOutputDirs();

    browser = await chromium.launch({
      headless: true,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
        '--no-sandbox'
      ]
    });

    const contextOptions = {};
    contextOptions.recordVideo = { dir: path.join(__dirname, 'outputs', 'videos') };
    context = await browser.newContext(contextOptions);
    const page = await context.newPage();

    const result = await runTask(page, context);
    console.log('📊 نتيجة التنفيذ:', result.success ? '✅ نجحت' : '❌ فشلت');

  } catch (error) {
    console.error('❌ خطأ حرج في البداية:', error.message);
  } finally {
    if (context) {
      console.log('\n🔒 إغلاق السياق وحفظ المخرجات:');
      await context.close();
      console.log('   ✅ تم إغلاق السياق');
    }
    if (browser) {
      console.log('🔒 إغلاق المتصفح...');
      await browser.close();
      console.log('✅ تم إغلاق المتصفح');
    }
  }
})();
