const { test, expect } = require('@playwright/test');

test.describe('/writing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/writing');
  });

  test('renders h1 "Writing"', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /writing/i })).toBeVisible();
  });

  test('featured essay "My Thoughts on Dark Matter" has correct link', async ({ page }) => {
    const link = page.getByRole('link', { name: /My Thoughts on Dark Matter/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://harshalpinge.substack.com/p/my-thoughts-on-dark-matter');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('"the loop" essay is listed in the archive', async ({ page }) => {
    await expect(page.getByText(/the loop/i)).toBeVisible();
  });

  test('"the loop" essay link points to Substack', async ({ page }) => {
    const link = page.getByRole('link', { name: /the loop/i });
    await expect(link).toHaveAttribute('href', 'https://harshalpinge.substack.com/p/the-loop');
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('archive section exists with at least one essay link', async ({ page }) => {
    // Don't assert exact count text — just assert archive links exist
    const essayLinks = page.locator('a[href*="substack.com"]');
    const count = await essayLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('document title contains "Writing"', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Writing');
    expect(title).toContain('Harshal Pinge');
  });
});