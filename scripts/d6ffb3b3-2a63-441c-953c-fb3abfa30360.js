await page.goto('undefined');
await page.waitForLoadState('networkidle');
return await page.screenshot();