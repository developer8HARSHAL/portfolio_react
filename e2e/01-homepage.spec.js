const { test, expect } = require('@playwright/test');

test.describe('Homepage — Hero section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('H1 contains full name', async ({ page }) => {
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toContainText('Harshal');
    await expect(h1).toContainText('Pinge');
  });

  test('"Available for work" badge is visible in hero', async ({ page }) => {
    await expect(
      page.locator('#home').getByText('Available for work', { exact: true })
    ).toBeVisible();
  });

  test('portrait image loads without error', async ({ page }) => {
    const portrait = page.getByAltText('Portrait of Harshal Pinge');
    await expect(portrait).toBeVisible();
    const { w, h } = await portrait.evaluate((img) => ({
      w: img.naturalWidth,
      h: img.naturalHeight,
    }));
    expect(w).toBeGreaterThan(0);
    expect(h).toBeGreaterThan(0);
  });

  test('"View projects" CTA scrolls to #project', async ({ page }) => {
    await page.locator('#home').getByRole('link', { name: /view projects/i }).click();
    await expect(page.locator('#project')).toBeInViewport({ timeout: 6000 });
  });

  test('"Resume" link opens in a new tab with correct attributes', async ({ page }) => {
    const resumeLink = page.locator('#home').getByRole('link', { name: /^resume/i });
    await expect(resumeLink).toBeVisible();
    await expect(resumeLink).toHaveAttribute('target', '_blank');
    await expect(resumeLink).toHaveAttribute('rel', /noopener/);
    await expect(resumeLink).toHaveAttribute('rel', /noreferrer/);
    const href = await resumeLink.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('"About me" button scrolls to #about', async ({ page }) => {
    await page.getByRole('button', { name: /about me/i }).click();
    await expect(page.locator('#about')).toBeInViewport({ timeout: 6000 });
  });
});

test.describe('Homepage — document title and meta', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('page title is correct', async ({ page }) => {
    await expect(page).toHaveTitle('Harshal Pinge — Frontend & Full-Stack Developer');
  });

  test('meta description is present and non-empty', async ({ page }) => {
    const content = await page
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(10);
  });

  test('og:title and og:description are set', async ({ page }) => {
    const ogTitle = await page
      .locator('meta[property="og:title"]')
      .getAttribute('content');
    const ogDesc = await page
      .locator('meta[property="og:description"]')
      .getAttribute('content');
    expect(ogTitle).toBeTruthy();
    expect(ogDesc).toBeTruthy();
  });

  test('twitter:title and twitter:description are set', async ({ page }) => {
    const twitterTitle = await page
      .locator('meta[name="twitter:title"]')
      .getAttribute('content');
    const twitterDesc = await page
      .locator('meta[name="twitter:description"]')
      .getAttribute('content');
    expect(twitterTitle).toBeTruthy();
    expect(twitterDesc).toBeTruthy();
  });
});