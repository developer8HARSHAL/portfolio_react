const { test, expect } = require('@playwright/test');

test.describe('Routing', () => {
  test('unknown route renders 404 page', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
    await expect(page.getByText(/page not found/i)).toBeVisible();
  });

  test('"Go Home" on 404 navigates back to /', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await page.getByRole('link', { name: /go home/i }).click();
    await page.waitForURL('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Harshal');
  });

  test('/notebook redirects to /writing', async ({ page }) => {
    await page.goto('/notebook');
    await page.waitForURL('/writing', { timeout: 5000 });
    await expect(page).toHaveURL('/writing');
  });

  test('direct navigation to /art renders correctly', async ({ page }) => {
    await page.goto('/art');
    await expect(page.getByRole('heading', { level: 1, name: /art/i })).toBeVisible();
  });

  test('direct navigation to /writing renders correctly', async ({ page }) => {
    await page.goto('/writing');
    await expect(page.getByRole('heading', { level: 1, name: /writing/i })).toBeVisible();
  });

  test('footer "Writing" link navigates to /writing', async ({ page }) => {
    await page.goto('/');
    // Scope to footer to avoid hitting nav links with same name
    const footerLink = page.locator('footer').getByRole('link', { name: /^writing$/i });
    await footerLink.scrollIntoViewIfNeeded();
    await footerLink.click();
    await page.waitForURL('/writing');
    await expect(page).toHaveURL('/writing');
  });

  test('footer "Art" link navigates to /art', async ({ page }) => {
    await page.goto('/');
    const footerLink = page.locator('footer').getByRole('link', { name: /^art$/i });
    await footerLink.scrollIntoViewIfNeeded();
    await footerLink.click();
    await page.waitForURL('/art');
    await expect(page).toHaveURL('/art');
  });

  test('browser back button works after route change', async ({ page }) => {
    await page.goto('/');
    await page.goto('/art');
    await page.goBack();
    await page.waitForURL('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Harshal');
  });
});