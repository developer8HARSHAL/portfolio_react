const { test, expect } = require('@playwright/test');

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('all fields and submit button are visible', async ({ page }) => {
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('all fields have associated labels', async ({ page }) => {
    for (const id of ['name', 'email', 'subject', 'message']) {
      await expect(page.locator(`label[for="${id}"]`)).toBeAttached();
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('form has correct aria-label', async ({ page }) => {
    await expect(page.locator('form[aria-label="Contact form"]')).toBeAttached();
  });

  test('status div is not in DOM before any submission', async ({ page }) => {
    await expect(page.locator('[role="status"]')).not.toBeAttached();
  });

  test('submitting empty form is blocked by HTML5 validation', async ({ page }) => {
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.locator('[role="status"]')).not.toBeAttached();
  });

  test('invalid email format is caught by HTML5 validation', async ({ page }) => {
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('not-an-email');
    await page.locator('#subject').fill('Test Subject');
    await page.locator('#message').fill('Test message body');
    await page.getByRole('button', { name: /send message/i }).click();

    const valid = await page.locator('#email').evaluate((el) => el.validity.valid);
    expect(valid).toBe(false);
  });

  test('all fields are required', async ({ page }) => {
    for (const id of ['name', 'email', 'subject', 'message']) {
      await expect(page.locator(`#${id}`)).toHaveAttribute('required');
    }
  });

  test('email link in contact info has correct mailto href', async ({ page }) => {
    const emailLink = page
      .locator('#contact')
      .getByRole('link', { name: 'harshalpinge@gmail.com', exact: true });
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:harshalpinge@gmail.com');
  });

  test('social links are present in contact section', async ({ page }) => {
    const links = page.locator('#contact').getByRole('link');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('submit button is disabled and shows "Sending..." while form submits', async ({ page }) => {
    await page.route('**/api.emailjs.com/**', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      await route.fulfill({ status: 200, body: JSON.stringify({ status: 200, text: 'OK' }) });
    });

    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#subject').fill('Hello');
    await page.locator('#message').fill('This is a test message.');
    await page.getByRole('button', { name: /send message/i }).click();

    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeDisabled({ timeout: 3000 });
    await expect(submitBtn).toContainText('Sending...');
  });
});