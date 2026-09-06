const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Keep local regression checks independent of analytics/CDN availability.
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.hostname === '127.0.0.1' ? route.continue() : route.abort();
  });
});

test('English and Chinese search survives desktop/mobile changes and clears', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const desktop = page.locator('#find-in-page-input');
  const mobile = page.locator('#find-in-page-input-mobile');
  const cards = page.locator('.searchable-item:visible');
  const originalCount = await cards.count();
  await desktop.fill('Canvas');
  await desktop.press('Enter');
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText('Canvas');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(mobile).toHaveValue('Canvas');
  await mobile.fill('在读证明');
  await expect(cards).toHaveCount(1);
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(desktop).toHaveValue('在读证明');
  await desktop.fill('no-matching-student-resource-12345');
  await expect(cards).toHaveCount(0);
  await expect(page.locator('#no-results-message')).toBeVisible();
  await desktop.fill('');
  await expect(cards).toHaveCount(originalCount);
  await expect(page.locator('#no-results-message')).toBeHidden();
});

test('browser-restored query is applied on pageshow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('#find-in-page-input-mobile').evaluate(input => {
    input.value = 'Canvas';
    window.dispatchEvent(new Event('pageshow'));
  });
  await expect(page.locator('.searchable-item:visible')).toHaveCount(1);
  await expect(page.locator('#find-in-page-input')).toHaveValue('Canvas');
});

for (const width of [320, 390, 768, 1000, 1001, 1100, 1280, 1440]) {
  test(`navigation stays within the viewport and above content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const geometry = await page.evaluate(() => {
      const nav = document.querySelector('.u_nav-wrapper').getBoundingClientRect();
      const firstCard = document.querySelector('.main-block').getBoundingClientRect();
      const selectors = ['.u_nav-title', '.u_find-form', '.u_nav-right', '.um_find-form', '.um_nav-links'];
      const visible = selectors.flatMap(selector => [...document.querySelectorAll(selector)])
        .filter(el => el.getClientRects().length)
        .map(el => {
          const r = el.getBoundingClientRect();
          return { name: el.className, left: r.left, right: r.right, top: r.top, bottom: r.bottom };
        });
      return { navBottom: nav.bottom, firstCardTop: firstCard.top, width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth, visible };
    });
    expect(geometry.scrollWidth).toBeLessThanOrEqual(width);
    expect(geometry.firstCardTop).toBeGreaterThanOrEqual(geometry.navBottom);
    for (const box of geometry.visible) {
      expect(box.left, box.name).toBeGreaterThanOrEqual(0);
      expect(box.right, box.name).toBeLessThanOrEqual(width);
    }
    for (let i = 0; i < geometry.visible.length; i++) {
      for (let j = i + 1; j < geometry.visible.length; j++) {
        const a = geometry.visible[i], b = geometry.visible[j];
        const overlaps = Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 &&
          Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
        expect(overlaps, `${a.name} overlaps ${b.name}`).toBe(false);
      }
    }
  });
}

for (const width of [320, 1280]) {
  test(`contacts stay open for copying and dismiss correctly at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const wechat = page.getByRole('button', { name: 'Show WeChat ID', exact: true });
    const discord = page.getByRole('button', { name: 'Show Discord ID', exact: true });
    await wechat.click();
    let card = page.locator('.u_nav-contact-card:visible');
    await expect(card).toContainText('ktwu001');
    await card.locator('strong').click();
    await expect(card).toBeVisible();
    await discord.click();
    await expect(card).toHaveCount(1);
    await expect(card).toContainText('ktwu01');
    const bounds = await card.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    await page.keyboard.press('Escape');
    await expect(card).toHaveCount(0);
    await expect(discord).toBeFocused();
    await wechat.click();
    await page.locator('.u_nav-title').click();
    await expect(card).toHaveCount(0);
  });

  test(`homepage help opens with keyboard and restores focus at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const trigger = page.locator('[data-homepage-toggle]:visible');
    const dialog = page.locator('#homepage-dialog');
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('#homepage-title')).toBeFocused();
    expect(await dialog.evaluate(el => el.scrollTop)).toBe(0);
    await expect(dialog).toContainText('Chrome');
    await expect(dialog).toContainText('Safari');
    await expect(dialog.locator('#homepage-address')).toHaveValue('https://ut01.github.io/');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
    await trigger.click();
    expect(await dialog.evaluate(el => el.scrollTop)).toBe(0);
    await dialog.getByRole('button', { name: 'Close / 关闭' }).click();
    await expect(dialog).toBeHidden();
  });
}

test('requested resources render and existing visitor counter has a real ID', async ({ page }) => {
  await page.goto('/');
  for (const url of [
    'https://global.utexas.edu/',
    'https://onestop.utexas.edu/student-records/transcripts-other-records/enrollment-certifications/',
    'https://kiro.dev/students/',
    'https://utdirect.utexas.edu/acct/fb/waivers/rte_request.WBX',
    'https://utdirect.utexas.edu/apps/isss/insr/waiver/',
  ]) {
    await expect(page.locator(`.searchable-item a[href="${url}"]`)).toHaveCount(1);
  }
  const counter = await page.locator('#clustrmaps').getAttribute('src');
  expect(new URL(counter, page.url()).searchParams.get('d')).toBe('fQvKmZbPMctrjCs0jp8rDLqKYPwmQtmFVMiOSl9YUsE');
  await page.goto('/guides/ai-tools-guide.html');
  await expect(page.locator('body')).toContainText('Kiro');
  await expect(page.locator('body')).toContainText('GitHub');
  await page.setViewportSize({ width: 320, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  expect(await page.locator('ol').first().evaluate(el => getComputedStyle(el).listStyleType)).toBe('decimal');
});
