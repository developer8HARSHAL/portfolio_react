const { test, expect } = require('@playwright/test');

test.describe('/art page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/art');
  });

  test('renders h1 "Art"', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: 'Art' })).toBeVisible();
  });

  test('renders all 6 artworks', async ({ page }) => {
    const artButtons = page.getByRole('button', { name: /View .+ larger/ });
    await expect(artButtons).toHaveCount(6);
  });

  test('clicking artwork opens lightbox dialog', async ({ page }) => {
    await page.getByRole('button', { name: 'View Midnight flower larger' }).click();
    await expect(page.getByRole('dialog', { name: 'Midnight flower' })).toBeVisible();
  });

  test('Escape closes lightbox and returns focus to trigger', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'View Midnight flower larger' });
    await trigger.click();
    await expect(page.getByRole('dialog', { name: 'Midnight flower' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Midnight flower' })).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test('Close button in lightbox closes the dialog', async ({ page }) => {
    await page.getByRole('button', { name: 'View Midnight flower larger' }).click();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('Arrow keys cycle through artworks in lightbox', async ({ page }) => {
    await page.getByRole('button', { name: 'View Midnight flower larger' }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toContainText('01');

    await page.keyboard.press('ArrowRight');
    await expect(dialog).toContainText('02');

    await page.keyboard.press('ArrowLeft');
    await expect(dialog).toContainText('01');
  });

  test('clicking backdrop closes the lightbox', async ({ page }) => {
    await page.getByRole('button', { name: 'View Midnight flower larger' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    // Click top-left corner — outside the image content
    await page.mouse.click(10, 10);
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('document title is "Art — Harshal Pinge"', async ({ page }) => {
    await expect(page).toHaveTitle('Art — Harshal Pinge');
  });

  test('artwork titles and media info are visible below each card', async ({ page }) => {
    await expect(page.getByText('Midnight flower')).toBeVisible();
    await expect(page.getByText('Acrylic on canvas').first()).toBeVisible();
  });
});
