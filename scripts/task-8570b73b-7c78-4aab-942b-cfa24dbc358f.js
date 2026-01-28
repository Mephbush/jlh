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
  "script": "const { chromium } = require('playwright');\n\n// ... (بقية السكريبت)\n",
  "targetUrl": "https://www.duolingo.com",
  "createdAt": "2026-01-28T07:01:28.153Z",
  "metadata": {
    "source": "advanced-builder",
    "stepsData": "[...]"
  }
};

// دالة إنشاء المجلدات المطلوبة
async function ensureOutputDirs() {
  const dirs = ['outputs', '/screenshots', '/videos'];
  for (const dir of dirs) {
    const dirPath = path.join(__dirname, dir);
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.error(`خطأ في إنشاء المجلد ${dirPath}:`, err.message);
      }
    }
  }
}

async function runTask(page, context) {
  // تهيئة المجلدات والصفحة الحالية ومتغيرات التتبع
  await ensureOutputDirs();
  let currentPage = page;
  const pages = {};
  pages['main'] = page;
  let screenshotCounter = 0;

  try {
    // Step 1: تسجيل فيديو
    let retries_step1 = 3;
    while (retries_step1 > 0) {
      try {
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
        console.log('\n🌐 الانتقال إلى صفحة:');
        console.log('   🔗 الرابط: https://www.duolingo.com');
        try {
          console.log('   ⏳ جاري تحميل الصفحة...');
          await page.goto("https://www.duolingo.com", { waitUntil: 'networkidle' }).catch(() => {});
          console.log('   ✅ تم تحميل الصفحة بنجاح');
          currentPage = page;
        } catch (navError) {
          console.error('   ❌ خطأ في تحميل الصفحة:', navError.message);
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
        console.log('\n⏱️ الانتظار:');
        console.log('   ⏳ المدة: 5999ms (6.0s)');
        console.log('   ⏳ جاري الانتظار...');
        await currentPage.waitForTimeout(5999);
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
        break;
      } catch (stepError) {
        retries_step5--;
        if (retries_step5 === 0) {
          throw stepError;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Step 6: تمرير الصفحة
    let retries_step6 = 3;
    while (retries_step6 > 0) {
      try {
        console.log('\n📜 تمرير الصفحة:');
        console.log('   🎯 الاتجاه: end');
        console.log('   ⏳ جاري التمرير...');
        const scrollTarget = await currentPage.evaluate(() => document.body.scrollHeight - window.innerHeight);
        console.log('   📏 الموضع النهائي:', scrollTarget);

        await page.evaluate(({ from, to, duration, hasVariation }) => {
          return new Promise((resolve) => {
            const startTime = performance.now();
            const distance = to - from;
            const startPosition = window.scrollY;
            const microMoves = true;
            let lastMoveTime = startTime;

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
              let position = startPosition + distance * easeProgress;

              if (microMoves && (currentTime - lastMoveTime) > 50) {
                const microMove = (Math.random() - 0.5) * 3;
                position += microMove;
                lastMoveTime = currentTime;
              }

              window.scrollY = position;
              window.scrollTo(0, position);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                window.scrollTo(0, to);
                resolve();
              }
            };
            requestAnimationFrame(animate);
          });
        }, {
          from: 0,
          to: 999999,
          duration: 800,
          hasVariation: true
        });

        const pauses = [211.962699090501, 223.67655037222502, /* ... بقية القيم ... */];
        for (const pauseDuration of pauses) {
          await page.waitForTimeout(pauseDuration);
        }
        console.log('   ✅ تم التمرير إلى نهاية الصفحة');
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
        console.log('\n⏱️ الانتظار:');
        console.log('   ⏳ المدة: 5999ms (6.0s)');
        console.log('   ⏳ جاري الانتظار...');
        await currentPage.waitForTimeout(5999);
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
        break;
      } catch (stepError) {
        retries_step8--;
        if (retries_step8 === 0) {
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
}

// دالة تشغيل فعلية
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
    console.log('🎥 تسجيل الفيديو مُفعّل للسياق - سيتم الحفظ إلى: outputs/videos/');
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
      console.log('   📁 الفيديوهات محفوظة في: outputs/videos/');
      console.log('   📁 لقطات الشاشة محفوظة في: outputs/screenshots/');
    }
    if (browser) {
      console.log('🔒 إغلاق المتصفح...');
      await browser.close();
      console.log('✅ تم إغلاق المتصفح');
    }
  }
})();
