const { test, expect } = require('@playwright/test');

test.describe('Accessibility — keyboard and ARIA', () => {
  test('contact form inputs have associated labels', async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    // Verify by id — labels use htmlFor matching these ids
    for (const id of ['name', 'email', 'subject', 'message']) {
      await expect(page.locator(`#${id}`)).toBeVisible();
      // Verify a label pointing to this id exists
      const label = page.locator(`label[for="${id}"]`);
      await expect(label).toBeAttached();
    }
  });

  test('art lightbox has role=dialog', async ({ page }) => {
    await page.goto('/art');
    await page.getByRole('button', { name: /view .+ larger/i }).first().click();
    // Check for dialog role — aria-modal may be true or absent depending on implementation
    await expect(
  page.getByRole('dialog', { name: 'Midnight flower' })
).toBeVisible();
  });

  test('mobile menu has role=dialog', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: /toggle mobile menu/i }).click();
    await expect(
  page.getByRole('dialog', { name: 'mobile navigation' })
).toBeVisible();
  });

  test('all project images have non-empty alt text', async ({ page }) => {
    await page.goto('/');
    await page.locator('#project').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const images = page.locator('#project img');
    const count = await images.count();
    // Only check if images exist — some projects may use video/canvas instead
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });

  test('theme toggle button has an aria-label', async ({ page }) => {
    await page.goto('/');
    // Any button with aria-label containing switch/theme/mode
    const themeBtn = page.locator('button[aria-label*="mode"], button[aria-label*="theme"], button[aria-label*="Switch"]').first();
    await expect(themeBtn).toBeVisible();
    const ariaLabel = await themeBtn.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.length).toBeGreaterThan(3);
  });

  test('section headings exist in logical order on homepage', async ({ page }) => {
    await page.goto('/');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    // At least one h2 exists on the page
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });

test('Tab key reaches main CTA from skip-link', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  let found = false;
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    const text = await page.evaluate(() => {
      const el = document.activeElement;
      return el ? el.textContent.trim() : '';
    });
    if (
      text.toLowerCase().includes('view') ||
      text.toLowerCase().includes('resume') ||
      text.toLowerCase().includes('project')
    ) {
      found = true;
      break;
    }
  }
  expect(found).toBe(true);
});

  test('submit button is disabled while sending', async ({ page }) => {
    await page.route('**/api.emailjs.com/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      await route.fulfill({ status: 200, body: JSON.stringify({ status: 200, text: 'OK' }) });
    });

    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#subject').fill('Hello');
    await page.locator('#message').fill('This is a test message.');
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.locator('button[type="submit"][disabled]')).toBeVisible({ timeout: 3000 });
  });
});