// ✅ استيراد stealth-helpers.js - يحتوي على جميع إعدادات التخفي
import { createStealthBrowser, humanClick, humanType, humanScroll } from './stealth-helpers.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTask(page, context, paths) {
  // تهيئة الصفحة الحالية ومتغيرات التتبع
  let currentPage = page;
  const pages = {};
  pages['main'] = page;
  let screenshotCounter = 0;
  
  try {
    // Step 1: العودة إلى صفحة
    let retries_step1 = 3;
    while (retries_step1 > 0) {
      try {
        // ⚠️ تحذير: لم يتم تحديد متغير الصفحة للعودة إليها
        console.error('❌ خطأ: لم يتم تحديد متغير الصفحة للعودة إليها');
        throw new Error('لم يتم تحديد متغير صفحة للعودة إليه');
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
        // 🌐 فتح صفحة
        console.log('\n🌐 الانتقال إلى صفحة:');
        console.log('   🔗 الرابط: ');
        try {
          console.log('   ⏳ جاري تحميل الصفحة...');
          await page.goto("", { waitUntil: 'networkidle' }).catch(() => {});
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

    // Step 3: نقر على عنصر
    let retries_step3 = 3;
    while (retries_step3 > 0) {
      try {
        
        // 👆 خطوة نقر ذكية على العنصر
        console.log('\n👆 خطوة نقر على عنصر:');
        console.log('   🔍 جاري البحث عن العنصر...');
        console.log('   📋 عدد المحددات:', 0);
        let clickSelector = null;
        const selectorsToTry = [];
        
        // البحث عن أول عنصر قابل للنقر
        for (const selector of selectorsToTry) {
          try {
            const element = await currentPage.locator(selector).first();
            await element.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
            if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
              clickSelector = selector;
              break;
            }
          } catch (e) {}
        }
        
        if (!clickSelector) {
          const errorMsg = '❌ فشل: لم يتم العثور على عنصر قابل للنقر بأي من المحددات: ' + selectorsToTry.join(', ');
          console.error(errorMsg);
          throw new Error(errorMsg);
        }
        
        console.log('✅ عنصر وُجد بنجاح:');
        console.log('   📍 Selector:', clickSelector);
        console.log('   ✓ الحالة: مرئي وقابل للنقر');
        
        // التمرير للعنصر إلى عرض الكاميرا
        console.log('📜 جاري التمرير للعنصر إلى عرض الكاميرا...');
        await currentPage.locator(clickSelector).first().scrollIntoViewIfNeeded();
        console.log('   ✅ تم التمرير بنجاح');
        
        // تنفيذ النقرة مع محاولات متعددة
        console.log('🖱️ تنفيذ النقرة...');
        try {
          await currentPage.locator(clickSelector).first().click({ timeout: 5000 });
          console.log('   ✅ تم النقر بنجاح');
        } catch (e) {
          console.log('   ⚠️ النقر الطبيعي فشل:', e.message);
          console.log('   🔄 جاري محاولة النقر الجبري (Force Click)...');
          try {
            await currentPage.locator(clickSelector).first().click({ force: true });
            console.log('   ✅ تم النقر الجبري بنجاح');
          } catch (forceError) {
            console.error('   ❌ فشل النقر الجبري أيضاً:', forceError.message);
            throw forceError;
          }
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

    console.log("✅ اكتملت المهمة بنجاح");
    return { success: true };
  } catch (error) {
    console.error("❌ خطأ:", error.message);
    return { success: false, error: error.message };
  }
}

// دالة تشغيل فعلية - تعمل مباشرة
(async () => {
  let browser = null;
  try {
    // ✅ استخدام createStealthBrowser من stealth-helpers
    // تطبيق جميع إعدادات التخفي تلقائياً
    console.log('🚀 إنشاء متصفح مع إعدادات التخفي...');
    const { browser, context, page, paths } = await createStealthBrowser({
      stealthConfig: {
        randomUserAgent: true,
        randomViewport: true,
        hideWebdriver: true,
        randomTimezone: true,
        randomLanguage: false,
        humanClicks: true,
        humanTyping: true,
        randomDelays: true,
        mouseMovement: true,
        scrollBehavior: true,
        blockWebRTC: true,
        maskFingerprint: true,
        rotateProxies: false,
        clearCookies: true
      },
      recordVideo: false,
      disableWebSecurity: false,
      outputDir: process.env.OUTPUT_DIR || 'outputs'
    });
    console.log('✅ متصفح جاهز للاستخدام\n');
    let executionSuccess = false;
    let executionError = null;

    // تنفيذ المهمة
    try {
      const result = await runTask(page, context, paths);
      executionSuccess = result.success;
      console.log('📊 نتيجة التنفيذ:', result.success ? '✅ نجحت' : '❌ فشلت');
    } catch (taskError) {
      executionError = taskError;
      console.error('❌ خطأ في تنفيذ المهمة:', taskError.message);
    }
  } catch (error) {
    console.error('❌ خطأ حرج في البداية:', error.message);
  } finally {
    // تنظيف الموارد - إغلاق السياق والمتصفح مرة واحدة فقط
    try {
      if (context) {
        console.log('\n🔒 إغلاق السياق وحفظ المخرجات:');
        console.log('   ⏳ جاري إغلاق السياق...');
        await context.close();
        console.log('   ✅ تم إغلاق السياق');
        console.log(`   📁 لقطات الشاشة محفوظة في: ${paths.screenshots}`);
      }
    } catch (contextError) {
      console.warn('⚠️ خطأ في إغلاق السياق:', contextError.message);
    }
    try {
      if (browser) {
        console.log('🔒 إغلاق المتصفح...');
        await browser.close();
        console.log('✅ تم إغلاق المتصفح');
      }
    } catch (browserError) {
      console.warn('⚠️ خطأ في إغلاق المتصفح:', browserError.message);
    }
    // الخروج بكود النجاح/الفشل الصحيح
    process.exit(executionSuccess ? 0 : 1);
  }
})();
