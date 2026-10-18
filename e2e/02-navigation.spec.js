const { test, expect } = require('@playwright/test');

const NAV_SECTIONS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'project' },
  { label: 'Skills', id: 'skill' },
  { label: 'Contact', id: 'contact' },
];

async function loadHomePage(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('header')).toBeVisible();
  // The page sections are lazy-loaded inside App's Suspense boundary.
  // Wait for the section content before interacting with navigation.
  await page.locator('#project').waitFor({ state: 'attached', timeout: 20000 });
}

test.describe('Section navigation', () => {
  test.beforeEach(async ({ page }) => {
    await loadHomePage(page);
  });

  for (const { label, id } of NAV_SECTIONS) {
    test(`"${label}" nav button scrolls to #${id}`, async ({ page }, testInfo) => {
      if (testInfo.project.name === 'Mobile Safari') {
        // On the mobile viewport, use the real mobile navigation rather than
        // trying to locate desktop-only navigation buttons.
        await page.getByRole('button', { name: 'Toggle mobile menu' }).click();

        const mobileNavigation = page.getByRole('dialog', {
          name: 'Mobile navigation',
        });
        await expect(mobileNavigation).toBeVisible();
        await mobileNavigation
          .getByRole('button', { name: label, exact: true })
          .click();
        await expect(mobileNavigation).not.toBeVisible();
      } else {
        await page
          .locator('header')
          .getByRole('button', { name: label, exact: true })
          .click();
      }

      await expect(page.locator(`#${id}`)).toBeInViewport({ timeout: 5000 });
    });
  }

  test('logo link navigates to home from /art', async ({ page }) => {
    await page.goto('/art', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'Harshal Pinge.' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Harshal');
  });

  test('theme toggle changes aria-label after click', async ({ page }) => {
    const toggleBtn = page
      .locator('header')
      .getByRole('button', { name: /Switch to (light|dark) mode/i })
      .first();
    const labelBefore = await toggleBtn.getAttribute('aria-label');
    await toggleBtn.click();
    await expect(toggleBtn).not.toHaveAttribute('aria-label', labelBefore);
  });

  test('theme persists after page reload', async ({ page }) => {
    const toggleBtn = page
      .locator('header')
      .getByRole('button', { name: /Switch to (light|dark) mode/i })
      .first();
    await toggleBtn.click();
    const labelAfterToggle = await toggleBtn.getAttribute('aria-label');
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('header')).toBeVisible();
    const toggleBtnAfterReload = page
      .locator('header')
      .getByRole('button', { name: /Switch to (light|dark) mode/i })
      .first();
    await expect(toggleBtnAfterReload).toHaveAttribute('aria-label', labelAfterToggle);
  });

  test('skip-to-content link is focused and visible on first Tab', async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === 'Mobile Safari',
      'First-Tab focus is not reliably represented by iPhone emulation.'
    );
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeInViewport();
  });
});

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await loadHomePage(page);
  });

  test('hamburger button opens mobile menu', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle mobile menu' }).click();
    await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).toBeVisible();
  });

  test('Escape key closes mobile menu', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle mobile menu' }).click();
    await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).not.toBeVisible();
  });

  test('clicking backdrop closes mobile menu', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle mobile menu' }).click();
    await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).toBeVisible();
    await page.mouse.click(10, 400);
    await expect(page.getByRole('dialog', { name: 'Mobile navigation' })).not.toBeVisible();
  });

  test('mobile menu nav button scrolls to section and closes menu', async ({ page }) => {
    await page.getByRole('button', { name: 'Toggle mobile menu' }).click();
    const mobileNavigation = page.getByRole('dialog', { name: 'Mobile navigation' });
    await expect(mobileNavigation).toBeVisible();
    await mobileNavigation.getByRole('button', { name: 'Projects', exact: true }).click();
    await expect(mobileNavigation).not.toBeVisible();
    await expect(page.locator('#project')).toBeInViewport({ timeout: 5000 });
  });

  test('hamburger aria-expanded reflects menu state', async ({ page }) => {
    const hamburger = page.getByRole('button', { name: 'Toggle mobile menu' });
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    await hamburger.click();
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });
});