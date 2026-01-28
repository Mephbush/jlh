import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createStealthBrowser, humanClick, humanType, humanScroll } from './stealth-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// دالة إنشاء المجلدات المطلوبة
async function ensureOutputDirs() {
  const dirs = ['outputs', 'outputs/screenshots', 'outputs/videos'];
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

// معلومات المهمة
const TASK = {
  "id": "8570b73b-7c78-4aab-942b-cfa24dbc358f",
  "name": "Chech duo",
  "description": "مهمة تم إنشاؤها بالمنشئ المرئي المتقدم",
  "type": "custom",
  "status": "idle",
  "script": "const { chromium } = require('playwrigh\n\n// ============================================\n// تطبيق إعدادات التخفي التلقائي\n// ============================================\n\n\n// 1. إخفاء علامات Webdriver\ntry {\n  Object.defineProperty(navigator, 'webdriver', { get: () => undefined });\n  delete navigator.__proto__.webdriver;\n} catch (e) {}\n\n// 2. إخفاء بصمة المتصفح المتقدم\ntry {\n  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {\n    value: function() {\n      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwADhgGAWjR9awAAAABJRU5ErkJggg==';\n    }\n  });\n} catch (e) {}\n\n// 3. تعيين منطقة زمنية عشوائية\ntry {\n  const timezones = ['UTC', 'GMT', 'EST', 'CST', 'MST', 'PST', 'GMT+1', 'GMT+2'];\n  const tz = timezones[Math.floor(Math.random() * timezones.length)];\n  process.env.TZ = tz;\n} catch (e) {}\n\n// 4. حظر WebRTC (منع تسريب IP الحقيقي)\ntry {\n  window.RTCPeerConnection = undefined;\n  window.webkitRTCPeerConnection = undefined;\n} catch (e) {}\n\n// 5. إضافة تأخيرات عشوائية\nconst baseWait = async (ms) => new Promise(r => setTimeout(r, ms));\nconst randomWait = async (min = 100, max = 500) => {\n  const delay = min + Math.random() * (max - min);\n  return new Promise(r => setTimeout(r, delay));\n};\n\n// 6. إعادة تعيين البيانات المحفوظة (في البداية)\ntry {\n  if (typeof localStorage !== 'undefined') localStorage.clear();\n  if (typeof sessionStorage !== 'undefined') sessionStorage.clear();\n} catch (e) {}\n\n// 7. محاكاة حركات الماوس البشرية\nconst sleep = (ms) => new Promise(r => setTimeout(r, ms));\nconst humanDelay = () => new Promise(r => setTimeout(r, 50 + Math.random() * 150));\n\n// تطبيق الإعدادات بنجاح\nconsole.log('✅ تم تطبيق إعدادات التخفي بنجاح');\n\nt');\nconst fs = require('fs');\nconst path = require('path');\n\n// دالة إنشاء المجلدات المطلوبة\nfunction ensureOutputDirs() {\n  const dirs = ['outputs', 'outputs/screenshots', 'outputs/videos'];\n  dirs.forEach(dir => {\n    if (!fs.existsSync(dir)) {\n      fs.mkdirSync(dir, { recursive: true });\n    }\n  });\n}\n\nasync function runTask(page, context) {\n  // تهيئة المجلدات والصفحة الحالية ومتغيرات التتبع\n  ensureOutputDirs();\n  let currentPage = page;\n  const pages = {};\n  pages['main'] = page;\n  let screenshotCounter = 0;\n  \n  try {\n    // Step 1: تسجيل فيديو\n    let retries_step1 = 3;\n    while (retries_step1 > 0) {\n      try {\n        // 🎥 تسجيل الفيديو - تم تفعيله على مستوى السياق\n        console.log('🎥 خطوة الفيديو:');\n        console.log('   ℹ️  التسجيل يشمل جميع الصفحات في هذا السياق');\n        console.log('   📁 مجلد الحفظ: outputs/videos/');\n        console.log('   ⏱️  سيتم حفظ الفيديو تلقائياً عند إغلاق السياق');\n        console.log('   ✅ الحالة: الفيديو نشط ومُسجَّل');\n                break;\n      } catch (stepError) {\n        retries_step1--;\n        if (retries_step1 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 2: فتح صفحة\n    let retries_step2 = 3;\n    while (retries_step2 > 0) {\n      try {\n        // 🌐 فتح صفحة\n        console.log('\\n🌐 الانتقال إلى صفحة:');\n        console.log('   🔗 الرابط: https://www.duolingo.com');\n        try {\n          console.log('   ⏳ جاري تحميل الصفحة...');\n          await page.goto(\"https://www.duolingo.com\", { waitUntil: 'networkidle' }).catch(() => {});\n          console.log('   ✅ تم تحميل الصفحة بنجاح');\n          currentPage = page;\n        } catch (navError) {\n          console.error('   ❌ خطأ في تحميل الصفحة:', navError.message);\n          throw navError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step2--;\n        if (retries_step2 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 3: التقاط صورة\n    let retries_step3 = 3;\n    while (retries_step3 > 0) {\n      try {\n        // 📸 التقاط لقطة شاشة\n        screenshotCounter++;\n        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');\n        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);\n        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');\n        try {\n          await currentPage.screenshot({ path: screenshotPath,  });\n          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);\n        } catch (screenshotError) {\n          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);\n          throw screenshotError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step3--;\n        if (retries_step3 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 4: انتظار\n    let retries_step4 = 3;\n    while (retries_step4 > 0) {\n      try {\n        // ⏱️ انتظار زمني\n        console.log('\\n⏱️ الانتظار:');\n        console.log('   ⏳ المدة: 5999ms (6.0s)');\n        console.log('   ⏳ جاري الانتظار...');\n        await currentPage.waitForTimeout(5999);\n        console.log('   ✅ انتهت مدة الانتظار');\n                break;\n      } catch (stepError) {\n        retries_step4--;\n        if (retries_step4 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 5: التقاط صورة\n    let retries_step5 = 3;\n    while (retries_step5 > 0) {\n      try {\n        // 📸 التقاط لقطة شاشة\n        screenshotCounter++;\n        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');\n        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);\n        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');\n        try {\n          await currentPage.screenshot({ path: screenshotPath,  });\n          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);\n        } catch (screenshotError) {\n          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);\n          throw screenshotError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step5--;\n        if (retries_step5 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 6: تمرير الصفحة\n    let retries_step6 = 3;\n    while (retries_step6 > 0) {\n      try {\n        // 📜 تمرير الصفحة (طبيعي وبشري)\n        console.log('\\n📜 تمرير الصفحة:');\n        console.log('   🎯 الاتجاه: end');\n        console.log('   ⏳ جاري التمرير...');\n        const scrollTarget = await currentPage.evaluate(() => document.body.scrollHeight - window.innerHeight);\n        console.log('   📏 الموضع النهائي:', scrollTarget);\n        \n        // تمرير طبيعي وبشري مع محاكاة السلوك البشري\n        await page.evaluate(({ from, to, duration, hasVariation }) => {\n          return new Promise((resolve) => {\n            const startTime = performance.now();\n            const distance = to - from;\n            const startPosition = window.scrollY;\n        \n            // حركات صغيرة عشوائية (Micro-movements)\n            const microMoves = true;\n            let lastMoveTime = startTime;\n        \n            const animate = (currentTime) => {\n              const elapsed = currentTime - startTime;\n              const progress = Math.min(elapsed / duration, 1);\n        \n              // استخدام دالة التسارع\n              const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;\n        \n              // الموضع الرئيسي\n              let position = startPosition + distance * easeProgress;\n        \n              // إضافة حركات عشوائية صغيرة\n              if (microMoves && (currentTime - lastMoveTime) > 50) {\n                const microMove = (Math.random() - 0.5) * 3;\n                position += microMove;\n                lastMoveTime = currentTime;\n              }\n        \n              window.scrollY = position;\n              window.scrollTo(0, position);\n        \n              if (progress < 1) {\n                requestAnimationFrame(animate);\n              } else {\n                // ضمان الوصول للموضع النهائي\n                window.scrollTo(0, to);\n                resolve();\n              }\n            };\n        \n            requestAnimationFrame(animate);\n          });\n        }, { \n          from: 0, \n          to: 999999, \n          duration: 800,\n          hasVariation: true\n        });\n        \n        // توقفات عشوائية (محاكاة القراءة أثناء التمرير)\n        const pauses = [211.962699090501,223.67655037222502,215.27702276963984,229.66941848602409,227.22359749361792,204.4601531059945,229.20592385537262,228.9065390678205,229.43769439073637,219.1749644775999,206.67161361069034,229.88702675717767,218.26206455275218,226.38160177159588,203.1785728294321,227.22125674996553,201.37213220195972,215.26393430868671,214.15560105692296,229.0466322378149,207.40664728173468,224.32114134619846,220.5070699507079,210.8090135075698,221.4018116013692,204.57968522141456,214.9684784290683,215.3357297896286,219.06531825437378,225.3875981753837,215.09063713462356,215.13177817909343,227.91060544471407,206.9212984884969,221.62053022563325,217.9795483422816,216.3321340032517,208.64426383668774,213.83084549467623,219.92222399137125,227.07509838593012,209.66490074227474,211.1432406268602,227.15545624733463,207.77641766177305,200.60147510045928,226.10203004129835,220.82156806515968,202.8863482506567,207.50541416504745,207.07461021309888,225.35501118349669,214.9903593861649,219.14812213965615,204.60144752348248,214.14349193545252,219.2585038528752,200.38673832546095,214.09061982044898,207.71445952330265,211.62813551944134,229.06980224253292,219.39783303109937,214.91797495772872,229.57702333095534,216.75756592973448,221.3721803527305,217.10329769313458,226.61812699465673,208.1723948113965,226.3722775444913,220.1362731222511,218.88763638146688,202.430042451257,218.18641846944845,226.95540814010755,201.06100125554093,226.7982401090324,228.58302516327234,218.02681764448053,226.99721890077063,220.35525496155805,206.62745756150818,218.3582903294532,203.98297496858711,204.57706667043394,227.5638172463438,220.28088824581275,207.71406900082115,211.30593138829133,220.85228167960514,203.739249013139,211.6886370300772,205.13434651577015,223.4713691494716,211.5484136492692,217.7970084144396,208.24061405402912,226.7762501623415,220.77181366399032,215.84402973844163,214.21385279706396,211.59357885726132,228.41830102460884,205.2802279225218,220.83394562278647,214.76529555244346,220.80427703016235,221.11921836122556,217.79274668163592,220.92863166872826,223.21866353113958,223.02931316474158,223.94903948956744,210.37074797761605,213.11940627262877,215.93517979089674,201.72808254201192,207.3920132357531,229.77752618071204,215.83216884284653,201.24495787019515,204.83672252994393,224.5032308636106,220.1409589989817,209.22873092852163,201.5692349962737,201.33956414818405,211.61888740750382,206.35873568295455,229.16636828597598,214.35789240726547,207.51756224208418,203.8672129200325,215.10110455536483,200.07137762306763,201.9011875310901,208.2682716963883,212.14707443117703,213.65218758588603,201.91622023715067,214.63755880673486,210.43502763461248,206.6111807181293,200.95684556236853,209.9009217913898,216.38175192679873,206.47554961438743,229.39754465120643,220.57265895528846,211.06781736680708,206.3073531376701,211.5624417137301,223.43569599813375,202.57396467904502,200.23199615914172,218.82277621757575,200.0689994070961,215.1875762860707,208.9254324485325,210.98126612629332,207.62208812766403,200.20596545421,211.85903363823303,221.96834995672168,210.3467483174445,203.86712943807157,213.08015736521463,216.99156477519787,223.06358301575452,224.85877573585316,207.79155727347322,222.15502203424325,213.28094204165802,223.37279812185557,221.17528561380456,203.6154082757343,223.8026894833342,227.92592727862714,212.9934076425725,203.0550198908869,217.135510092363,228.31480911530392,205.3465377290666,219.57436614256736,223.52557036570735,226.70571642231465,212.09528671694738,229.87368754424216,224.11160824963946,219.030117634364,216.97471021877894,229.69174198657504,225.777189896055,207.1514276557249,225.59882486941115,210.41097193435806,212.77089094315548,222.67480120037547,219.9859977752911,205.016833263137,201.54786903592048,221.79527145844605,215.8090228891982,200.52084648168443,217.3168029821672,223.27335351862354,204.3074397223534,223.00919466657416,218.2539146491323,221.2464210412369,206.08121197801222,215.06196269085208,204.79271986788774,216.70959407866434,223.2175816654879,216.05896743248724,202.11741219780697,215.62650722802005,202.6538545161769,222.66510005923047,214.36931852243654,208.51416808533781,212.36340054856805,218.57077746706577,225.18752025098658,214.26151344285583,226.09312455110543,218.96147975935332,219.81221141000123,209.23761465665666,201.06058811967821,218.44397731221883,203.16172918187704,205.75418488842377,216.76833621638596,219.20551818705783,223.28812211237369,217.2852705631551,229.53158138165276,228.0854302667236,211.0639737977524,224.4921852822727,205.96811925674325,219.74056059149837,225.26352036339628,212.8797605176027,201.94907069480027,207.50640239473546,221.40531861249087,207.36482304274887,202.7073095657245,201.52867368592794,203.70638378469846,207.38693301057108,225.39981115735347,229.02661584352225,210.79881471342188,227.9369173284822,214.08688947273066,211.35189877670436,218.09188071457424,209.56013203355798,219.94035857545305,205.65442131811565,207.22555514076456,211.62941610671217,208.60394034529767,205.7983211499574,209.8098653691519,225.79812197369512,226.78502351520135,218.0395423065772,219.05528142905862,203.76640834853913,203.82246482399898,219.57797880763786,223.64579071693015,219.31445403991967,223.17703840532678,211.32982256430805,225.02405324314987,220.55399692984304,208.72138567973178,219.49805115465657,206.65749966294186,222.4033658416578,223.550690325159,220.0486142487681,210.55577001451323,207.55548129085417,227.45450116940003,206.5160642235064,217.1734665984141,209.40823063303205,224.45031668586043,204.78733774570776,216.56224176052072,206.8710027521252,220.93469865601864,221.60320587968064,222.27386727367366,228.97850373307503,227.29449021210425,201.2616541990296,214.97538310343685,201.5300767496577,210.93518154710057,225.16069548270497,209.41793987143723,200.00278422987216,202.52239324896553,210.75666775399867,201.49495694629272,222.88955895714113,229.13864332074644,201.93094433602644,222.49107840270463,218.86769911172385,209.35857886254055,211.44280991708803,217.47458004477025,217.5665857088993,210.0666284530905,219.40122746245336,220.8438048005579,212.54379211945036,219.96892609668365,223.36301693032766,214.72017430680404,209.99702907484584,219.44579202552035,215.37616175946317,223.3948882129738,202.2150767004655,227.25348678179054,216.89734607387726,204.82301349100962,222.99397166612525,225.14078581135536,212.96984488248137,203.31685772735776,203.5531381055469,216.49669965985657,223.29276917982327,213.21662508145755,205.95030731708962,223.77597523288046,219.30324445404818,200.5986741266731,207.53776508303847,225.84217763225323,206.45028950460812,221.849236441657,221.95825175515614,222.09042217922584,207.8085479875745,221.10010250727078,225.86347996411087,222.2626739733085,215.016010572339,217.46471640874944,225.9263603028905,213.8136347825326,211.4313058366433,208.5793222116759,229.64959562381355,205.2054903334252,206.6971036462634,211.30809828454287,208.85154035149904,208.95208129452266,228.6137369826567,201.16549024929006,207.90691165201864,217.72076797307935,207.64222711522987,215.88921422501394,217.41497273882993,216.20255446022125,207.76943455326767,216.61972262709037,204.4274648979628,200.65605644439714,217.64623420484108,217.4836147702529,200.30187370085767,207.94265328522394,213.36271596127864,219.82969497747206,221.67476793427795,219.267743979486,227.63403045922504,206.7818598609704,219.98336364405012,221.35186843692108,218.13625523537291,218.91803343254296,205.01597071134293,221.63782071822365,228.66589213194862,208.09194935304305,222.5414363544988,215.45758852766875,214.06527602669502,205.0917153885691,209.52896597999236,216.9364866611355,203.1583149052911,205.81438088663054,224.79337086430644,227.71911760588716,217.23126771032165,200.0408893803152,224.45131516029048,222.0660415576031,223.59881751531628,216.00866791394768,205.66220919134886,216.56945065152664,203.1666111320381,217.3033738943143,204.1620969839719,212.0594579185788,206.83615504612663,212.13126742123708,206.7282869582533,204.99270482630476,228.73717272824265,226.3175210243264,207.39136397913634,217.8510032198409,200.88921175544147,225.1379571657377,227.4827941632953,229.5931806105199,216.24688282108133,213.0637708870152,227.5874175693139,225.1030957253528,200.6625243039431,209.31442003111488,208.83473517949915,213.95806354025177,218.49112617360197,210.10395910003714,203.4242075885174,224.04729315364116,224.04174487810923,216.61190588710951,220.25251241689134,229.73907421584397,225.28326938174726,225.54594142320065,206.36330206564134,227.09990275481653,224.9574006435609,215.09264600622896,213.0204518953674,228.6073831626847,226.80345952156577,202.00423243098768,201.36010167494743,220.04017362620968,204.71266103005644,211.14037940477067,229.71145346789223,206.16459460018112,214.90840331852706,208.45399742296897,225.05679924171753,213.61919848845338,211.04848384341005,210.11505896405222,205.75751622968173,219.3979564723088,221.88501303645066,219.74032777182936,202.84100666483758,221.09322791502453,225.80592084616922,223.68535631109728,217.161225737319,227.67719878243128,200.82345416797014,221.11918224645123,203.6506748397764,228.65511670134669,212.78837749511857,222.2864073078851,220.87659971541402,212.32818864145452,214.59307189428304,206.34763767413142,226.92997819807186,203.91063552429708,214.1517343602597,212.65768126055482,214.5006851035395,207.73236884393674];
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
        // ⏱️ انتظار زمني
        console.log('\\n⏱️ الانتظار:');\n        console.log('   ⏳ المدة: 5999ms (6.0s)');\n        console.log('   ⏳ جاري الانتظار...');\n        await currentPage.waitForTimeout(5999);\n        console.log('   ✅ انتهت مدة الانتظار');\n                break;\n      } catch (stepError) {\n        retries_step7--;\n        if (retries_step7 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    // Step 8: التقاط صورة\n    let retries_step8 = 3;\n    while (retries_step8 > 0) {\n      try {\n        // 📸 التقاط لقطة شاشة\n        screenshotCounter++;\n        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');\n        const screenshotPath = path.join('outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);\n        console.log('📸 جاري التقاط لقطة الشاشة (viewport)...');\n        try {\n          await currentPage.screenshot({ path: screenshotPath,  });\n          console.log('✅ تم حفظ اللقطة بنجاح في:', screenshotPath);\n        } catch (screenshotError) {\n          console.error('❌ خطأ في حفظ لقطة الشاشة:', screenshotError.message);\n          throw screenshotError;\n        }\n                break;\n      } catch (stepError) {\n        retries_step8--;\n        if (retries_step8 === 0) {\n          throw stepError;\n        }\n        await new Promise(resolve => setTimeout(resolve, 1000));\n      }\n    }\n\n    console.log(\"✅ اكتملت المهمة بنجاح\");\n    return { success: true };\n  } catch (error) {\n    console.error(\"❌ خطأ:\", error.message);\n    return { success: false, error: error.message };\n  }\n}\n\n// دالة تشغيل فعلية - تعمل مباشرة\n(async () => {\n  let browser = null;\n  try {\n    // تشغيل المتصفح بشكل عادي (بدون تعطيل أمان الويب)\n    browser = await chromium.launch({\n      headless: true,\n      args: [\n        '--disable-blink-features=AutomationControlled',\n        '--disable-dev-shm-usage',\n        '--no-sandbox'\n      ]\n    });\n    const contextOptions = {};\n    // تفعيل تسجيل الفيديو على مستوى السياق\n    contextOptions.recordVideo = { dir: 'outputs/videos' };\n    console.log('🎥 تسجيل الفيديو مُفعّل للسياق - سيتم الحفظ إلى: outputs/videos/');\n    const context = await browser.newContext(contextOptions);\n    const page = await context.newPage();\n    let executionSuccess = false;\n    let executionError = null;\n\n    // تنفيذ المهمة\n    try {\n      const result = await runTask(page, context);\n      executionSuccess = result.success;\n      console.log('📊 نتيجة التنفيذ:', result.success ? '✅ نجحت' : '❌ فشلت');\n    } catch (taskError) {\n      executionError = taskError;\n      console.error('❌ خطأ في تنفيذ المهمة:', taskError.message);\n    }\n  } catch (error) {\n    console.error('❌ خطأ حرج في البداية:', error.message);\n  } finally {\n    // تنظيف الموارد - إغلاق السياق والمتصفح مرة واحدة فقط\n    try {\n      if (context) {\n        console.log('\\n🔒 إغلاق السياق وحفظ المخرجات:');\n        console.log('   ⏳ جاري إغلاق السياق...');\n        await context.close();\n        console.log('   ✅ تم إغلاق السياق');\n        console.log('   📁 الفيديوهات محفوظة في: outputs/videos/');\n        console.log('   📁 لقطات الشاشة محفوظة في: outputs/screenshots/');\n      }\n    } catch (contextError) {\n      console.warn('⚠️ خطأ في إغلاق السياق:', contextError.message);\n    }\n    try {\n      if (browser) {\n        console.log('🔒 إغلاق المتصفح...');\n        await browser.close();\n        console.log('✅ تم إغلاق المتصفح');\n      }\n    } catch (browserError) {\n      console.warn('⚠️ خطأ في إغلاق المتصفح:', browserError.message);\n    }\n    // الخروج بكود النجاح/الفشل الصحيح\n    process.exit(executionSuccess ? 0 : 1);\n  }\n})();\n",
  "targetUrl": "https://www.duolingo.com",
  "createdAt": "2026-01-28T07:01:28.153Z",
  "metadata": {
    "source": "advanced-builder",
    "stepsData": "[{\"id\":\"1769583623041_qpg69x1gw\",\"type\":\"video\",\"params\":{\"codec\":\"vp9\",\"recordAudio\":false},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769583624790_2po3px2n6\",\"type\":\"navigate\",\"params\":{\"url\":\"https://www.duolingo.com\",\"pageLabel\":\"\",\"variableName\":\"\"},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769583647476_v7wwaqhe7\",\"type\":\"screenshot\",\"params\":{\"fullPage\":false},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769583630249_yx5khip0k\",\"type\":\"wait\",\"params\":{\"type\":\"time\",\"duration\":5999},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769583652792_q0x6uldz0\",\"type\":\"screenshot\",\"params\":{\"fullPage\":false},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769583655016_mlqumqbw3\",\"type\":\"scroll\",\"params\":{\"position\":\"end\",\"behavior\":\"natural\",\"scrollType\":\"smooth\",\"humanize\":true,\"duration\":800,\"randomVariation\":15,\"microMoves\":true,\"pauseFrequency\":2000,\"pauseDuration\":200,\"gestureIntensity\":3,\"momentumFriction\":0.95,\"flickVelocity\":2.5},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769583664855_os42agot0\",\"type\":\"wait\",\"params\":{\"type\":\"time\",\"duration\":5999},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}},{\"id\":\"1769583668559_tq5hdhatm\",\"type\":\"screenshot\",\"params\":{\"fullPage\":false},\"fallbacks\":[],\"conditions\":[],\"errorHandling\":{\"ignoreErrors\":false,\"retryCount\":3}}]"
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
  await ensureOutputDirs();

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
            // 🌐 فتح صفحة
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
            // 📸 التقاط لقطة شاشة
            screenshotCounter++;
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = path.join(__dirname, 'outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);
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
            // 📸 التقاط لقطة شاشة
            screenshotCounter++;
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = path.join(__dirname, 'outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);
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

        // Step 6: تمرير الصفحة
        let retries_step6 = 3;
        while (retries_step6 > 0) {
          try {
            // 📜 تمرير الصفحة (طبيعي وبشري)
            console.log('\n📜 تمرير الصفحة:');
            console.log('   🎯 الاتجاه: end');
            console.log('   ⏳ جاري التمرير...');
            const scrollTarget = await currentPage.evaluate(() => document.body.scrollHeight - window.innerHeight);
            console.log('   📏 الموضع النهائي:', scrollTarget);

            // تمرير طبيعي وبشري مع محاكاة السلوك البشري
            await page.evaluate(({ from, to, duration, hasVariation }) => {
              return new Promise((resolve) => {
                const startTime = performance.now();
                const distance = to - from;
                const startPosition = window.scrollY;

                // حركات صغيرة عشوائية (Micro-movements)
                const microMoves = true;
                let lastMoveTime = startTime;

                const animate = (currentTime) => {
                  const elapsed = currentTime - startTime;
                  const progress = Math.min(elapsed / duration, 1);

                  // استخدام دالة التسارع
                  const easeProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;

                  // الموضع الرئيسي
                  let position = startPosition + distance * easeProgress;

                  // إضافة حركات عشوائية صغيرة
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
                    // ضمان الوصول للموضع النهائي
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

            // توقفات عشوائية (محاكاة القراءة أثناء التمرير)
            const pauses = [211.962699090501,223.67655037222502,215.27702276963984,229.66941848602409,227.22359749361792,204.4601531059945,229.20592385537262,228.9065390678205,229.43769439073637,219.1749644775999,206.67161361069034,229.88702675717767,218.26206455275218,226.38160177159588,203.1785728294321,227.22125674996553,201.37213220195972,215.26393430868671,214.15560105692296,229.0466322378149,207.40664728173468,224.32114134619846,220.5070699507079,210.8090135075698,221.4018116013692,204.57968522141456,214.9684784290683,215.3357297896286,219.06531825437378,225.3875981753837,215.09063713462356,215.13177817909343,227.91060544471407,206.9212984884969,221.62053022563325,217.9795483422816,216.3321340032517,208.64426383668774,213.83084549467623,219.92222399137125,227.07509838593012,209.66490074227474,211.1432406268602,227.15545624733463,207.77641766177305,200.60147510045928,226.10203004129835,220.82156806515968,202.8863482506567,207.50541416504745,207.07461021309888,225.35501118349669,214.9903593861649,219.14812213965615,204.60144752348248,214.14349193545252,219.2585038528752,200.38673832546095,214.09061982044898,207.71445952330265,211.62813551944134,229.06980224253292,219.39783303109937,214.91797495772872,229.57702333095534,216.75756592973448,221.3721803527305,217.10329769313458,226.61812699465673,208.1723948113965,226.3722775444913,220.1362731222511,218.88763638146688,202.430042451257,218.18641846944845,226.95540814010755,201.06100125554093,226.7982401090324,228.58302516327234,218.02681764448053,226.99721890077063,220.35525496155805,206.62745756150818,218.3582903294532,203.98297496858711,204.57706667043394,227.5638172463438,220.28088824581275,207.71406900082115,211.30593138829133,220.85228167960514,203.739249013139,211.6886370300772,205.13434651577015,223.4713691494716,211.5484136492692,217.7970084144396,208.24061405402912,226.7762501623415,220.77181366399032,215.84402973844163,214.21385279706396,211.59357885726132,228.41830102460884,205.2802279225218,220.83394562278647,214.76529555244346,220.80427703016235,221.11921836122556,217.79274668163592,220.92863166872826,223.21866353113958,223.02931316474158,223.94903948956744,210.37074797761605,213.11940627262877,215.93517979089674,201.72808254201192,207.3920132357531,229.77752618071204,215.83216884284653,201.24495787019515,204.83672252994393,224.5032308636106,220.1409589989817,209.22873092852163,201.5692349962737,201.33956414818405,211.61888740750382,206.35873568295455,229.16636828597598,214.35789240726547,207.51756224208418,203.8672129200325,215.10110455536483,200.07137762306763,201.9011875310901,208.2682716963883,212.14707443117703,213.65218758588603,201.91622023715067,214.63755880673486,210.43502763461248,206.6111807181293,200.95684556236853,209.9009217913898,216.38175192679873,206.47554961438743,229.39754465120643,220.57265895528846,211.06781736680708,206.3073531376701,211.5624417137301,223.43569599813375,202.57396467904502,200.23199615914172,218.82277621757575,200.0689994070961,215.1875762860707,208.9254324485325,210.98126612629332,207.62208812766403,200.20596545421,211.85903363823303,221.96834995672168,210.3467483174445,203.86712943807157,213.08015736521463,216.99156477519787,223.06358301575452,224.85877573585316,207.79155727347322,222.15502203424325,213.28094204165802,223.37279812185557,221.17528561380456,203.6154082757343,223.8026894833342,227.92592727862714,212.9934076425725,203.0550198908869,217.135510092363,228.31480911530392,205.3465377290666,219.57436614256736,223.52557036570735,226.70571642231465,212.09528671694738,229.87368754424216,224.11160824963946,219.030117634364,216.97471021877894,229.69174198657504,225.777189896055,207.1514276557249,225.59882486941115,210.41097193435806,212.77089094315548,222.67480120037547,219.9859977752911,205.016833263137,201.54786903592048,221.79527145844605,215.8090228891982,200.52084648168443,217.3168029821672,223.27335351862354,204.3074397223534,223.00919466657416,218.2539146491323,221.2464210412369,206.08121197801222,215.06196269085208,204.79271986788774,216.70959407866434,223.2175816654879,216.05896743248724,202.11741219780697,215.62650722802005,202.6538545161769,222.66510005923047,214.36931852243654,208.51416808533781,212.36340054856805,218.57077746706577,225.18752025098658,214.26151344285583,226.09312455110543,218.96147975935332,219.81221141000123,209.23761465665666,201.06058811967821,218.44397731221883,203.16172918187704,205.75418488842377,216.76833621638596,219.20551818705783,223.28812211237369,217.2852705631551,229.53158138165276,228.0854302667236,211.0639737977524,224.4921852822727,205.96811925674325,219.74056059149837,225.26352036339628,212.8797605176027,201.94907069480027,207.50640239473546,221.40531861249087,207.36482304274887,202.7073095657245,201.52867368592794,203.70638378469846,207.38693301057108,225.39981115735347,229.02661584352225,210.79881471342188,227.9369173284822,214.08688947273066,211.35189877670436,218.09188071457424,209.56013203355798,219.94035857545305,205.65442131811565,207.22555514076456,211.62941610671217,208.60394034529767,205.7983211499574,209.8098653691519,225.79812197369512,226.78502351520135,218.0395423065772,219.05528142905862,203.76640834853913,203.82246482399898,219.57797880763786,223.64579071693015,219.31445403991967,223.17703840532678,211.32982256430805,225.02405324314987,220.55399692984304,208.72138567973178,219.49805115465657,206.65749966294186,222.4033658416578,223.550690325159,220.0486142487681,210.55577001451323,207.55548129085417,227.45450116940003,206.5160642235064,217.1734665984141,209.40823063303205,224.45031668586043,204.78733774570776,216.56224176052072,206.8710027521252,220.93469865601864,221.60320587968064,222.27386727367366,228.97850373307503,227.29449021210425,201.2616541990296,214.97538310343685,201.5300767496577,210.93518154710057,225.16069548270497,209.41793987143723,200.00278422987216,202.52239324896553,210.75666775399867,201.49495694629272,222.88955895714113,229.13864332074644,201.93094433602644,222.49107840270463,218.86769911172385,209.35857886254055,211.44280991708803,217.47458004477025,217.5665857088993,210.0666284530905,219.40122746245336,220.8438048005579,212.54379211945036,219.96892609668365,223.36301693032766,214.72017430680404,209.99702907484584,219.44579202552035,215.37616175946317,223.3948882129738,202.2150767004655,227.25348678179054,216.89734607387726,204.82301349100962,222.99397166612525,225.14078581135536,212.96984488248137,203.31685772735776,203.5531381055469,216.49669965985657,223.29276917982327,213.21662508145755,205.95030731708962,223.77597523288046,219.30324445404818,200.5986741266731,207.53776508303847,225.84217763225323,206.45028950460812,221.849236441657,221.95825175515614,222.09042217922584,207.8085479875745,221.10010250727078,225.86347996411087,222.2626739733085,215.016010572339,217.46471640874944,225.9263603028905,213.8136347825326,211.4313058366433,208.5793222116759,229.64959562381355,205.2054903334252,206.6971036462634,211.30809828454287,208.85154035149904,208.95208129452266,228.6137369826567,201.16549024929006,207.90691165201864,217.72076797307935,207.64222711522987,215.88921422501394,217.41497273882993,216.20255446022125,207.76943455326767,216.61972262709037,204.4274648979628,200.65605644439714,217.64623420484108,217.4836147702529,200.30187370085767,207.94265328522394,213.36271596127864,219.82969497747206,221.67476793427795,219.267743979486,227.63403045922504,206.7818598609704,219.98336364405012,221.35186843692108,218.13625523537291,218.91803343254296,205.01597071134293,221.63782071822365,228.66589213194862,208.09194935304305,222.5414363544988,215.45758852766875,214.06527602669502,205.0917153885691,209.52896597999236,216.9364866611355,203.1583149052911,205.81438088663054,224.79337086430644,227.71911760588716,217.23126771032165,200.0408893803152,224.45131516029048,222.0660415576031,223.59881751531628,216.00866791394768,205.66220919134886,216.56945065152664,203.1666111320381,217.3033738943143,204.1620969839719,212.0594579185788,206.83615504612663,212.13126742123708,206.7282869582533,204.99270482630476,228.73717272824265,226.3175210243264,207.39136397913634,217.8510032198409,200.88921175544147,225.1379571657377,227.4827941632953,229.5931806105199,216.24688282108133,213.0637708870152,227.5874175693139,225.1030957253528,200.6625243039431,209.31442003111488,208.83473517949915,213.95806354025177,218.49112617360197,210.10395910003714,203.4242075885174,224.04729315364116,224.04174487810923,216.61190588710951,220.25251241689134,229.73907421584397,225.28326938174726,225.54594142320065,206.36330206564134,227.09990275481653,224.9574006435609,215.09264600622896,213.0204518953674,228.6073831626847,226.80345952156577,202.00423243098768,201.36010167494743,220.04017362620968,204.71266103005644,211.14037940477067,229.71145346789223,206.16459460018112,214.90840331852706,208.45399742296897,225.05679924171753,213.61919848845338,211.04848384341005,210.11505896405222,205.75751622968173,219.3979564723088,221.88501303645066,219.74032777182936,202.84100666483758,221.09322791502453,225.80592084616922,223.68535631109728,217.161225737319,227.67719878243128,200.82345416797014,221.11918224645123,203.6506748397764,228.65511670134669,212.78837749511857,222.2864073078851,220.87659971541402,212.32818864145452,214.59307189428304,206.34763767413142,226.92997819807186,203.91063552429708,214.1517343602597,212.65768126055482,214.5006851035395,207.73236884393674];
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
            // ⏱️ انتظار زمني
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
            // 📸 التقاط لقطة شاشة
            screenshotCounter++;
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = path.join(__dirname, 'outputs', 'screenshots', `screenshot-${screenshotCounter}-viewport-${timestamp}.png`);
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
